"use client";

import { createApolloClient } from "@/graphql/client";
import { ApolloProvider } from "@apollo/client";
import {
  AUTH_TOKEN_KEY,
  PATHS,
  PATHS_TO_NOT_SHOW_HEADER,
} from "@/app-constants";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import AppHeader from "./AppHeader";

const AppContainer = ({ children }) => {
  const router = useRouter();
  const pathName = usePathname();
  const client = createApolloClient();

  useEffect(() => {
    if (!localStorage.getItem(AUTH_TOKEN_KEY)) {
      router.push(PATHS.LOGIN);
    } else {
      router.push(PATHS.PRODUCTS);
    }
  }, [router]);

  const shouldDisplayAppHeader =
    PATHS_TO_NOT_SHOW_HEADER.indexOf(pathName) === -1;
  console.log(pathName);

  return (
    <ApolloProvider client={client}>
      {shouldDisplayAppHeader && <AppHeader />}
      {children}
    </ApolloProvider>
  );
};

export default AppContainer;
