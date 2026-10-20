import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItemKind = "product" | "combo";

export type CartItem = {
  kind: CartItemKind;
  id: string;
  quantity: number;
  note: string;
};

export const MAX_QUANTITY = 20;
export const MAX_NOTE_LENGTH = 140;

type CartState = {
  items: CartItem[];
  hasHydrated: boolean;
};

type CartActions = {
  addItem: (kind: CartItemKind, id: string) => void;
  setQuantity: (kind: CartItemKind, id: string, quantity: number) => void;
  setNote: (kind: CartItemKind, id: string, note: string) => void;
  removeItem: (kind: CartItemKind, id: string) => void;
  clear: () => void;
  setHasHydrated: (value: boolean) => void;
};

function isSameItem(item: CartItem, kind: CartItemKind, id: string) {
  return item.kind === kind && item.id === id;
}

export const useCartStore = create<CartState & CartActions>()(
  persist(
    (set) => ({
      items: [],
      hasHydrated: false,
      addItem: (kind, id) =>
        set((state) => {
          const exists = state.items.some((item) => isSameItem(item, kind, id));

          if (!exists) {
            return {
              items: [...state.items, { kind, id, quantity: 1, note: "" }],
            };
          }

          return {
            items: state.items.map((item) =>
              isSameItem(item, kind, id)
                ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY) }
                : item,
            ),
          };
        }),
      setQuantity: (kind, id, quantity) =>
        set((state) => ({
          items: state.items.flatMap((item) => {
            if (!isSameItem(item, kind, id)) {
              return [item];
            }
            if (quantity <= 0) {
              return [];
            }
            return [{ ...item, quantity: Math.min(quantity, MAX_QUANTITY) }];
          }),
        })),
      setNote: (kind, id, note) =>
        set((state) => ({
          items: state.items.map((item) =>
            isSameItem(item, kind, id)
              ? { ...item, note: note.slice(0, MAX_NOTE_LENGTH) }
              : item,
          ),
        })),
      removeItem: (kind, id) =>
        set((state) => ({
          items: state.items.filter((item) => !isSameItem(item, kind, id)),
        })),
      clear: () => set({ items: [] }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "palacio-cart",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      skipHydration: true,
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);