import { TaskType } from "@/types/types";
import { create } from "zustand";

type TasksStoreType = {
  allTasks: TaskType[];
  setAllTasks: (val: TaskType[] | ((prev: TaskType[]) => TaskType[])) => void;

  currEditingTaskIndex: number | null;
  setCurrEditingTaskIndex: (val: number | null) => void;
};
export const useTasksStore = create<TasksStoreType>((set) => ({
  allTasks: [],
  setAllTasks: (val) =>
    set((state) => ({
      allTasks: typeof val === "function" ? val(state.allTasks) : val,
    })),

  currEditingTaskIndex: null,
  setCurrEditingTaskIndex: (val) =>
    set((state) => ({ currEditingTaskIndex: val })),
}));
