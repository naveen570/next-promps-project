import { ICreatePost } from "@app/create-prompt/page";
import Prompt from "@models/prompts.model";
import { connectDB } from "@utils/database";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const createPromptRequest: ICreatePost =
    (await req.json()) satisfies ICreatePost;
  try {
    await connectDB();
    const newPost = await Prompt.create(createPromptRequest);
    await newPost.save();
    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    console.log("CreatePost", error);
    return new Response("Failed to Create Prompt", { status: 500 });
  }
};
