import { useAppColors } from "@/state/appColorsStore";

const priorityColors = ["#d1453b", "#eb8909", "#246fe0"];

type Props = {
  priority?: number;
  className?: string;
  onClick: () => void;
};

export function RadioButton({ priority, className, onClick }: Props) {
  const { appColors } = useAppColors();

  const color = priorityColors[priority!]
  const backgroundColor = `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.2)`;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`rounded-full hover:cursor-pointer ${className}`}
      style={{
        backgroundColor: backgroundColor,
        borderColor: color,
        borderWidth: "2px",
        width: "18px",
        height: "18px",
      }}
    ></div>
  );
}
