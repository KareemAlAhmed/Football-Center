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
import CompetetionsPage from "./Pages/CompetetionsPage/CompetetionsPage";
import Clubs from "./Pages/Clubs/Clubs";
import TransferNews from "./Pages/Transfer/news/TransferNews";
import MajorTransfers from "./Pages/Transfer/majorTransfer/MajorTransfers";
import TeamPage from "./Pages/Team/TeamPage/TeamPage";
import TeamFixture from "./Pages/Team/TeamFixture/TeamFixture";
import TeamResults from "./Pages/Team/TeamResults/TeamResults";
import TeamSquads from "./Pages/Team/TeamSquads/TeamSquads";


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
  },{
    path: "/competetions",
    element: <CompetetionsPage />,
  },{
    path: "/teams",
    element: <Clubs />,
  },{
    path: "/transfer/",
    children: [
      {
        path: "news",
        element: <TransferNews />,
      },
      {
        path: ":comptId/teams",
        element: <UserFavoriteTeams />,
      },
      {
        path: "majorTransfers",
        element: <MajorTransfers />,
      },
    ],
  },{
    path: "/team/",
    children: [
      {
        path: "_/id/:teamId/:teamSlug",
        element: <TeamPage />
      },{
        path: "_/id/:teamId/:teamSlug/fixture",
        element: <TeamFixture />,
      },{
        path: "_/id/:teamId/:teamSlug/results",
        element: <TeamResults />,
      },{
        path: "_/id/:teamId/:teamSlug/squads",
        element: <TeamSquads />,
      }
    ],
  },
]);
