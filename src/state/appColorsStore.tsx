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
  activeTextColor: string;
  iconsColor: string;
  borderColor: string;
};

interface AppColorsStoreType {
  appColors: AppColorsType;
  setAppColors: (val: AppColorsType) => void;
}
export const useAppColors = create<AppColorsStoreType>((set) => ({
  appColors: {
    mainBgColor: "#FFFFFF",
    secondaryBgColor: "#fcfaf8",
    iconicColor: "#E44332",
    textColor: "#2D2D2D",
    secondaryTextColor: "#767676",
    tooltipsBgColor: "#333333",
    tooltipsTextColor: "#FFFFFF",
    hoverElementBgColor: "#F5F5F5",
    activeElementBgColor: "#ffefe5",
    activeTextColor: "#A81F00",
    iconsColor: "#B0B0B0",
    borderColor: "#e6e6e6",
  },
  setAppColors: (val) => set((state) => ({ appColors: val })),
}));
