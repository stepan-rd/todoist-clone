import { useAppColors } from "@/state/appColorsStore";
import { useEffect, useState } from "react";
import PriorityDropdown from "@/pages/TodayTasksPage/PriorityDropdown";
import { useTasksStore } from "@/state/tasksStore";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button } from "@/components/Button";
import { Button3 } from "@/components/Button3";
import DueDateDropdown from "@/pages/TodayTasksPage/DueDateDropdown";
import { getDueDateChoiceIndex } from "@/utils/getDueDateChoiceIndex";

const date = new Date().getDate();

type Props = {};

const dueDateSvgs = [
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

const smallerFlagSvgs = [
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
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
    width="16"
    height="16"
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
    width="16"
    height="16"
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

export function SecondSection({}: Props) {
  const { appColors } = useAppColors();

  const { setItem } = useLocalStorage();

  const { allTasks, setAllTasks, currEditingTaskIndex } = useTasksStore();

  if (currEditingTaskIndex === null) return;

  const [dueDateBtnHovered, setDueDateBtnHovered] = useState(false);
  const [dueDateBtnValue, setDueDateBtnValue] = useState(
    allTasks[currEditingTaskIndex].dueDate
  );
  const [currDueDateBtnChoiceIndex, setCurrDueDateBtnChoiceIndex] = useState(
    getDueDateChoiceIndex(allTasks[currEditingTaskIndex].dueDate)
  );

  const [priorityBtnHovered, setPriorityBtnHovered] = useState(false);
  const [priorityBtnValue, setPriorityBtnValue] = useState(
    allTasks[currEditingTaskIndex].priority
  );

  const [priorityDropdownVisible, setPriorityDropdownVisible] = useState(false);
  const [dueDateDropdownVisible, setDueDateDropdownVisible] = useState(false);

  function updateTaskPriorityBtnValue(text: string, choiceIndex: number) {
    setPriorityBtnValue(`${text[0]}${text[text.length - 1]}`);
    setPriorityDropdownVisible(false);
  }

  function updateDueDateBtnValue(text: string, choiceIndex: number) {
    setDueDateBtnValue(text);
    setDueDateDropdownVisible(false);
    setCurrDueDateBtnChoiceIndex(choiceIndex);
  }

  useEffect(() => {
    if (priorityBtnValue === allTasks[currEditingTaskIndex].priority) return;

    setAllTasks((prev) => {
      const newAllTasks = [...prev];
      newAllTasks[currEditingTaskIndex].priority = priorityBtnValue;
      setItem("allTasks", newAllTasks);
      return newAllTasks;
    });
  }, [priorityBtnValue]);

  useEffect(() => {
    if (dueDateBtnValue === allTasks[currEditingTaskIndex].dueDate) return;

    setAllTasks((prev) => {
      const newAllTasks = [...prev];
      newAllTasks[currEditingTaskIndex].dueDate = dueDateBtnValue;
      setItem("allTasks", newAllTasks);
      return newAllTasks;
    });
  }, [dueDateBtnValue]);

  return (
    <div
      className="flex flex-col flex-grow p-4"
      style={{ backgroundColor: appColors.secondaryBgColor }}
    >
      <div className="relative">
        <h1
          className="text-xs font-semibold"
          style={{ color: appColors.secondaryTextColor }}
        >
          Due date
        </h1>
        <Button3 onClick={() => setDueDateDropdownVisible(true)}>
          {currDueDateBtnChoiceIndex !== undefined &&
            dueDateSvgs[currDueDateBtnChoiceIndex]}
          <h1 className="text-sm font-semibold">{dueDateBtnValue}</h1>
        </Button3>
        {dueDateDropdownVisible && (
          <DueDateDropdown
            className="absolute top-0"
            overlayOnClick={() => setDueDateDropdownVisible(false)}
            handleChoiceClick={updateDueDateBtnValue}
          />
        )}
      </div>
      <hr className="mt-2 mb-8" />
      <div className="relative">
        <h1
          className="text-xs font-semibold"
          style={{ color: appColors.secondaryTextColor }}
        >
          Priority
        </h1>
        <Button3 onClick={() => setPriorityDropdownVisible(true)}>
          {smallerFlagSvgs[Number(priorityBtnValue[1]) - 1]}
          <h1
            className="ml-2 text-sm font-semibold"
            style={{ color: appColors.secondaryTextColor }}
          >
            {priorityBtnValue}
          </h1>
        </Button3>
        {priorityDropdownVisible && (
          <PriorityDropdown
            handleChoiceClick={updateTaskPriorityBtnValue}
            overlayOnClick={() => setPriorityDropdownVisible(false)}
            className="absolute left-0 top-13"
          />
        )}
      </div>
    </div>
  );
}
