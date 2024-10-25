import { Link } from "react-router-dom";
import { getDefaultTeamOrCompetLogo, getGameLink, getTeamImage, getTeamLink } from "../../../utils/baseUrl";
import "./GameLastMatches.css"
import React from 'react'

export default function GameLastMatches({matches}) {
  return (
    <section className='Card gameLastTimes'>
        <header className="cardHeader">
            <div className="cardTitle">
                <p>Head To Head Record</p>
            </div>   
        </header>
        <div className="Wrapper">
            <table>
                <thead>
                    <tr>
                        <th colspan="5">LAST FIVE GAMES</th>
                        <th>DATE</th>
                        <th>COMPETETION</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        matches?.map((match,index)=>{
                            return  <tr key={index}>
                                        <td className="teamName">
                                            <Link to={getTeamLink(match.homeTeam.id,match.homeTeam.slug)}>{match.homeTeam.name}</Link>
                                        </td>
                                        <td className="teamLogo">
                                            <img src={getTeamImage(match.homeTeam.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />    
                                        </td>
                                        <td className="matchScores">
                                            <Link to={getGameLink(match.id,match.slug)}>{match.score}</Link>
                                        </td>
                                        <td className="teamLogo">
                                            <img src={getTeamImage(match.awayTeam.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                                        </td>
                                        <td className="teamName">                               
                                            <Link to={getTeamLink(match.awayTeam.id,match.awayTeam.slug)}>{match.awayTeam.name}</Link>
                                        </td>
                                        <td className="matchDate">{match.date}</td>
                                        <td className="matchCompet">{match.compet}</td>
                                    </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    </section>
  )
}
