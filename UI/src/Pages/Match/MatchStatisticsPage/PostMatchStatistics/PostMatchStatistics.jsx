import { Link } from "react-router-dom";
import "./PostMatchStatistics.css"
import React from 'react'
import { GET_TEAM_INFO } from "../../../../redux/team/teamsActions";
import GameInfo from "../../../../components/GameComponents/GameInfo/GameInfo";
import GameLastMatches from "../../../../components/GameComponents/GameLastMatches/GameLastMatches";
import GameStatsComp from "../../../../components/GameComponents/GameStatsComp/GameStatsComp";
import TeamLastGames from "../../../../components/GameComponents/TeamLastGames/TeamLastGames";
import GameIntro from "../../../../components/GameComponents/GameIntro/GameIntro";
import { useDispatch, useSelector } from "react-redux";
import { generateShortName } from "../../../../utils/baseUrl";

export default function PostMatchStatistics({gameId,gameSlug}) {
    let currentMatchStats=useSelector(state=>state.matches.currentMatchStats)    
    let dispatch=useDispatch()
  
    return (
      <>
      <div className="pageHeader">
        <GameIntro game={currentMatchStats} gameId={gameId}  gameSlug={gameSlug} />
      </div>
      <div className="pageContent">

          <div className="mainContainer">
            
            {
              currentMatchStats?.teamStats && (
                currentMatchStats?.teamStats?.length > 0 && (
                    <GameStatsComp stats={currentMatchStats} type="PostMatch" />
                )
              )
            }
            {
              currentMatchStats?.lastMatches && (
                Object.keys(currentMatchStats?.lastMatches).length !== 0 && (
                    <>
                        <TeamLastGames team={currentMatchStats?.homeTeam} matches={currentMatchStats?.lastMatches?.homeTeamMatches} />
                        <TeamLastGames team={currentMatchStats?.awayTeam} matches={currentMatchStats?.lastMatches?.awayTeamMatches} />
                    </>
                )
              )
            }
            {
              currentMatchStats?.lastFiveHeadToHead && (
                currentMatchStats?.lastFiveHeadToHead?.length > 0 && (
                 <GameLastMatches matches={currentMatchStats?.lastFiveHeadToHead}  />
                )
              )
            }
          </div>
          {currentMatchStats.currentCompet?.clubsList && (
            <div className="rightSideContainer">
              <GameInfo info={currentMatchStats} />
              <div className="competStanding">
                <h4 className="leagueName">{currentMatchStats.currentCompet?.name}</h4>
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
                      {currentMatchStats.currentCompet?.clubsList?.map((team,ind2)=>{
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
