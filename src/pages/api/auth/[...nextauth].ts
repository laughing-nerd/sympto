import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { client } from "@/lib/mongodb";
import axios from "axios";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!
    })
  ],

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      // Check if user exists in the database
      const c = await client()
      const userRec = await c.db("sympto").collection("users").findOne({ email: user.email })
      await c.close()

      // If user does not exist then add the user
      if (!userRec) {
        axios.post("http://localhost:3000/api/user/post", {
          name: user.name,
          email: user.email,
          image: user.image,
          doctors: []
        })
      }
      return true
    },

  }
}

export default NextAuth(authOptions);
