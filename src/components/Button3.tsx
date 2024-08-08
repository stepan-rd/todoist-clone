import { useAppColors } from "@/state/appColorsStore";
import React, { Children, useState } from "react";

type Props = {
  onClick?: () => void;
  children: React.ReactNode;
};

export function Button3({onClick, children}: Props) {

  const {appColors} = useAppColors();

  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      className="flex items-center w-full p-1 mt-2 transition-all rounded-lg"
      style={{
        backgroundColor: isHovered
          ? appColors.activeElementBgColor
          : appColors.secondaryBgColor,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
}
