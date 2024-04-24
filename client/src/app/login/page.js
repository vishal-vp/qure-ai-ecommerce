"use client";

import React from "react";
import { Button, Col, Form, Input, Row, Typography, message } from "antd";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "@/graphql/mutations";
import {
  AUTH_TOKEN_KEY,
  CHECK_FORM_FIELDS_ERR_MSG,
  PATHS,
  SOMETHING_WENT_WRONG_ERR_MSG,
} from "@/app-constants";
import { useRouter } from "next/navigation";
import Link from "next/link";

import styles from "./page.module.css";

const Login = () => {
  const [login] = useMutation(LOGIN_MUTATION);
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      const {
        data: { login: loginResponseData },
      } = await login({ variables: values });
      if (loginResponseData?.ok) {
        localStorage.setItem(AUTH_TOKEN_KEY, loginResponseData?.token);
        router.push(PATHS.PRODUCTS);
      } else {
        message.error(
          loginResponseData?.errorMessage || SOMETHING_WENT_WRONG_ERR_MSG
        );
      }
    } catch (err) {
      message.error(SOMETHING_WENT_WRONG_ERR_MSG);
      console.log(err);
    }
  };
  const onFinishFailed = () => {
    message.error(CHECK_FORM_FIELDS_ERR_MSG);
  };

  return (
    <Row className={styles.loginContainer}>
      <Col span={16} offset={8}>
        <Typography.Title level={3}>Login</Typography.Title>
        <Form
          layout="vertical"
          labelCol={{
            span: 16,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Typography.Text>
          {"Don't have an account? Click "}
          <Link href={PATHS.REGISTER}>here</Link>
          {" to register."}
        </Typography.Text>
      </Col>
    </Row>
  );
};
export default Login;
