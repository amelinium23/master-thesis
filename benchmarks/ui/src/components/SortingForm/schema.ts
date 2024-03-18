import { z } from "zod";

import { sortingOptions } from "../../constants/options";

export const SortingSchema = z.object({
  numberOfIterations: z.number().min(1),
  sizeOfArray: z.number().min(2),
  sortingType: z.object({ value: z.string(), label: z.string() }).default(sortingOptions[0])
});
