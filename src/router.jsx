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
import TeamStatsScoring from "./Pages/Team/TeamStatsScoring/TeamStatsScoring";
import TeamStatsDiscpline from "./Pages/Team/TeamStatsDiscpline/TeamStatsDiscpline";
import TeamStatsPerformance from "./Pages/Team/TeamStatsPerformance/TeamStatsPerformance";
import TeamTransfers from "./Pages/Team/TeamTransfers/TeamTransfers";
import CompetetionHomePage from "./Pages/Competetion/CompetetionHomePage/CompetetionHomePage";
import CompetetionScores from "./Pages/Competetion/CompetetionScores/CompetetionScores";
import CompetetionTable from "./Pages/Competetion/CompetetionTable/CompetetionTable";
import CompetetionFixtures from "./Pages/Competetion/CompetetionFixtures/CompetetionFixtures";
import CompetetionTeams from "./Pages/Competetion/CompetetionTeams/CompetetionTeams";
import CompetetionTransfers from "./Pages/Competetion/CompetetionTransfers/CompetetionTransfers";
import CompetetionStatScoring from "./Pages/Competetion/CompetetionStatScoring/CompetetionStatScoring";
import CompetetionStatDiscpline from "./Pages/Competetion/CompetetionStatDiscpline/CompetetionStatDiscpline";
import CompetetionStatPerformance from "./Pages/Competetion/CompetetionStatPerformance/CompetetionStatPerformance";
import PlayerOverview from "./Pages/Player/PlayerOverview/PlayerOverview";
import PlayerBio from "./Pages/Player/PlayerBio/PlayerBio";
import PlayerMatches from "./Pages/Player/PlayerMatches/PlayerMatches";
import PlayerStats from "./Pages/Player/PlayerStats/PlayerStats";
import PlayerNews from "./Pages/Player/PlayerNews/PlayerNews";
import ArticlePage from "./Pages/ArticlePage/ArticlePage";
import MainMatchSummaryPage from "./Pages/Match/MatchSummaryPage/MainMatchSummaryPage";
import MainMatchStatisticsPage from "./Pages/Match/MatchStatisticsPage/MainMatchStatisticsPage";
import MatchPreviewPage from "./Pages/Match/MatchPreviewPage/MatchPreviewPage";
import MatchLineUpPage from "./Pages/Match/MatchLineUpPage/MatchLineUpPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    loader:()=>{
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      sessionStorage.setItem("activeNav","homeNav")
      return true;
   }
  },
  {
    path: "/auth/",
    loader:()=>{
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      if(sessionStorage.getItem("activeNav") !== null){
        sessionStorage.removeItem("activeNav")
      }
      return true;
    },
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
    loader:()=>{
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      if(sessionStorage.getItem("activeNav") !== null){
        sessionStorage.removeItem("activeNav")
      }
      return true;
   },
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
    loader:()=>{
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      sessionStorage.setItem("activeNav","ScheduleNav")
      return true;
   },
  },{
    path: "/scoreboard/_/date/:date",
    element: <Scores />,
    loader:()=>{
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      sessionStorage.setItem("activeNav","ScoresNav")
      return true;
   },
  },{
    path: "/competetions",
    element: <CompetetionsPage />,
    loader:()=>{
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      sessionStorage.setItem("activeNav","LeaguesNav")
      return true;
   },
  },{
    path: "/teams",
    element: <Clubs />,
    loader:()=>{
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      sessionStorage.setItem("activeNav","TeamsNav")
      return true;
   },
  },{
    path: "/transfer/",
    loader:()=>{
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      sessionStorage.setItem("activeNav","TransfersNav")
      return true;
   },
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
    loader:()=>{
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      if(sessionStorage.getItem("activeNav") !== null){
        sessionStorage.removeItem("activeNav")
      }
      return true;
   },
    children: [
      {
        path: "_/id/:teamId/:teamSlug",
        element: <TeamPage />,
        loader:()=>{
           sessionStorage.setItem("currentTeamTag","homeSubTab")
           return true;
        }
        
      },{
        path: "_/id/:teamId/:teamSlug/fixture",
        element: <TeamFixture />,
        loader:()=>{
          sessionStorage.setItem("currentTeamTag","fixtureSubTab")
          return true;
       }
      },{
        path: "_/id/:teamId/:teamSlug/results",
        element: <TeamResults />,
        loader:()=>{
          sessionStorage.setItem("currentTeamTag","resultsSubTab")
          return true;
       }
      },{
        path: "_/id/:teamId/:teamSlug/squads",
        element: <TeamSquads />,
        loader:()=>{
          sessionStorage.setItem("currentTeamTag","squadSubTab")
          return true;
       }
      },{
        path: "_/id/:teamId/:teamSlug/stats/scoring",
        element: <TeamStatsScoring />,
        loader:()=>{
          sessionStorage.setItem("currentTeamTag","statsSubTab")
          sessionStorage.setItem("currentStatTag","scoringStatTab");
          return true;
       }
      },{
        path: "_/id/:teamId/:teamSlug/stats/discpline",
        element: <TeamStatsDiscpline />,
        loader:()=>{
          sessionStorage.setItem("currentTeamTag","statsSubTab")
          sessionStorage.setItem("currentStatTag","discplineStatTab");

          return true;
       }
      },{
        path: "_/id/:teamId/:teamSlug/stats/performance",
        element: <TeamStatsPerformance />,
        loader:()=>{
          sessionStorage.setItem("currentTeamTag","statsSubTab")
          sessionStorage.setItem("currentStatTag","performanceStatTab");
          return true;
       }
      },{
        path: "_/id/:teamId/:teamSlug/transfers",
        element: <TeamTransfers />,
        loader:()=>{
          sessionStorage.setItem("currentTeamTag","transfersSubTab")
          return true;
       }
      }
    ],
  },{
    path: "/competetion/",
    loader:()=>{
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      if(sessionStorage.getItem("activeNav") !== null){
        sessionStorage.removeItem("activeNav")
      }
      return true;
   },
    children: [
      {
        path: "_/id/:competId/:competSlug",
        element: <CompetetionHomePage />,
        loader:()=>{
           sessionStorage.setItem("currentCompetetionTag","homeSubTab")
           return true;
        }
      },{
        path: "_/id/:competId/:competSlug/scores",
        element: <CompetetionScores />,
        loader:()=>{
           sessionStorage.setItem("currentCompetetionTag","scoresSubTab")
           return true;
        }
      },{
        path: "_/id/:competId/:competSlug/table",
        element: <CompetetionTable />,
        loader:()=>{
           sessionStorage.setItem("currentCompetetionTag","tableSubTab")
           return true;
        }
      },{
        path: "_/id/:competId/:competSlug/fixtures",
        element: <CompetetionFixtures />,
        loader:()=>{
           sessionStorage.setItem("currentCompetetionTag","fixturesSubTab")
           return true;
        }
      },{
        path: "_/id/:competId/:competSlug/teams",
        element: <CompetetionTeams />,
        loader:()=>{
           sessionStorage.setItem("currentCompetetionTag","teamsSubTab")
           return true;
        }
      },{
        path: "_/id/:competId/:competSlug/transfers",
        element: <CompetetionTransfers />,
        loader:()=>{
           sessionStorage.setItem("currentCompetetionTag","transfersSubTab")
           return true;
        }
      },{
        path: "_/id/:competId/:competSlug/stats/scoring",
        element: <CompetetionStatScoring />,
        loader:()=>{
          sessionStorage.setItem("currentCompetetionTag","statsSubTab")
          sessionStorage.setItem("currentStatTag","scoringStatTab");
          return true;
       }
      },{
        path: "_/id/:competId/:competSlug/stats/discpline",
        element: <CompetetionStatDiscpline />,
        loader:()=>{
          sessionStorage.setItem("currentCompetetionTag","statsSubTab")
          sessionStorage.setItem("currentStatTag","discplineStatTab");
          return true;
       }
      },{
        path: "_/id/:competId/:competSlug/stats/performance",
        element: <CompetetionStatPerformance />,
        loader:()=>{
          sessionStorage.setItem("currentCompetetionTag","statsSubTab")
          sessionStorage.setItem("currentStatTag","performanceStatTab");
          return true;
       }
      },
    ],
  },{
    path: "/player/",
    loader:()=>{
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      if(sessionStorage.getItem("activeNav") !== null){
        sessionStorage.removeItem("activeNav")
      }
      return true;
   },
    children: [
      {
        path: "_/id/:playerId/:playerSlug",
        element: <PlayerOverview />,
        loader:()=>{
           sessionStorage.setItem("currentPlayerTag","overviewSubTab")
           return true;
        }
      },
      {
        path: "_/id/:playerId/:playerSlug/bio",
        element: <PlayerBio />,
        loader:()=>{
           sessionStorage.setItem("currentPlayerTag","bioSubTab")
           return true;
        }
      },
      {
        path: "_/id/:playerId/:playerSlug/news",
        element: <PlayerNews />,
        loader:()=>{
           sessionStorage.setItem("currentPlayerTag","newsSubTab")
           return true;
        }
      },
      {
        path: "_/id/:playerId/:playerSlug/matches",
        element: <PlayerMatches />,
        loader:()=>{
           sessionStorage.setItem("currentPlayerTag","matchesSubTab")
           return true;
        }
      },
      {
        path: "_/id/:playerId/:playerSlug/stats",
        element: <PlayerStats />,
        loader:()=>{
           sessionStorage.setItem("currentPlayerTag","statsSubTab")
           return true;
        }
      }
    ],
  },{
    path: "/article/:articleId/:articleSlug",
    element: <ArticlePage />,
    loader:()=>{
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      if(sessionStorage.getItem("activeNav") !== null){
        sessionStorage.removeItem("activeNav")
      }
      return true;
    }
  },{
    path: "/match/_/",
    loader:()=>{
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      if(sessionStorage.getItem("activeNav") !== null){
        sessionStorage.removeItem("activeNav")
      }
      return true;
   },
    children: [
      {
        path: ":gameId/:gameSlug",
        element: <MainMatchSummaryPage />,
        loader:()=>{
           sessionStorage.setItem("currentGameTag","summarySubTab")
           return true;
        }
      },{
        path: ":gameId/:gameSlug/summary",
        element: <MainMatchSummaryPage />,
        loader:()=>{
           sessionStorage.setItem("currentGameTag","summarySubTab")
           return true;
        }
      },{
        path: ":gameId/:gameSlug/MatchStats",
        element: <MainMatchStatisticsPage />,
        loader:()=>{
           sessionStorage.setItem("currentGameTag","matchstatsSubTab")
           return true;
        }
      },{
        path: ":gameId/:gameSlug/preview",
        element: <MatchPreviewPage />,
        loader:()=>{
           sessionStorage.setItem("currentGameTag","previewSubTab")
           return true;
        }
      },{
        path: ":gameId/:gameSlug/lineups",
        element: <MatchLineUpPage />,
        loader:()=>{
           sessionStorage.setItem("currentGameTag","lineupsSubTab")
           return true;
        }
      }
    ],
  },
]);
