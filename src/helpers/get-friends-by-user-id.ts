import { fetchRedis } from "./redis";

export const getFriendsByUserId = async (userId: string) => {
  const friendId = (await fetchRedis(
    "smembers",
    `user:${userId}:friends`
  )) as string[];
  const friends = await Promise.all(
    friendId.map(async (id) => {
      const friend = (await fetchRedis("get", `user:${id}`)) as string;
      const parsedFriend = JSON.parse(friend);
      return parsedFriend;
    })
  );

  return friends;
};
