import { Button, Descriptions } from "antd";

export default function Profile({ user, onEditProfileClick }) {
  return (
    <>
      <Descriptions
        title="Profile"
        items={[
          { key: 1, label: "Email", children: user?.email },
          {
            key: 2,
            label: "Mobile Number",
            children: user?.userprofile?.mobileNumber,
          },
          { key: 3, label: "Address", children: user?.userprofile?.address },
        ]}
      ></Descriptions>
      <Button onClick={onEditProfileClick}>Edit</Button>
    </>
  );
}
