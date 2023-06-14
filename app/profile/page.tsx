"use client";
import React, { useEffect, useState } from "react";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { IPrompt } from "@customTypes/prompt";
const ProfilePage = () => {
  const { data: session } = useSession();
  const handleEdit = () => {};
  const handleDelete = async (promptId: string) => {
    const response = await fetch(`/api/prompt/${promptId}/`, {
      method: "DELETE",
    });
    const data = await response.json();
  };
  const [posts, setPosts] = useState<IPrompt[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = (await response.json()) as IPrompt[];
      setPosts(data);
    };
    session?.user.id && fetchPosts();
  }, [session]);
  return (
    <Profile
      name={"My"}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      desc='My Profile Page'
      posts={posts}
    />
  );
};

export default ProfilePage;
