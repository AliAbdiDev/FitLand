import { create } from "zustand";

export type ShopFiltersState = {
  range: number[];
  colorSelected: string;
  sizeSelected: string;
};

type RangeInputPayload = {
  minValue: number;
  maxValue: number;
};

type ColorPayload = {
  color: string;
};

type SizePayload = {
  size: string;
};

type ShopFiltersStore = ShopFiltersState & {
  rengeInput: (payload: RangeInputPayload) => void;
  colorSelector: (payload: ColorPayload) => void;
  sizeProduct: (payload: SizePayload) => void;
  resetFilters: () => void;
};

const createInitialState = (): ShopFiltersState => ({
  range: [5, 1240],
  colorSelected: "",
  sizeSelected: "",
});

export const initialShopFiltersState = createInitialState();

export const useShopFiltersStore = create<ShopFiltersStore>((set) => ({
  ...createInitialState(),
  rengeInput: (payload) =>
    set({
      range: [payload.maxValue, payload.minValue],
    }),
  colorSelector: (payload) =>
    set({
      colorSelected: payload.color,
    }),
  sizeProduct: (payload) =>
    set({
      sizeSelected: payload.size,
    }),
  resetFilters: () => set(createInitialState()),
}));

