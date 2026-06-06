import { z } from "zod";

export const customerParamsSchema = z.object({
  params: z.object({
    customerId: z.string(),
  }),
});