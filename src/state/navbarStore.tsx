import { create } from "zustand";

type NavbarStoreType = {
  navbarWidth: number;
  setNavbarWidth: (val: number) => void;
};
export const useNavbarStore = create<NavbarStoreType>((set) => ({
  navbarWidth: 240,
  setNavbarWidth: (val) => set((state) => ({ navbarWidth: val })),
}));
