import { useAppColors } from "@/state/appColorsStore";
import { useTasksStore } from "@/state/tasksStore";
import { useEffect, useState } from "react";
import { TaskCard } from "./TaskCard";
import { AddTaskButton } from "./AddTaskButton";
import { AddTaskCard } from "@/components/AddTaskCard";
import { useTodayPage } from "@/state/todayPageStore";
import { EditTaskPopup } from "@/components/EditTaskPopup/EditTaskPopup";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEditTaskPopupStore } from "@/state/editTaskPopupStore";

type Props = {};

export function TodayTasksPage({}: Props) {
  const { appColors } = useAppColors();

  const {
    editTaskPopupVisible,
    setEditTaskPopupVisible,
    currEditingTaskPositionIndex,
    setCurrEditingTaskPositionIndex,
  } = useTodayPage();

  const { setHandleArrowUpClick, setHandleArrowDownClick, setArrowDownDisabled, setArrowUpDisabled } =
    useEditTaskPopupStore();

  const { getItem, setItem } = useLocalStorage();

  const {
    allTasks,
    setAllTasks,
    currEditingTaskIndex,
    setCurrEditingTaskIndex,
  } = useTasksStore();

  const [addingTask, setAddingTask] = useState(false);
  const [todayTasksCount, setTodayTasksCount] = useState(
    allTasks.filter((task) => task.dueDate === "Today").length
  );

  const todayPageTaskIndices: number[] = [];
  let currTaskPositionIndex = -1;

  function handleTaskClick(
    task: string,
    taskIndex: number,
    taskPositionIndex: number
  ) {
    setEditTaskPopupVisible(true);
    setCurrEditingTaskIndex(taskIndex);
    setCurrEditingTaskPositionIndex(taskPositionIndex);
  }

  function handleArrowUpClick() {
    const todayTasks = allTasks.filter((task) => task.dueDate === "Today");

    if (currEditingTaskPositionIndex) {
      setCurrEditingTaskIndex(todayPageTaskIndices[currEditingTaskPositionIndex])
    }


  }

  function handleArrowDownClick() {}

  // get tasks from storage on mount
  useEffect(() => {
    document.title = "Today - Todoist";

    const item = getItem("allTasks");
    const allTasks = item ? JSON.parse(item) : [];
    setAllTasks(allTasks);
    setHandleArrowUpClick(handleArrowUpClick);
    setHandleArrowDownClick(handleArrowDownClick);
  }, []);

  useEffect(() => {
    const newTodayTasksCount = allTasks.filter(
      (task) => task.dueDate === "Today"
    ).length;
    setTodayTasksCount(newTodayTasksCount);
  }, [allTasks]);

  useEffect(() => {

    if (currEditingTaskPositionIndex === 0) {
      setArrowUpDisabled(true);
      setArrowDownDisabled(false);
      return
    }

    else if (currEditingTaskIndex === todayTasksCount - 1) {
      setArrowDownDisabled(true);
      setArrowUpDisabled(false);
      return
    }

    setArrowDownDisabled(false);
    setArrowUpDisabled(false);

  }, [currEditingTaskPositionIndex]);

  return (
    <>
      <div className="p-14">
        <h1
          className="mb-2 text-2xl font-bold "
          style={{ color: appColors.textColor }}
        >
          Today
        </h1>
        {todayTasksCount > 0 && (
          <div
            className="flex items-center mb-5"
            style={{ color: appColors.secondaryTextColor }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8 14.001a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-1a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM5.146 8.147a.5.5 0 0 1 .708 0L7 9.294l3.146-3.147a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 0-.708Z"
                clipRule="evenodd"
              ></path>
            </svg>
            <h1 className="ml-1">
              {todayTasksCount} {todayTasksCount === 1 ? "task" : "tasks"}
            </h1>
          </div>
        )}

        <div className="z-10">
          {allTasks.map((task, taskIndex) => {
            if (task.dueDate === "Today") {
              todayPageTaskIndices.push(taskIndex);
              currTaskPositionIndex++

              return (
                <TaskCard
                  handleTaskClick={handleTaskClick}
                  key={`${task.task}-${taskIndex}`}
                  task={task}
                  taskIndex={taskIndex}
                  taskPositionIndex={currTaskPositionIndex}
                />
              );
            }
          })}
        </div>

        {addingTask && (
          <AddTaskCard
            type="todayPage"
            setAddingTask={setAddingTask}
            className="w-full border rounded-lg"
          />
        )}
        {!addingTask && <AddTaskButton setAddingTask={setAddingTask} />}
        {allTasks.filter((task) => task.dueDate === "Today").length === 0 && (
          <div className="flex flex-col items-center mt-10">
            <img src="https://todoist.b-cdn.net/assets/images/2d7e8bbda4f6d309a7719e0400ead068.png"></img>
            <h1
              className="font-semibold"
              style={{ color: appColors.textColor }}
            >
              Today's tasks are done !
            </h1>
            <h1
              className="text-sm"
              style={{ color: appColors.secondaryTextColor }}
            >
              Setting tasks for each day will drastically improve your life.
            </h1>
            <h1
              className="text-sm"
              style={{ color: appColors.secondaryTextColor }}
            >
              It's about small wins stacked up throughout the day.
            </h1>
          </div>
        )}
      </div>
      {editTaskPopupVisible && <EditTaskPopup setEditTaskPopupVisible={setEditTaskPopupVisible}/>}
    </>
  );
}
