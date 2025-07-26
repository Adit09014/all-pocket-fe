import { create } from "zustand";
import { persist } from "zustand/middleware";

let appStore = (set) => ({
  dopen: true,
  rows: [],
  setRows: (rows) => set(() => ({ rows })),
  updateDopen: (dopen) => set(() => ({ dopen })),
});

appStore = persist(appStore, { name: "cdot_store_api" });

export const useAppStore = create(appStore);
