import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ProfileImageState = {
  imageDataUrl: string | null;
  setImageDataUrl: (url: string | null) => void;
  clearImage: () => void;
};

const indexedDBStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return new Promise((resolve) => {
      const request = indexedDB.open("fitland-db", 1);
      
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains("storage")) {
          db.createObjectStore("storage");
        }
      };
      
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction("storage", "readonly");
        const store = transaction.objectStore("storage");
        const getRequest = store.get(name);
        
        getRequest.onsuccess = () => {
          resolve(getRequest.result ? String(getRequest.result) : null);
        };
        
        getRequest.onerror = () => {
          resolve(null);
        };
      };
      
      request.onerror = () => {
        resolve(null);
      };
    });
  },
  
  setItem: async (name: string, value: string) => {
    return new Promise<void>((resolve) => {
      const request = indexedDB.open("fitland-db", 1);
      
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains("storage")) {
          db.createObjectStore("storage");
        }
      };
      
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction("storage", "readwrite");
        const store = transaction.objectStore("storage");
        store.put(value, name);
        
        transaction.oncomplete = () => {
          resolve();
        };
      };
      
      request.onerror = () => {
        resolve();
      };
    });
  },
  
  removeItem: async (name: string) => {
    return new Promise<void>((resolve) => {
      const request = indexedDB.open("fitland-db", 1);
      
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction("storage", "readwrite");
        const store = transaction.objectStore("storage");
        store.delete(name);
        
        transaction.oncomplete = () => {
          resolve();
        };
      };
      
      request.onerror = () => {
        resolve();
      };
    });
  },
};

export const useProfileImageStore = create<ProfileImageState>()(
  persist(
    (set) => ({
      imageDataUrl: null,
      setImageDataUrl: (url) => set({ imageDataUrl: url }),
      clearImage: () => set({ imageDataUrl: null }),
    }),
    {
      name: "profile-image",
      storage: createJSONStorage(() => indexedDBStorage),
    }
  )
);
