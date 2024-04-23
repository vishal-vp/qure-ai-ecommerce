import graphene
import jwt
from django.conf import settings

from graphene_django import DjangoObjectType
from core import inputs, models
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model

User = get_user_model()


class Login(graphene.Mutation):
    class Arguments:
        email = graphene.String()
        password = graphene.String()

    ok = graphene.Boolean()
    token = graphene.String()
    error_message = graphene.String()

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


class Register(graphene.Mutation):
    class Arguments:
        email = graphene.String()
        password = graphene.String()
        user_profile = inputs.UserProfileInput()

    ok = graphene.Boolean()
    token = graphene.String()
    error_message = graphene.String()

    @classmethod
    def mutate(cls, root, info, *args, **kwargs):
        user = User.objects.create(email=kwargs.get("email"))
        models.UserProfile.objects.create(user=user, **kwargs.get("user_profile"))
        return Login(ok=True)


class Mutation(graphene.ObjectType):
    login = Login.Field()
    register = Register.Field()
