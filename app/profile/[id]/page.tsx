"use client";
import React, { useEffect, useState } from "react";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { IPrompt } from "@customTypes/prompt";
import { useRouter, useSearchParams } from "next/navigation";

const ProfilePage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [posts, setPosts] = useState<IPrompt[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = (await response.json()) as IPrompt[];
      setPosts(data);
    };
    session?.user.id && fetchPosts();
  }, [session]);
  return (
    <Profile
      name={userName as string}
      desc={`${userName} Profile Page`}
      posts={posts}
    />
  );
};

export default ProfilePage;
