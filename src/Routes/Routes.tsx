import { createBrowserRouter } from "react-router-dom";

import App from "../App";

import { MapPage } from "../Pages/MapPage";
import { LoginPage } from "../Pages/LoginPage";
import { DashboardPage } from "../Pages/DashboardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <MapPage title="Map Page" />,
      },
      {
        path: "login",
        element: <LoginPage title="Login Page" />,
      },
      {
        path: "dashboard",
        element: <DashboardPage title="Dashboard Page" />,
      },
    ],
  },
]);

export default router;
