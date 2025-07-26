import {create} from 'zustand';

export const useAppStore = create((set) => ({
  debtRows: [],
  setDebtRows: (rows) => set({ debtRows: rows }),

  lentRows: [],
  setLentRows: (rows) => set({ lentRows: rows }),
}));
