import { z } from "zod";

export const addFriendSchema = z.object({
  email: z.string().email(),
});
