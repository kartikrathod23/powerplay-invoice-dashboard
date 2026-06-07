import { z } from "zod";
import dotenv from "dotenv";

dotenv.config({
  quiet: true,
});

const envSchema = z.object({
  PORT: z.string(),
  NODE_ENV: z.string(),
  MONGODB_URI: z.string(),
});

export const env = envSchema.parse(process.env);