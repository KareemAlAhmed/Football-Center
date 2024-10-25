import { useDispatch, useSelector } from "react-redux";
import GameIntro from "../../../../components/GameComponents/GameIntro/GameIntro";
import "./PreMatchSummary.css"
import React from 'react'
import GameStatsComp from "../../../../components/GameComponents/GameStatsComp/GameStatsComp";
import GameInfo from "../../../../components/GameComponents/GameInfo/GameInfo";
import { Link } from "react-router-dom";
import { GET_TEAM_INFO } from "../../../../redux/team/teamsActions";
import GameTopPerformer from "../../../../components/GameComponents/GameTopPerformer/GameTopPerformer";
import GameLastMatches from "../../../../components/GameComponents/GameLastMatches/GameLastMatches";
import { generateShortName } from "../../../../utils/baseUrl";

export default function PreMatchSummary({gameId,gameSlug}) {
  let currentMatchSummary=useSelector(state=>state.matches.currentMatchSummary)    
  let dispatch=useDispatch()

  return (
    <>
    <div className="pageHeader">
      <GameIntro game={currentMatchSummary} gameId={gameId}  gameSlug={gameSlug} />
    </div>
    <div className="pageContent">
        <div className="leftSideContainer">
          {
            currentMatchSummary?.isLinupsAvai ? (
              <p></p>
            ) :(
              <GameStatsComp stats={currentMatchSummary} />
            )
          }
          <GameInfo info={currentMatchSummary} />
        </div>

        <div className="mainContainer">
          {
            currentMatchSummary?.gameStory && (
              Object.keys(currentMatchSummary?.gameStory).length !== 0 && (
                <div className="gamePreviewQuickInfo">
                    <Link to={`/match/_/${currentMatchSummary?.id}/${currentMatchSummary?.slug}/preview`} > 
                      <h2 className="gamePreviewLink">{currentMatchSummary?.gameStory?.title}</h2>
                      <p className="gamePreviewContent">{currentMatchSummary?.gameStory?.content}</p>
                      <p className="gamePreviewMetaDeta">{currentMatchSummary?.gameStory?.dateAndTime}</p>
                    </Link>
                   
                </div>
              )
            )
          }
          {
            currentMatchSummary?.topScorers && (
              Object.keys(currentMatchSummary?.topScorers).length !== 0 && (
               <GameTopPerformer type="Top Scorers" topScorers={currentMatchSummary?.topScorers} homeTeam={currentMatchSummary?.homeTeam} awayTeam={currentMatchSummary?.awayTeam} />
              )
            )
          }
          {
            currentMatchSummary?.mostAssisters && (
              Object.keys(currentMatchSummary?.mostAssisters).length !== 0 && (
               <GameTopPerformer type="Most Assists" mostAssisters={currentMatchSummary?.mostAssisters} homeTeam={currentMatchSummary?.homeTeam} awayTeam={currentMatchSummary?.awayTeam} />
              )
            )
          }
           {
            currentMatchSummary?.lastMatches && (
              currentMatchSummary?.lastMatches?.length > 0 && (
               <GameLastMatches matches={currentMatchSummary?.lastMatches}  />
              )
            )
          }

          {
            currentMatchSummary?.isLinupsAvai ? (
              <p></p>
            ) :(
              <GameStatsComp stats={currentMatchSummary} />
            )
          }
          <div className="extraComp">
            <GameInfo info={currentMatchSummary}/>
          </div>

        </div>
        {currentMatchSummary.currentCompet?.clubsList && (
          <div className="rightSideContainer">
          <div className="competStanding">
            <h4 className="leagueName">{currentMatchSummary.currentCompet?.name}</h4>
              <table>
                <thead>
                  <tr>
                    <th>TEAM</th>
                    <th>GP</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>GD</th>
                    <th>P</th>
                  </tr>
                </thead>
                <tbody>
                  {currentMatchSummary.currentCompet?.clubsList?.map((team,ind2)=>{
                    return <tr key={ind2}>
                        <td>
                          <Link to={`/team/_/id/${team.id}/${team.slug}`} onClick={()=>dispatch(GET_TEAM_INFO(team.id))}>{team.name}</Link>
                          <Link to={`/team/_/id/${team.id}/${team.slug}`} onClick={()=>dispatch(GET_TEAM_INFO(team.id))}>{generateShortName(team.name)}</Link>
                        </td>
                        <td>{team.GP}</td>
                        <td>{team.W}</td>
                        <td>{team.D}</td>
                        <td>{team.L}</td>
                        <td>{team.GD}</td>
                        <td>{team.P}</td>
                    </tr>
                  })}
                </tbody>
              </table>
              <Link to="" className='moreStandings'>Standings</Link>
            </div>
        </div>
        )}
        
    </div>
  </>
  )
}
