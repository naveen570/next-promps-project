"use client";
import React, { useEffect, useState } from "react";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { IPrompt } from "@customTypes/prompt";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const handleEdit = (post: IPrompt) => {
    router.push(`update-prompt?id=${post._id}`);
  };
  const [posts, setPosts] = useState<IPrompt[]>([]);
  const handleDelete = async (promptId: string) => {
    const isDeleteConfirmed = confirm("Are you sure want to Delele");
    if (isDeleteConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${promptId}/`, {
          method: "DELETE",
        });
        const data = (await response.json()) as IPrompt;
        const filteredPosts: IPrompt[] = posts.filter(
          (x) => x._id !== data._id
        );
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

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
