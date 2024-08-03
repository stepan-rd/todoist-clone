import { useAppColors } from "@/state/appColorsStore";
import React, { useState } from "react";

type Props = {
  svg: React.ReactNode;
  text: string;
  date: string;
  onClick: () => void;
};

export default function DatePresetChoice({ svg, text, date, onClick }: Props) {
  const { appColors } = useAppColors();

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`flex items-center px-3 py-1 hover:cursor-pointer`}
      style={{
        backgroundColor: isHovered
          ? appColors.hoverElementBgColor
          : appColors.mainBgColor,
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {svg}
      <div className="flex justify-between w-full">
        <h1 className="text-sm font-semibold">{text}</h1>
        <h1
          className=""
          style={{ color: appColors.secondaryTextColor, fontSize: "13px" }}
        >
          {date}
        </h1>
      </div>
    </div>
  );
}
