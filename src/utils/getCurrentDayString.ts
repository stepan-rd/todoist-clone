export function getCurrentDayString() {
  const date = new Date();
  return date.toLocaleDateString("en-US", { weekday: "long" }).slice(0, 3);
}
