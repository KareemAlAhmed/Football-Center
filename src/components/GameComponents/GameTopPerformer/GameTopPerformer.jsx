import React from 'react'
import "./GameTopPerformer.css"
import { generateShortName, getDefaultTeamOrCompetLogo, getPlayerLink, getTeamImage, getTeamLink } from '../../../utils/baseUrl';
import { Link } from 'react-router-dom';
export default function GameTopPerformer({type,topScorers,mostAssisters,homeTeam,awayTeam}) {
  return (
    <section className='Card teamTopPerformer'>
        <header className="cardHeader">
            <div className="cardTitle">
                <p>{type}</p>
            </div>   
        </header>
        <div className="Wrapper">
            {
                type==="Top Scorers" ? (
                    <>
                         <div className="teamScorers">
                            <div className="teamNameAndLogo">
                                <div className="teamLogo">
                                    <img src={getTeamImage(homeTeam?.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                                </div>
                                <Link className='teamLink' to={getTeamLink(homeTeam?.id,homeTeam?.slug)}>{homeTeam?.name}</Link>
                                <Link className='teamLink' to={getTeamLink(homeTeam?.id,homeTeam?.slug)}>{generateShortName(homeTeam?.name)}</Link>
                            </div>
                            <div className="scorersList">
                                {topScorers?.homeTeamScorers.map((player,index)=>{
                                    return  <Link key={index} to={getPlayerLink(player.id,player.slug)} className='playerData'>
                                                <div className="playerJersy">
                                                    <svg className="jerseySVG" viewBox="0 0 94.9 92.2"><path fill={player.jersyColor}  d="M79 10.1c-2.6-4.7-6.7-5.2-10.6-5.7-3.9-.5-11.9-2.7-12.5-2.9-3.2-1-5.8.2-8.5.2-2.8 0-5.4-1.2-8.5-.2-.6.2-8.6 2.3-12.5 2.9-3.9.5-8 1.1-10.6 5.7-2.6 4.7-14.7 25.3-14.7 25.3l16 8.1 6.3-8.8s1.7 14.1 1.7 21.5-1.9 25.2-.8 31.8c0 0 1.1 3.2 22 3.2h2.3c20.9 0 21.9-3.2 21.9-3.2 1.1-6.6-.6-24.3-.6-31.7s1.5-21.6 1.5-21.6l6.3 8.7 16-8.1c.1.1-12.1-20.5-14.7-25.2z"></path><g opacity=".4"><path fill="#FFF" d="M4.764 29.32l16.305 8.307-.5.98L4.265 30.3zM90.317 29.37l.5.982-16.312 8.3-.5-.982zM48.7 85.7h-2.3c-20.3 0-22.3-3-22.6-3.5l1-.4c.1.1 2 2.9 21.5 2.9h2.3C68.1 84.7 70 82 70 81.9l1 .4c0 .5-2 3.4-22.3 3.4z"></path></g><path fill="none" stroke="#000" strokeWidth="2.235" strokeLinejoin="round" stroke-miterlimit="10" d="M79 10.1c-2.6-4.7-6.7-5.2-10.6-5.7-3.9-.5-11.9-2.7-12.5-2.9-3.2-1-5.8.2-8.5.2-2.8 0-5.4-1.2-8.5-.2-.6.2-8.6 2.3-12.5 2.9-3.9.5-8 1.1-10.6 5.7-2.6 4.7-14.7 25.3-14.7 25.3l16 8.1 6.3-8.8s1.7 14.1 1.7 21.5-1.9 25.2-.8 31.8c0 0 1.1 3.2 22 3.2h2.3c20.9 0 21.9-3.2 21.9-3.2 1.1-6.6-.6-24.3-.6-31.7s1.5-21.6 1.5-21.6l6.3 8.7 16-8.1c.1.1-12.1-20.5-14.7-25.2z"></path></svg>
                                                    <div className="shirtNumber">{player.number}</div>
                                                </div>
                                                <div className="playerInfo">
                                                    <p className="playerName">{player.name}</p>
                                                    <ul className="playerStats">
                                                        {player.allStats.map((stat,index2)=>{
                                                            return <li key={index2}>{stat}</li>
                                                        })                                            
                                                        }
                                                    </ul>
                                                </div>
                                            </Link>
                                })}
                            </div>
                </div>
                <div className="teamScorers">
                    <div className="teamNameAndLogo">
                        <div className="teamLogo">
                            <img src={getTeamImage(awayTeam?.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                        </div>
                        <Link className='teamLink' to={getTeamLink(awayTeam?.id,awayTeam?.slug)}>{awayTeam?.name}</Link>
                        <Link className='teamLink' to={getTeamLink(homeTeam?.id,homeTeam?.slug)}>{generateShortName(awayTeam?.name)}</Link>
                    </div>
                    <div className="scorersList">
                        {topScorers?.awayTeamScorers.map((player,index)=>{
                            return  <Link key={index} to={getPlayerLink(player.id,player.slug)} className='playerData'>
                                        <div className="playerJersy">
                                            <svg className="jerseySVG" viewBox="0 0 94.9 92.2"><path fill={player.jersyColor}  d="M79 10.1c-2.6-4.7-6.7-5.2-10.6-5.7-3.9-.5-11.9-2.7-12.5-2.9-3.2-1-5.8.2-8.5.2-2.8 0-5.4-1.2-8.5-.2-.6.2-8.6 2.3-12.5 2.9-3.9.5-8 1.1-10.6 5.7-2.6 4.7-14.7 25.3-14.7 25.3l16 8.1 6.3-8.8s1.7 14.1 1.7 21.5-1.9 25.2-.8 31.8c0 0 1.1 3.2 22 3.2h2.3c20.9 0 21.9-3.2 21.9-3.2 1.1-6.6-.6-24.3-.6-31.7s1.5-21.6 1.5-21.6l6.3 8.7 16-8.1c.1.1-12.1-20.5-14.7-25.2z"></path><g opacity=".4"><path fill="#FFF" d="M4.764 29.32l16.305 8.307-.5.98L4.265 30.3zM90.317 29.37l.5.982-16.312 8.3-.5-.982zM48.7 85.7h-2.3c-20.3 0-22.3-3-22.6-3.5l1-.4c.1.1 2 2.9 21.5 2.9h2.3C68.1 84.7 70 82 70 81.9l1 .4c0 .5-2 3.4-22.3 3.4z"></path></g><path fill="none" stroke="#000" strokeWidth="2.235" strokeLinejoin="round" stroke-miterlimit="10" d="M79 10.1c-2.6-4.7-6.7-5.2-10.6-5.7-3.9-.5-11.9-2.7-12.5-2.9-3.2-1-5.8.2-8.5.2-2.8 0-5.4-1.2-8.5-.2-.6.2-8.6 2.3-12.5 2.9-3.9.5-8 1.1-10.6 5.7-2.6 4.7-14.7 25.3-14.7 25.3l16 8.1 6.3-8.8s1.7 14.1 1.7 21.5-1.9 25.2-.8 31.8c0 0 1.1 3.2 22 3.2h2.3c20.9 0 21.9-3.2 21.9-3.2 1.1-6.6-.6-24.3-.6-31.7s1.5-21.6 1.5-21.6l6.3 8.7 16-8.1c.1.1-12.1-20.5-14.7-25.2z"></path></svg>
                                            <div className="shirtNumber">{player.number}</div>
                                        </div>
                                        <div className="playerInfo">
                                            <p className="playerName">{player.name}</p>
                                            <ul className="playerStats">
                                                {player.allStats.map((stat,index2)=>{
                                                    return <li key={index2}>{stat}</li>
                                                })                                            
                                                }
                                            </ul>
                                        </div>
                                    </Link>
                        })}
                    </div>
                </div>
                        </>
                    ) : ( 
                        <>
                             <div className="teamScorers">
                                <div className="teamNameAndLogo">
                        <div className="teamLogo">
                            <img src={getTeamImage(homeTeam?.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                        </div>
                        <Link className='teamLink' to={getTeamLink(homeTeam?.id,homeTeam?.slug)}>{homeTeam?.name}</Link>
                        <Link className='teamLink' to={getTeamLink(homeTeam?.id,homeTeam?.slug)}>{generateShortName(homeTeam?.name)}</Link>
                    </div>
                    <div className="scorersList">
                        {mostAssisters?.homeTeamAssisters.map((player,index)=>{
                            return  <Link key={index} to={getPlayerLink(player.id,player.slug)} className='playerData'>
                                        <div className="playerJersy">
                                            <svg className="jerseySVG" viewBox="0 0 94.9 92.2"><path fill={player.jersyColor}  d="M79 10.1c-2.6-4.7-6.7-5.2-10.6-5.7-3.9-.5-11.9-2.7-12.5-2.9-3.2-1-5.8.2-8.5.2-2.8 0-5.4-1.2-8.5-.2-.6.2-8.6 2.3-12.5 2.9-3.9.5-8 1.1-10.6 5.7-2.6 4.7-14.7 25.3-14.7 25.3l16 8.1 6.3-8.8s1.7 14.1 1.7 21.5-1.9 25.2-.8 31.8c0 0 1.1 3.2 22 3.2h2.3c20.9 0 21.9-3.2 21.9-3.2 1.1-6.6-.6-24.3-.6-31.7s1.5-21.6 1.5-21.6l6.3 8.7 16-8.1c.1.1-12.1-20.5-14.7-25.2z"></path><g opacity=".4"><path fill="#FFF" d="M4.764 29.32l16.305 8.307-.5.98L4.265 30.3zM90.317 29.37l.5.982-16.312 8.3-.5-.982zM48.7 85.7h-2.3c-20.3 0-22.3-3-22.6-3.5l1-.4c.1.1 2 2.9 21.5 2.9h2.3C68.1 84.7 70 82 70 81.9l1 .4c0 .5-2 3.4-22.3 3.4z"></path></g><path fill="none" stroke="#000" strokeWidth="2.235" strokeLinejoin="round" stroke-miterlimit="10" d="M79 10.1c-2.6-4.7-6.7-5.2-10.6-5.7-3.9-.5-11.9-2.7-12.5-2.9-3.2-1-5.8.2-8.5.2-2.8 0-5.4-1.2-8.5-.2-.6.2-8.6 2.3-12.5 2.9-3.9.5-8 1.1-10.6 5.7-2.6 4.7-14.7 25.3-14.7 25.3l16 8.1 6.3-8.8s1.7 14.1 1.7 21.5-1.9 25.2-.8 31.8c0 0 1.1 3.2 22 3.2h2.3c20.9 0 21.9-3.2 21.9-3.2 1.1-6.6-.6-24.3-.6-31.7s1.5-21.6 1.5-21.6l6.3 8.7 16-8.1c.1.1-12.1-20.5-14.7-25.2z"></path></svg>
                                            <div className="shirtNumber">{player.number}</div>
                                        </div>
                                        <div className="playerInfo">
                                            <p className="playerName">{player.name}</p>
                                            <ul className="playerStats">
                                                {player.allStats.map((stat,index2)=>{
                                                    return <li key={index2}>{stat}</li>
                                                })                                            
                                                }
                                            </ul>
                                        </div>
                                    </Link>
                        })}
                    </div>
                </div>
                <div className="teamScorers">
                    <div className="teamNameAndLogo">
                        <div className="teamLogo">
                            <img src={getTeamImage(awayTeam?.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                        </div>
                        <Link className='teamLink' to={getTeamLink(awayTeam?.id,awayTeam?.slug)}>{awayTeam?.name}</Link>
                        <Link className='teamLink' to={getTeamLink(homeTeam?.id,homeTeam?.slug)}>{generateShortName(awayTeam?.name)}</Link>
                    </div>
                    <div className="scorersList">
                        {mostAssisters?.awayTeamAssisters.map((player,index)=>{
                            return  <Link key={index} to={getPlayerLink(player.id,player.slug)} className='playerData'>
                                        <div className="playerJersy">
                                            <svg className="jerseySVG" viewBox="0 0 94.9 92.2"><path fill={player.jersyColor}  d="M79 10.1c-2.6-4.7-6.7-5.2-10.6-5.7-3.9-.5-11.9-2.7-12.5-2.9-3.2-1-5.8.2-8.5.2-2.8 0-5.4-1.2-8.5-.2-.6.2-8.6 2.3-12.5 2.9-3.9.5-8 1.1-10.6 5.7-2.6 4.7-14.7 25.3-14.7 25.3l16 8.1 6.3-8.8s1.7 14.1 1.7 21.5-1.9 25.2-.8 31.8c0 0 1.1 3.2 22 3.2h2.3c20.9 0 21.9-3.2 21.9-3.2 1.1-6.6-.6-24.3-.6-31.7s1.5-21.6 1.5-21.6l6.3 8.7 16-8.1c.1.1-12.1-20.5-14.7-25.2z"></path><g opacity=".4"><path fill="#FFF" d="M4.764 29.32l16.305 8.307-.5.98L4.265 30.3zM90.317 29.37l.5.982-16.312 8.3-.5-.982zM48.7 85.7h-2.3c-20.3 0-22.3-3-22.6-3.5l1-.4c.1.1 2 2.9 21.5 2.9h2.3C68.1 84.7 70 82 70 81.9l1 .4c0 .5-2 3.4-22.3 3.4z"></path></g><path fill="none" stroke="#000" strokeWidth="2.235" strokeLinejoin="round" stroke-miterlimit="10" d="M79 10.1c-2.6-4.7-6.7-5.2-10.6-5.7-3.9-.5-11.9-2.7-12.5-2.9-3.2-1-5.8.2-8.5.2-2.8 0-5.4-1.2-8.5-.2-.6.2-8.6 2.3-12.5 2.9-3.9.5-8 1.1-10.6 5.7-2.6 4.7-14.7 25.3-14.7 25.3l16 8.1 6.3-8.8s1.7 14.1 1.7 21.5-1.9 25.2-.8 31.8c0 0 1.1 3.2 22 3.2h2.3c20.9 0 21.9-3.2 21.9-3.2 1.1-6.6-.6-24.3-.6-31.7s1.5-21.6 1.5-21.6l6.3 8.7 16-8.1c.1.1-12.1-20.5-14.7-25.2z"></path></svg>
                                            <div className="shirtNumber">{player.number}</div>
                                        </div>
                                        <div className="playerInfo">
                                            <p className="playerName">{player.name}</p>
                                            <ul className="playerStats">
                                                {player.allStats.map((stat,index2)=>{
                                                    return <li key={index2}>{stat}</li>
                                                })                                            
                                                }
                                            </ul>
                                        </div>
                                    </Link>
                        })}
                    </div>
                </div>
                        </>
                    )
                }
           
        </div>
    </section>
  )
}
