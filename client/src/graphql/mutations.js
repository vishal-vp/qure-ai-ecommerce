import { gql } from "@apollo/client";
import { CORE_CART_FIELDS, CORE_PRODUCT_FIELDS } from "./fragments";

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      ok
      errorMessage
    }
  }
`;

export const UPDATE_CART = gql`
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
