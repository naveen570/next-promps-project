import { IPost } from "@app/create-prompt/page";
import Prompt from "@models/prompts.model";
import { connectDB } from "@utils/database";
import { NextApiRequest } from "next";

export const GET = async (
  request: NextApiRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log("CreatePost", error);
    return new Response("Failed to Fetch Prompts", { status: 500 });
  }
};
