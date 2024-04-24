import { gql } from "@apollo/client";
import {
  CORE_CART_FIELDS,
  CORE_PRODUCT_FIELDS,
  CORE_USER_PROFILE_FIELDS,
} from "./fragments";

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      ok
      errorMessage
    }
  }
`;

export const UPDATE_CART_MUTATION = gql`
  ${CORE_PRODUCT_FIELDS}
  ${CORE_CART_FIELDS}
  mutation UpdateCart($productId: ID!, $shouldAdd: Boolean!) {
    updateCart(productId: $productId, shouldAdd: $shouldAdd) {
      ok
      errorMessage
      cart {
        ...CoreCartFields
      }
    }
  }
`;

export const PLACE_ORDER_MUTATION = gql`
  ${CORE_CART_FIELDS}
  mutation PlaceOrder {
    placeOrder {
      ok
      errorMessage
      cart {
        ...CoreCartFields
      }
    }
  }
`;

export const UPDATE_PROFILE_MUTATION = gql`
  ${CORE_USER_PROFILE_FIELDS}
  mutation UpdateProfile($userProfile: UserProfileInput) {
    updateProfile(userProfile: $userProfile) {
      ok
      errorMessage
      userProfile {
        ...CoreUserProfileFields
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $password: String) {
    register(email: $email, password: $password) {
      ok
      errorMessage
    }
  }
`;
