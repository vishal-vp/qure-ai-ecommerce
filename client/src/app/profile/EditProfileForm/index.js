import {
  CHECK_FORM_FIELDS_ERR_MSG,
  SOMETHING_WENT_WRONG_ERR_MSG,
} from "@/app-constants";
import { UPDATE_PROFILE_MUTATION } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import { Button, Form, Input, InputNumber, Spin, message } from "antd";

function isValidTenDigitNumber(str) {
  // Check if the string contains only digits and has a length of 10
  return /^\d{10}$/.test(str);
}

export default function EditProfileForm({ user, onProfileSave }) {
  const [updateProfile, { loading: updateProfileLoading }] = useMutation(
    UPDATE_PROFILE_MUTATION
  );

  async function onFinish(values) {
    try {
      const {
        data: { updateProfile: updateProfileMutationResponse },
      } = await updateProfile({ variables: { userProfile: values } });
      if (updateProfileMutationResponse?.ok) {
        message.success("Profile updated successfully!");
        onProfileSave();
      } else {
        message.error(
          updateProfileMutationResponse?.errorMessage ||
            SOMETHING_WENT_WRONG_ERR_MSG
        );
      }
    } catch {
      message.error(SOMETHING_WENT_WRONG_ERR_MSG);
    }
  }
  function onFinishFailed() {
    message.error(CHECK_FORM_FIELDS_ERR_MSG);
  }

  return (
    <Spin spinning={updateProfileLoading}>
      <Form
        initialValues={{
          mobileNumber: user?.userprofile?.mobileNumber,
          address: user?.userprofile?.address,
        }}
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
          label="Mobile Number"
          name="mobileNumber"
          rules={[
            {
              validator: async (_, value) => {
                if (!isValidTenDigitNumber(value)) {
                  throw new Error("Please enter a valid 10 digit number.");
                }
              },
            },
          ]}
        >
          <Input style={{ width: "100%" }} maxLength={10} minLength={10} />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <Input />
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
    </Spin>
  );
}
