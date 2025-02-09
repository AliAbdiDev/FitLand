import { configureStore } from "@reduxjs/toolkit";
import { shopFilters } from "./shop-filters-slice";
import productDetailSelection from "./productDetailSelectionSlice";

export const store = configureStore({
  reducer: {
    shopFilters: shopFilters.reducer,
    productDetailSelection: productDetailSelection.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
