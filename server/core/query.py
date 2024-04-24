import graphene
from core import models
from core import types
from qure_ai_ecommerce.decorators import jwt_token_required


class Query(graphene.ObjectType):
    user = graphene.Field(types.UserType)
    products = graphene.List(types.ProductType)
    cart = graphene.Field(types.CartType)

    def resolve_user(self, info, **kwargs):
        return info.context.user

    @jwt_token_required
    def resolve_products(self, info, **kwargs):
        return models.Product.objects.all()

    @jwt_token_required
    def resolve_cart(self, info, **kwargs):
        return models.Cart.objects.filter(user=info.context.user).first()
