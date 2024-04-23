import graphene
from core.query import Query
from core.mutation import Mutation

schema = graphene.Schema(query=Query, mutation=Mutation)
