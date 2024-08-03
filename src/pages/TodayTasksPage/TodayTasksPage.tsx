import { useAppColors } from "@/state/appColorsStore";
import { useTasksStore } from "@/state/tasksStore";
import { useEffect, useState } from "react";
import { TaskCard } from "./TaskCard";
import { AddTaskButton } from "./AddTaskButton";
import { AddTaskCard } from "@/components/AddTaskCard";

type Props = {};

export function TodayTasksPage({}: Props) {
  const { appColors } = useAppColors();

  const { todayTasks } = useTasksStore();

  const [addingTask, setAddingTask] = useState(false);

  useEffect(() => {
    document.title = "Today - Todoist";
  }, []);

  return (
    <div className="p-14">
      <h1
        className="mb-2 text-2xl font-bold "
        style={{ color: appColors.textColor }}
      >
        Today
      </h1>
      {todayTasks.length > 0 && (
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
            {todayTasks.length} {todayTasks.length === 1 ? "task" : "tasks"}
          </h1>
        </div>
      )}

      {todayTasks.map((task, taskIndex) => (
        <TaskCard
          key={`${task.task}-${taskIndex}`}
          task={task}
          taskIndex={taskIndex}
        />
      ))}
      {addingTask && (
        <AddTaskCard
          setAddingTask={setAddingTask}
          className="w-full border rounded-lg"
        />
      )}
      {!addingTask && <AddTaskButton setAddingTask={setAddingTask} />}
    </div>
  );
}
