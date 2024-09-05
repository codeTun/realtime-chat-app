import "next-auth/jwt";
import type { User as NextAuthUser } from "next-auth";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    name?: string;
    email?: string;
    image?: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: NextAuthUser & {
      id: UserId;
    };
  }
}
