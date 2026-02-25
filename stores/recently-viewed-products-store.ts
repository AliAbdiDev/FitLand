import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type RecentlyViewedProductsState = {
  productIds: string[];
  addViewedProduct: (productId: string) => void;
  clearViewedProducts: () => void;
};

const MAX_RECENTLY_VIEWED_PRODUCTS = 10;

export const useRecentlyViewedProductsStore = create<RecentlyViewedProductsState>()(
  persist(
    (set) => ({
      productIds: [],
      addViewedProduct: (productId) =>
        set((state) => {
          const normalizedId = String(productId || "").trim();
          if (!normalizedId) {
            return state;
          }

          const nextIds = [
            normalizedId,
            ...state.productIds.filter((id) => id !== normalizedId),
          ].slice(0, MAX_RECENTLY_VIEWED_PRODUCTS);

          return { productIds: nextIds };
        }),
      clearViewedProducts: () => set({ productIds: [] }),
    }),
    {
      name: "recently-viewed-products",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ productIds: state.productIds }),
    }
  )
);
