import { Overlay } from "@/components/Overlay";
import { useAppColors } from "@/state/appColorsStore";
import { TopBar } from "./TopBar";
import { MainSection } from "./MainSection";
import { SecondSection } from "./SecondSection";

type Props = {
  setEditTaskPopupVisible: (val: boolean | ((prev: boolean) => boolean)) => void
};

export function EditTaskPopup({setEditTaskPopupVisible
}: Props) {
  const { appColors } = useAppColors();

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen">
        <Overlay onClick={() => setEditTaskPopupVisible(false)} />
        <div
          className="z-50 flex flex-col w-full rounded-lg md:w-11/12"
          style={{
            backgroundColor: appColors.mainBgColor,
            maxWidth: "864px",
            height: "92%",
          }}
        >
          <TopBar
            setEditTaskPopupVisible={setEditTaskPopupVisible}
          />
          <hr style={{ borderColor: appColors.borderColor }} />
          <div className="flex flex-grow">
            <MainSection setEditTaskPopupVisible={setEditTaskPopupVisible} />
            <SecondSection />
          </div>
        </div>
      </div>
    </>
  );
}
