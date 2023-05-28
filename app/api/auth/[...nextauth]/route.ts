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
    async signIn({ profile, account, user, email }) {
      try {
        console.log({ profile, account, user, email });
        console.log("here in signin");
        return true;
      } catch (error) {
        console.log("Error checking if user exists: ");
        return false;
      }
    },
    async session({ session }) {
      return session;
    },
  },
});
export { handler as GET, handler as POST };
