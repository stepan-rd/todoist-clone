import { useAppColors } from "@/state/appColorsStore";
import PriorityChoice from "./PriorityChoice";
import { OverlayInvisible } from "@/components/OverlayInvisible";

const choices = ["Priority 1", "Priority 2", "Priority 3"];

const flagSvgs = [
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    style={{ color: "rgb(209, 69, 59)" }}
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M4.223 4.584A.5.5 0 0 0 4 5v14.5a.5.5 0 0 0 1 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0 0 20 13V4.5a.5.5 0 0 0-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084Z"
      clipRule="evenodd"
    ></path>
  </svg>,
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    style={{ color: "rgb(235, 137, 9)" }}
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M4.223 4.584A.5.5 0 0 0 4 5v14.5a.5.5 0 0 0 1 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0 0 20 13V4.5a.5.5 0 0 0-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084Z"
      clipRule="evenodd"
    ></path>
  </svg>,
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    style={{ color: "rgb(36, 111, 224)" }}
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M4.223 4.584A.5.5 0 0 0 4 5v14.5a.5.5 0 0 0 1 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0 0 20 13V4.5a.5.5 0 0 0-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084Z"
      clipRule="evenodd"
    ></path>
  </svg>,
];

type Props = {
  className: string;
  handleChoiceClick: (...args: any[]) => void;
  overlayOnClick: () => void;
};

export default function PriorityDropdown({
  className,
  handleChoiceClick,
  overlayOnClick
}: Props) {
  const { appColors } = useAppColors();


  return (
    <>
      <OverlayInvisible onClick={overlayOnClick} />
      <div
        className={`rounded-lg shadow-md z-50 py-1 border hover:cursor-pointer ${className}`}
        style={{
          borderColor: appColors.borderColor,
          backgroundColor: appColors.mainBgColor,
        }}
      >
        {choices.map((choice, choiceIndex) => (
          <PriorityChoice
            handleChoiceClick={() => handleChoiceClick(choice, choiceIndex)}
            flagSvg={flagSvgs[choiceIndex]}
            text={choice}
          />
        ))}
      </div>
      
    </>
  );
}
