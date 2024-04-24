import { AUTH_TOKEN_KEY } from "@/app-constants";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  concat,
} from "@apollo/client";

function mergeArrayByField(existing, incoming, { readField, mergeObjects }) {
  try {
    const merged = incoming ? incoming.slice(0) : [];
    const authorNameToIndex = Object.create(null);
    if (incoming) {
      incoming.forEach((cartItem, index) => {
        authorNameToIndex[readField("id", cartItem)] = index;
      });
    }
    existing?.forEach((cartItem) => {
      const name = readField("id", cartItem);
      const index = authorNameToIndex[name];
      if (typeof index === "number") {
        merged[index] = mergeObjects(merged[index], cartItem);
      }
    });
    return merged;
  } catch (err) {
    console.log(err);
  }
}

export const createApolloClient = () => {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  });
  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers }) => ({
      headers: {
        "x-auth-token": localStorage.getItem(AUTH_TOKEN_KEY), // however you get your token
        ...headers,
      },
    }));
    return forward(operation);
  });

  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        CartType: {
          fields: {
            cartitemSet: {
              merge: mergeArrayByField,
            },
          },
        },
      },
    }),
    link: concat(authLink, httpLink),
  });
};
