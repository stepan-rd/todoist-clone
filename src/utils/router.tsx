import App from "@/App";
import { ErrorPage } from "@/pages/ErrorPage/ErrorPage";
import { TodayTasksPage } from "@/pages/TodayTasksPage/TodayTasksPage";
import { createBrowserRouter, Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/app",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/app/today" /> },
      { path: "today", element: <TodayTasksPage /> },
    ],
  },
]);
