import { create } from "zustand";

type EditTaskStoreType = {
  taskInputValue: string;
  setTaskInputValue: (val: string) => void;

  descriptionInputValue: string;
  setDescriptionInputValue: (val: string) => void;
};
export const useEditTaskStore = create<EditTaskStoreType>((set) => ({
  taskInputValue: "",
  setTaskInputValue: (val) => set((state) => ({ taskInputValue: val })),

  descriptionInputValue: "",
  setDescriptionInputValue: (val) =>
    set((state) => ({ descriptionInputValue: val })),
}));
