import { z } from "zod";

export const SqliteSchema = z.object({
  numberOfIterations: z.string(),
  numberOfRecords: z.string()
});
