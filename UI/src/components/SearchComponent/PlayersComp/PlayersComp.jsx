import React from 'react'
import "./PlayersComp.css"
import { Link } from 'react-router-dom';
import { getDefaultLogo, getPlayerLink } from '../../../utils/baseUrl';
export default function PlayersComp({players,comType,word}) {
  return (
    <section className="Card searchedPlayers">
        <header className="cardHeader">
          <div className="cardTitle">
            <p>PLAYERS</p>
            {
              (comType == null && players.length > 4) && (
                <Link to={`/search/_/q/${word}/type/players`}>See All</Link>
              )
            }
          </div>   
        </header>
        <div className="Wrapper">
          {
            comType==null ? (
              <ul className='playerList'>
              {
                players?.length > 4 ? (
                  players.slice(0,4).map((player,index)=>{
                      return <li key={index}>
                        <Link to={getPlayerLink(player.id,player.slug)}>
                          <div className="playerLogo">
                            <img src={getDefaultLogo()} alt=""  />
                          </div>
                          <div className="playerInfo">
                            <div className="playerName">{player.name}</div>
                            <div className="playerTeam">{player.teamName}</div>
                            <div className="teamLeague">{player.leagueName.toUpperCase()}</div>
                          </div>

                        </Link>
                      </li>
                  })
                 ) : (
                  players.map((player,index)=>{
                      return <li key={index}>
                      <Link to={getPlayerLink(player.id,player.slug)}>
                        <div className="playerLogo">
                          <img src={getDefaultLogo()} alt="" />
                        </div>
                        <div className="playerInfo">
                          <div className="playerName">{player.name}</div>
                          <div className="playerTeam">{player.teamName}</div>
                          <div className="teamLeague">{player.leagueName.toUpperCase()}</div>
                        </div>

                      </Link>
                    </li>
                  })
                 ) 
              }
           </ul>
            ) : (
              <ul className='playerList filteredList'>
              {
                players.map((player,index)=>{
                    return <li key={index}>
                    <Link to={getPlayerLink(player.id,player.slug)}>
                      <div className="playerLogo">
                        <img src={getDefaultLogo()} alt="" />
                      </div>
                      <div className="playerInfo">
                        <div className="playerName">{player.name}</div>
                        <div className="playerTeam">{player.teamName}</div>
                        <div className="teamLeague">{player.leagueName.toUpperCase()}</div>
                      </div>
                    </Link>
                  </li>
                })             
              }
           </ul>
            )
          }
           
        </div>
    </section>
  )
}
