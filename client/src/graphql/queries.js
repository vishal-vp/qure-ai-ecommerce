import { gql } from "@apollo/client";
import { CORE_CART_FIELDS, CORE_PRODUCT_FIELDS } from "./fragments";

export const USER_QUERY = gql`
  query User {
    user {
      id
      email
    }
  }
`;

export const PRODUCTS_QUERY = gql`
  ${CORE_PRODUCT_FIELDS}
  query Products {
    products {
      ...CoreProductFields
    }
  }
`;

export const CART_QUERY = gql`
  ${CORE_CART_FIELDS}
  query Cart {
    cart {
      ...CoreCartFields
    }
  }
`;
