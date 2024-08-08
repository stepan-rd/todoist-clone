import { useAppColors } from "@/state/appColorsStore";
import React, { useState } from "react";

type Props = {
  flagSvg: React.ReactNode;
  text: string;
  handleChoiceClick: (...args: any[]) => void;
};

export default function PriorityChoice({
  flagSvg,
  text,
  handleChoiceClick
}: Props) {
  const { appColors } = useAppColors();

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex items-center px-3 py-1 pr-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleChoiceClick}
      style={{
        backgroundColor: isHovered
          ? appColors.hoverElementBgColor
          : appColors.mainBgColor,
      }}
    >
      {flagSvg}
      <h1 className="ml-2 text-sm">{text}</h1>
    </div>
  );
}
