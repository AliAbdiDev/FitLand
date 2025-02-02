import { configureStore } from "@reduxjs/toolkit";
import { shopFilters } from "./shop-filters-slice";

export const store = configureStore({
  reducer: {
    shopFilters: shopFilters.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
