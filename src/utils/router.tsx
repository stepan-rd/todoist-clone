import App from "@/App";
import { ErrorPage } from "@/pages/ErrorPage/ErrorPage";
import { InboxPage } from "@/pages/InboxPage/InboxPage";
import { TodayTasksPage } from "@/pages/TodayTasksPage/TodayTasksPage";
import { UpcomingPage } from "@/pages/UpcomingPage/UpcomingPage";
import { createBrowserRouter, Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/app",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/app/today" /> },
      { path: "today", element: <TodayTasksPage /> },
      { path: "inbox", element: <InboxPage /> },
      { path: "upcoming", element: <UpcomingPage /> },
    ],
  },
]);
