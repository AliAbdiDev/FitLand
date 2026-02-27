import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type LastVisitedPageState = {
  lastPath: string;
  setLastPath: (path: string) => void;
};

export const useLastVisitedPageStore = create<LastVisitedPageState>()(
  persist(
    (set) => ({
      lastPath: "/",
      setLastPath: (path) => set({ lastPath: path }),
    }),
    {
      name: "last-visited-page",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
