import { z } from "zod";

import { FilesSchema } from "./schema";

export type FilesFormValues = z.infer<typeof FilesSchema>;
