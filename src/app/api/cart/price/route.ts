import { priceCart } from "@/features/cart/price-cart";
import { cartPriceRequestSchema } from "@/schemas/cart";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Pedido inválido" }, { status: 400 });
  }

  const parsed = cartPriceRequestSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json({ error: "Pedido inválido" }, { status: 400 });
  }

  const cart = await priceCart(parsed.data.items);

  return Response.json(cart);
}