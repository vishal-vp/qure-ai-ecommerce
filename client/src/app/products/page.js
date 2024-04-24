"use client";

import { SOMETHING_WENT_WRONG_ERR_MSG } from "@/app-constants";
import { UPDATE_CART_MUTATION } from "@/graphql/mutations";
import { CART_QUERY, PRODUCTS_QUERY } from "@/graphql/queries";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import { Card, Col, Row, Skeleton, Spin, Typography, message } from "antd";
import Error from "next/error";

import styles from "./page.module.css";

const { Meta } = Card;

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
        message.success(
          `Item ${shouldAdd ? "added to" : "removed from"} cart successfully!`
        );
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
      <Row gutter={16} className={styles.productContainer}>
        {productsData?.products?.map((product) => {
          const numberOfProductsInCart = getNumberOfProductsInCart(
            product?.id,
            cartData?.cart
          );
          return (
            <Col span={6} key={product?.id}>
              <Card
                hoverable
                cover={
                  <div
                    style={{
                      height: "18rem",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      style={{
                        height: "100%",
                        position: "absolute",
                        top: "-9999px",
                        bottom: "-9999px",
                        left: "-9999px",
                        right: "-9999px",
                        margin: "auto",
                      }}
                      alt={product.title}
                      src={product?.imageUrl}
                    />
                  </div>
                }
                className={styles.productCard}
              >
                <Meta
                  title={product?.name}
                  description={
                    <Typography.Paragraph
                      ellipsis={{ rows: 2, expandable: "collapsible" }}
                    >
                      {product?.description}
                    </Typography.Paragraph>
                  }
                />
                <div className={styles.addRemoveCart}>
                  <MinusCircleOutlined
                    onClick={() => {
                      if (numberOfProductsInCart > 0) {
                        handleAddToCart({
                          productId: product?.id,
                          shouldAdd: false,
                        });
                      }
                    }}
                    title="Remove from cart"
                  />
                  <span>{numberOfProductsInCart}</span>
                  <PlusCircleOutlined
                    onClick={() =>
                      handleAddToCart({
                        productId: product?.id,
                        shouldAdd: true,
                      })
                    }
                    title="Add to cart"
                  />
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Spin>
  );
}
