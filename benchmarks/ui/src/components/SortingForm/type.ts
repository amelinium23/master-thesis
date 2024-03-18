import { z } from "zod";

import { SortingSchema } from "./schema";

export type SortingFormValues = z.infer<typeof SortingSchema>;
