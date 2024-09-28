import { Link } from "react-router-dom";
import { getPlayerLink, getTeamImage } from "../../../utils/baseUrl";

import "./GameLineUp.css"
import React from 'react'

export default function GameLineUp({homeTeam,awayTeam,lineUp}) {
  return (
    <div className="LineUp_bothTeams">
        <section className="LineUpContainer">
            <div className="Wrapper">
                <div className="LineUp_Header">
                    <div className="TeamLogo">
                        <img src={getTeamImage(homeTeam?.id)} alt="" />
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
                                            <svg class="jerseySVG" viewBox="0 0 94.9 92.2"><path fill={player.jersyColor}  d="M79 10.1c-2.6-4.7-6.7-5.2-10.6-5.7-3.9-.5-11.9-2.7-12.5-2.9-3.2-1-5.8.2-8.5.2-2.8 0-5.4-1.2-8.5-.2-.6.2-8.6 2.3-12.5 2.9-3.9.5-8 1.1-10.6 5.7-2.6 4.7-14.7 25.3-14.7 25.3l16 8.1 6.3-8.8s1.7 14.1 1.7 21.5-1.9 25.2-.8 31.8c0 0 1.1 3.2 22 3.2h2.3c20.9 0 21.9-3.2 21.9-3.2 1.1-6.6-.6-24.3-.6-31.7s1.5-21.6 1.5-21.6l6.3 8.7 16-8.1c.1.1-12.1-20.5-14.7-25.2z"></path><g opacity=".4"><path fill="#FFF" d="M4.764 29.32l16.305 8.307-.5.98L4.265 30.3zM90.317 29.37l.5.982-16.312 8.3-.5-.982zM48.7 85.7h-2.3c-20.3 0-22.3-3-22.6-3.5l1-.4c.1.1 2 2.9 21.5 2.9h2.3C68.1 84.7 70 82 70 81.9l1 .4c0 .5-2 3.4-22.3 3.4z"></path></g><path fill="none" stroke="#000" stroke-width="2.235" stroke-linejoin="round" stroke-miterlimit="10" d="M79 10.1c-2.6-4.7-6.7-5.2-10.6-5.7-3.9-.5-11.9-2.7-12.5-2.9-3.2-1-5.8.2-8.5.2-2.8 0-5.4-1.2-8.5-.2-.6.2-8.6 2.3-12.5 2.9-3.9.5-8 1.1-10.6 5.7-2.6 4.7-14.7 25.3-14.7 25.3l16 8.1 6.3-8.8s1.7 14.1 1.7 21.5-1.9 25.2-.8 31.8c0 0 1.1 3.2 22 3.2h2.3c20.9 0 21.9-3.2 21.9-3.2 1.1-6.6-.6-24.3-.6-31.7s1.5-21.6 1.5-21.6l6.3 8.7 16-8.1c.1.1-12.1-20.5-14.7-25.2z"></path></svg>
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
                                                                    <svg className="scoredIcon" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0">
                                                                        <path d="m89.801 46.699c-0.69922-8.6992-4.1992-16.602-9.6016-22.801-0.10156-0.10156-0.19922-0.19922-0.30078-0.30078-5.3984-6-12.5-10.5-20.602-12.398-0.10156 0-0.19922-0.10156-0.30078-0.10156h-0.10156c-2.8984-0.69922-5.8984-1-9-1-4.1016 0-8.1016 0.60156-11.898 1.8008-8 2.5-14.898 7.3984-19.801 13.898-0.10156 0.10156-0.10156 0.10156-0.19922 0.19922-4.1016 5.5-6.8984 12-7.8008 19.199 0 0.10156-0.10156 0.30078-0.10156 0.39844-0.19922 1.5-0.30078 3-0.30078 4.6016 0 6.8984 1.8008 13.398 4.8008 19v0.10156c0 0.10156 0.10156 0.10156 0.10156 0.19922 4.8984 8.8008 13 15.602 22.699 18.699 0.10156 0 0.10156 0.10156 0.19922 0.10156 4.1055 1.0039 8.207 1.7031 12.406 1.7031s8.3008-0.69922 12.102-1.8984c0.10156 0 0.19922 0 0.19922-0.10156 9.1992-3 17.102-9.3008 22-17.5 0.10156-0.10156 0.10156-0.19922 0.10156-0.19922 3.5977-5.9023 5.5977-12.902 5.5977-20.301 0-1.1016 0-2.1016-0.10156-3.1992 0 0 0-0.10156-0.097657-0.10156zm-77.5-1.5977c0.80078-6.6016 3.3984-12.602 7.1992-17.699l13.699 0.19922 5.8008 8.3984-5.3008 16.199-11.398 2.1992zm36.699 32.898-11.102 8c-9-3-16.5-9.3008-21.102-17.398l5.8008-12.398 11.301-2.1992 15.102 11zm-8.6016-44.102c-0.10156 0-0.30078 0-0.39844 0.10156l-5.3008-7.5 4.3984-12.898c3.3984-1 7.1016-1.6016 10.801-1.6016 2.8008 0 5.6016 0.30078 8.3008 0.89844l5.3984 12.602-5.1016 8.5h-18.098zm21.602 52.203-11-8.1016v-13l14.5-10.5 11.602 2.6992 5.3008 12.602c-4.6016 7.5977-11.801 13.398-20.402 16.301zm15.602-30.801-11.102-2.6016-5.8984-18.199c0-0.10156 0-0.10156-0.10156-0.19922l4.8008-8 13.602-1.1992c5 5.8008 8.1992 13.102 9 21.102z"/>
                                                                    </svg> 
                                                                    <div className="iconValueContainer">
                                                                        <span>{goal.goalTime}</span>
                                                                    </div>
                                                                </div>
                                                            })
                                                             
                                                        )}
                                                        {player?.hasYC  && (
                                                            player.yc.map((ycCard,index)=>{
                                                                return <div className="iconSvg" key={index}>
                                                                     <svg className="yellowCardIcon" xmlns="http://www.w3.org/2000/svg"  version="1.1"  viewBox="0 0 100 125" x="0px" y="0px" fill-rule="evenodd" clip-rule="evenodd"><g><path class="fil0" d="M37.65 24.26l24.7 0c2.08,0 3.97,0.85 5.34,2.22 1.38,1.38 2.23,3.28 2.23,5.35l0 36.34c0,2.07 -0.85,3.97 -2.22,5.34 -1.38,1.38 -3.27,2.23 -5.35,2.23l-24.7 0c-2.08,0 -3.98,-0.85 -5.35,-2.22 -1.37,-1.37 -2.22,-3.27 -2.22,-5.35l0 -36.34c0,-2.08 0.85,-3.98 2.22,-5.35 1.37,-1.37 3.27,-2.22 5.35,-2.22z"/></g></svg> 
                                                                    <div className="iconValueContainer">
                                                                        <span>{ycCard.ycTime}</span>
                                                                    </div>
                                                                </div>
                                                            })                                                           
                                                        )}
                                                        {player?.hasRC  && (
                                                            player.rc.map((rcCard,index)=>{
                                                                return <div className="iconSvg" key={index}>
                                                                      <svg className="redCardIcon" xmlns="http://www.w3.org/2000/svg"  version="1.1"  viewBox="0 0 100 125" x="0px" y="0px" fill-rule="evenodd" clip-rule="evenodd"><g><path class="fil0" d="M37.65 24.26l24.7 0c2.08,0 3.97,0.85 5.34,2.22 1.38,1.38 2.23,3.28 2.23,5.35l0 36.34c0,2.07 -0.85,3.97 -2.22,5.34 -1.38,1.38 -3.27,2.23 -5.35,2.23l-24.7 0c-2.08,0 -3.98,-0.85 -5.35,-2.22 -1.37,-1.37 -2.22,-3.27 -2.22,-5.35l0 -36.34c0,-2.08 0.85,-3.98 2.22,-5.35 1.37,-1.37 3.27,-2.22 5.35,-2.22z"/></g></svg>
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
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 80" xmlSpace="preserve" ><g><g><path d="M32,6C17.664,6,6,17.664,6,32c0,14.337,11.664,26,26,26c14.337,0,26-11.663,26-26C58,17.664,46.337,6,32,6z M32,54 c-12.131,0-22-9.869-22-22s9.869-22,22-22s22,9.869,22,22S44.131,54,32,54z" /><path d="M41.414,20.586c-0.781-0.781-2.047-0.781-2.828,0c-0.781,0.781-0.781,2.047,0,2.828L39.172,24H20c-1.104,0-2,0.896-2,2 s0.896,2,2,2h19.172l-0.586,0.586c-0.781,0.781-0.781,2.047,0,2.828C38.977,31.805,39.488,32,40,32s1.023-0.195,1.414-0.586l4-4 c0.781-0.781,0.781-2.047,0-2.828L41.414,20.586z" /><path d="M44,36H24.828l0.586-0.586c0.781-0.781,0.781-2.047,0-2.828c-0.78-0.781-2.048-0.781-2.828,0l-4,4 c-0.781,0.781-0.781,2.047,0,2.828l4,4C22.976,43.805,23.488,44,24,44s1.024-0.195,1.414-0.586c0.781-0.781,0.781-2.047,0-2.828 L24.828,40H44c1.104,0,2-0.896,2-2S45.104,36,44,36z" /></g></g></svg>
                                                                <div className="iconValueContainer">
                                                                    <span>{player?.subedWith?.time}</span>
                                                                </div>
                                                            </div>   
                                                            <span className="playerName">{player?.subedWith?.number}</span>
                                                            <Link className="playerLink" to={getPlayerLink(player?.subedWith?.id,player?.subedWith?.slug)}>{player?.subedWith?.name}</Link>
                                                            {player?.subedWith?.scored  && (
                                                                  player.subedWith.goalTime.map((goal,index)=>{
                                                                    return <div className="iconSvg" key={index}>
                                                                        <svg className="scoredIcon" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0">
                                                                            <path d="m89.801 46.699c-0.69922-8.6992-4.1992-16.602-9.6016-22.801-0.10156-0.10156-0.19922-0.19922-0.30078-0.30078-5.3984-6-12.5-10.5-20.602-12.398-0.10156 0-0.19922-0.10156-0.30078-0.10156h-0.10156c-2.8984-0.69922-5.8984-1-9-1-4.1016 0-8.1016 0.60156-11.898 1.8008-8 2.5-14.898 7.3984-19.801 13.898-0.10156 0.10156-0.10156 0.10156-0.19922 0.19922-4.1016 5.5-6.8984 12-7.8008 19.199 0 0.10156-0.10156 0.30078-0.10156 0.39844-0.19922 1.5-0.30078 3-0.30078 4.6016 0 6.8984 1.8008 13.398 4.8008 19v0.10156c0 0.10156 0.10156 0.10156 0.10156 0.19922 4.8984 8.8008 13 15.602 22.699 18.699 0.10156 0 0.10156 0.10156 0.19922 0.10156 4.1055 1.0039 8.207 1.7031 12.406 1.7031s8.3008-0.69922 12.102-1.8984c0.10156 0 0.19922 0 0.19922-0.10156 9.1992-3 17.102-9.3008 22-17.5 0.10156-0.10156 0.10156-0.19922 0.10156-0.19922 3.5977-5.9023 5.5977-12.902 5.5977-20.301 0-1.1016 0-2.1016-0.10156-3.1992 0 0 0-0.10156-0.097657-0.10156zm-77.5-1.5977c0.80078-6.6016 3.3984-12.602 7.1992-17.699l13.699 0.19922 5.8008 8.3984-5.3008 16.199-11.398 2.1992zm36.699 32.898-11.102 8c-9-3-16.5-9.3008-21.102-17.398l5.8008-12.398 11.301-2.1992 15.102 11zm-8.6016-44.102c-0.10156 0-0.30078 0-0.39844 0.10156l-5.3008-7.5 4.3984-12.898c3.3984-1 7.1016-1.6016 10.801-1.6016 2.8008 0 5.6016 0.30078 8.3008 0.89844l5.3984 12.602-5.1016 8.5h-18.098zm21.602 52.203-11-8.1016v-13l14.5-10.5 11.602 2.6992 5.3008 12.602c-4.6016 7.5977-11.801 13.398-20.402 16.301zm15.602-30.801-11.102-2.6016-5.8984-18.199c0-0.10156 0-0.10156-0.10156-0.19922l4.8008-8 13.602-1.1992c5 5.8008 8.1992 13.102 9 21.102z"/>
                                                                        </svg> 
                                                                        <div className="iconValueContainer">
                                                                            <span>{goal.goalTime}</span>
                                                                        </div>
                                                                    </div>
                                                                })
                                                            )}
                                                            {player?.subedWith?.hasYC  && (
                                                                 player?.subedWith?.yc.map((ycCard,index)=>{
                                                                    return <div className="iconSvg" key={index}>
                                                                         <svg className="yellowCardIcon" xmlns="http://www.w3.org/2000/svg"  version="1.1"  viewBox="0 0 100 125" x="0px" y="0px" fill-rule="evenodd" clip-rule="evenodd"><g><path class="fil0" d="M37.65 24.26l24.7 0c2.08,0 3.97,0.85 5.34,2.22 1.38,1.38 2.23,3.28 2.23,5.35l0 36.34c0,2.07 -0.85,3.97 -2.22,5.34 -1.38,1.38 -3.27,2.23 -5.35,2.23l-24.7 0c-2.08,0 -3.98,-0.85 -5.35,-2.22 -1.37,-1.37 -2.22,-3.27 -2.22,-5.35l0 -36.34c0,-2.08 0.85,-3.98 2.22,-5.35 1.37,-1.37 3.27,-2.22 5.35,-2.22z"/></g></svg> 
                                                                        <div className="iconValueContainer">
                                                                            <span>{ycCard.ycTime}</span>
                                                                        </div>
                                                                    </div>
                                                                })  
                                                            )}
                                                            {player?.subedWith?.hasRC  && (
                                                                    player?.subedWith?.rc.map((rcCard,index)=>{
                                                                        return <div className="iconSvg" key={index}>
                                                                              <svg className="redCardIcon" xmlns="http://www.w3.org/2000/svg"  version="1.1"  viewBox="0 0 100 125" x="0px" y="0px" fill-rule="evenodd" clip-rule="evenodd"><g><path class="fil0" d="M37.65 24.26l24.7 0c2.08,0 3.97,0.85 5.34,2.22 1.38,1.38 2.23,3.28 2.23,5.35l0 36.34c0,2.07 -0.85,3.97 -2.22,5.34 -1.38,1.38 -3.27,2.23 -5.35,2.23l-24.7 0c-2.08,0 -3.98,-0.85 -5.35,-2.22 -1.37,-1.37 -2.22,-3.27 -2.22,-5.35l0 -36.34c0,-2.08 0.85,-3.98 2.22,-5.35 1.37,-1.37 3.27,-2.22 5.35,-2.22z"/></g></svg>
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
                        <img src={getTeamImage(awayTeam?.id)} alt="" />
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
                                            <svg class="jerseySVG" viewBox="0 0 94.9 92.2"><path fill={player.jersyColor}  d="M79 10.1c-2.6-4.7-6.7-5.2-10.6-5.7-3.9-.5-11.9-2.7-12.5-2.9-3.2-1-5.8.2-8.5.2-2.8 0-5.4-1.2-8.5-.2-.6.2-8.6 2.3-12.5 2.9-3.9.5-8 1.1-10.6 5.7-2.6 4.7-14.7 25.3-14.7 25.3l16 8.1 6.3-8.8s1.7 14.1 1.7 21.5-1.9 25.2-.8 31.8c0 0 1.1 3.2 22 3.2h2.3c20.9 0 21.9-3.2 21.9-3.2 1.1-6.6-.6-24.3-.6-31.7s1.5-21.6 1.5-21.6l6.3 8.7 16-8.1c.1.1-12.1-20.5-14.7-25.2z"></path><g opacity=".4"><path fill="#FFF" d="M4.764 29.32l16.305 8.307-.5.98L4.265 30.3zM90.317 29.37l.5.982-16.312 8.3-.5-.982zM48.7 85.7h-2.3c-20.3 0-22.3-3-22.6-3.5l1-.4c.1.1 2 2.9 21.5 2.9h2.3C68.1 84.7 70 82 70 81.9l1 .4c0 .5-2 3.4-22.3 3.4z"></path></g><path fill="none" stroke="#000" stroke-width="2.235" stroke-linejoin="round" stroke-miterlimit="10" d="M79 10.1c-2.6-4.7-6.7-5.2-10.6-5.7-3.9-.5-11.9-2.7-12.5-2.9-3.2-1-5.8.2-8.5.2-2.8 0-5.4-1.2-8.5-.2-.6.2-8.6 2.3-12.5 2.9-3.9.5-8 1.1-10.6 5.7-2.6 4.7-14.7 25.3-14.7 25.3l16 8.1 6.3-8.8s1.7 14.1 1.7 21.5-1.9 25.2-.8 31.8c0 0 1.1 3.2 22 3.2h2.3c20.9 0 21.9-3.2 21.9-3.2 1.1-6.6-.6-24.3-.6-31.7s1.5-21.6 1.5-21.6l6.3 8.7 16-8.1c.1.1-12.1-20.5-14.7-25.2z"></path></svg>
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
                                                                        <svg className="scoredIcon" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0">
                                                                            <path d="m89.801 46.699c-0.69922-8.6992-4.1992-16.602-9.6016-22.801-0.10156-0.10156-0.19922-0.19922-0.30078-0.30078-5.3984-6-12.5-10.5-20.602-12.398-0.10156 0-0.19922-0.10156-0.30078-0.10156h-0.10156c-2.8984-0.69922-5.8984-1-9-1-4.1016 0-8.1016 0.60156-11.898 1.8008-8 2.5-14.898 7.3984-19.801 13.898-0.10156 0.10156-0.10156 0.10156-0.19922 0.19922-4.1016 5.5-6.8984 12-7.8008 19.199 0 0.10156-0.10156 0.30078-0.10156 0.39844-0.19922 1.5-0.30078 3-0.30078 4.6016 0 6.8984 1.8008 13.398 4.8008 19v0.10156c0 0.10156 0.10156 0.10156 0.10156 0.19922 4.8984 8.8008 13 15.602 22.699 18.699 0.10156 0 0.10156 0.10156 0.19922 0.10156 4.1055 1.0039 8.207 1.7031 12.406 1.7031s8.3008-0.69922 12.102-1.8984c0.10156 0 0.19922 0 0.19922-0.10156 9.1992-3 17.102-9.3008 22-17.5 0.10156-0.10156 0.10156-0.19922 0.10156-0.19922 3.5977-5.9023 5.5977-12.902 5.5977-20.301 0-1.1016 0-2.1016-0.10156-3.1992 0 0 0-0.10156-0.097657-0.10156zm-77.5-1.5977c0.80078-6.6016 3.3984-12.602 7.1992-17.699l13.699 0.19922 5.8008 8.3984-5.3008 16.199-11.398 2.1992zm36.699 32.898-11.102 8c-9-3-16.5-9.3008-21.102-17.398l5.8008-12.398 11.301-2.1992 15.102 11zm-8.6016-44.102c-0.10156 0-0.30078 0-0.39844 0.10156l-5.3008-7.5 4.3984-12.898c3.3984-1 7.1016-1.6016 10.801-1.6016 2.8008 0 5.6016 0.30078 8.3008 0.89844l5.3984 12.602-5.1016 8.5h-18.098zm21.602 52.203-11-8.1016v-13l14.5-10.5 11.602 2.6992 5.3008 12.602c-4.6016 7.5977-11.801 13.398-20.402 16.301zm15.602-30.801-11.102-2.6016-5.8984-18.199c0-0.10156 0-0.10156-0.10156-0.19922l4.8008-8 13.602-1.1992c5 5.8008 8.1992 13.102 9 21.102z"/>
                                                                        </svg> 
                                                                        <div className="iconValueContainer">
                                                                            <span>{goal.goalTime}</span>
                                                                        </div>
                                                                    </div>
                                                                })
                                                        )}
                                                        {player?.hasYC  && (
                                                               player.yc.map((ycCard,index)=>{
                                                                return <div className="iconSvg" key={index}>
                                                                     <svg className="yellowCardIcon" xmlns="http://www.w3.org/2000/svg"  version="1.1"  viewBox="0 0 100 125" x="0px" y="0px" fill-rule="evenodd" clip-rule="evenodd"><g><path class="fil0" d="M37.65 24.26l24.7 0c2.08,0 3.97,0.85 5.34,2.22 1.38,1.38 2.23,3.28 2.23,5.35l0 36.34c0,2.07 -0.85,3.97 -2.22,5.34 -1.38,1.38 -3.27,2.23 -5.35,2.23l-24.7 0c-2.08,0 -3.98,-0.85 -5.35,-2.22 -1.37,-1.37 -2.22,-3.27 -2.22,-5.35l0 -36.34c0,-2.08 0.85,-3.98 2.22,-5.35 1.37,-1.37 3.27,-2.22 5.35,-2.22z"/></g></svg> 
                                                                    <div className="iconValueContainer">
                                                                        <span>{ycCard.ycTime}</span>
                                                                    </div>
                                                                </div>
                                                            })
                                                        )}
                                                        {player?.hasRC  && (
                                                            player.rc.map((rcCard,index)=>{
                                                                return <div className="iconSvg" key={index}>
                                                                      <svg className="redCardIcon" xmlns="http://www.w3.org/2000/svg"  version="1.1"  viewBox="0 0 100 125" x="0px" y="0px" fill-rule="evenodd" clip-rule="evenodd"><g><path class="fil0" d="M37.65 24.26l24.7 0c2.08,0 3.97,0.85 5.34,2.22 1.38,1.38 2.23,3.28 2.23,5.35l0 36.34c0,2.07 -0.85,3.97 -2.22,5.34 -1.38,1.38 -3.27,2.23 -5.35,2.23l-24.7 0c-2.08,0 -3.98,-0.85 -5.35,-2.22 -1.37,-1.37 -2.22,-3.27 -2.22,-5.35l0 -36.34c0,-2.08 0.85,-3.98 2.22,-5.35 1.37,-1.37 3.27,-2.22 5.35,-2.22z"/></g></svg>
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
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 80" xmlSpace="preserve" ><g><g><path d="M32,6C17.664,6,6,17.664,6,32c0,14.337,11.664,26,26,26c14.337,0,26-11.663,26-26C58,17.664,46.337,6,32,6z M32,54 c-12.131,0-22-9.869-22-22s9.869-22,22-22s22,9.869,22,22S44.131,54,32,54z" /><path d="M41.414,20.586c-0.781-0.781-2.047-0.781-2.828,0c-0.781,0.781-0.781,2.047,0,2.828L39.172,24H20c-1.104,0-2,0.896-2,2 s0.896,2,2,2h19.172l-0.586,0.586c-0.781,0.781-0.781,2.047,0,2.828C38.977,31.805,39.488,32,40,32s1.023-0.195,1.414-0.586l4-4 c0.781-0.781,0.781-2.047,0-2.828L41.414,20.586z" /><path d="M44,36H24.828l0.586-0.586c0.781-0.781,0.781-2.047,0-2.828c-0.78-0.781-2.048-0.781-2.828,0l-4,4 c-0.781,0.781-0.781,2.047,0,2.828l4,4C22.976,43.805,23.488,44,24,44s1.024-0.195,1.414-0.586c0.781-0.781,0.781-2.047,0-2.828 L24.828,40H44c1.104,0,2-0.896,2-2S45.104,36,44,36z" /></g></g></svg>
                                                                <div className="iconValueContainer">
                                                                    <span>{player?.subedWith?.time}</span>
                                                                </div>
                                                            </div>                                                            
                                                            <span className="playerName">{player?.subedWith?.number}</span>
                                                            <Link className="playerLink" to={getPlayerLink(player?.subedWith?.id,player?.subedWith?.slug)}>{player?.subedWith?.name}</Link>
                                                            {player?.subedWith?.scored  && (
                                                                player.subedWith.goalTime.map((goal,index)=>{
                                                                    return <div className="iconSvg" key={index}>
                                                                        <svg className="scoredIcon" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0">
                                                                            <path d="m89.801 46.699c-0.69922-8.6992-4.1992-16.602-9.6016-22.801-0.10156-0.10156-0.19922-0.19922-0.30078-0.30078-5.3984-6-12.5-10.5-20.602-12.398-0.10156 0-0.19922-0.10156-0.30078-0.10156h-0.10156c-2.8984-0.69922-5.8984-1-9-1-4.1016 0-8.1016 0.60156-11.898 1.8008-8 2.5-14.898 7.3984-19.801 13.898-0.10156 0.10156-0.10156 0.10156-0.19922 0.19922-4.1016 5.5-6.8984 12-7.8008 19.199 0 0.10156-0.10156 0.30078-0.10156 0.39844-0.19922 1.5-0.30078 3-0.30078 4.6016 0 6.8984 1.8008 13.398 4.8008 19v0.10156c0 0.10156 0.10156 0.10156 0.10156 0.19922 4.8984 8.8008 13 15.602 22.699 18.699 0.10156 0 0.10156 0.10156 0.19922 0.10156 4.1055 1.0039 8.207 1.7031 12.406 1.7031s8.3008-0.69922 12.102-1.8984c0.10156 0 0.19922 0 0.19922-0.10156 9.1992-3 17.102-9.3008 22-17.5 0.10156-0.10156 0.10156-0.19922 0.10156-0.19922 3.5977-5.9023 5.5977-12.902 5.5977-20.301 0-1.1016 0-2.1016-0.10156-3.1992 0 0 0-0.10156-0.097657-0.10156zm-77.5-1.5977c0.80078-6.6016 3.3984-12.602 7.1992-17.699l13.699 0.19922 5.8008 8.3984-5.3008 16.199-11.398 2.1992zm36.699 32.898-11.102 8c-9-3-16.5-9.3008-21.102-17.398l5.8008-12.398 11.301-2.1992 15.102 11zm-8.6016-44.102c-0.10156 0-0.30078 0-0.39844 0.10156l-5.3008-7.5 4.3984-12.898c3.3984-1 7.1016-1.6016 10.801-1.6016 2.8008 0 5.6016 0.30078 8.3008 0.89844l5.3984 12.602-5.1016 8.5h-18.098zm21.602 52.203-11-8.1016v-13l14.5-10.5 11.602 2.6992 5.3008 12.602c-4.6016 7.5977-11.801 13.398-20.402 16.301zm15.602-30.801-11.102-2.6016-5.8984-18.199c0-0.10156 0-0.10156-0.10156-0.19922l4.8008-8 13.602-1.1992c5 5.8008 8.1992 13.102 9 21.102z"/>
                                                                        </svg> 
                                                                        <div className="iconValueContainer">
                                                                            <span>{goal.goalTime}</span>
                                                                        </div>
                                                                    </div>
                                                                })
                                                            )}
                                                            {player?.subedWith?.hasYC  && (
                                                                player?.subedWith?.yc.map((ycCard,index)=>{
                                                                    return <div className="iconSvg" key={index}>
                                                                         <svg className="yellowCardIcon" xmlns="http://www.w3.org/2000/svg"  version="1.1"  viewBox="0 0 100 125" x="0px" y="0px" fill-rule="evenodd" clip-rule="evenodd"><g><path class="fil0" d="M37.65 24.26l24.7 0c2.08,0 3.97,0.85 5.34,2.22 1.38,1.38 2.23,3.28 2.23,5.35l0 36.34c0,2.07 -0.85,3.97 -2.22,5.34 -1.38,1.38 -3.27,2.23 -5.35,2.23l-24.7 0c-2.08,0 -3.98,-0.85 -5.35,-2.22 -1.37,-1.37 -2.22,-3.27 -2.22,-5.35l0 -36.34c0,-2.08 0.85,-3.98 2.22,-5.35 1.37,-1.37 3.27,-2.22 5.35,-2.22z"/></g></svg> 
                                                                        <div className="iconValueContainer">
                                                                            <span>{ycCard.ycTime}</span>
                                                                        </div>
                                                                    </div>
                                                                })    
                                                            )}
                                                            {player?.subedWith?.hasRC  && (
                                                                player.rc.map((rcCard,index)=>{
                                                                    return <div className="iconSvg" key={index}>
                                                                          <svg className="redCardIcon" xmlns="http://www.w3.org/2000/svg"  version="1.1"  viewBox="0 0 100 125" x="0px" y="0px" fill-rule="evenodd" clip-rule="evenodd"><g><path class="fil0" d="M37.65 24.26l24.7 0c2.08,0 3.97,0.85 5.34,2.22 1.38,1.38 2.23,3.28 2.23,5.35l0 36.34c0,2.07 -0.85,3.97 -2.22,5.34 -1.38,1.38 -3.27,2.23 -5.35,2.23l-24.7 0c-2.08,0 -3.98,-0.85 -5.35,-2.22 -1.37,-1.37 -2.22,-3.27 -2.22,-5.35l0 -36.34c0,-2.08 0.85,-3.98 2.22,-5.35 1.37,-1.37 3.27,-2.22 5.35,-2.22z"/></g></svg>
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
            {/* <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 125"
    xmlSpace="preserve"
    fillRule="evenodd"
    clipRule="evenodd"
  >

    <g>
      <path className="fil0" d="M37.65 24.26l24.7 0c2.08,0 3.97,0.85 5.34,2.22 1.38,1.38 2.23,3.28 2.23,5.35l0 36.34c0,2.07 -0.85,3.97 -2.22,5.34 -1.38,1.38 -3.27,2.23 -5.35,2.23l-24.7 0c-2.08,0 -3.98,-0.85 -5.35,-2.22 -1.37,-1.37 -2.22,-3.27 -2.22,-5.35l0 -36.34c0,-2.08 0.85,-3.98 2.22,-5.35 1.37,-1.37 3.27,-2.22 5.35,-2.22z" />
    </g>
    
  </svg> */}
  
        </section>
    </div>
  )
}
