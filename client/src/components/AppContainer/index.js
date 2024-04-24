"use client";

import { createApolloClient } from "@/graphql/client";
import { ApolloProvider } from "@apollo/client";
import Cart from "../Cart";

const AppContainer = ({ children }) => {
  const client = createApolloClient();
  return (
    <ApolloProvider client={client}>
      <Cart />
      {children}
    </ApolloProvider>
  );
};

export default AppContainer;
