import Prompt from "@models/prompts.model";
import { connectDB } from "@utils/database";

export const GET = async (
  reqeust: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response("Prompt Not Found", { status: 404 });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log("CreatePost", error);
    return new Response("Failed to Fetch Prompt", { status: 500 });
  }
};
export const PATCH = async (
  reqeust: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { prompt, tag } = await reqeust.json();
    await connectDB();
    const existingPrompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response("Prompt Not Found", { status: 404 });
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    console.log("CreatePost", error);
    return new Response("Failed to Update Prompt", { status: 500 });
  }
};
export const DELETE = async (
  reqeust: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    const prompt = await Prompt.findByIdAndRemove(params.id);

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log("CreatePost", error);
    return new Response("Failed to Delete Prompt", { status: 500 });
  }
};
