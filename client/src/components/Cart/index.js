"use client";

import { PATHS } from "@/app-constants";
import { CART_QUERY } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { Spin } from "antd";
import Link from "next/link";

export default function Cart() {
  const {
    data: cartData,
    loading: cartDataLoading,
    error: cartDataLoadingError,
  } = useQuery(CART_QUERY);

  let cartBody = null;
  if (cartDataLoadingError) {
    cartBody = <div>Error loading cart items!</div>;
  } else {
    cartBody = <div>Items: {cartData?.cart?.totalNumberOfItems || 0}</div>;
  }

  return (
    <Spin spinning={cartDataLoading}>
      <Link title="Cart" href={PATHS.CART}>
        {cartBody}
      </Link>
    </Spin>
  );
}
