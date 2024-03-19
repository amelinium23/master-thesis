import { z } from "zod";

export const Base64Schema = z.object({
  numberOfIterations: z.string()
});
