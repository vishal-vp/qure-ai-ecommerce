import graphene
from graphene_django import DjangoObjectType
from core import models

from django.contrib.auth import get_user_model

User = get_user_model()


class UserType(DjangoObjectType):
    class Meta:
        model = User


class ProductType(DjangoObjectType):
    class Meta:
        model = models.Product


class PurchaseItemType(DjangoObjectType):
    class Meta:
        model = models.PurchaseItem


class CartType(DjangoObjectType):
    class Meta:
        model = models.Cart
