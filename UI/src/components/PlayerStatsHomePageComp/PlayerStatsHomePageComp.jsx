import { Link } from "react-router-dom";
import "./PlayerStatsHomePageComp.css"
import React, { useState } from 'react'
import { GET_PLAYER_CURRENT_TEAMS_STATS_INFO, GET_TEAM_PLAYERS_DATA } from "../../redux/players/playersAction";
import { useDispatch, useSelector } from "react-redux";

export default function PlayerStatsHomePageComp({playerId}) {
    let currentPlayerInfo=useSelector(state=>state.players.currentPlayerInfo) 
    let currentTeamsStats=useSelector(state=>state.players.currentPlayerCurrentTeamsStatsFiltered) 
    let dispatch=useDispatch()
    let team=currentPlayerInfo?.team?.id
    let compet=currentPlayerInfo?.currentLeague?.id

    if(currentTeamsStats?.everySeasonStats?.length > 0){
        if(currentTeamsStats?.teamId !== "any"){
            team=currentTeamsStats?.teamId
        }
        if(currentTeamsStats?.teamId !== "any"){
            compet=currentTeamsStats?.competSlug
        }   
    }
    let [selectedStatsTeam,setSelectedStatsTeam]=useState(team)
    let [selectedCompet,setSelectedCompet]=useState(compet)
    const setCompetSlug=(name)=>{
        let slug=name.textContent
        console.log(slug)
        dispatch(GET_PLAYER_CURRENT_TEAMS_STATS_INFO(playerId,selectedStatsTeam,slug,"id"));
        setSelectedCompet(name.value)
    }
    return (
        <>
           {currentTeamsStats?.everySeasonStats?.length > 0 ? (
                 <section className="playerStats">
                 <header className="cardHeader">
                   <div className="cardTitle">
                     <p>Statistics</p>
                     <Link>see all</Link>
                   </div>   
                 </header>
                 <div className="Wrapper">                         
                        <div className="statsfilters">
                            {currentPlayerInfo.allTeams?.length > 0  && (
                                <select className='dropdown__select' onChange={(e)=>{dispatch(GET_PLAYER_CURRENT_TEAMS_STATS_INFO(playerId,e.target.value));setSelectedStatsTeam(e.target.value)}} >
                                    {currentPlayerInfo.allTeams?.map((team,index)=>{
                                        if(selectedStatsTeam === team.id){
                                            return <option key={index} selected value={team.id} >
                                                {team.name}
                                            </option>
                                        }else{
                                            return <option key={index} value={team.id} >
                                                {team.name}
                                            </option>
                                        }
                                    })}
                                </select>
                            )}
                            {currentTeamsStats.allCompetions?.length > 0 && (
                                <select className='dropdown__select' onChange={(e)=>{dispatch(GET_PLAYER_CURRENT_TEAMS_STATS_INFO(playerId,selectedStatsTeam,e.target.value));setSelectedCompet(e.target.value)}} >
                                {currentTeamsStats.allCompetions?.map((compet,index)=>{
                                if(selectedCompet === compet.slug){
                                    return <option key={index} selected value={compet.slug} >
                                        {compet.name}
                                    </option>
                                }else{
                                    return <option key={index} value={compet.slug} >
                                        {compet.name}
                                    </option>
                                }
                            })}
                            </select>
                            )}                      
                        </div>
                    
                        
                    
                     <div className="allStats">
                           <table>
                             <thead>
                               <tr>
                                 <th>Stats</th>
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
                                 {currentTeamsStats?.everySeasonStats.map((stats,index)=>{
                                     return <tr key={index}>
                                       <td>{stats.name}</td>
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
                 </div>         
             </section>
           ) : (
            <section className="playerStats">
            <header className="cardHeader">
              <div className="cardTitle">
                <p>Statistics</p>
                <Link>see all</Link>
              </div>   
            </header>
            <div className="Wrapper">
                    {(currentPlayerInfo.allTeams?.length > 0 || currentPlayerInfo.allCompetions?.length > 0) && (
                         <div className="statsfilters">
                    
                         {currentPlayerInfo.allTeams?.length > 0 && (
                                 <select className='dropdown__select' onChange={(e)=>{dispatch(GET_PLAYER_CURRENT_TEAMS_STATS_INFO(playerId,e.target.value));setSelectedStatsTeam(e.target.selectedOptions[0])}} >
                                 {currentPlayerInfo.allTeams?.map((team,index)=>{
                                     if(selectedStatsTeam === team.id){
                                         return <option key={index} selected value={team.id} >
                                             {team.name}
                                         </option>
                                     }else{
                                         return <option key={index} value={team.id} >
                                             {team.name}
                                         </option>
                                     }
                                 })}
                             </select>
                             )}
                           
                           {currentPlayerInfo.allCompetions?.length > 0 && (
                               <select className='dropdown__select' onChange={(e)=>{setCompetSlug(e.target.selectedOptions[0])}} >
                               {currentPlayerInfo.allCompetions?.map((compet,index)=>{
                                  if(selectedCompet === compet.id){
                                      return <option key={index} selected value={compet.id} >
                                          {compet.name}
                                      </option>
                                  }else{
                                      return <option key={index} value={compet.id} >
                                          {compet.name}
                                      </option>
                                  }
                              })}
                              </select>
                           )}
                         </div>
                    )}
               
                <div className="allStats">
                    {currentPlayerInfo?.stats?.allInfo.length > 0 ? (
                        <table>
                        <thead>
                          <tr>
                            <th>Stats</th>
                            <th>STRT</th>
                            <th>FC</th>
                            <th>FA</th>
                            <th className="hideStat">YC</th>
                            <th className="hideStat">RC</th>
                            <th>G</th>
                            <th>A</th>
                            <th>SH</th>
                            <th>ST</th>
                            <th>OF</th>
                          </tr>
                        </thead>
                        <tbody>
                            {currentPlayerInfo?.stats?.allInfo.map((stats,index)=>{
                                return <tr key={index}>
                                  <td>{stats.leagueSeason ? stats.leagueSeason : stats.name}</td>
                                  <td>{stats.STRT}</td>
                                  <td>{stats.FC}</td>
                                  <td>{stats.FA}</td>
                                  <td className="hideStat">{stats.YC}</td>
                                  <td className="hideStat">{stats.RC}</td>
                                  <td>{stats.G}</td>
                                  <td>{stats.A}</td>
                                  <td>{stats.SH}</td>
                                  <td>{stats.ST}</td>
                                  <td>{stats.OF}</td>
                                </tr>
                            })}
                        </tbody>
                      </table>
                    ):(
                        <p className="noSumStats">No Summarize Stats Yet!</p>
                    )}
                      
                </div>
            </div>
        </section>
           )}   
        </>
         

  )
}
