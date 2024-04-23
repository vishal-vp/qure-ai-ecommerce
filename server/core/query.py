import graphene
from core import models
from core import types


class Query(graphene.ObjectType):
    user = graphene.Field(types.UserType)
    products = graphene.List(types.ProductType)
    cart = graphene.Field(types.CartType)

    def resolve_user(self, info, **kwargs):
        return info.context.user

    def resolve_products(self, info, **kwargs):
        return models.Product.objects.all()

    def resolve_cart(self, info, **kwargs):
        return models.Cart.objects.filter(user=info.context.user).first()
