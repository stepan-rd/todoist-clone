import { useEffect } from "react";

type Props = {};

export function TodayTasksPage({}: Props) {



  useEffect(() => {
    document.title = "Today - Todoist"
  }, [])

  return <div className="">TodayTasksPage</div>;
}
