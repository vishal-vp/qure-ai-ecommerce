"use client";

import { createApolloClient } from "@/graphql/client";
import { ApolloProvider } from "@apollo/client";
import Cart from "../Cart";
import ProfileWidget from "../ProfileWidget";

const AppContainer = ({ children }) => {
  const client = createApolloClient();
  return (
    <ApolloProvider client={client}>
      <Cart />
      <ProfileWidget />
      {children}
    </ApolloProvider>
  );
};

export default AppContainer;
