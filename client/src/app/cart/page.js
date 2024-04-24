"use client";

import { PATHS, SOMETHING_WENT_WRONG_ERR_MSG } from "@/app-constants";
import Price from "@/components/Price";
import Product from "@/components/Product";
import { PLACE_ORDER } from "@/graphql/mutations";
import { CART_QUERY } from "@/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Skeleton, message } from "antd";
import Error from "next/error";
import Link from "next/link";

export default function CartDetails() {
  const {
    data: cartData,
    loading: cartDataLoading,
    error: cartDataLoadingError,
  } = useQuery(CART_QUERY);
  const [placeOrder, { loading: placeOrderLoading }] = useMutation(PLACE_ORDER);

  async function handleOrderPlacement() {
    try {
      const {
        data: { placeOrder: placeOrderResponseData },
      } = await placeOrder();
      if (placeOrderResponseData?.ok) {
        message.success("Order placed successfully!");
      } else {
        message.error(
          placeOrderResponseData?.errorMessage || SOMETHING_WENT_WRONG_ERR_MSG
        );
      }
    } catch {
      message.error(SOMETHING_WENT_WRONG_ERR_MSG);
    }
  }

  if (cartDataLoading || placeOrderLoading) {
    return <Skeleton />;
  }
  if (cartDataLoadingError) {
    return <Error statusCode={500} />;
  }
  if (!cartData?.cart?.cartitemSet?.length) {
    return (
      <span>
        No items in cart. Please click <Link href={PATHS.PRODUCTS}>here </Link>{" "}
        to browse products
      </span>
    );
  }
  return (
    <>
      {cartData?.cart?.cartitemSet?.map((cartItem) => {
        return (
          <div key={cartItem?.id}>
            <Product product={cartItem?.product} />
            <p>Quantity: {cartItem?.quantity}</p>
            <p>
              Price: <Price price={cartItem?.totalPrice} />
            </p>
          </div>
        );
      })}
      <span>
        Total price: <Price price={cartData?.cart?.totalPrice} />
      </span>
      <Button onClick={handleOrderPlacement}>Place Order</Button>
    </>
  );
}
