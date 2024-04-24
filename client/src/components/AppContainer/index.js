"use client";

import { createApolloClient } from "@/graphql/client";
import { ApolloProvider } from "@apollo/client";
import Cart from "../Cart";
import ProfileWidget from "../ProfileWidget";
import { HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import Link from "next/link";
import { AUTH_TOKEN_KEY, PATHS } from "@/app-constants";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AppContainer = ({ children }) => {
  const router = useRouter();
  const client = createApolloClient();

  useEffect(() => {
    if (!localStorage.getItem(AUTH_TOKEN_KEY)) {
      router.push(PATHS.LOGIN);
    } else {
      router.push(PATHS.PRODUCTS);
    }
  }, [router]);

  function handleLogout() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    router.push(PATHS.LOGIN);
  }

  return (
    <ApolloProvider client={client}>
      <Link href={PATHS.PRODUCTS}>
        <HomeOutlined title="Home" />
      </Link>
      <Cart />
      <ProfileWidget />
      <LogoutOutlined title="Logout" onClick={handleLogout} />
      {children}
    </ApolloProvider>
  );
};

export default AppContainer;
