import { create } from "zustand";

type TodayPageStoreType = {
  editTaskPopupVisible: boolean;
  setEditTaskPopupVisible: (
    val: boolean | ((prev: boolean) => boolean)
  ) => void;

  currEditingTaskPositionIndex: number | null;
  setCurrEditingTaskPositionIndex: (val: number | null) => void;
};
export const useTodayPage = create<TodayPageStoreType>((set) => ({
  editTaskPopupVisible: false,
  setEditTaskPopupVisible: (val) =>
    set((state) => ({
      editTaskPopupVisible:
        typeof val === "function" ? val(state.editTaskPopupVisible) : val,
    })),

  currEditingTaskPositionIndex: null,
  setCurrEditingTaskPositionIndex: (val) =>
    set(() => ({ currEditingTaskPositionIndex: val })),
}));
