import jwt
from functools import wraps
from graphql import GraphQLError
from django.conf import settings
from graphql.type import GraphQLResolveInfo as ResolveInfo
from django.contrib.auth import get_user_model

User = get_user_model()


def jwt_token_required(view_func):
    @wraps(view_func)
    def _wrapped_view(*args, **kwargs):
        # Retrieve the JWT token from the request header
        info = next((arg for arg in args if isinstance(arg, ResolveInfo)), None)
        token = info.context.META.get("HTTP_X_AUTH_TOKEN", None)

        if token is None:
            raise GraphQLError("JWT token missing", extensions={"code": 401})

        try:
            # Decode the JWT token
            decoded_token = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
            user = User.objects.get(email=decoded_token.get("email"))
            info.context.user = user
            # You can perform additional checks on the decoded token here if needed
        except jwt.ExpiredSignatureError:
            raise GraphQLError("JWT token expired", extensions={"code": 401})
        except jwt.InvalidTokenError:
            raise GraphQLError("Invalid JWT token", extensions={"code": 401})

        # Call the view function
        return view_func(*args, **kwargs)

    return _wrapped_view
