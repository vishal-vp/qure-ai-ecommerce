"use client";

import { PATHS } from "@/app-constants";
import { CART_QUERY } from "@/graphql/queries";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { Badge, Spin } from "antd";
import Link from "next/link";

export default function Cart() {
  const {
    data: cartData,
    loading: cartDataLoading,
    error: cartDataLoadingError,
  } = useQuery(CART_QUERY);

  let cartBody = null;
  if (cartDataLoadingError) {
    cartBody = <div>Error!</div>;
  } else {
    cartBody = (
      <Badge count={cartData?.cart?.totalNumberOfItems || 0}>
        <ShoppingCartOutlined className="qure-icon" />
      </Badge>
    );
  }

  return (
    <Spin spinning={cartDataLoading}>
      <Link title="Cart" href={PATHS.CART}>
        {cartBody}
      </Link>
    </Spin>
  );
}
