import { create } from "zustand";

type ProductDetailSelectionState = {
  selectedSize: string;
  selectedColor: string;
};

type ProductDetailSelectionStore = ProductDetailSelectionState & {
  sizeProductSelector: (payload: { selectedSize: string }) => void;
  colorProductSelector: (payload: { selectedColor: string }) => void;
  resetProductDetailSelection: () => void;
};

const createInitialState = (): ProductDetailSelectionState => ({
  selectedSize: "",
  selectedColor: "",
});

export const useProductDetailSelectionStore =
  create<ProductDetailSelectionStore>((set) => ({
    ...createInitialState(),
    sizeProductSelector: (payload) =>
      set({
        selectedSize: payload.selectedSize,
      }),
    colorProductSelector: (payload) =>
      set({
        selectedColor: payload.selectedColor,
      }),
    resetProductDetailSelection: () => set(createInitialState()),
  }));

