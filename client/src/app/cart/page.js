"use client";

import Price from "@/components/Price";
import Product from "@/components/Product";
import { CART_QUERY } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { Skeleton } from "antd";
import Error from "next/error";

export default function CartDetails() {
  const {
    data: cartData,
    loading: cartDataLoading,
    error: cartDataLoadingError,
  } = useQuery(CART_QUERY);

  if (cartDataLoading) {
    return <Skeleton />;
  }
  if (cartDataLoadingError) {
    return <Error statusCode={500} />;
  }
  return (
    <>
      {cartData?.cart?.cartitemSet?.map((cartItem) => {
        return (
          <div key={cartItem?.id}>
            <Product product={cartItem?.product} />
            <span>
              Price: <Price price={cartItem?.totalPrice} />
            </span>
          </div>
        );
      })}
      <span>
        Total price: <Price price={cartData?.cart?.totalPrice} />
      </span>
    </>
  );
}
