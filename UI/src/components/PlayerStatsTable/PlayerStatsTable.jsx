import React from 'react'
import "./PlayerStatsTable.css"
import { getDefaultTeamOrCompetLogo, getTeamImage } from '../../utils/baseUrl';
import { Link } from 'react-router-dom';
export default function PlayerStatsTable({stats}) {
  return (
    <div className='positionStatsTable'>
        <div className="tableTitle">
            <p>{stats?.positionName}</p>
        </div>
        <table>
            <thead>
              <tr>
                <th>STATS</th>
                <th>TEAM</th>
                <th>STRT</th>
                <th>FC</th>
                <th>FA</th>
                <th>YC</th>
                <th>RC</th>
                <th>G</th>
                <th>A</th>
                <th>SH</th>
                <th>ST</th>
                <th>OF</th>
              </tr>
            </thead>
            <tbody>
                {stats?.positionStats?.map((stats,index)=>{
                    return <tr key={index}>
                      <td>{stats.name}</td>
                      <td className='teamStat'>
                            <div className="teamLogo">
                                <img src={getTeamImage(stats.team.id)} alt=""  onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }}/>
                            </div>
                            <Link className="teamName">
                                <span>{stats.team.name}</span>
                            </Link>
                      </td>
                      <td>{stats.STRT}</td>
                      <td>{stats.FC}</td>
                      <td>{stats.FA}</td>
                      <td>{stats.YC}</td>
                      <td>{stats.RC}</td>
                      <td>{stats.G}</td>
                      <td>{stats.A}</td>
                      <td>{stats.SH}</td>
                      <td>{stats.ST}</td>
                      <td>{stats.OF}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
  )
}
