import { gql } from "@apollo/client";

export const USER_QUERY = gql`
  query User {
    user {
      id
      email
    }
  }
`;
