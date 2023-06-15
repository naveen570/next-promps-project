"use client";
import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
export interface IPost {
  prompt: string;
  tag: string;
}
export interface ICreatePost {
  creator: string;
  prompt: string;
  tag: string;
}
const EditPrompt = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<IPost>({ prompt: "", tag: "" });
  const promptId = params.get("id");
  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const requestOptions = {
        method: "PATCH",
        body: JSON.stringify(post),
      };
      const response = await fetch(`/api/prompt/${promptId}`, requestOptions);
      if (response.ok) {
        router.push("/profile");
      }
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };
  useEffect(() => {
    if (!promptId) return;
    const getPrompt = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        if (response.ok) {
          const data = (await response.json()) as IPost;
          setPost(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPrompt();
  }, [promptId]);
  return (
    <Form
      handleSubmit={handleEdit}
      post={post}
      setPost={setPost}
      submitting={submitting}
      type='Edit'
    />
  );
};

export default EditPrompt;
