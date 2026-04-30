import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "../shared/layouts/PrivateRoute";
import App from "../App";
import Tasks from "../features/tasks/pages/Tasks";
import Archive from "../features/archive/pages/Archive";
import Chat from "../features/chat/pages/Chat";
import Settings from "../features/user/pages/Settings";
import Profile from "../features/user/pages/Profile";
import Login from "../features/auth/pages/Login";
import Signup from "../features/auth/pages/Signup";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Tasks />,
      },
      {
        path: "/archive",
        element: <Archive />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default routes;
