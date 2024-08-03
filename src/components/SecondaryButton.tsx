import { useAppColors } from "@/state/appColorsStore";
import { useState } from "react";

type Props = {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  canClick: boolean
};

export function SecondaryButton({ className, onClick, children, canClick }: Props) {
  const { appColors } = useAppColors();

  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`px-2 py-1 rounded-md font-semibold text-sm ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ backgroundColor: isHovered ? appColors.secondaryColorHover : appColors.hoverElementBgColor, color: appColors.textColor }}
      disabled={!canClick}
    >
      {children}
    </button>
  );
}
