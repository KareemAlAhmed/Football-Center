import { Link } from "react-router-dom";
import "./CompetsComp.css"
import React from 'react'
import { getCompetImage, getCompetLink, getDefaultTeamOrCompetLogo } from "../../../utils/baseUrl";

export default function CompetsComp({compets,comType,word}) {
    return (
        <section className="Card searchedCompets">
            <header className="cardHeader">
              <div className="cardTitle">
                <p>LEAGUES</p>
                {
                  (comType == null && compets.length > 4) && (
                    <Link to={`/search/_/q/${word}/type/leagues`}>See All</Link>
                  )
                }
               
              </div>   
            </header>
            <div className="Wrapper">
              { 
                comType == null ? (
                  <ul className='competList'>
                    {
                      compets?.length > 4 ? (
                        compets.slice(0,4).map((compet,index)=>{
                            return <li key={index}>
                              <Link to={getCompetLink(compet.id,compet.slug)}>
                                <div className="competLogo">
                                  <img src={getCompetImage(compet.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                                </div>
                                <div className="competInfo">
                                  <div className="competName">{compet.leagueName}</div>
                                </div>
    
                              </Link>
                            </li>
                        })
                       ) : (
                        compets.map((compet,index)=>{
                            return <li key={index}>
                            <Link to={getCompetLink(compet.id,compet.slug)}>
                              <div className="competLogo">
                                <img src={getCompetImage(compet.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                              </div>
                              <div className="competInfo">
                                <div className="competName">{compet.leagueName}</div>
                              </div>
  
                            </Link>
                          </li>
                        })
                       ) 
                    }
                 </ul>
                ) : (
                  <ul className='competList filteredList'>
                    {                     
                      compets.map((compet,index)=>{
                          return <li key={index}>
                          <Link to={getCompetLink(compet.id,compet.slug)}>
                            <div className="competLogo">
                              <img src={getCompetImage(compet.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                            </div>
                            <div className="competInfo">
                              <div className="competName">{compet.leagueName}</div>
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
