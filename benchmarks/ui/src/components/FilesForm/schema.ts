import { z } from "zod";

export const FilesSchema = z.object({
  numberOfIterations: z.string(),
  numberOfParagraphs: z.string(),
  numberOfFiles: z.string(),
  shouldBeBunFiles: z.boolean()
});
