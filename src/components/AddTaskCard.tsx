import { DueDateBtnSvg } from "@/assets/DueDateBtnSvg";
import { useAppColors } from "@/state/appColorsStore";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { Button1 } from "./Button1";
import { PrioritySvg } from "@/assets/PrioritySvg";
import { Button } from "./Button";
import { SecondaryButton } from "./SecondaryButton";
import { useTasksStore } from "@/state/tasksStore";
import DueDateDropdown from "@/pages/TodayTasksPage/DueDateDropdown";
import { useAddTaskStore } from "@/state/addTaskStore";
import PriorityDropdown from "@/pages/TodayTasksPage/PriorityDropdown";
import { resetAddTaskCard } from "@/utils/resetAddTaskCard";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { getNextWeekendString } from "@/utils/getNextWeekendString";
import { getNextWeekString } from "@/utils/getNextWeekString";
import { motion } from "framer-motion";

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

type Props = {
  className?: string;
  setAddingTask: React.Dispatch<SetStateAction<boolean>>;
  type?: "todayPage" | "global";
};

export function AddTaskCard({ className, setAddingTask, type }: Props) {
  const { appColors } = useAppColors();

  const { setAllTasks } = useTasksStore();

  const { setItem } = useLocalStorage();

  const [dueDateBtnValue, setDueDateBtnValue] = useState("Due Date");
  const [dueDateBtnTextColor, setDueDateBtnTextColor] = useState("");
  const [priorityBtnValue, setPriorityBtnValue] = useState("Priority");
  const [dueDateDropdownVisible, setDueDateDropdownVisible] = useState(false);
  const [priorityDropdownVisible, setPriorityDropdownVisible] = useState(false);
  const [priorityBtnSvg, setPriorityBtnSvg] = useState<React.ReactNode | null>(
    null
  );

  const [dueDateBtnHovered, setDueDateBtnHovered] = useState(false);
  const [priorityBtnHovered, setPriorityBtnHovered] = useState(false);
  const [borderColor, setBorderColor] = useState(appColors.borderColor);
  const [addTaskBtnDisabled, setAddTaskBtnDisabled] = useState(true);

  const taskNameInputRef = useRef<HTMLTextAreaElement | null>(null);
  const taskDescInputRef = useRef<HTMLTextAreaElement | null>(null);

  function handleAddTaskBtnClick() {
    if (taskNameInputRef.current && taskDescInputRef.current) {
      const taskName = taskNameInputRef.current.value;
      const taskDesc = taskDescInputRef.current.value;
      const priority = priorityBtnValue;

      setAllTasks((prev) => {
        const newAllTasks = [
          ...prev,
          {
            task: taskName,
            description: taskDesc,
            priority: priority,
            dueDate: "Today",
          },
        ];
        setItem("allTasks", newAllTasks);
        return newAllTasks;
      });

      resetAddTaskCard(
        taskNameInputRef,
        taskDescInputRef,
        setDueDateBtnValue,
        setPriorityBtnValue,
        setPriorityBtnSvg,
        setDueDateBtnTextColor,
        setDueDateDropdownVisible,
        setPriorityDropdownVisible,
        appColors
      );
    }

    if (type === "global") {
      setAddingTask(false);
    }
  }

  function handleCancelBtnClick() {
    setAddingTask(false);
    resetAddTaskCard(
      taskNameInputRef,
      taskDescInputRef,
      setDueDateBtnValue,
      setPriorityBtnValue,
      setPriorityBtnSvg,
      setDueDateBtnTextColor,
      setDueDateDropdownVisible,
      setPriorityDropdownVisible,
      appColors
    );
  }

  function handleDueDateBtnClick() {
    setDueDateDropdownVisible((prev) => !prev);
  }

  function handlePriorityBtnClick() {
    setPriorityDropdownVisible((prev) => !prev);
  }

  function handleDueDateBtnRemoveClick() {
    setDueDateBtnValue("Due Date");
    setDueDateBtnTextColor(appColors.secondaryTextColor);
  }

  function handlePriorityBtnRemoveClick() {
    setPriorityBtnValue("Priority");
    setPriorityBtnSvg(null);
  }

  function updateDisabledStatus() {
    if (taskNameInputRef.current && taskDescInputRef.current) {
      const taskName = taskNameInputRef.current.value;
      const taskDesc = taskDescInputRef.current.value;
      const dueDate = dueDateBtnValue;
      const priority = priorityBtnValue;

      if (type === "todayPage") {
        if (taskName && taskDesc && priority !== "Priority") {
          setAddTaskBtnDisabled(false);
          return;
        }
      }

      if (
        taskName &&
        taskDesc &&
        dueDate !== "Due Date" &&
        priority !== "Priority"
      ) {
        setAddTaskBtnDisabled(false);
        return;
      }

      setAddTaskBtnDisabled(true);
    }

    setAddTaskBtnDisabled(true);
  }

  function handleDueDateChoiceClick(choiceName: string) {
    switch (choiceName) {
      case "Today":
        setDueDateBtnValue("Today");
        setDueDateBtnTextColor("green");
        break;

      case "Tomorrow":
        setDueDateBtnValue("Tomorrow");
        setDueDateBtnTextColor("#ad6200");
        break;

      case "This Weekend":
        setDueDateBtnValue(getNextWeekendString());
        setDueDateBtnTextColor("#246fe0");
        break;

      case "Next Week":
        setDueDateBtnValue(getNextWeekString());
        setDueDateBtnTextColor("#692ec2");
        break;
    }

    setDueDateDropdownVisible(false);
  }

  function handlePriorityChoiceClick(text: string, choiceIndex: number) {
    setPriorityBtnValue(`${text[0]}${text[text.length - 1]}`);
    setPriorityBtnSvg(smallerFlagSvgs[choiceIndex]);
    setPriorityDropdownVisible(false);
  }

  useEffect(() => {
    updateDisabledStatus();
  }, [priorityBtnValue]);

  useEffect(() => {
    setDueDateBtnTextColor(appColors.secondaryTextColor);
  }, []);

  return (
    <div
      className={`relative flex p-4 flex-col ${className}`}
      style={{
        minHeight: "160px",
        borderColor: borderColor,
        backgroundColor: appColors.mainBgColor,
      }}
    >
      <textarea
        onFocus={() => setBorderColor(appColors.borderColorFocused)}
        onBlur={() => setBorderColor(appColors.borderColor)}
        onChange={updateDisabledStatus}
        ref={taskNameInputRef}
        maxLength={150}
        className="h-5 mb-2 text-sm font-semibold outline-none resize-none"
        placeholder="Task name"
      />
      <textarea
        maxLength={300}
        onFocus={() => setBorderColor(appColors.borderColorFocused)}
        onBlur={() => setBorderColor(appColors.borderColor)}
        onChange={updateDisabledStatus}
        ref={taskDescInputRef}
        className="h-10 text-sm outline-none resize-none"
        placeholder="Description"
      />
      <div className="relative flex" style={{ marginTop: "10px" }}>
        {type !== "todayPage" && (
          <Button1
            textColor={dueDateBtnTextColor}
            onClick={handleDueDateBtnClick}
            className="mr-2"
            isHovered={dueDateBtnHovered}
            setIsHovered={setDueDateBtnHovered}
          >
            <div className="flex items-center">
              <DueDateBtnSvg className="mr-1" isHovered={dueDateBtnHovered} />
              {dueDateBtnValue}
              {dueDateBtnValue !== "Due Date" && (
                <button
                  className="relative ml-1 bottom-px hover:text-black"
                  style={{ color: appColors.secondaryTextColor }}
                  onClick={handleDueDateBtnRemoveClick}
                >
                  x
                </button>
              )}
            </div>
          </Button1>
        )}

        <Button1
          onClick={handlePriorityBtnClick}
          textColor={appColors.secondaryTextColor}
          isHovered={priorityBtnHovered}
          setIsHovered={setPriorityBtnHovered}
        >
          <div className="flex items-center">
            {priorityBtnSvg || <PrioritySvg isHovered={priorityBtnHovered} />}
            <h1 className="ml-1">{priorityBtnValue}</h1>
            {priorityBtnValue !== "Priority" && (
              <button
                className="relative ml-1 bottom-px hover:text-black"
                style={{ color: appColors.secondaryTextColor }}
                onClick={handlePriorityBtnRemoveClick}
              >
                x
              </button>
            )}
          </div>
        </Button1>
        {dueDateDropdownVisible && (
          <DueDateDropdown
            overlayOnClick={() => setDueDateDropdownVisible(false)}
            handleChoiceClick={handleDueDateChoiceClick}
            className="absolute top-8"
          />
        )}
        {priorityDropdownVisible && (
          <PriorityDropdown
            overlayOnClick={() => setPriorityDropdownVisible(false)}
            handleChoiceClick={handlePriorityChoiceClick}
            className={`absolute ${type ? "left-0" : "left-24"}  top-8`}
          />
        )}
      </div>

      <div className="relative mt-5 mb-9">
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: "1px",
            backgroundColor: appColors.borderColor,
            marginLeft: "-16px",
            marginRight: "-16px",
          }}
        />
      </div>

      <div className="absolute right-5 bottom-3">
        <SecondaryButton
          className="mr-2"
          disabled={false}
          onClick={handleCancelBtnClick}
        >
          Cancel
        </SecondaryButton>
        <Button disabled={addTaskBtnDisabled} onClick={handleAddTaskBtnClick}>
          Add Task
        </Button>
      </div>
    </div>
  );
}
