export function getTomorrowDateString() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toLocaleDateString("en-US", { weekday: "long" }).slice(0, 3);
}
