import { TaskType } from "@/types/types";
import { create } from "zustand";

type TasksStoreType = {
  todayTasks: TaskType[];
  setTodayTasks: (val: TaskType[] | ((prev: TaskType[]) => TaskType[])) => void;
};
export const useTasksStore = create<TasksStoreType>((set) => ({
  todayTasks: [],
  setTodayTasks: (val) =>
    set((state) => ({
      todayTasks: typeof val === "function" ? val(state.todayTasks) : val,
    })),
}));
