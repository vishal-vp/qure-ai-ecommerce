import { gql } from "@apollo/client";

export const CORE_PRODUCT_FIELDS = gql`
  fragment CoreProductFields on ProductType {
    id
    name
    description
    price
    imageUrl
  }
`;

export const CORE_CART_FIELDS = gql`
  ${CORE_PRODUCT_FIELDS}
  fragment CoreCartFields on CartType {
    id
    totalNumberOfItems
    cartitemSet {
      id
      product {
        ...CoreProductFields
      }
      quantity
    }
  }
`;
