import { z } from "zod";
import { MAX_QUANTITY } from "@/lib/cart-limits";

export const cartLineInputSchema = z.object({
  kind: z.enum(["product", "combo"]),
  id: z.string().min(1).max(64),
  quantity: z.int().min(1).max(MAX_QUANTITY),
});

export const cartPriceRequestSchema = z.object({
  items: z.array(cartLineInputSchema).max(50),
});

export type CartLineInput = z.infer<typeof cartLineInputSchema>;