import graphene
from core.types import UserType


class Query(graphene.ObjectType):
    user = graphene.Field(UserType)

    def resolve_user(self, info, **kwargs):
        return info.context.user
