"use client";

import { useQuery } from "@apollo/client";
import { USER_QUERY } from "../../graphql/queries";

export default function Login() {
  const { data, loading, error } = useQuery(USER_QUERY);
  return <div>HELLO</div>;
}
