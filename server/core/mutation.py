import graphene
import jwt
from django.conf import settings

from graphene_django import DjangoObjectType
from core.inputs import UserProfileInput
from django.contrib.auth import authenticate


class Login(graphene.Mutation):
    class Arguments:
        username = graphene.String()
        password = graphene.String()

    ok = graphene.Boolean()
    token = graphene.String()
    error_message = graphene.String()

    @classmethod
    def mutate(cls, root, info, *args, **kwargs):
        user = authenticate(
            username=kwargs.get("username"), password=kwargs.get("password")
        )
        token = None
        if user:
            token = jwt.encode(
                {"username": kwargs.get("username")},
                settings.JWT_SECRET,
                algorithm="HS256",
            )
        return Login(ok=True if user else False, token=token)


class Mutation(graphene.ObjectType):
    login = Login.Field()
