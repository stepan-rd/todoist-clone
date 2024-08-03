import { useAppColors } from "@/state/appColorsStore";

export function resetAddTaskCard(
  taskNameInputRef: React.MutableRefObject<HTMLTextAreaElement | null>,
  taskDescInputRef: React.MutableRefObject<HTMLTextAreaElement | null>,
  setDueDateBtnValue: (value: string) => void,
  setPriorityBtnValue: (value: string) => void,
  setPriorityBtnSvg: (value: React.ReactNode) => void,
  setDueDateBtnTextColor: (value: string) => void,
  setDueDateDropdownVisible: (value: boolean) => void,
  setPriorityDropdownVisible: (value: boolean) => void,
  appColors: { secondaryTextColor: string }
) {
  taskNameInputRef.current!.value = "";
  taskDescInputRef.current!.value = "";
  setDueDateBtnValue("Due Date");
  setPriorityBtnValue("Priority");
  setPriorityBtnSvg(null);
  setDueDateBtnTextColor(appColors.secondaryTextColor);
  setDueDateDropdownVisible(false);
  setPriorityDropdownVisible(false);
}
