export function formatDate(date: Date) {
  const options = {
    weekday: "short" as const,
    day: "2-digit" as const,
    month: "short" as const,
  };
  return date.toLocaleDateString("en-US", options);
}
