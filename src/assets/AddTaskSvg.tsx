import { useAppColors } from "@/state/appColorsStore";

type Props = {};

export function AddTaskSvg({}: Props) {
  const { appColors } = useAppColors();

  return (
    <svg
      className="mr-2"
      style={{ color: appColors.iconicColor }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11Zm-.711-16.5a.75.75 0 1 1 1.5 0v4.789H17.5a.75.75 0 0 1 0 1.5h-4.711V17.5a.75.75 0 0 1-1.5 0V12.79H6.5a.75.75 0 1 1 0-1.5h4.789V6.5Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
