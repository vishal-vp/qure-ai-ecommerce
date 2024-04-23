import graphene
from graphene_django import DjangoObjectType
from django.contrib.auth.models import User
from core import models


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
