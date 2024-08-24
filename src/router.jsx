import * as React from "react";

import {
  createBrowserRouter
} from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import Auth from "./Pages/Auth/Auth";
import UserFavorite from "./Pages/UserFavorite/UserFavorite";
import UserFavoriteTeams from "./Pages/UserFavorite/UserFavoriteTeams";
import SchedulePage from "./Pages/Schedule/SchedulePage";
import Scores from "./Pages/Scores/Scores";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/auth/",
    children: [
        {
          path: "",
          element: <Auth />,
        },
        {
          path: ":slug",
          element: <Auth />,
        },
      ],
  },
  {
    path: "/followings/competetions/",
    children: [

        {
          path: "",
          element: <UserFavorite />,
        },
        {
          path: ":comptId/teams",
          element: <UserFavoriteTeams />,
        },
      ],
  }, {
    path: "/schedule/_/date/:date",
    element: <SchedulePage />,
  },{
    path: "/scoreboard/_/date/:date",
    element: <Scores />,
  },
]);