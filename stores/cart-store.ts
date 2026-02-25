import { create } from "zustand";

export type CartItem = {
  id: string;
  title: string;
  model: string;
  color: string;
  warranty: string;
  price: number;
  originalPrice: number;
  quantity: number;
  image:string
};

type CartStore = {
  items: CartItem[];
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  resetCart: () => void;
};

const seedItems: CartItem[] = [
  {
    id: "anker-r50i-a3949",
    title: "هدفون بلوتوثی انکر مدل SoundCore R50i A3949",
    model: "SoundCore R50i A3949",
    color: "#fff",
    warranty: "گارانتی 18 ماهه شرکتی",
    price: 1_800_000,
    originalPrice: 2_477_000,
    quantity: 1,
    image:'/image/Rectangle 1166(1).png'
  },
  {
    id: "anker-r50i-8787",
    title: "هدفون بلوتوثی انکر مدل SoundCore R50i A3949",
    model: "SoundCore R50i A3949",
    color: "#fff",
    warranty: "گارانتی 18 ماهه شرکتی",
    price: 1_800_000,
    originalPrice: 2_477_000,
    quantity: 1,
    image:'/image/Rectangle 1166(1).png'
  },
];

const createInitialItems = () => seedItems.map((item) => ({ ...item }));

export const useCartStore = create<CartStore>((set) => ({
  items: createInitialItems(),
  increaseQuantity: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),
  decreaseQuantity: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    })),
  removeFromCart: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  resetCart: () =>
    set({
      items: createInitialItems(),
    }),
}));

