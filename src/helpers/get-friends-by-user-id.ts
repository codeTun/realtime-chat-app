import { fetchRedis } from "./redis";

export const getFriendsByUserId = async (userId: string) => {
  const friendId = (await fetchRedis(
    "smembers",
    `user:${userId}:friends`
  )) as string[];
  const friends = await Promise.all(
    friendId.map(async (id) => {
      return (await fetchRedis("get", `user:${id}`)) as User;
    })
  );

  return friends;
};
