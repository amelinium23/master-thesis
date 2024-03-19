import { z } from "zod";

import { Base64Schema } from "./schema";

export type Base64FormValues = z.infer<typeof Base64Schema>;
