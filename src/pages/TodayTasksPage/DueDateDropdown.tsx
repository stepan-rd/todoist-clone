import { useAppColors } from "@/state/appColorsStore";
import DatePresetChoice from "./DatePresetChoice";
import { useState } from "react";
import { useAddTaskStore } from "@/state/addTaskStore";
import { OverlayInvisible } from "@/components/OverlayInvisible";
import { getCurrentDayString } from "@/utils/getCurrentDayString";
import { getTomorrowDateString } from "@/utils/getTomorrowDateString";
import { getNextWeekendString } from "@/utils/getNextWeekendString";
import { getNextWeekString } from "@/utils/getNextWeekString";

const date = new Date().getDate();

const icons = [
  <svg
    className="mr-2"
    width="24"
    height="24"
    style={{ color: "green" }}
    viewBox="0 0 24 24"
  >
    <g fill="currentColor" fill-rule="evenodd">
      <path
        fill-rule="nonzero"
        d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"
      ></path>
      <text
        fontFamily="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
        fontSize="9"
        transform="translate(4 2)"
        fontWeight="500"
      >
        <tspan x="8" y="15" text-anchor="middle">
          {date.toString().padStart(2, "0")}
        </tspan>
      </text>
    </g>
  </svg>,
  <svg
    className="mr-2"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    style={{ color: "#ad6200" }}
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fill="currentColor"
      fill-rule="evenodd"
      d="M9.704 17.544a.5.5 0 0 0-.653.27l-.957 2.31a.5.5 0 1 0 .924.383l.956-2.31a.5.5 0 0 0-.27-.653Zm5.931-14.32a.5.5 0 0 0-.653.27l-.957 2.31a.5.5 0 1 0 .924.383l.957-2.31a.5.5 0 0 0-.27-.653ZM9.704 6.457a.5.5 0 0 1-.653-.27l-.957-2.31a.5.5 0 1 1 .924-.383l.956 2.31a.5.5 0 0 1-.27.653Zm5.931 14.32a.5.5 0 0 1-.653-.27l-.957-2.31a.5.5 0 0 1 .924-.383l.957 2.31a.5.5 0 0 1-.27.653ZM7.5 12a4.5 4.5 0 1 0 9 0 4.5 4.5 0 0 0-9 0Zm8 0a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-9.314 2.95a.5.5 0 0 0-.383-.924l-2.31.957a.5.5 0 0 0 .383.924l2.31-.957Zm14.32-5.932a.5.5 0 1 0-.383-.924l-2.31.957a.5.5 0 0 0 .383.924l2.31-.957Zm-2.692 5.932a.5.5 0 1 1 .383-.924l2.31.957a.5.5 0 0 1-.384.924l-2.31-.957ZM3.494 9.018a.5.5 0 0 1 .382-.924l2.31.957a.5.5 0 1 1-.383.924l-2.31-.957Z"
      clip-rule="evenodd"
    ></path>
  </svg>,
  <svg
    className="mr-2"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    style={{ color: "#246fe0" }}
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fill="currentColor"
      d="M16 6a3 3 0 0 1 3 3v1h.1c1 0 1.9 1 1.9 2v4c0 1-.8 2-1.9 2H18v.5a.5.5 0 0 1-1 0V18H7v.5a.5.5 0 0 1-1 0V18H5a2 2 0 0 1-2-2v-4c0-1.1.9-2 2-2V9a3 3 0 0 1 3-3h8zm3 5a1 1 0 0 0-1 .9V15H6v-3a1 1 0 0 0-2-.1V16c0 .5.4 1 .9 1H19a1 1 0 0 0 1-.9V12c0-.6-.4-1-1-1zm-3-4H8c-1 0-2 .8-2 1.9v1.4c.6.3 1 1 1 1.7v2h10v-2a2 2 0 0 1 1-1.7V9c0-1-.8-2-1.9-2H16z"
    ></path>
  </svg>,
  <svg
    className="mr-2"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    style={{ color: "#692ec2" }}
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fill="currentColor"
      fill-rule="evenodd"
      d="M18 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM5 6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6Zm8.354 4.647a.5.5 0 0 0-.708.707l1.647 1.647H8.5a.5.5 0 1 0 0 1h5.793l-1.647 1.646a.5.5 0 0 0 .708.707l2.5-2.5a.5.5 0 0 0 0-.707l-2.5-2.5ZM7 8a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1H7Z"
      clip-rule="evenodd"
    ></path>
  </svg>,
];

const choices = ["Today", "Tomorrow", "This Weekend", "Next Week"];

type Props = {
  className?: string;
  overlayOnClick: () => void;
  handleChoiceClick: (...args: any[]) => void;
};

export default function DueDateDropdown({
  className,
  overlayOnClick,
  handleChoiceClick,
}: Props) {
  const { appColors } = useAppColors();

  const dateValues = [
    getCurrentDayString(),
    getTomorrowDateString(),
    getNextWeekendString(),
    getNextWeekString(),
  ];

  return (
    <>
      <OverlayInvisible onClick={overlayOnClick} />
      <div
        className={`rounded-lg shadow-md border pb-2 z-50 ${className}`}
        style={{
          borderColor: appColors.borderColor,
          backgroundColor: appColors.mainBgColor,
          width: "250px",
        }}
      >
        <input
          type="text"
          className="pl-5 mt-2 text-sm outline-none"
          placeholder="Type a due date"
        />
        <hr className="my-2" />
        <div className="">
          {choices.map((choice, choiceIndex) => (
            <DatePresetChoice
              svg={icons[choiceIndex]}
              onClick={() => handleChoiceClick(choice, choiceIndex)}
              text={choice}
              date={dateValues[choiceIndex]}
            />
          ))}
        </div>
      </div>
    </>
  );
}
