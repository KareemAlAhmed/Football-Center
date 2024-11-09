import React from 'react'
import "./TeamsComp.css"
import { Link } from 'react-router-dom';
import { getDefaultTeamOrCompetLogo, getTeamImage, getTeamLink } from '../../../utils/baseUrl';
export default function TeamsComp({teams,comType,word}) {
    return (
        <section className="Card searchedTeams">
            <header className="cardHeader">
              <div className="cardTitle">
                <p>TEAMS</p>
                {
                  (comType == null && teams.length > 4) && (
                    <Link to={`/search/_/q/${word}/type/teams`}>See All</Link>
                  )
                }
              </div>   
            </header>
            <div className="Wrapper">
              { 
                comType== null ? (
                  <ul className='teamList'>
                    {
                      teams?.length > 4 ? (
                        teams.slice(0,4).map((team,index)=>{
                            return <li key={index}>
                              <Link to={getTeamLink(team.id,team.slug)}>
                                <div className="teamLogo">
                                  <img src={getTeamImage(team.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }}/>
                                </div>
                                <div className="teamInfo">
                                  <div className="teamName">{team.name}</div>
                                  <div className="teamLeague">{team.localLeague.toUpperCase()}</div>
                                </div>
    
                              </Link>
                            </li>
                        })
                       ) : (
                        teams.map((team,index)=>{
                            return <li key={index}>
                            <Link to={getTeamLink(team.id,team.slug)}>
                              <div className="teamLogo">
                                <img src={getTeamImage(team.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                              </div>
                              <div className="teamInfo">
                                <div className="teamName">{team.name}</div>
                                <div className="teamLeague">{team.localLeague.toUpperCase()}</div>
                              </div>
  
                            </Link>
                          </li>
                        })
                       ) 
                    }
                 </ul>
                ): (
                  <ul className='teamList filteredList'>
                    {                     
                        teams.map((team,index)=>{
                            return <li key={index}>
                            <Link to={getTeamLink(team.id,team.slug)}>
                              <div className="teamLogo">
                                <img src={getTeamImage(team.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                              </div>
                              <div className="teamInfo">
                                <div className="teamName">{team.name}</div>
                                <div className="teamLeague">{team.localLeague.toUpperCase()}</div>
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
