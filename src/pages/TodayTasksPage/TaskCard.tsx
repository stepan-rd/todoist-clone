import { RadioButton } from "@/components/RadioButton";
import { useAppColors } from "@/state/appColorsStore";
import { useTasksStore } from "@/state/tasksStore";
import { useTodayPage } from "@/state/todayPageStore";
import { TaskType } from "@/types/types";
import { completeTask } from "@/utils/completeTask";
import { useNavigate } from "react-router-dom";

type Props = {
  task: TaskType;
  taskIndex: number;
  taskPositionIndex?: number;
  handleTaskClick: (...args: any[]) => void;
};

export function TaskCard({ task, taskIndex, taskPositionIndex, handleTaskClick }: Props) {

  const { appColors } = useAppColors();

  const { setAllTasks, setCurrEditingTaskIndex } = useTasksStore();

  function handleCompleteTaskClick() {
    completeTask(taskIndex, setAllTasks);
  }

  return (
      <div>
        <div
          className="flex hover:cursor-pointer"
          onClick={() => handleTaskClick(task, taskIndex, taskPositionIndex)}
        >
          <RadioButton
            className=""
            onClick={handleCompleteTaskClick}
            priority={Number(task.priority[1])}
          />
          <div className="flex flex-col ml-3">
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
      </div>
  );
}
