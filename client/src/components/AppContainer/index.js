"use client";

import { createApolloClient } from "@/graphql/client";
import { ApolloProvider } from "@apollo/client";
import Cart from "../Cart";
import ProfileWidget from "../ProfileWidget";
import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";
import { PATHS } from "@/app-constants";

const AppContainer = ({ children }) => {
  const client = createApolloClient();
  return (
    <ApolloProvider client={client}>
      <Link href={PATHS.PRODUCTS}>
        <HomeOutlined />
      </Link>
      <Cart />
      <ProfileWidget />
      {children}
    </ApolloProvider>
  );
};

export default AppContainer;
