import graphene
import jwt
from django.conf import settings

from graphene_django import DjangoObjectType
from core import inputs, models, types
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from qure_ai_ecommerce.decorators import jwt_token_required

User = get_user_model()


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


class AddProductToCart(BaseMutation):
    class Arguments:
        id_of_the_product_to_add = graphene.ID()

    cart = graphene.Field(types.CartType)

    @classmethod
    @jwt_token_required
    def mutate(cls, root, info, *args, **kwargs):
        cart = models.Cart.objects.get_or_create(user=info.context.user)[0]
        item = models.Item.objects.get_or_create(cart=cart)


class Mutation(graphene.ObjectType):
    login = Login.Field()
    register = Register.Field()
    update_profile = UpdateProfile.Field()
