import { z } from "zod";

const envSchema = z.object({
  PORT: z.string(),
  NODE_ENV: z.string(),
  MONGODB_URI: z.string(),
});

export const env = envSchema.parse(process.env);