"use client";
import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
export interface IPost {
  prompt: string;
  tag: string;
}
export interface ICreatePost {
  creator: string;
  prompt: string;
  tag: string;
}
const CreatePrompt = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<IPost>({ prompt: "", tag: "" });

  const { data: session } = useSession();
  async function createPost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const createRequest: ICreatePost = {
        creator: session?.user?.id as string,
        prompt: post.prompt,
        tag: post.tag,
      };
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify(createRequest),
        headers: {},
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <Form
      handleSubmit={createPost}
      post={post}
      setPost={setPost}
      submitting={submitting}
      type='Create'
    />
  );
};

export default CreatePrompt;
