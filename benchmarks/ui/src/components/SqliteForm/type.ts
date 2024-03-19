import { z } from "zod";

import { SqliteSchema } from "./schema";

export type SqliteFormValues = z.infer<typeof SqliteSchema>;
