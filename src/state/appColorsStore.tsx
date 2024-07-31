import { create } from "zustand";

type AppColorsType = {
  mainBgColor: string;
  secondaryBgColor: string;
  iconicColor: string;
  textColor: string;
  secondaryTextColor: string;
  tooltipsBgColor: string;
  tooltipsTextColor: string;
  hoverElementBgColor: string;
  activeElementBgColor: string;
};

interface AppColorsStoreType {
  appColors: AppColorsType;
  setAppColors: (val: AppColorsType) => void;
}
export const useAppColors = create<AppColorsStoreType>((set) => ({
  appColors: {
    mainBgColor: "#FFFFFF",
    secondaryBgColor: "#FAFAFA",
    iconicColor: "#E44332",
    textColor: "#2D2D2D ",
    secondaryTextColor: "#767676 ",
    tooltipsBgColor: "#333333 ",
    tooltipsTextColor: "#FFFFFF ",
    hoverElementBgColor: "#F5F5F5 ",
    activeElementBgColor: "#EDEDED ",
  },
  setAppColors: (val) => set((state) => ({ appColors: val })),
}));
