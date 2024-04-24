"use client";

import { AUTH_TOKEN_KEY, PATHS } from "@/app-constants";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (!localStorage.getItem(AUTH_TOKEN_KEY)) {
      redirect(PATHS.LOGIN);
    } else {
      redirect(PATHS.PRODUCTS);
    }
  }, []);
  return null;
}
