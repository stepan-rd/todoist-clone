import { useAddTaskStore } from "@/state/addTaskStore";
import { useAppColors } from "@/state/appColorsStore";

type Props = {
  className?: string;
  isHovered: boolean;
};

export function DueDateBtnSvg({ className, isHovered }: Props) {
  const { appColors } = useAppColors();

  const { dueDateBtnTextColor } = useAddTaskStore();

  function getButtonTextColor() {
    if (dueDateBtnTextColor !== "") return dueDateBtnTextColor

    if (isHovered) return appColors.textColor

    return appColors.secondaryTextColor
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      className={`${className}`}
      style={{
        color: getButtonTextColor()
      }}
    >
      <path
        fill="currentColor"
        d="M12 2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8zm0 1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1.25 7a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm.75-5a.5.5 0 1 1 0 1h-7a.5.5 0 0 1 0-1h7z"
      ></path>
    </svg>
  );
}
