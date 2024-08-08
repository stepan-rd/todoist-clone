export function getDueDateChoiceIndex(choiceText: string) {
  switch (choiceText) {
    case "Today":
      return 0;
    case "Tomorrow":
      return 1;
    case "This Weekend":
      return 2;
    case "Next Week":
      return 3;
  }
}
