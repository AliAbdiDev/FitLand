import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AddressData = {
  provinceId?: number;
  provinceName?: string;
  cityId?: number;
  cityName?: string;
  address?: string;
};

type LastAddressState = {
  lastAddress: AddressData | null;
  setLastAddress: (address: AddressData) => void;
  clearLastAddress: () => void;
};

export const useLastAddressStore = create<LastAddressState>()(
  persist(
    (set) => ({
      lastAddress: null,
      setLastAddress: (address) => set({ lastAddress: address }),
      clearLastAddress: () => set({ lastAddress: null }),
    }),
    {
      name: "last-saved-address",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
