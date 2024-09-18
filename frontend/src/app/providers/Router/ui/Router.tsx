import { createBrowserRouter } from "react-router-dom";
import {
  Authorization,
  MainPage,
  Profile,
  Registration,
  Reset,
} from "../../../../pages";

export const baseRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "signUp",
    element: <Registration />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "signin",
    element: <Authorization />,
  },
  {
    path: "reset",
    element: <Reset />,
  },
]);
