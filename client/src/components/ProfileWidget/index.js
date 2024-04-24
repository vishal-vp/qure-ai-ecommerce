"use client";

import { PATHS } from "@/app-constants";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function ProfileWidget() {
  return (
    <Link title="Profile" href={PATHS.PROFILE}>
      <UserOutlined />{" "}
    </Link>
  );
}
