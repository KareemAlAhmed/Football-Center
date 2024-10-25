import React, { useEffect } from 'react'
import "./TeamPage.css"
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GET_TEAM_INFO } from '../../../redux/team/teamsActions';
import TeamIntroduct from '../../../components/TeamIntroduct/TeamIntroduct';
import NewsSmallCard from '../../../components/NewsContainers/NewsSmallCard/NewsSmallCard';
import { ToastContainer } from 'react-toastify';
export default function TeamPage() {
  let { teamId } = useParams();
  let { teamSlug } = useParams();
  let loading=useSelector(state=>state.teams.loading) 
  let currentTeamData=useSelector(state=>state.teams.currentTeamData) 
  let dispatch=useDispatch()
  useEffect(()=>{
    let currentData=JSON.parse(sessionStorage.getItem("currentTeamData"))
    if(currentData != null){
        if(teamId !== currentData.id){
          console.log(teamId)
            dispatch(GET_TEAM_INFO(teamId))
        }
    }else{
        console.log(teamId)
        dispatch(GET_TEAM_INFO(teamId))
    }

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
        <div className="teamBlock">
          <div className="container">
            <div className="wrapper">
                {loading ? (
                   <div className="loadingBlock">
                   <span className="ouro ouro3">
                     <span className="left"><span className="anim"></span></span>
                     <span className="right"><span className="anim"></span></span>
                   </span>
                 </div>
                ):(
                  <>
                    <div className="pageHeader">
                      <TeamIntroduct teamId={teamId} teamSlug={teamSlug} teamInfo={currentTeamData} />
                    </div>
                    <div className="pageContent">
                      <div className="teamSchedule">
                          <h4>Schedule</h4>
                          <div className="listOfMatches">
                            {currentTeamData.schedule?.map((match,index)=>{
                              return <div className="match" key={index}>
                                        <div className="matchInfo">
                                          <div className="homeTeam">
                                            <span className='homeTeamName'>{match.homeTeam.name}</span>
                                              {match.homeTeam.score !== "" && (
                                                <>
                                                  <span className={match.homeTeam.score < match.awayTeam.score ?"teamScore losingScore" : "teamScore"}>{match.homeTeam.score}</span>
                                                </>
                                              )}
                                          </div>
                                          {match.awayTeam.score !== "" ? (
                                            <>
                                              <div className="matchStatus">
                                              { match.homeTeam.score > match.awayTeam.score && (
                                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"/></svg>

                                                )}
                                                <span>FT</span>
                                                { match.awayTeam.score > match.homeTeam.score && (
                                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/></svg>

                                                )}
                                              </div>
                                            </>
                                          ) : (
                                            <>
                                            <div className="matchTimeAndDate">
                                                <span className='matchDate'>{match.date}</span>
                                                <span className='matchTime'>{match.time}</span>
                                              </div>
                                            </>
                                          )}
                                          <div className="awayTeam">
                                          {match.awayTeam.score !== "" && (
                                                <>
                                                  <span className={match.homeTeam.score > match.awayTeam.score ?"teamScore losingScore" : "teamScore"}>{match.awayTeam.score}</span>
                                                </>
                                              )}
                                            <span className='awayTeamName'>{match.awayTeam.name}</span>
                                             
                                          </div>
                                        </div>
                                        <div className="leagueInfo">
                                          <span className='leagueName'>{match.comptName}</span>
                                        </div>
                                    </div>
                            })}
                          </div>
                      </div>
                      <div className="teamNews">
                        {currentTeamData.news?.map((news,ind)=>{
                          return <NewsSmallCard news={news} key={ind} forComp="TopNews" />
                        })}
                      </div>


                     <div className="teamLeagueStats">
                      <div className="leagueStanding">
                          <h4 className="leagueName">{currentTeamData.league?.standingName}</h4>
                          <table>
                            <thead>
                              <tr>
                                <th>TEAM</th>
                                <th>GP</th>
                                <th>W</th>
                                <th>D</th>
                                <th>L</th>
                                <th>GD</th>
                                <th>P</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentTeamData.league?.standingList.map((team,ind2)=>{
                                return <tr key={ind2}>
                                    <td><Link to={`/team/_/id/${team.id}/${team.slug}`} onClick={()=>dispatch(GET_TEAM_INFO(team.id))}>{team.name}</Link></td>
                                    <td>{team.GP}</td>
                                    <td>{team.W}</td>
                                    <td>{team.D}</td>
                                    <td>{team.L}</td>
                                    <td>{team.GD}</td>
                                    <td>{team.P}</td>
                                </tr>
                              })}
                            </tbody>
                          </table>
                          <Link to="" className='moreStandings'>Standings</Link>
                        </div>
                        <div className="teamSats">
                          <header>
                              <h4>Ranking</h4>
                              <span>{currentTeamData.league?.name}</span>
                          </header>
                          <div className="statList">
                          {currentTeamData.summaryStat?.map((stat,ind2)=>{
                            return <div className="statsInfo">
                                <p className="statName">{stat.name}</p>
                                <p className="statNumber">{stat.number}</p>
                                <p className="statPostion">{stat.postion}</p>
                            </div>
                          })}
                          </div>
                          <Link to="" className='moreRanking'>All Team Ranking</Link>
                        </div>
                     </div>
                    </div>
                  </>
                )}
            </div>
          </div>
        </div>
        <Footer />
        <ToastContainer />
    </>
  )
}
