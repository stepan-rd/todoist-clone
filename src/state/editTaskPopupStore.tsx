import { create } from "zustand";

type EditTaskPopupStoreType = {
  handleArrowUpClick: () => void;
  setHandleArrowUpClick: (val: () => void) => void;

  handleArrowDownClick: () => void;
  setHandleArrowDownClick: (val: () => void) => void;

  arrowUpDisabled: boolean;
  setArrowUpDisabled: (val: boolean) => void;

  arrowDownDisabled: boolean;
  setArrowDownDisabled: (val: boolean) => void;
};

export const useEditTaskPopupStore = create<EditTaskPopupStoreType>((set) => ({
  handleArrowUpClick: () => {},
  setHandleArrowUpClick: (val) => set(() => ({ handleArrowUpClick: val })),

  handleArrowDownClick: () => {},
  setHandleArrowDownClick: (val) => set(() => ({ handleArrowDownClick: val })),

  arrowUpDisabled: false,
  setArrowUpDisabled: (val) => set(() => ({ arrowUpDisabled: val })),
  
  arrowDownDisabled: false,
  setArrowDownDisabled: (val) => set(() => ({ arrowUpDisabled: val })),
}));
