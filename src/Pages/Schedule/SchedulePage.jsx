import React from 'react'
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import "./SchedulePage.css"
import { useSelector } from 'react-redux';
import DefaultLogo from "../../components/default.png"
import DatesSlider from '../../components/DatesSlider/DatesSlider';
import { Link } from 'react-router-dom';
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
                        <span class="ouro ouro3">
                          <span class="left"><span class="anim"></span></span>
                          <span class="right"><span class="anim"></span></span>
                        </span>
                      </div>
                    ):(
                      <div className="allMatches">
                        {matches.map((ele,ind)=>{
                          return <div className='matchesBlock' key={ind}>
                              <h2>{ele.league}</h2>
                              <table>
                                <thead>
                                  <td>MATCH</td>
                                  <td>TIME</td>
                                  <td>LOCATION</td>
                                </thead>
                                <tbody>
                                  {ele.matches.map((match,mt)=>{
                                    return <tr key={mt}>
                                        <td className='teamsInfo'>
                                          <div className='team Away'>
                                            <Link className='teamLink' to={`/team/_/id/${match.AwayTeam.id}/${match.AwayTeam.slug}`}><p>{match.AwayTeam.TeamName}</p></Link>
                                            <Link to={`/team/_/id/${match.AwayTeam.id}/${match.AwayTeam.slug}`}><img src={match.AwayTeam.id != null ? `https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/${match.AwayTeam.id}.png` : "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/default-team-logo-500.png&w=80&h=80&scale=crop&cquality=40&location=origin"} onerror={`this.src = ${DefaultLogo}`} alt="" /></Link>
                                          </div>
                                          <div className='team'>
                                            <div className="scores">
                                              <span>{match.scores}</span>
                                            </div>
                                            <div className='Home'>
                                            <Link to={`/team/_/id/${match.HomeTeam.id}/${match.HomeTeam.slug}`}><img src={match.HomeTeam.id != null ? `https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/${match.HomeTeam.id}.png` : "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/default-team-logo-500.png&w=80&h=80&scale=crop&cquality=40&location=origin"} onerror={`this.src = ${DefaultLogo}`} alt="" /></Link>
                                            <Link className='teamLink' to={`/team/_/id/${match.HomeTeam.id}/${match.HomeTeam.slug}`}><p>{match.HomeTeam.TeamName}</p></Link>
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
