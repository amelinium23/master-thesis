import { z } from "zod";

import { ServerSchema } from "./schema";

export type ServerFormValues = z.infer<typeof ServerSchema>;
