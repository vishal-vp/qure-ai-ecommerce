import graphene


class UserProfileInput(graphene.InputObjectType):
    mobile_number = graphene.String()
    address = graphene.String()
