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
    totalPrice
    cartitemSet {
      id
      totalPrice
      product {
        ...CoreProductFields
      }
      quantity
    }
  }
`;

export const CORE_USER_PROFILE_FIELDS = gql`
  fragment CoreUserProfileFields on UserProfileType {
    id
    mobileNumber
    address
  }
`;

export const CORE_USER_FIELDS = gql`
  ${CORE_USER_PROFILE_FIELDS}
  fragment CoreUserFields on UserType {
    id
    email
    userprofile {
      ...CoreUserProfileFields
    }
  }
`;
