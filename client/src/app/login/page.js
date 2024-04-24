"use client";

import React from "react";
import { Button, Form, Input, message } from "antd";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "@/graphql/mutations";
import {
  AUTH_TOKEN_KEY,
  CHECK_FORM_FIELDS_ERR_MSG,
  PATHS,
  SOMETHING_WENT_WRONG_ERR_MSG,
} from "@/app-constants";
import { redirect } from "next/navigation";

const Login = () => {
  const [login] = useMutation(LOGIN_MUTATION);

  const onFinish = async (values) => {
    try {
      const {
        data: { login: loginResponseData },
      } = await login({ variables: values });
      if (loginResponseData?.ok) {
        localStorage.setItem(AUTH_TOKEN_KEY, loginResponseData?.token);
        redirect(PATHS.PRODUCTS);
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
    <Form
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="email"
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
  );
};
export default Login;
