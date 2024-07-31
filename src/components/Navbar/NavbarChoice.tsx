import { useAppColors } from "@/state/appColorsStore";
import React, { useState } from "react";

type Props = {
  svg: React.ReactNode;
  text: string;
  isActive: boolean;
  className?: string;
  handleChoiceClick: () => void;
};

export function NavbarChoice({
  svg,
  text,
  isActive,
  className,
  handleChoiceClick,
}: Props) {
  const { appColors } = useAppColors();

  const [isHovered, setIsHovered] = useState(false);

  const divStyles: React.CSSProperties = {
    backgroundColor: isActive
      ? appColors.activeElementBgColor
      : isHovered
        ? appColors.hoverElementBgColor
        : appColors.secondaryBgColor,
    
    color: isActive ? appColors.activeTextColor : appColors.textColor
  };

  return (
    <div
      className={`flex hover:cursor-pointer items-center py-2 rounded-lg ${className}`}
      style={divStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleChoiceClick}
    >
      {svg} <h1 className="ml-1 text-sm">{text}</h1>
    </div>
  );
}
