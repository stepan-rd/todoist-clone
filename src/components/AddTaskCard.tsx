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

type Props = {
  className?: string;
  setAddingTask: React.Dispatch<SetStateAction<boolean>>;
};

export function AddTaskCard({ className, setAddingTask }: Props) {
  const { appColors } = useAppColors();

  const { setTodayTasks } = useTasksStore();

  const {
    dueDateBtnValue,
    priorityBtnValue,
    dueDateBtnTextColor,
    setDueDateBtnTextColor,
    setDueDateBtnValue,
    dueDateDropdownVisible,
    setDueDateDropdownVisible,
    priorityDropdownVisible,
    setPriorityDropdownVisible,
    setPriorityBtnValue,
    priorityBtnSvg,
    setPriorityBtnSvg,
  } = useAddTaskStore();

  const [dueDateBtnHovered, setDueDateBtnHovered] = useState(false);
  const [priorityBtnHovered, setPriorityBtnHovered] = useState(false);
  const [borderColor, setBorderColor] = useState(appColors.borderColor);

  const taskNameInputRef = useRef<HTMLTextAreaElement | null>(null);
  const taskDescInputRef = useRef<HTMLTextAreaElement | null>(null);

  function handleAddTaskBtnClick() {
    if (taskNameInputRef.current && taskDescInputRef.current) {
      const taskName = taskNameInputRef.current.value;
      const taskDesc = taskDescInputRef.current.value;
      const dueDate = dueDateBtnValue;
      const priority = priorityBtnValue;

      setTodayTasks((prev) => [
        ...prev,
        {
          task: taskName,
          description: taskDesc,
          priority: priority,
          dueDate: dueDate,
        },
      ]);

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

  function getDisabledStatus() {
    if (taskNameInputRef.current && taskDescInputRef.current) {
      const taskName = taskNameInputRef.current.value;
      const taskDesc = taskDescInputRef.current.value;
      const dueDate = dueDateBtnValue;
      const priority = priorityBtnValue;

      if (
        taskName &&
        taskDesc &&
        dueDate !== "Due Date" &&
        priority !== "Priority"
      ) {
        return false;
      }

      return true;
    }

    return true;
  }

  useEffect(() => {
    console.log(dueDateBtnValue);
  }, [dueDateBtnValue]);

  useEffect(() => {
    setDueDateBtnTextColor(appColors.secondaryTextColor);
  }, []);

  return (
    <div
      className={`relative flex p-4 flex-col ${className}`}
      style={{ minHeight: "160px", borderColor: borderColor }}
    >
      <textarea
        onFocus={() => setBorderColor(appColors.borderColorFocused)}
        onBlur={() => setBorderColor(appColors.borderColor)}
        ref={taskNameInputRef}
        maxLength={150}
        className="h-5 mb-2 text-sm font-semibold outline-none resize-none"
        placeholder="Task name"
      />
      <textarea
        maxLength={300}
        onFocus={() => setBorderColor(appColors.borderColorFocused)}
        onBlur={() => setBorderColor(appColors.borderColor)}
        ref={taskDescInputRef}
        className="h-10 text-sm outline-none resize-none"
        placeholder="Description"
      />

      <div className="relative flex" style={{ marginTop: "10px" }}>
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
          <DueDateDropdown className="absolute top-8" />
        )}
        {priorityDropdownVisible && (
          <PriorityDropdown className="absolute left-24 top-8" />
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
          canClick
          onClick={handleCancelBtnClick}
        >
          Cancel
        </SecondaryButton>
        <Button disabled={getDisabledStatus()} onClick={handleAddTaskBtnClick}>
          Add Task
        </Button>
      </div>
    </div>
  );
}
