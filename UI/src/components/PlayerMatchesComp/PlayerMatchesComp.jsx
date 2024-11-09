import React from 'react'
import "./PlayerMatchesComp.css"
import { getDefaultTeamOrCompetLogo, getTeamImage } from '../../utils/baseUrl';
import { Link } from 'react-router-dom';
export default function PlayerMatchesComp({competetionMatches}) {
  return (
    <div className='matchesBlock'>
        <div className="tableTitle">
            <p>{competetionMatches?.competStage}</p>
        </div>
        <table>
            <thead>
                <tr>
                    <th>DATE</th>
                    <th>OPP</th>
                    <th>RESULT</th>
                    <th>G</th>
                    <th>A</th>
                    <th>SH</th>
                    <th>ST</th>
                    <th>FC</th>
                    <th>FA</th>
                    <th>OF</th>
                    <th>YC</th>
                    <th>RC</th>
                </tr>
            </thead>
            <tbody>
                {competetionMatches?.stageMatches?.map((match,index)=>{
                return <tr key={index}>
                <td><span>{match.date}</span></td>
                <td className='teamColumn'>
                    <div className="homeOrAway">{match.homeOrAway}</div>
                    <div className="teamLogo">
                    <img src={getTeamImage(match.awayTeam.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                    </div>
                    <div className="teamName">
                    <Link to={`/team/_/id/${match.awayTeam.id}/${match.awayTeam.slug}`}><span>{match.awayTeam.name}</span></Link>
                    </div>
                </td>
                <td className='results'>

                    <span className={ match.status === "W" ? " status win" : match.status === "L" ? " status lose" : " status draw"}>{match.status}</span>
                    <span className="score">{match.score}</span>
                </td>
                <td>{match.currentPlayer.G}</td>
                <td>{match.currentPlayer.A}</td>
                <td>{match.currentPlayer.SH}</td>
                <td>{match.currentPlayer.ST}</td>
                <td>{match.currentPlayer.FC}</td>
                <td>{match.currentPlayer.FA}</td>
                <td>{match.currentPlayer.OF}</td>
                <td>{match.currentPlayer.YC}</td>
                <td>{match.currentPlayer.RC}</td>
                </tr>
                })}
            </tbody>
            </table>
    </div>
  )
}
