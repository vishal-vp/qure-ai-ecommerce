import jwt
from functools import wraps
from graphql import GraphQLError
from django.conf import settings


def jwt_token_required(view_func):
    @wraps(view_func)
    def _wrapped_view(self, info, *args, **kwargs):
        # Retrieve the JWT token from the request header
        token = info.context.META.get("HTTP_X_AUTH_TOKEN", None)

        if token is None:
            raise GraphQLError("JWT token missing", extensions={"code": 401})

        try:
            # Decode the JWT token
            jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
            # You can perform additional checks on the decoded token here if needed
        except jwt.ExpiredSignatureError:
            raise GraphQLError("JWT token expired", extensions={"code": 401})
        except jwt.InvalidTokenError:
            raise GraphQLError("Invalid JWT token", extensions={"code": 401})

        # Call the view function
        return view_func(self, info, *args, **kwargs)

    return _wrapped_view
