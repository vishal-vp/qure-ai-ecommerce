import graphene
from graphene_django import DjangoObjectType
from core import models
from django.db.models import Sum, F

from django.contrib.auth import get_user_model

User = get_user_model()


class UserType(DjangoObjectType):
    class Meta:
        model = User

    fields = (
        "first_name",
        "last_name",
        "email",
    )


class UserProfileType(DjangoObjectType):
    class Meta:
        model = models.UserProfile


class ProductType(DjangoObjectType):
    class Meta:
        model = models.Product


class CartItemType(DjangoObjectType):
    total_price = graphene.Decimal()

    class Meta:
        model = models.CartItem

    def resolve_total_price(self, *args):
        return self.quantity * self.product.price


class CartType(DjangoObjectType):
    total_number_of_items = graphene.Int()
    total_price = graphene.Decimal()

    class Meta:
        model = models.Cart

    def resolve_total_number_of_items(self, *args):
        return (
            models.CartItem.objects.filter(cart=self)
            .aggregate(Sum("quantity", default=0))
            .get("quantity__sum")
        )

    def resolve_total_price(self, *args):
        return (
            models.CartItem.objects.filter(cart=self)
            .aggregate(total_price=Sum(F("quantity") * F("product__price"), default=0))
            .get("total_price")
        )


class OrderItemType(DjangoObjectType):
    class Meta:
        model = models.OrderItem


class OrderType(DjangoObjectType):
    class Meta:
        model = models.Order
