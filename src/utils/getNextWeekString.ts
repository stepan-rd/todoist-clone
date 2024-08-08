import { formatDate } from "./formatDate";

export function getNextWeekString() {
  const date = new Date();
  const day = date.getDay();
  const daysUntilNextMonday = (8 - day) % 7;
  date.setDate(date.getDate() + daysUntilNextMonday);
  return formatDate(date);
}
