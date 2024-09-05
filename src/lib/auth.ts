import { NextAuthOptions } from "next-auth";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { db } from "@/lib/db";
import GoogleProvider from "next-auth/providers/google";

function getGoogleCredentials() {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set");
  }
  return {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
}

export const authOptions: NextAuthOptions = {
  adapter: UpstashRedisAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
    //   console.log("JWT callback - token before:", token);
    //   console.log("JWT callback - user:", user);

      if (user) {
        const dbUser = (await db.get(`user:${user.id}`)) as User | null;
        // console.log("JWT callback - dbUser:", dbUser);

        if (!dbUser) {
          token.id = user.id;
        } else {
          token.id = dbUser.id;
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.image = dbUser.image;
        }
      }

      console.log("JWT callback - token after:", token);
      return token;
    },
    async session({ session, token }) {
      console.log("Session callback - token:", token);

      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
      }

      console.log("Session callback - session:", session);
      return session;
    },
    redirect() {
      return "/dashboard";
    },
  },
};
