import { z } from "zod";

import { sortingOptions } from "../../constants/options";

export const SortingSchema = z.object({
  numberOfIterations: z.string(),
  sizeOfArray: z.string(),
  sortingType: z.string().default(sortingOptions[0].value)
});
