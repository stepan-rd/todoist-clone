import { create } from "zustand";

type NavbarStoreType = {
  navbarHidden: boolean;
  setNavbarHidden: (val: boolean | ((prev: boolean) => boolean)) => void;

  navbarMdDevicesHidden: boolean;
  setNavbarMdDevicesHidden: (
    val: boolean | ((prev: boolean) => boolean)
  ) => void;

  showNavbarLgDevices: boolean;
  setShowNavbarLgDevices: (val: boolean) => void;
};
export const useNavbarStore = create<NavbarStoreType>((set) => ({
  navbarHidden: false,
  setNavbarHidden: (val) =>
    set((state) => ({
      navbarHidden: typeof val === "function" ? val(state.navbarHidden) : val,
    })),

  navbarMdDevicesHidden: true,
  setNavbarMdDevicesHidden: (val) =>
    set((state) => ({
      navbarMdDevicesHidden:
        typeof val === "function" ? val(state.navbarMdDevicesHidden) : val,
    })),

  showNavbarLgDevices: false,
  setShowNavbarLgDevices: (val) =>
    set((state) => ({ showNavbarLgDevices: val })),
}));
