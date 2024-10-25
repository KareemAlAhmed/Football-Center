import "./CompetetionFixtures.css"
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import Footer from '../../../components/Footer/Footer';
import CompetetionIntro from '../../../components/CompetetionIntro/CompetetionIntro';
import NavBar from '../../../components/NavBar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { GET_COMPET_DATA, GET_COMPET_DATE_SCORES } from '../../../redux/tourns/tournsActions';
import { GET_TEAM_INFO } from '../../../redux/team/teamsActions';
import DatesSlider from '../../../components/DatesSlider/DatesSlider';
import { generateShortName, getDefaultTeamOrCompetLogo, getGameLink, getTeamImage } from '../../../utils/baseUrl';
import DefaultLogo from "../../../components/default.png"
export default function CompetetionFixtures() {
    let { competId } = useParams();
    let { competSlug } = useParams();
    let loading=useSelector(state=>state.tourns.loading) 
    let currentCompetSchedule=useSelector(state=>state.tourns.currentCompetSchedule) 
  
    useEffect(()=>{
  
      let loadingHeight=window.innerHeight - 95 - document.querySelector(".footer").offsetHeight - 50
          if(document.querySelector(".loadingBlock")){
            document.querySelector(".loadingBlock").style.height=`${loadingHeight}px`
          }
          if(document.querySelector(".pageHeader")){
            document.querySelector(".pageHeader").style.height=`fit-content`
          }
          if(document.querySelector(".wrapper")){
            document.querySelector(".wrapper").style.minHeight=`${loadingHeight}px`
          }
    },[])
    return (
      <>
          <NavBar />
          <div className="competBlock">
            <div className="container">
              <div className="wrapper">
  
                  <CompetetionIntro competId={competId} competSlug={competSlug}  competName={currentCompetSchedule.comptName}/>
                  <DatesSlider forComp="CompetSchedule" competSlug={competSlug} />
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
                          {
                              currentCompetSchedule?.allMatches && (
                                currentCompetSchedule?.allMatches.length > 0 ? (
                                    currentCompetSchedule?.allMatches.map((ele,ind)=>{
                                    return <div className='matchesBlock' key={ind}>
                                    <h2>{ele.date}</h2>
                                    {ele.matches.length > 0 ? (
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
                                                  <Link className="imgWrapper" to={`/team/_/id/${match.AwayTeam.id}/${match.AwayTeam.slug}`}><img src={match.AwayTeam.id != null ? `https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/${match.AwayTeam.id}.png` : "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/default-team-logo-500.png&w=80&h=80&scale=crop&cquality=40&location=origin"} onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} alt="" /></Link>
                                                </div>
                                                <div className='team'>
                                                  <div className="scores">
                                                    <Link className="competLink" to={getGameLink(match?.id,match?.slug)}><span>{match.scores}</span></Link>
                                                  </div>
                                                  <div className='Home'>
                                                  <Link className="imgWrapper" to={`/team/_/id/${match.HomeTeam.id}/${match.HomeTeam.slug}`}><img src={match.HomeTeam.id != null ? `https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/${match.HomeTeam.id}.png` : "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/default-team-logo-500.png&w=80&h=80&scale=crop&cquality=40&location=origin"} onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} alt="" /></Link>
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
                                    ) : (
                                        <p className="noMatches">No Matches</p>
                                    )}
                                    
                                </div>
                                  })
                                ) : (
                                <>
                                <h2 className='noGames'>No games on this date.</h2>
  
                                </>)
                                  
                              )
                        }
                      </div>
                      )}  
            
              </div>
            </div>
          </div>
          <Footer />
      </>
    )
}
