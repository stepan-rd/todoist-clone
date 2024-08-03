import { useAddTaskStore } from "@/state/addTaskStore";
import { useAppColors } from "@/state/appColorsStore";
import React, { useState } from "react";

type Props = {
  flagSvg: React.ReactNode;
  flagSmaller: React.ReactNode;
  text: string;
};

export default function PriorityChoice({ flagSvg, flagSmaller, text }: Props) {

  const {appColors} = useAppColors();

  const { setPriorityBtnValue, setPriorityBtnSvg, setPriorityDropdownVisible } = useAddTaskStore();

  const [isHovered, setIsHovered] = useState(false);

  function handleClick() {
    setPriorityBtnValue(`${text[0]}${text[text.length - 1]}`);
    setPriorityBtnSvg(flagSmaller)
    setPriorityDropdownVisible(false)
  }

  return (
    <div
      className="flex items-center px-3 py-1 pr-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{backgroundColor: isHovered ? appColors.hoverElementBgColor : appColors.mainBgColor}}
    >
      {flagSvg}
      <h1 className="ml-2 text-sm">{text}</h1>
    </div>
  );
}
