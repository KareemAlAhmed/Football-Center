import React, { useState } from 'react'
import "./SwitchPlayersComp.css"
import { Link } from 'react-router-dom';
import { GET_TEAM_PLAYERS_DATA } from '../../redux/players/playersAction';
import { useDispatch, useSelector } from 'react-redux';
export default function SwitchPlayersComp() {
    let playersLoading=useSelector(state=>state.players.playersLoading) 
    let currentPlayerInfo=useSelector(state=>state.players.currentPlayerInfo) 
    let currentSwitchPlayers=useSelector(state=>state.players.currentSwitchPlayers)
    let [selectedTeam,setSelectedTeam]=useState(currentPlayerInfo?.team?.id)
    let [selectedPosition,setSelectedPosition]=useState(`F`)
    let [selectedTeamSlug,setSelectedTeamSlug]=useState(currentPlayerInfo?.team?.slug)
    let [selectedStatsTeam,setSelectedStatsTeam]=useState(currentPlayerInfo?.team?.id)
    let [selectedCompet,setSelectedCompet]=useState(currentPlayerInfo?.currentLeague?.id)
    
    let dispatch=useDispatch()
    let allPosition=[
        {
          slug:"F",
          name:"Forward"
        },{
          slug:"M",
          name:"Midfielder"
        },
        {
          slug:"D",
          name:"Defender"
        },{
          slug:"G",
          name:"GoalKeeper"
        },
      ]
      const setTeamSlug=(name)=>{
        let slug=name.textContent.toLowerCase().split(" ")
        setSelectedTeam(name.value)
        setSelectedTeamSlug(slug.join("-"))
      }
    return (
    <section className="Card switchPlayer">
        <header className="cardHeader">
          <div className="cardTitle">
            <p>Switch Player</p>
          </div>   
        </header>
        <div className="Wrapper">
          <div className="filters">
            <select className='dropdown__select' onChange={(e)=>{dispatch(GET_TEAM_PLAYERS_DATA(e.target.value));setTeamSlug(e.target.selectedOptions[0])}} >
                {currentPlayerInfo.currentLeague?.teams?.map((team,index)=>{
                    if(selectedTeam === team.id){
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
            <select className='dropdown__select' onChange={(e)=>{setSelectedPosition(e.target.value)}} >
                {allPosition.map((position,index)=>{
                    if(selectedPosition === position.slug){
                        return <option key={index} selected value={position.slug} >
                            {position.name}
                        </option>
                    }else{
                        return <option key={index} value={position.slug} >
                            {position.name}
                        </option>
                    }
                })}
            </select>
          </div>
            {playersLoading ? (
              <div className="playersloadingBlock">
              <span className="ouro ouro3">
                <span className="left"><span className="anim"></span></span>
                <span className="right"><span className="anim"></span></span>
              </span>
            </div>
            ) : (
                <ul className="listOfPlayers"> 
                  {currentSwitchPlayers.length > 0 ? (
                    currentSwitchPlayers?.map((player,index)=>{
                      if(selectedPosition === player.POS){
                        return  <li key={index}>
                                <div className="playerNumber">
                                  <svg className="jerseySVG" viewBox="0 0 94.9 92.2"><path fill="#ffffff" d="M79 10.1c-2.6-4.7-6.7-5.2-10.6-5.7-3.9-.5-11.9-2.7-12.5-2.9-3.2-1-5.8.2-8.5.2-2.8 0-5.4-1.2-8.5-.2-.6.2-8.6 2.3-12.5 2.9-3.9.5-8 1.1-10.6 5.7-2.6 4.7-14.7 25.3-14.7 25.3l16 8.1 6.3-8.8s1.7 14.1 1.7 21.5-1.9 25.2-.8 31.8c0 0 1.1 3.2 22 3.2h2.3c20.9 0 21.9-3.2 21.9-3.2 1.1-6.6-.6-24.3-.6-31.7s1.5-21.6 1.5-21.6l6.3 8.7 16-8.1c.1.1-12.1-20.5-14.7-25.2z"></path><g opacity=".4"><path fill="#FFF" d="M4.764 29.32l16.305 8.307-.5.98L4.265 30.3zM90.317 29.37l.5.982-16.312 8.3-.5-.982zM48.7 85.7h-2.3c-20.3 0-22.3-3-22.6-3.5l1-.4c.1.1 2 2.9 21.5 2.9h2.3C68.1 84.7 70 82 70 81.9l1 .4c0 .5-2 3.4-22.3 3.4z"></path></g><path fill="none" stroke="#000" strokeWidth="2.235" strokeLinejoin="round" stroke-miterlimit="10" d="M79 10.1c-2.6-4.7-6.7-5.2-10.6-5.7-3.9-.5-11.9-2.7-12.5-2.9-3.2-1-5.8.2-8.5.2-2.8 0-5.4-1.2-8.5-.2-.6.2-8.6 2.3-12.5 2.9-3.9.5-8 1.1-10.6 5.7-2.6 4.7-14.7 25.3-14.7 25.3l16 8.1 6.3-8.8s1.7 14.1 1.7 21.5-1.9 25.2-.8 31.8c0 0 1.1 3.2 22 3.2h2.3c20.9 0 21.9-3.2 21.9-3.2 1.1-6.6-.6-24.3-.6-31.7s1.5-21.6 1.5-21.6l6.3 8.7 16-8.1c.1.1-12.1-20.5-14.7-25.2z"></path></svg>
                                  <div className="shirtNumber">{player.number}</div>
                                </div>
                                <div className="playerName">
                                  <span>{player.name}</span>
                                  <span>{player.number}</span>
                                </div>
                              </li>
                      }
                    })
                 ) : (
                    currentPlayerInfo.team?.squads?.map((player,index)=>{
                      if(selectedPosition === player.POS){
                        return  <li key={index}>
                                <div className="playerNumber">
                                  <svg className="jerseySVG" viewBox="0 0 94.9 92.2"><path fill="#ffffff" d="M79 10.1c-2.6-4.7-6.7-5.2-10.6-5.7-3.9-.5-11.9-2.7-12.5-2.9-3.2-1-5.8.2-8.5.2-2.8 0-5.4-1.2-8.5-.2-.6.2-8.6 2.3-12.5 2.9-3.9.5-8 1.1-10.6 5.7-2.6 4.7-14.7 25.3-14.7 25.3l16 8.1 6.3-8.8s1.7 14.1 1.7 21.5-1.9 25.2-.8 31.8c0 0 1.1 3.2 22 3.2h2.3c20.9 0 21.9-3.2 21.9-3.2 1.1-6.6-.6-24.3-.6-31.7s1.5-21.6 1.5-21.6l6.3 8.7 16-8.1c.1.1-12.1-20.5-14.7-25.2z"></path><g opacity=".4"><path fill="#FFF" d="M4.764 29.32l16.305 8.307-.5.98L4.265 30.3zM90.317 29.37l.5.982-16.312 8.3-.5-.982zM48.7 85.7h-2.3c-20.3 0-22.3-3-22.6-3.5l1-.4c.1.1 2 2.9 21.5 2.9h2.3C68.1 84.7 70 82 70 81.9l1 .4c0 .5-2 3.4-22.3 3.4z"></path></g><path fill="none" stroke="#000" strokeWidth="2.235" strokeLinejoin="round" stroke-miterlimit="10" d="M79 10.1c-2.6-4.7-6.7-5.2-10.6-5.7-3.9-.5-11.9-2.7-12.5-2.9-3.2-1-5.8.2-8.5.2-2.8 0-5.4-1.2-8.5-.2-.6.2-8.6 2.3-12.5 2.9-3.9.5-8 1.1-10.6 5.7-2.6 4.7-14.7 25.3-14.7 25.3l16 8.1 6.3-8.8s1.7 14.1 1.7 21.5-1.9 25.2-.8 31.8c0 0 1.1 3.2 22 3.2h2.3c20.9 0 21.9-3.2 21.9-3.2 1.1-6.6-.6-24.3-.6-31.7s1.5-21.6 1.5-21.6l6.3 8.7 16-8.1c.1.1-12.1-20.5-14.7-25.2z"></path></svg>
                                  <div className="shirtNumber">{player.number}</div>
                                </div>
                                <div className="playerName">
                                  <span>{player.name}</span>
                                  <span>{player.number}</span>
                                </div>
                              </li>
                      }
                    })
                 )}
                </ul>
            )}
            <footer>
              <Link to={`/team/_/id/${selectedTeam}/${selectedTeamSlug}/squads`}>Full Squad</Link>
            </footer>
          </div>
        </section>
  )
}
