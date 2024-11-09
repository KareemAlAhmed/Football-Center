import React from 'react'
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import "./SchedulePage.css"
import { useSelector } from 'react-redux';
import DefaultLogo from "../../components/default.png"
import DatesSlider from '../../components/DatesSlider/DatesSlider';
import { Link } from 'react-router-dom';
import { generateShortName, getDefaultTeamOrCompetLogo, getGameLink } from '../../utils/baseUrl';
export default function SchedulePage() {


    let matches=useSelector(state=>state.tourns.selectedDateMatches)
    let loading=useSelector(state=>state.tourns.loading)


 
  return (
    <>
        <NavBar />
        <div className="schedule">
            <div className="container">
              <div className="wrapper">
                  <DatesSlider forComp="Schedule" />
                    {loading ? 
                    (
                      <div className="loadingBlock">
                        <span className="ouro ouro3">
                          <span className="left"><span className="anim"></span></span>
                          <span className="right"><span className="anim"></span></span>
                        </span>
                      </div>
                    ):(
                      <div className="allMatches">
                        {matches.map((ele,ind)=>{
                          return <div className='matchesBlock' key={ind}>
                              <h2>{ele.league}</h2>
                              <table>
                                <thead>
                                  <th>MATCH</th>
                                  <th>TIME</th>
                                  <th>LOCATION</th>
                                </thead>
                                <tbody>
                                  {ele.matches.map((match,mt)=>{
                                    return <tr key={mt}>
                                        <td className='teamsInfo'>
                                          <div className='team Away'>
                                            <Link className='teamLink' to={`/team/_/id/${match.AwayTeam.id}/${match.AwayTeam.slug}`}>
                                            <p>{match.AwayTeam.TeamName}</p>
                                            <p>{generateShortName(match.AwayTeam.TeamName)}</p>
                                            </Link>
                                            <Link to={`/team/_/id/${match.AwayTeam.id}/${match.AwayTeam.slug}`}><img src={match.AwayTeam.id != null ? `https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/${match.AwayTeam.id}.png` : "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/default-team-logo-500.png&w=80&h=80&scale=crop&cquality=40&location=origin"} onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} alt='' /></Link>
                                          </div>
                                          <div className='team'>
                                            <div className="scores">
                                              <Link to={getGameLink(match.id,match.slug)}><span>{match.scores}</span></Link>
                                            </div>
                                            <div className='Home'>
                                            <Link to={`/team/_/id/${match.HomeTeam.id}/${match.HomeTeam.slug}`}><img src={match.HomeTeam.id != null ? `https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/${match.HomeTeam.id}.png` : "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/default-team-logo-500.png&w=80&h=80&scale=crop&cquality=40&location=origin"} onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} alt="" /></Link>
                                            <Link className='teamLink' to={`/team/_/id/${match.HomeTeam.id}/${match.HomeTeam.slug}`}>
                                              <p>{match.HomeTeam.TeamName}</p>
                                              <p>{generateShortName(match.HomeTeam.TeamName)}</p>
                                            </Link>
                                            </div>
                                          </div>
                                        </td>
                                        <td className='time'>
                                          <span className={match.time === "LIVE" && "live"}>{match.time}</span>
                                        </td>
                                        <td className='location'>
                                          <p>{match.location}</p>
                                        </td>
                                    </tr>
                                  })}
                                </tbody>
                              </table>
                          </div>
                        })}
                    </div>
                    )}         
              </div>
          </div>
        </div>
        <Footer />
    </>
  )
}
