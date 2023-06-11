import User from "@models/user.model";
import { connectDB } from "@utils/database";
import NextAuth, { SessionOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY as string,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      try {
        await connectDB();
        const userExists = await User.findOne({ email: profile?.email });
        if (!userExists) {
          const createRequest = {
            email: profile?.email,
            userName: profile?.name?.replace(/ /g, "").toLowerCase(),
            image: profile?.image,
          };
          User.create(createRequest);
        }
        return true;
      } catch (error) {
        console.log("Error checking if user exists: ");
        return false;
      }
    },
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session?.user?.email,
      });
      session.user.id = sessionUser._id.toString();
      return session;
    },
  },
});
export { handler as GET, handler as POST };
