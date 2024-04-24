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

import styles from "./index.module.css";

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

  return (
    <ApolloProvider client={client}>
      {shouldDisplayAppHeader && <AppHeader />}
      <div className={styles.appContainer}>{children}</div>
    </ApolloProvider>
  );
};

export default AppContainer;
