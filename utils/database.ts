import mongoose from "mongoose";
const isConnected = false;
export const connectDB = async () => {
  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "share_prompt",
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
