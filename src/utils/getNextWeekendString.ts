import { formatDate } from "./formatDate";

export function getNextWeekendString() {
  const date = new Date();
  const day = date.getDay();
  const daysUntilSaturday = 6 - day;
  date.setDate(date.getDate() + daysUntilSaturday);
  return formatDate(date);
}
