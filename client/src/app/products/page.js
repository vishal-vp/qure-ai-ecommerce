"use client";

import { SOMETHING_WENT_WRONG_ERR_MSG } from "@/app-constants";
import Product from "@/components/Product";
import { UPDATE_CART_MUTATION } from "@/graphql/mutations";
import { CART_QUERY, PRODUCTS_QUERY } from "@/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Skeleton, Spin, message } from "antd";
import Error from "next/error";

function getNumberOfProductsInCart(productId, cart) {
  return (
    cart?.cartitemSet?.find((cartItem) => {
      return cartItem?.product?.id === String(productId);
    })?.quantity || 0
  );
}

export default function Products() {
  const {
    data: productsData,
    loading: productsDataLoading,
    error: productsDataLoadingError,
  } = useQuery(PRODUCTS_QUERY);
  const {
    data: cartData,
    loading: cartDataLoading,
    error: cartDataLoadingError,
  } = useQuery(CART_QUERY);

  const [updateCart, { loading: updateCartLoading }] =
    useMutation(UPDATE_CART_MUTATION);

  async function handleAddToCart({ productId, shouldAdd }) {
    try {
      const {
        data: { updateCart: updateCartResponseData },
      } = await updateCart({
        variables: { productId, shouldAdd },
      });
      if (updateCartResponseData?.ok) {
        message.success("Item added to cart successfully!");
      } else {
        message.error(
          updateCartResponseData?.errorMessage || SOMETHING_WENT_WRONG_ERR_MSG
        );
      }
    } catch (err) {
      message.error(SOMETHING_WENT_WRONG_ERR_MSG);
    }
  }

  if (productsDataLoading || cartDataLoading) {
    return <Skeleton />;
  }
  if (productsDataLoadingError || cartDataLoadingError) {
    return <Error statusCode={500} />;
  }
  return (
    <Spin spinning={updateCartLoading}>
      {productsData?.products?.map((product) => {
        const numberOfProductsInCart = getNumberOfProductsInCart(
          product?.id,
          cartData?.cart
        );
        return (
          <div key={product?.id}>
            <Product product={product} />
            <Button
              onClick={() =>
                handleAddToCart({ productId: product?.id, shouldAdd: true })
              }
            >
              Add to cart
            </Button>
            <div>{numberOfProductsInCart}</div>
            <Button
              onClick={() =>
                handleAddToCart({ productId: product?.id, shouldAdd: false })
              }
              disabled={numberOfProductsInCart === 0}
            >
              Remove from cart
            </Button>
          </div>
        );
      })}
    </Spin>
  );
}
