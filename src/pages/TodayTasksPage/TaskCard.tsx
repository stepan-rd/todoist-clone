import { RadioButton } from "@/components/RadioButton";
import { useAppColors } from "@/state/appColorsStore";
import { useTasksStore } from "@/state/tasksStore";
import { TaskType } from "@/types/types";
import { useNavigate } from "react-router-dom";

type Props = {
  task: TaskType;
  taskIndex: number;
};

export function TaskCard({ task, taskIndex }: Props) {
  const navigate = useNavigate();

  const { appColors } = useAppColors();

  const { todayTasks, setTodayTasks } = useTasksStore();

  function completeTodayTask(taskIndex: number) {
    setTodayTasks((prev) => {
      const newTodayTasks = [...prev];
      newTodayTasks.splice(taskIndex, 1);
      return newTodayTasks;
    });
  }

  return (
    <>
      <div
        className="relative z-30 flex hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        <RadioButton
          className="absolute z-50 top-1"
          onClick={() => completeTodayTask(taskIndex)}
          priority={Number(todayTasks[taskIndex].priority.slice(1)) - 1}
        />
        <div className="flex flex-col ml-7">
          <h1 className="text-sm" style={{ color: appColors.textColor }}>
            {" "}
            {task.task}
          </h1>
          <h1
            className="mt-1 text-xs"
            style={{ color: appColors.secondaryTextColor }}
          >
            {task.description}
          </h1>
        </div>
      </div>
      <hr className="my-4" />
    </>
  );
}
