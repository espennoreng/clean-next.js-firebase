import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  userName: z.string().min(3).max(31),
});

export type User = z.infer<typeof userSchema>;
