import { ArrowDownSvg } from "@/assets/ArrowDownSvg";
import { ArrowUpSvg } from "@/assets/ArrowUpSvg";
import { Xsvg } from "@/assets/Xsvg";
import { useAppColors } from "@/state/appColorsStore";
import { useEditTaskPopupStore } from "@/state/editTaskPopupStore";

type Props = {
  setEditTaskPopupVisible: (
    val: boolean | ((prev: boolean) => boolean)
  ) => void;
};

export function TopBar({ setEditTaskPopupVisible }: Props) {
  const { appColors } = useAppColors();

  const { handleArrowUpClick, handleArrowDownClick } = useEditTaskPopupStore();

  return (
    <div className="relative flex items-center h-12 rounded-t-lg bg-inherit">
      <div className="absolute flex items-center right-4">
        <button className="mr-4" onClick={handleArrowUpClick}>
          <ArrowUpSvg color={appColors.textColor} />
        </button>
        <button className="mr-4" onClick={handleArrowDownClick}>
          <ArrowDownSvg color={appColors.textColor} />
        </button>
        <button onClick={() => setEditTaskPopupVisible(false)}>
          <Xsvg />
        </button>
      </div>
    </div>
  );
}
