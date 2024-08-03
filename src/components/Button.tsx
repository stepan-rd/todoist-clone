import { useAppColors } from "@/state/appColorsStore";
import { useState } from "react";

type Props = {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  disabled: boolean;
};

export function Button({ className, onClick, children, disabled }: Props) {
  const { appColors } = useAppColors();

  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`px-2 py-1 rounded-md font-semibold text-sm ${disabled && "hover:cursor-not-allowed"} ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: disabled
          ? appColors.disabledButtonBg
          : isHovered
            ? appColors.iconicColorHover
            : appColors.iconicColor,
        color: appColors.tooltipsTextColor,
      }}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
