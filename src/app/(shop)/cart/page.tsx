import { CartView } from "@/components/cart/cart-view";

export default function CartPage() {
  return (
    <div className="page-container py-8">
      <h1 className="font-display text-4xl">Tu carrito</h1>
      <div className="mt-6">
        <CartView />
      </div>
    </div>
  );
}