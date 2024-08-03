import { useAppColors } from "@/state/appColorsStore";
import React, { SetStateAction } from "react";

type Props = {
  isHovered: boolean;
  setIsHovered: React.Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  textColor: string;
};

export function Button1({
  isHovered,
  setIsHovered,
  children,
  className,
  onClick,
  textColor,
}: Props) {
  const { appColors } = useAppColors();

  return (
    <button
      className={`relative flex items-center py-1 border rounded-md ${className}`}
      style={{
        paddingLeft: "6px",
        paddingRight: "6px",
        backgroundColor: isHovered
          ? appColors.hoverElementBgColor
          : appColors.mainBgColor,

        borderColor: appColors.borderColor,
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h1 className="text-sm" style={{ color: textColor }}>
        {children}
      </h1>
    </button>
  );
}
