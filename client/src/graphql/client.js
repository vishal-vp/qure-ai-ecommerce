import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  concat,
} from "@apollo/client";

export const createApolloClient = () => {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  });
  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers }) => ({
      headers: {
        "x-auth-token": "FJLDS", // however you get your token
        ...headers,
      },
    }));
    return forward(operation);
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authLink, httpLink),
  });
};
