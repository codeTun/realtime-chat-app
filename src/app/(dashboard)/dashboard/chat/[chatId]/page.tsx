import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { messageArrayValidation } from "@/lib/validations/message";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { FC } from "react";

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

async function getChatMessages(chatId: string) {
  try {
    const result: string[] = await fetchRedis(
      "zrange",
      `chat:${chatId}`,
      0,
      -1
    );
    const dbMessages = result.map((message) => JSON.parse(message) as Message);

    const reversedDbMessages = dbMessages.reverse();

    const messages = messageArrayValidation.parse(reversedDbMessages);

    return messages;
  } catch (err) {
    notFound();
    console.error(err);
  }
}
const page: FC<ChatPageProps> = async ({ params }: ChatPageProps) => {
  const { chatId } = params;
  const session = await getServerSession(authOptions);
  if (!session) {
    notFound();
  }
  const { user } = session;

  const [userId1, userId2] = chatId.split("--");

  if (userId1 !== user.id && userId2 !== user.id) {
    notFound();
  }

  const chatPartnerId = userId1 === user.id ? userId2 : userId1;
  const chatPartner = (await db.get(`user:${chatPartnerId}`)) as User;
  const initialMessages = await getChatMessages(chatId);
  return (
    <div>
      <h1>{params.chatId}</h1>
    </div>
  );
};
export default page;
