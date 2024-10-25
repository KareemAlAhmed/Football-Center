import { Link } from "react-router-dom";
import { getDefaultTeamOrCompetLogo, getPlayerLink, getTeamImage } from "../../../utils/baseUrl";

import "./GameLineUp.css"
import React from 'react'
import GoalIcon from "../../Icons/GoalIcon/GoalIcon.jsx";
import YellowCardSvg from "../../Icons/YellowCardSvg/YellowCardSvg.jsx";
import RedCardSvg from "../../Icons/RedCardSvg/RedCardSvg.jsx";
import SubsSvg from "../../Icons/SubsSvg/SubsSvg.jsx";
import PieChartComp from "../../PieChartComp/PieChartComp.jsx";


export default function GameLineUp({homeTeam,awayTeam,lineUp}) {

  return (
    <div className="LineUp_bothTeams">
        <section className="LineUpContainer">
            <div className="Wrapper">
                <div className="LineUp_Header">
                    <div className="TeamLogo">
                        <img src={getTeamImage(homeTeam?.id)} alt=""  onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }}/>
                    </div>
                    <sapn className="teamFormation">
                        {lineUp?.lineUps?.homeTeamLineUp?.formation}
                    </sapn>
                </div>
                <div className="tacticalFormation">
                    <ul className="tacticalFormationField">
                        {lineUp?.lineUps?.homeTeamLineUp?.tacticalFormation?.map((player,index)=>{
                            return <li key={index} style={{transform:player.position}}>
                                  <div className="playerJersy">
                                            <svg className="jerseySVG" viewBox="0 0 94.9 92.2"><path fill={player.jersyColor}  d="M79 10.1c-2.6-4.7-6.7-5.2-10.6-5.7-3.9-.5-11.9-2.7-12.5-2.9-3.2-1-5.8.2-8.5.2-2.8 0-5.4-1.2-8.5-.2-.6.2-8.6 2.3-12.5 2.9-3.9.5-8 1.1-10.6 5.7-2.6 4.7-14.7 25.3-14.7 25.3l16 8.1 6.3-8.8s1.7 14.1 1.7 21.5-1.9 25.2-.8 31.8c0 0 1.1 3.2 22 3.2h2.3c20.9 0 21.9-3.2 21.9-3.2 1.1-6.6-.6-24.3-.6-31.7s1.5-21.6 1.5-21.6l6.3 8.7 16-8.1c.1.1-12.1-20.5-14.7-25.2z"></path><g opacity=".4"><path fill="#FFF" d="M4.764 29.32l16.305 8.307-.5.98L4.265 30.3zM90.317 29.37l.5.982-16.312 8.3-.5-.982zM48.7 85.7h-2.3c-20.3 0-22.3-3-22.6-3.5l1-.4c.1.1 2 2.9 21.5 2.9h2.3C68.1 84.7 70 82 70 81.9l1 .4c0 .5-2 3.4-22.3 3.4z"></path></g><path fill="none" stroke="#000" strokeWidth="2.235" strokeLinejoin="round" stroke-miterlimit="10" d="M79 10.1c-2.6-4.7-6.7-5.2-10.6-5.7-3.9-.5-11.9-2.7-12.5-2.9-3.2-1-5.8.2-8.5.2-2.8 0-5.4-1.2-8.5-.2-.6.2-8.6 2.3-12.5 2.9-3.9.5-8 1.1-10.6 5.7-2.6 4.7-14.7 25.3-14.7 25.3l16 8.1 6.3-8.8s1.7 14.1 1.7 21.5-1.9 25.2-.8 31.8c0 0 1.1 3.2 22 3.2h2.3c20.9 0 21.9-3.2 21.9-3.2 1.1-6.6-.6-24.3-.6-31.7s1.5-21.6 1.5-21.6l6.3 8.7 16-8.1c.1.1-12.1-20.5-14.7-25.2z"></path></svg>
                                            <div className="shirtNumber">{player.number}</div>
                                        </div>
                                    <span className="playerName">{player.name}</span>
                                    {player?.isSubstitute  && (
                                        <svg className="tactFormSubIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 80" xmlSpace="preserve" ><g><g><path d="M32,6C17.664,6,6,17.664,6,32c0,14.337,11.664,26,26,26c14.337,0,26-11.663,26-26C58,17.664,46.337,6,32,6z M32,54 c-12.131,0-22-9.869-22-22s9.869-22,22-22s22,9.869,22,22S44.131,54,32,54z" /><path d="M41.414,20.586c-0.781-0.781-2.047-0.781-2.828,0c-0.781,0.781-0.781,2.047,0,2.828L39.172,24H20c-1.104,0-2,0.896-2,2 s0.896,2,2,2h19.172l-0.586,0.586c-0.781,0.781-0.781,2.047,0,2.828C38.977,31.805,39.488,32,40,32s1.023-0.195,1.414-0.586l4-4 c0.781-0.781,0.781-2.047,0-2.828L41.414,20.586z" /><path d="M44,36H24.828l0.586-0.586c0.781-0.781,0.781-2.047,0-2.828c-0.78-0.781-2.048-0.781-2.828,0l-4,4 c-0.781,0.781-0.781,2.047,0,2.828l4,4C22.976,43.805,23.488,44,24,44s1.024-0.195,1.414-0.586c0.781-0.781,0.781-2.047,0-2.828 L24.828,40H44c1.104,0,2-0.896,2-2S45.104,36,44,36z" /></g></g></svg>
                                    )}
                                </li>
                        })}
                    </ul>
                </div>
                <div className="onPitchPlayersList">
                    <div className="formationPlayer onPitchPlayers">
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <span>NO.</span>
                                        <span>NAME</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {lineUp?.lineUps?.homeTeamLineUp?.players?.onPitch?.map((player,index)=>{
                                    return <tr key={index}>
                                                <td>
                                                    <div className="mainPlayer">
                                                        <span className="playerName">{player?.number}</span>
                                                        <Link className="playerLink" to={getPlayerLink(player?.id,player?.slug)}>{player?.name}</Link>
                                                        
                                                        {player?.scored  && (
                                                            player.goalTime.map((goal,index)=>{
                                                                return <div className="iconSvg" key={index}>
                                                                    <GoalIcon />
                                                                    <div className="iconValueContainer">
                                                                        <span>{goal.goalTime}</span>
                                                                    </div>
                                                                </div>
                                                            })
                                                             
                                                        )}
                                                        {player?.hasYC  && (
                                                            player.yc.map((ycCard,index)=>{
                                                                return <div className="iconSvg" key={index}>
                                                                    <YellowCardSvg />
                                                                    <div className="iconValueContainer">
                                                                        <span>{ycCard.ycTime}</span>
                                                                    </div>
                                                                </div>
                                                            })                                                           
                                                        )}
                                                        {player?.hasRC  && (
                                                            player.rc.map((rcCard,index)=>{
                                                                return <div className="iconSvg" key={index}>
                                                                    <RedCardSvg />
                                                                    <div className="iconValueContainer">
                                                                        <span>{rcCard.rcTime}</span>
                                                                    </div>
                                                                </div>
                                                            }) 
                                                           
                                                        )}
                                                    </div>
                                                    {player?.isSubstitute  && (
                                                        <div className="subedPlayer">
                                                            <div className="iconSvg" key={index}>
                                                                <SubsSvg />
                                                                <div className="iconValueContainer">
                                                                    <span>{player?.subedWith?.time}</span>
                                                                </div>
                                                            </div>   
                                                            <span className="playerName">{player?.subedWith?.number}</span>
                                                            <Link className="playerLink" to={getPlayerLink(player?.subedWith?.id,player?.subedWith?.slug)}>{player?.subedWith?.name}</Link>
                                                            {player?.subedWith?.scored  && (
                                                                  player.subedWith.goalTime.map((goal,index)=>{
                                                                    return <div className="iconSvg" key={index}>
                                                                        <GoalIcon />
                                                                        <div className="iconValueContainer">
                                                                            <span>{goal.goalTime}</span>
                                                                        </div>
                                                                    </div>
                                                                })
                                                            )}
                                                            {player?.subedWith?.hasYC  && (
                                                                 player?.subedWith?.yc.map((ycCard,index)=>{
                                                                    return <div className="iconSvg" key={index}>
                                                                         <YellowCardSvg />
                                                                        <div className="iconValueContainer">
                                                                            <span>{ycCard.ycTime}</span>
                                                                        </div>
                                                                    </div>
                                                                })  
                                                            )}
                                                            {player?.subedWith?.hasRC  && (
                                                                    player?.subedWith?.rc.map((rcCard,index)=>{
                                                                        return <div className="iconSvg" key={index}>
                                                                            <RedCardSvg />
                                                                            <div className="iconValueContainer">
                                                                                <span>{rcCard.rcTime}</span>
                                                                            </div>
                                                                        </div>
                                                                    }) 
                                                            )}
                                                        </div>
                                                    )}
                                                </td>
                                        </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="onSubstitutesPlayersList">
                    <div className="formationPlayer onSubstitutesPlayers">
                        <table>
                            <thead>
                                <tr>
                                    <th colSpan="2">Substitutes</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {lineUp?.lineUps?.homeTeamLineUp?.players?.substitutes?.map((player,index)=>{
                                    return <tr key={index}>
                                                    <td>
                                                    <div className="mainPlayer">
                                                        <span className="playerName">{player?.number}</span>
                                                        <Link className="playerLink" to={getPlayerLink(player?.id,player?.slug)}>{player?.name}</Link>
                                                    </div>
                                                </td>
                                        </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>         
            </div>
        </section>
        <section className="LineUpContainer">
            <div className="Wrapper">
                <div className="LineUp_Header">
                    <div className="TeamLogo">
                        <img src={getTeamImage(awayTeam?.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                    </div>
                    <sapn className="teamFormation">
                        {lineUp?.lineUps?.awayTeamLineUp?.formation}
                    </sapn>
                </div>
                <div className="tacticalFormation">
                    <ul className="tacticalFormationField">
                        {lineUp?.lineUps?.awayTeamLineUp?.tacticalFormation?.map((player,index)=>{
                            return <li key={index} style={{transform:player.position}}>
                                        <div className="playerJersy">
                                            <svg className="jerseySVG" viewBox="0 0 94.9 92.2"><path fill={player.jersyColor}  d="M79 10.1c-2.6-4.7-6.7-5.2-10.6-5.7-3.9-.5-11.9-2.7-12.5-2.9-3.2-1-5.8.2-8.5.2-2.8 0-5.4-1.2-8.5-.2-.6.2-8.6 2.3-12.5 2.9-3.9.5-8 1.1-10.6 5.7-2.6 4.7-14.7 25.3-14.7 25.3l16 8.1 6.3-8.8s1.7 14.1 1.7 21.5-1.9 25.2-.8 31.8c0 0 1.1 3.2 22 3.2h2.3c20.9 0 21.9-3.2 21.9-3.2 1.1-6.6-.6-24.3-.6-31.7s1.5-21.6 1.5-21.6l6.3 8.7 16-8.1c.1.1-12.1-20.5-14.7-25.2z"></path><g opacity=".4"><path fill="#FFF" d="M4.764 29.32l16.305 8.307-.5.98L4.265 30.3zM90.317 29.37l.5.982-16.312 8.3-.5-.982zM48.7 85.7h-2.3c-20.3 0-22.3-3-22.6-3.5l1-.4c.1.1 2 2.9 21.5 2.9h2.3C68.1 84.7 70 82 70 81.9l1 .4c0 .5-2 3.4-22.3 3.4z"></path></g><path fill="none" stroke="#000" strokeWidth="2.235" strokeLinejoin="round" stroke-miterlimit="10" d="M79 10.1c-2.6-4.7-6.7-5.2-10.6-5.7-3.9-.5-11.9-2.7-12.5-2.9-3.2-1-5.8.2-8.5.2-2.8 0-5.4-1.2-8.5-.2-.6.2-8.6 2.3-12.5 2.9-3.9.5-8 1.1-10.6 5.7-2.6 4.7-14.7 25.3-14.7 25.3l16 8.1 6.3-8.8s1.7 14.1 1.7 21.5-1.9 25.2-.8 31.8c0 0 1.1 3.2 22 3.2h2.3c20.9 0 21.9-3.2 21.9-3.2 1.1-6.6-.6-24.3-.6-31.7s1.5-21.6 1.5-21.6l6.3 8.7 16-8.1c.1.1-12.1-20.5-14.7-25.2z"></path></svg>
                                            <div className="shirtNumber">{player.number}</div>
                                        </div>
                                        <span className="playerName">{player.name}</span>
                                        {player?.isSubstitute  && (
                                             <svg className="tactFormSubIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 80" xmlSpace="preserve" ><g><g><path d="M32,6C17.664,6,6,17.664,6,32c0,14.337,11.664,26,26,26c14.337,0,26-11.663,26-26C58,17.664,46.337,6,32,6z M32,54 c-12.131,0-22-9.869-22-22s9.869-22,22-22s22,9.869,22,22S44.131,54,32,54z" /><path d="M41.414,20.586c-0.781-0.781-2.047-0.781-2.828,0c-0.781,0.781-0.781,2.047,0,2.828L39.172,24H20c-1.104,0-2,0.896-2,2 s0.896,2,2,2h19.172l-0.586,0.586c-0.781,0.781-0.781,2.047,0,2.828C38.977,31.805,39.488,32,40,32s1.023-0.195,1.414-0.586l4-4 c0.781-0.781,0.781-2.047,0-2.828L41.414,20.586z" /><path d="M44,36H24.828l0.586-0.586c0.781-0.781,0.781-2.047,0-2.828c-0.78-0.781-2.048-0.781-2.828,0l-4,4 c-0.781,0.781-0.781,2.047,0,2.828l4,4C22.976,43.805,23.488,44,24,44s1.024-0.195,1.414-0.586c0.781-0.781,0.781-2.047,0-2.828 L24.828,40H44c1.104,0,2-0.896,2-2S45.104,36,44,36z" /></g></g></svg>
                                        )}
                                    </li>
                        })}
                    </ul>
                </div>
                <div className="onPitchPlayersList">
                    <div className="formationPlayer onPitchPlayers">
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <span>NO.</span>
                                        <span>NAME</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {lineUp?.lineUps?.awayTeamLineUp?.players?.onPitch?.map((player,index)=>{
                                    return <tr key={index}>
                                                <td>
                                                    <div className="mainPlayer">
                                                        <span className="playerName">{player?.number}</span>
                                                        <Link className="playerLink" to={getPlayerLink(player?.id,player?.slug)}>{player?.name}</Link>
                                                        {player?.scored  && (
                                                                player.goalTime.map((goal,index)=>{
                                                                    return <div className="iconSvg" key={index}>
                                                                        <GoalIcon />
                                                                        <div className="iconValueContainer">
                                                                            <span>{goal.goalTime}</span>
                                                                        </div>
                                                                    </div>
                                                                })
                                                        )}
                                                        {player?.hasYC  && (
                                                               player.yc.map((ycCard,index)=>{
                                                                return <div className="iconSvg" key={index}>
                                                                      <YellowCardSvg />
                                                                    <div className="iconValueContainer">
                                                                        <span>{ycCard.ycTime}</span>
                                                                    </div>
                                                                </div>
                                                            })
                                                        )}
                                                        {player?.hasRC  && (
                                                            player.rc.map((rcCard,index)=>{
                                                                return <div className="iconSvg" key={index}>
                                                                    <RedCardSvg />
                                                                    <div className="iconValueContainer">
                                                                        <span>{rcCard.rcTime}</span>
                                                                    </div>
                                                                </div>
                                                            }) 
                                                        )}
                                                    </div>
                                                    {player?.isSubstitute  && (
                                                        <div className="subedPlayer">

                                                            <div className="iconSvg" key={index}>
                                                                <SubsSvg />
                                                                <div className="iconValueContainer">
                                                                    <span>{player?.subedWith?.time}</span>
                                                                </div>
                                                            </div>                                                            
                                                            <span className="playerName">{player?.subedWith?.number}</span>
                                                            <Link className="playerLink" to={getPlayerLink(player?.subedWith?.id,player?.subedWith?.slug)}>{player?.subedWith?.name}</Link>
                                                            {player?.subedWith?.scored  && (
                                                                player.subedWith.goalTime.map((goal,index)=>{
                                                                    return <div className="iconSvg" key={index}>
                                                                        <GoalIcon />
                                                                        <div className="iconValueContainer">
                                                                            <span>{goal.goalTime}</span>
                                                                        </div>
                                                                    </div>
                                                                })
                                                            )}
                                                            {player?.subedWith?.hasYC  && (
                                                                player?.subedWith?.yc.map((ycCard,index)=>{
                                                                    return <div className="iconSvg" key={index}>
                                                                         <YellowCardSvg />
                                                                        <div className="iconValueContainer">
                                                                            <span>{ycCard.ycTime}</span>
                                                                        </div>
                                                                    </div>
                                                                })    
                                                            )}
                                                            {player?.subedWith?.hasRC  && (
                                                                player.rc.map((rcCard,index)=>{
                                                                    return <div className="iconSvg" key={index}>
                                                                        <RedCardSvg />
                                                                        <div className="iconValueContainer">
                                                                            <span>{rcCard.rcTime}</span>
                                                                        </div>
                                                                    </div>
                                                                }) 
                                                            )}
                                                        </div>
                                                    )}
                                                </td>
                                        </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="onSubstitutesPlayersList">
                    <div className="formationPlayer onSubstitutesPlayers">
                        <table>
                            <thead>
                                <tr>
                                    <th colSpan="2">Substitutes</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {lineUp?.lineUps?.awayTeamLineUp?.players?.substitutes?.map((player,index)=>{
                                    return <tr key={index}>
                                                <td>
                                                    <div className="mainPlayer">
                                                        <span className="playerName">{player?.number}</span>
                                                        <Link className="playerLink" to={getPlayerLink(player?.id,player?.slug)}>{player?.name}</Link>
                                                    </div>
                                                </td>
                                        </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>         
            </div>
            
        </section>
    </div>
  )
}
