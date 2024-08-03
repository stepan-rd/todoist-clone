import { create } from "zustand";

type AddTaskStoreType = {
  dueDateBtnValue: string;
  setDueDateBtnValue: (val: string) => void;

  dueDateBtnTextColor: string;
  setDueDateBtnTextColor: (val: string) => void;

  priorityBtnValue: string;
  setPriorityBtnValue: (val: string) => void;

  dueDateDropdownVisible: boolean;
  setDueDateDropdownVisible: (
    val: boolean | ((prev: boolean) => boolean)
  ) => void;

  priorityDropdownVisible: boolean;
  setPriorityDropdownVisible: (
    val: boolean | ((prev: boolean) => boolean)
  ) => void;

  priorityBtnSvg: React.ReactNode | null;
  setPriorityBtnSvg: (val: React.ReactNode | null) => void;
};
export const useAddTaskStore = create<AddTaskStoreType>((set) => ({
  dueDateBtnValue: "Due Date",
  setDueDateBtnValue: (val) => set((state) => ({ dueDateBtnValue: val })),

  dueDateBtnTextColor: "",
  setDueDateBtnTextColor: (val) =>
    set((state) => ({ dueDateBtnTextColor: val })),

  priorityBtnValue: "Priority",
  setPriorityBtnValue: (val) => set((state) => ({ priorityBtnValue: val })),

  dueDateDropdownVisible: false,
  setDueDateDropdownVisible: (val) =>
    set((state) => ({
      dueDateDropdownVisible:
        typeof val === "function" ? val(state.dueDateDropdownVisible) : val,
    })),

  priorityDropdownVisible: false,
  setPriorityDropdownVisible: (val) =>
    set((state) => ({
      priorityDropdownVisible:
        typeof val === "function" ? val(state.dueDateDropdownVisible) : val,
    })),

    priorityBtnSvg: null,
  setPriorityBtnSvg: (val) => set(state => ({ priorityBtnSvg: val}))
}));
