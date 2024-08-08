import { useLocalStorage } from "@/hooks/useLocalStorage";
import { TaskType } from "@/types/types";

export function completeTask(
  taskIndex: number,
  setAllTasks: (
    val: TaskType[] | ((prev: TaskType[]) => TaskType[])
  ) => void
) {

  const { setItem } = useLocalStorage();

  setAllTasks((prev) => {
    const newAllTasks = [...prev];
    newAllTasks.splice(taskIndex, 1);
    setItem("allTasks", newAllTasks)
    return newAllTasks;
  });
}