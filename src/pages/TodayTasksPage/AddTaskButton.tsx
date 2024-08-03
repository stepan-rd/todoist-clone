import { useAppColors } from "@/state/appColorsStore";
import React, { SetStateAction, useState } from "react";

type Props = {
  setAddingTask: React.Dispatch<SetStateAction<boolean>>;
};

export function AddTaskButton({ setAddingTask }: Props) {
  const { appColors } = useAppColors();

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="flex items-center mt-5 hover:cursor-pointer"
      onClick={() => setAddingTask(true)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="mr-2 rounded-full" // Add padding here
        style={{
          padding: "3px",
          background: isHovering
            ? appColors.iconicColor
            : appColors.mainBgColor,
        }}
      >
        <svg
          className=""
          width="13"
          height="13"
          style={{
            color: isHovering
              ? appColors.tooltipsTextColor
              : appColors.iconicColor,
          }}
          fill="currentColor"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z"
          ></path>
        </svg>
      </div>
      <h1
        className="text-sm"
        style={{
          color: isHovering
            ? appColors.iconicColor
            : appColors.secondaryTextColor,
        }}
      >
        Add task
      </h1>
    </div>
  );
}
