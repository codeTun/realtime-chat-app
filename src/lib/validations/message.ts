import { z } from "zod";

export const messageSchema = z.object({
  id: z.string(),
  senderId: z.string(),
  text: z.string(),
  timeStamp: z.number(),
});

export const messageArrayValidation = z.array(messageSchema);

export type Message = z.infer<typeof messageSchema>;