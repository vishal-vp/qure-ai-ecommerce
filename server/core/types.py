import graphene
from graphene_django import DjangoObjectType
from core import models
from django.db.models import Sum

from django.contrib.auth import get_user_model

User = get_user_model()


class UserType(DjangoObjectType):
    class Meta:
        model = User


class UserProfileType(DjangoObjectType):
    class Meta:
        model = models.UserProfile


class ProductType(DjangoObjectType):
    class Meta:
        model = models.Product


class CartItemType(DjangoObjectType):
    class Meta:
        model = models.CartItem


class CartType(DjangoObjectType):
    total_number_of_items = graphene.Int()

    class Meta:
        model = models.Cart

    def resolve_total_number_of_items(self, d):
        return (
            models.CartItem.objects.filter(cart=self)
            .aggregate(Sum("quantity", default=0))
            .get("quantity__sum")
        )


class OrderItemType(DjangoObjectType):
    class Meta:
        model = models.OrderItem


class OrderType(DjangoObjectType):
    class Meta:
        model = models.Order
