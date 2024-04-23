import logging
import graphene
import jwt
from django.conf import settings
from django.db.models import F, Q
from django.db import IntegrityError, transaction

from graphene_django import DjangoObjectType
from core import inputs, models, types
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from qure_ai_ecommerce.decorators import jwt_token_required

User = get_user_model()
logger = logging.getLogger(__name__)


class BaseMutation(graphene.Mutation):
    ok = graphene.Boolean()
    error_message = graphene.String()

    @classmethod
    def mutate(*args, **kwargs):
        pass


class Login(BaseMutation):
    class Arguments:
        email = graphene.String()
        password = graphene.String()

    token = graphene.String()

    @classmethod
    def mutate(cls, root, info, *args, **kwargs):
        user = authenticate(email=kwargs.get("email"), password=kwargs.get("password"))
        token = None
        if user:
            token = jwt.encode(
                {"email": kwargs.get("email")},
                settings.JWT_SECRET,
                algorithm="HS256",
            )
        return Login(ok=True if user else False, token=token)


class Register(BaseMutation):
    class Arguments:
        email = graphene.String()
        password = graphene.String()
        user_profile = inputs.UserProfileInput()

    @classmethod
    def mutate(cls, root, info, *args, **kwargs):
        user = User.objects.create(email=kwargs.get("email"))
        models.UserProfile.objects.create(user=user, **kwargs.get("user_profile"))
        return Register(ok=True)


class UpdateProfile(BaseMutation):
    class Arguments:
        user_profile = inputs.UserProfileInput()

    user_profile = graphene.Field(types.UserProfileType)

    @classmethod
    @jwt_token_required
    def mutate(cls, root, info, *args, **kwargs):
        user_profile = models.UserProfile.objects.update_or_create(
            user=info.context.user, defaults=kwargs.get("user_profile")
        )[0]
        return UpdateProfile(ok=True, user_profile=user_profile)


class UpdateCart(BaseMutation):
    class Arguments:
        product_id = graphene.ID()
        should_add = graphene.Boolean()

    cart = graphene.Field(types.CartType)

    @classmethod
    @jwt_token_required
    def mutate(cls, root, info, *args, **kwargs):
        try:
            difference = 1 if kwargs.get("should_add") else -1
            cart = models.Cart.objects.get_or_create(user=info.context.user)[0]
            product = models.Product.objects.get(id=kwargs.get("product_id"))
            cart_item_filters = Q(cart=cart, product=product)
            cart_items = models.CartItem.objects.filter(cart_item_filters)
            if cart_items.exists():
                cart_items.update(quantity=F("quantity") + difference)
            elif kwargs.get("should_add"):
                models.CartItem.objects.create(cart=cart, product=product, quantity=1)
            cart.refresh_from_db()
            return UpdateCart(ok=True, cart=cart)
        except Exception:
            logger.exception("Error updating cart")
            return UpdateCart(ok=False, error_message="Unable to update cart")


class PlaceOrder(BaseMutation):

    order = graphene.Field(types.OrderType)

    @classmethod
    @jwt_token_required
    def mutate(cls, root, info, *args, **kwargs):
        try:
            with transaction.atomic():
                cart = models.Cart.objects.get(user=info.context.user)
                if cart.cartitem_set.all().count() < 1:
                    return PlaceOrder(ok=False, error_message="No items in the cart!")
                order = models.Order.objects.create(user=info.context.user)
                for cart_item in cart.cartitem_set.select_for_update().all():
                    models.OrderItem.objects.create(
                        product=cart_item.product,
                        quantity=cart_item.quantity,
                        order=order,
                    )
                    cart_item.delete()
                return PlaceOrder(ok=True, order=order)
        except Exception:
            logger.exception("Error placing order")
            return PlaceOrder(ok=False, error_message="Unable to place order")


class Mutation(graphene.ObjectType):
    login = Login.Field()
    register = Register.Field()
    update_profile = UpdateProfile.Field()
    update_cart = UpdateCart.Field()
    place_order = PlaceOrder.Field()
