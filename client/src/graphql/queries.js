import { gql } from "@apollo/client";
import {
  CORE_CART_FIELDS,
  CORE_PRODUCT_FIELDS,
  CORE_USER_FIELDS,
} from "./fragments";

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

export const USER_QUERY = gql`
  ${CORE_USER_FIELDS}
  query User {
    user {
      ...CoreUserFields
    }
  }
`;
