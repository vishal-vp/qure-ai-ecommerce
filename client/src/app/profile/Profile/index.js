import { Button } from "antd";

export default function Profile({ user, onEditProfileClick }) {
  return (
    <div>
      <p>Email: {user?.email}</p>
      <p>Mobile Number: {user?.userprofile?.mobileNumber}</p>
      <p>Address: {user?.userprofile?.address}</p>
      <Button onClick={onEditProfileClick}>Edit</Button>
    </div>
  );
}
