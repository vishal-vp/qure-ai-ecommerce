"use client";

import { PATHS } from "@/app-constants";
import { REGISTER_MUTATION } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import { Button, Col, Form, Input, Row, Typography, message } from "antd";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";

export default function RegisterPage() {
  const [register, { loading: registerMutationLoading }] =
    useMutation(REGISTER_MUTATION);
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      const {
        data: { register: registerResponseData },
      } = await register({ variables: values });
      if (registerResponseData?.ok) {
        message.success(
          "Successfully registered. Please login to the application using your credentials."
        );
        router.push(PATHS.LOGIN);
      } else {
        message.error(
          registerResponseData?.errorMessage || SOMETHING_WENT_WRONG_ERR_MSG
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
    <Row className={styles.registerContainer}>
      <Col span={16} offset={8}>
        <Typography.Title level={3}>Register</Typography.Title>
        <Form
          layout="vertical"
          labelCol={{
            span: 8,
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
              offset: 6,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
