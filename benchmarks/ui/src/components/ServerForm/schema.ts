import { z } from "zod";

export const ServerSchema = z.object({
  numberOfRequests: z.string(),
  numberOfConnections: z.string()
});
