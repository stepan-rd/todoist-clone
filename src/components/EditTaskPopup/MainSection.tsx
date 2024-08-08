import { Button } from "@/components/Button";
import { RadioButton } from "@/components/RadioButton";
import { SecondaryButton } from "@/components/SecondaryButton";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useAppColors } from "@/state/appColorsStore";
import { useEditTaskPopupStore } from "@/state/editTaskPopupStore";
import { useEditTaskStore } from "@/state/editTaskStore";
import { useTasksStore } from "@/state/tasksStore";
import { completeTask } from "@/utils/completeTask";
import { useEffect, useState } from "react";

type Props = {
  setEditTaskPopupVisible: (
    val: boolean | ((prev: boolean) => boolean)
  ) => void;
};

export function MainSection({ setEditTaskPopupVisible }: Props) {
  const { appColors } = useAppColors();

  const { allTasks, setAllTasks, currEditingTaskIndex } = useTasksStore();

  const { setItem } = useLocalStorage();


  if (currEditingTaskIndex === null) return;

  const {
    taskInputValue,
    setTaskInputValue,
    descriptionInputValue,
    setDescriptionInputValue,
  } = useEditTaskStore();

  const [isFocusedOnInputChange, setIsFocusedOnInputChange] = useState(false);
  const [isChangingInputs, setIsChangingInputs] = useState(false);
  const [isSaveBtnDisabled, setIsSaveBtnDisabled] = useState(false);
  const [initialTaskNameValue, setInitialTaskNameValue] =
    useState(taskInputValue);
  const [initialDescriptionValue, setInitialDescriptionValue] = useState(
    descriptionInputValue
  );

  const taskPriority = Number(allTasks[currEditingTaskIndex].priority[1]);

  useEffect(() => {
    if (currEditingTaskIndex === null) return;

    const currentTask = allTasks[currEditingTaskIndex];
    setTaskInputValue(currentTask.task);
    setDescriptionInputValue(currentTask.description);
    setInitialTaskNameValue(currentTask.task);
    setInitialDescriptionValue(currentTask.description);
  }, [
    currEditingTaskIndex,
    allTasks,
    setTaskInputValue,
    setDescriptionInputValue,
  ]);

  function handleCompleteTaskClick() {
    if (currEditingTaskIndex === null) return;
    completeTask(currEditingTaskIndex, setAllTasks);
    setEditTaskPopupVisible(false);
  }

  function handleSaveBtnClick() {
    setAllTasks((prev) => {
      const newAllTasks = [...prev];
      newAllTasks[currEditingTaskIndex!].task = taskInputValue;
      newAllTasks[currEditingTaskIndex!].description = descriptionInputValue;
      setItem("allTasks", newAllTasks);
      return newAllTasks;
    });

    setIsChangingInputs(false);

    setInitialTaskNameValue(taskInputValue);
    setInitialDescriptionValue(descriptionInputValue);
  }

  function handleCancelButtonClick() {
    setTaskInputValue(initialTaskNameValue);
    setDescriptionInputValue(initialDescriptionValue);
    setIsChangingInputs(false);
  }

  useEffect(() => {
    if (taskInputValue === "" && descriptionInputValue === "") {
      setIsSaveBtnDisabled(true);
      return;
    }

    setIsSaveBtnDisabled(false);
  }, [taskInputValue, descriptionInputValue]);

  useEffect(() => {
    setTaskInputValue(allTasks[currEditingTaskIndex].task);
    setDescriptionInputValue(allTasks[currEditingTaskIndex].description);
  }, []);

  return (
    <div className="relative h-full p-4" style={{ width: "65%" }}>
      <RadioButton
        className="absolute left-5 top-6"
        onClick={handleCompleteTaskClick}
        priority={taskPriority}
      />
      <div
        className="box-border relative flex p-2 ml-10 rounded-lg"
        onClick={() => setIsChangingInputs(true)}
        style={{
          borderWidth: isChangingInputs ? "1px" : "0px",
          borderColor: isFocusedOnInputChange
            ? appColors.borderColorFocused
            : appColors.borderColor,
        }}
      >
        <div className="flex flex-col flex-grow text-lg">
          <input
            onFocus={() => setIsFocusedOnInputChange(true)}
            onBlur={() => setIsFocusedOnInputChange(false)}
            placeholder={taskInputValue.length === 0 ? "Task name" : ""}
            className="p-2 mb-3 font-semibold outline-none"
            style={{ color: appColors.textColor }}
            value={taskInputValue}
            onChange={(e) => setTaskInputValue(e.target.value)}
          />
          <textarea
            onFocus={() => setIsFocusedOnInputChange(true)}
            onBlur={() => setIsFocusedOnInputChange(false)}
            placeholder={
              descriptionInputValue.length === 0 ? "Description" : ""
            }
            className="p-2 text-sm outline-none resize-none min-h-34"
            style={{ color: appColors.secondaryTextColor }}
            value={descriptionInputValue}
            onChange={(e) => setDescriptionInputValue(e.target.value)}
          />
        </div>
      </div>
      <div className="relative">
        {isChangingInputs && (
          <div className="absolute right-0 top-2">
            <SecondaryButton
              className="mr-2"
              disabled={false}
              onClick={handleCancelButtonClick}
            >
              Cancel
            </SecondaryButton>
            <Button disabled={isSaveBtnDisabled} onClick={handleSaveBtnClick}>
              Save
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
