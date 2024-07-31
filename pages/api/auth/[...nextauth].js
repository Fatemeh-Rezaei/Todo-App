import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { verifyPassword } from "@/utils/auth";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;

        try {
          await connectDB();
        } catch (error) {
          throw new Error("Error in connecting to DB!");
        }

        if (!email || !password) throw new Error("Invalid Data");

        const user = await User.findOne({ email });

        if (!user) throw new Error("User doesn't exist");

        const isValid = await verifyPassword(password, user.password);

        if (!isValid) throw new Error("Username or Password is incorrect");

        return { email };
      },
    }),
  ],
};

export default NextAuth(authOptions);
