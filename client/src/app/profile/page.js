"use client";

import { USER_QUERY } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { Skeleton } from "antd";
import Error from "next/error";
import Profile from "./Profile";
import { useState } from "react";
import EditProfileForm from "./EditProfileForm";

export default function ProfilePage() {
  const {
    data: userData,
    loading: userDataLoading,
    error: userDataLoadingError,
  } = useQuery(USER_QUERY);

  const [isEditProfileFormVisisble, setIsEditProfileFormVisible] =
    useState(false);

  if (userDataLoading) {
    return <Skeleton />;
  }
  if (userDataLoadingError) {
    return <Error statusCode={500} />;
  }

  if (isEditProfileFormVisisble) {
    return (
      <EditProfileForm
        user={userData?.user}
        onProfileSave={() => setIsEditProfileFormVisible(false)}
      />
    );
  } else {
    return (
      <Profile
        user={userData?.user}
        onEditProfileClick={() => setIsEditProfileFormVisible(true)}
      />
    );
  }
}
