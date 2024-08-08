import { create } from "zustand";

interface InboxPageStoreType {
  editTaskPopupVisible: boolean;
  setEditTaskPopupVisible: (val: boolean | ((prev: boolean) => boolean)) => void
}
export const useInboxPageStore = create<InboxPageStoreType>((set) => ({
  editTaskPopupVisible: false,
  setEditTaskPopupVisible: (val) => set((state) => ({ editTaskPopupVisible: typeof val === "function" ? val(state.editTaskPopupVisible) : val })),
}));
