import { useTasksStore } from "@/state/tasksStore";
import React, { useEffect, useState } from "react";
import { TaskCard } from "../TodayTasksPage/TaskCard";
import { useInboxPageStore } from "@/state/inboxPageStore";
import { useAppColors } from "@/state/appColorsStore";
import { EditTaskPopup } from "@/components/EditTaskPopup/EditTaskPopup";
import { AddTaskButton } from "../TodayTasksPage/AddTaskButton";
import { AddTaskCard } from "@/components/AddTaskCard";
import { useEditTaskPopupStore } from "@/state/editTaskPopupStore";

type Props = {};

export function InboxPage({}: Props) {
  const { appColors } = useAppColors();

  const { allTasks, setCurrEditingTaskIndex } = useTasksStore();

  const { editTaskPopupVisible, setEditTaskPopupVisible } = useInboxPageStore();

  const [addingTask, setAddingTask] = useState(false);

  function handleTaskClick(task: string, taskIndex: number) {
    setEditTaskPopupVisible(true);
    setCurrEditingTaskIndex(taskIndex);
  }

  useEffect(() => {
    document.title = "Inbox - Todoist"
  }, [])

  return (
    <div className="min-h-screen p-14">
      <h1
        className="mb-8 text-2xl font-bold "
        style={{ color: appColors.textColor }}
      >
        Inbox
      </h1>
      

      {allTasks.map((task, taskIndex) => (
        <TaskCard
          handleTaskClick={handleTaskClick}
          task={task}
          taskIndex={taskIndex}
        />
      ))}
      {addingTask === false && <AddTaskButton setAddingTask={setAddingTask} />}
      {editTaskPopupVisible && (
        <EditTaskPopup setEditTaskPopupVisible={setEditTaskPopupVisible} />
      )}
      {addingTask && (
        <AddTaskCard
          className="mt-5 border rounded-lg"
          setAddingTask={setAddingTask}
        />
      )}
      {allTasks.length === 0 && (
        <div
          className="flex flex-col items-center justify-center w-full mt-28"
          style={{ color: appColors.textColor }}
        >
          <img src="https://todoist.b-cdn.net/assets/images/f6fa2d79a28b6cf1c08d55511fee0c5b.png"></img>
          <h1 className="font-semibold">All tasks done !</h1>
          <h1
            className="text-sm"
            style={{ color: appColors.secondaryTextColor }}
          >
            Make sure to create some tasks for the near future so you have some
            problems to solve.
          </h1>
        </div>
      )}
    </div>
  );
}
