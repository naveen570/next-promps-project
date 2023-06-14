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
export const DELETE = async (
  reqeust: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    const prompts = await Prompt.deleteOne({ _id: params.id });
    console.log(prompts.deletedCount);
    return new Response(
      JSON.stringify({ deletedCount: prompts.deletedCount }),
      { status: 200 }
    );
  } catch (error) {
    console.log("CreatePost", error);
    return new Response("Failed to Delete Prompt", { status: 500 });
  }
};
