import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { id: idToAdd } = z.object({ id: z.string() }).parse(body);
    const session = await getServerSession(authOptions);

    if (!session) return new Response("Unauthorized", { status: 401 });

    //both usersare not already friends
    const isAlreadyFriends = await fetchRedis(
      "sismember",
      `user:${session.user.id}friends`
    );

    if (isAlreadyFriends)
      return new Response("Already friends", { status: 400 });

    const hasFriendRequest = await fetchRedis(
      "sismember",
      `user:${session.user.id}incoming_friend_requests`,
      idToAdd
    );

    if (!hasFriendRequest)
      return new Response("No friend request found", { status: 400 });

    await db.sadd(`user:${session.user.id}:friends`, idToAdd);
    await db.sadd(`user:${idToAdd}:friends`, session.user.id);
    await db.srem(`user:${session.user.id}:incoming_friend_requests`, idToAdd);

    return new Response("OK", { status: 200 });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return new Response("Invalide request payload", { status: 422 });
    }

    return new Response("Internal request", { status: 400 });
  }
}
