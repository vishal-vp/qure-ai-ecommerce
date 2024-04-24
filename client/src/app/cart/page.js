"use client";

import { PATHS, SOMETHING_WENT_WRONG_ERR_MSG } from "@/app-constants";
import Price from "@/components/Price";
import Product from "@/components/Product";
import { PLACE_ORDER_MUTATION } from "@/graphql/mutations";
import { CART_QUERY } from "@/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import {
  Avatar,
  Button,
  Card,
  List,
  Skeleton,
  Typography,
  message,
} from "antd";
import Error from "next/error";
import Link from "next/link";

import styles from "./page.module.css";

export default function CartDetails() {
  const {
    data: cartData,
    loading: cartDataLoading,
    error: cartDataLoadingError,
  } = useQuery(CART_QUERY);
  const [placeOrder, { loading: placeOrderLoading }] =
    useMutation(PLACE_ORDER_MUTATION);

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
      <Typography.Text>
        No items in cart. Please click <Link href={PATHS.PRODUCTS}>here </Link>{" "}
        to browse products
      </Typography.Text>
    );
  }
  return (
    <>
      <List
        itemLayout="horizontal"
        size="large"
        dataSource={cartData?.cart?.cartitemSet}
        renderItem={(cartItem) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={cartItem?.product?.imageUrl} />}
              title={cartItem?.product?.name}
              description={cartItem?.product?.description}
            />
            <span>
              Price: <Price price={cartItem?.totalPrice} />
            </span>
          </List.Item>
        )}
      ></List>
      <div className={styles.placeOrderContainer}>
        <Typography.Text>
          Total Price: <Price price={cartData?.cart?.totalPrice} />
        </Typography.Text>
        <Button onClick={handleOrderPlacement}>Place Order</Button>
      </div>
    </>
  );
}
