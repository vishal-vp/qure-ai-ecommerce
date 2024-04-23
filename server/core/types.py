import graphene
from graphene_django import DjangoObjectType
from core import models

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
    class Meta:
        model = models.Cart


class OrderItemType(DjangoObjectType):
    class Meta:
        model = models.OrderItem


class OrderType(DjangoObjectType):
    class Meta:
        model = models.Order
