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
  iconicColorHover: string;
  secondaryColorHover: string;
  borderColorFocused: string;
  disabledButtonBg: string;
  lowPriorityColor: string,
  mediumPriorityColor: string,
  highPriorityColor: string,
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
    iconicColorHover: "#d4493b",
    secondaryColorHover: "#e0e0e0",
    borderColorFocused: "#b5b3b3",
    disabledButtonBg: "#eda59e",
    lowPriorityColor: "#246fe0",
    mediumPriorityColor: "#eb8909",
    highPriorityColor: "#d1453b"
  },
  setAppColors: (val) => set((state) => ({ appColors: val })),
}));
