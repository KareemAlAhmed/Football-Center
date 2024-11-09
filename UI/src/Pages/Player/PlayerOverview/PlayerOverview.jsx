import React, { useEffect, useState } from 'react'
import "./PlayerOverview.css"
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GET_PLAYER_INFO, GET_TEAM_PLAYERS_DATA } from '../../../redux/players/playersAction';
import Footer from '../../../components/Footer/Footer';
import NavBar from '../../../components/NavBar/NavBar';
import PlayerIntro from '../../../components/PlayerIntro/PlayerIntro';
import { GET_TEAM_RESULTS_DATA } from '../../../redux/team/teamsActions';
import { generateShortName, getDefaultTeamOrCompetLogo, getGameLink, getTeamImage } from '../../../utils/baseUrl';
import SwitchPlayersComp from '../../../components/SwitchPlayersComp/SwitchPlayersComp';
import PlayerStatsHomePageComp from '../../../components/PlayerStatsHomePageComp/PlayerStatsHomePageComp';
import { ToastContainer } from 'react-toastify';
export default function PlayerOverview() {
    let { playerId } = useParams();
    let { playerSlug } = useParams();
    let loading=useSelector(state=>state.players.loading) 

    let currentPlayerInfo=useSelector(state=>state.players.currentPlayerInfo)    
    let currentSwitchPlayers=useSelector(state=>state.players.currentSwitchPlayers) 
    let [selectedTeam,setSelectedTeam]=useState(currentPlayerInfo?.team?.id)
    let [selectedPosition,setSelectedPosition]=useState(`F`)
    let [selectedTeamSlug,setSelectedTeamSlug]=useState(currentPlayerInfo?.team?.slug)
    let [selectedStatsTeam,setSelectedStatsTeam]=useState(currentPlayerInfo?.team?.id)
    let [selectedCompet,setSelectedCompet]=useState(currentPlayerInfo?.currentLeague?.id)

    let dispatch=useDispatch()
    useEffect(()=>{
      let currentData=JSON.parse(sessionStorage.getItem("currentPlayerInfo"))
      if(currentData != null){
          if(playerId !== currentData.id){
              dispatch(GET_PLAYER_INFO(playerId,playerSlug))
          }
      }else{
          dispatch(GET_PLAYER_INFO(playerId,playerSlug))
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
    <div className="playerBlock">
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
                  <PlayerIntro player={currentPlayerInfo} playerSlug={playerSlug}  />
                </div>
                <div className="pageContent">
                  <div className="PageLayout__LeftAside hideLeftSide">
                      <SwitchPlayersComp />
                      <section className="Card quickLinks">
                        <header className="cardHeader">
                          <div className="cardTitle">
                            <p>{currentPlayerInfo?.team?.name} Quick Links</p>
                          </div>   
                        </header>
                        <div className="Wrapper">
                          <ul>
                            <li>
                              <Link to={`/team/_/id/${currentPlayerInfo?.team?.id}/${currentPlayerInfo?.team?.slug}/fixture`}> 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                  <path strokelinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                </svg>
                                <span>Schedule</span>
                              </Link>
                            </li>
                            <li>
                              <Link to={`/team/_/id/${currentPlayerInfo?.team?.id}/${currentPlayerInfo?.team?.slug}/squads`}> 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                  <path strokelinecap="round" strokeLinejoin="round" d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99" />
                                </svg>
                                <span>Squad</span>
                              </Link>
                            </li>
                            <li>
                              <Link to={`/team/_/id/${currentPlayerInfo?.team?.id}/${currentPlayerInfo?.team?.slug}/stats/scoring`}> 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                  <path strokelinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                                  <path strokelinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                                </svg>

                                <span>Stats</span>
                              </Link>
                            </li>              
                          </ul>
                        </div>
                      </section>
                      <section className="Card quickLinks">
                        <header className="cardHeader">
                          <div className="cardTitle">
                            <p>{currentPlayerInfo?.currentLeague?.shortName} Quick Links</p>
                          </div>   
                        </header>
                        <div className="Wrapper">
                          <ul>
                          <li>
                              <Link to={`/competetion/_/id/${currentPlayerInfo?.currentLeague?.id}/${currentPlayerInfo?.currentLeague?.slug}/scores`}> 
                                <svg className='scoresSvg' xmlns="http://www.w3.org/2000/svg" xmlnsSvg="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 16.933 21.167" ><g transform="translate(0 6.35)">  
                                  <path fillOpacity="1"  fillRule="nonzero" stroke="none" strokeDasharray="none"  strokeDashoffset="0" strokeLinecap="butt" strokeLinejoin="round"  strokeMiterlimit="4" strokeOpacity="1"  strokeWidth="0.529"  d="m 4.0752052,-3.2768033 a 0.26460974,0.26460974 0 0 0 -0.2656178,0.26355 v 1.03714 H 1.0573016 a 0.26460974,0.26460974 0 0 0 -0.025321,0 0.26460974,0.26460974 0 0 0 -0.23823084,0.26355 v 8.95915 a 0.26460974,0.26460974 0 0 0 0.26355144,0.26355 H 15.873968 a 0.26460974,0.26460974 0 0 0 0.265615,-0.26355 v -8.95915 a 0.26460974,0.26460974 0 0 0 -0.265615,-0.26355 h -2.752286 v -1.03714 a 0.26460974,0.26460974 0 0 0 -0.263551,-0.26355 h -1.375108 a 0.26460974,0.26460974 0 0 0 -0.265618,0.26355 v 1.03714 h -5.50354 v -1.03714 a 0.26460974,0.26460974 0 0 0 -0.2640674,-0.26355 z m 0.2635488,0.52916 h 0.8454284 v 2.07015997 H 4.338754 Z m 7.408333,0 h 0.845429 v 2.07015997 h -0.845429 z m -10.4241702,1.3007 h 2.4866706 v 1.03507997 a 0.26460974,0.26460974 0 0 0 0.2656178,0.26407 h 1.3745924 a 0.26460974,0.26460974 0 0 0 0.2640674,-0.26407 V -1.4469433 H 8.2020834 V 0.71726667 H 1.3229168 Z m 7.4083333,0 h 2.4861549 v 1.03507997 a 0.26460974,0.26460974 0 0 0 0.265618,0.26407 h 1.375108 a 0.26460974,0.26460974 0 0 0 0.263551,-0.26407 V -1.4469433 h 2.488735 V 0.71726667 H 8.7312501 Z m -7.4083333,2.69338 h 6.8791666 v 5.73453 H 1.3229168 Z m 7.4083333,0 h 6.8791669 v 5.73453 H 8.7312501 Z m -3.96875,0.971 c -0.8250184,0 -1.4939645,0.67774 -1.4939645,1.5074 v 0.77566 c 0,0.82966 0.6689461,1.50947 1.4939645,1.50947 0.8250211,0 1.4939671,-0.67981 1.4939671,-1.50947 v -0.77566 c 0,-0.82966 -0.668946,-1.5074 -1.4939671,-1.5074 z m 7.4083329,0 c -0.825018,0 -1.49448,0.67774 -1.49448,1.5074 v 0.77566 c 0,0.82966 0.669462,1.50947 1.49448,1.50947 0.825021,0 1.493967,-0.67981 1.493967,-1.50947 v -0.77566 c 0,-0.82966 -0.668946,-1.5074 -1.493967,-1.5074 z m -7.4083329,0.52916 c 0.5377127,0 0.9648005,0.42932 0.9648005,0.97824 v 0.77566 c 0,0.54892 -0.4270878,0.9803 -0.9648005,0.9803 -0.5377127,0 -0.9668642,-0.43138 -0.9668642,-0.9803 v -0.77566 c 0,-0.54892 0.4291515,-0.97824 0.9668642,-0.97824 z m 7.4083329,0 c 0.537713,0 0.964801,0.42932 0.964801,0.97824 v 0.77566 c 0,0.54892 -0.427088,0.9803 -0.964801,0.9803 -0.537712,0 -0.964797,-0.43138 -0.964797,-0.9803 v -0.77566 c 0,-0.54892 0.427085,-0.97824 0.964797,-0.97824 z"    baselineShift="baseline"    clipRule="nonzero"    color="#000"    colorInterpolation="sRGB"    colorInterpolationFilters="linearRGB"    colorRendering="auto"    direction="ltr"    display="inline"    dominantBaseline="auto"    enableBackground="accumulate"    fontFamily="sans-serif"    fontSize="medium"    fontStretch="normal"    fontStyle="normal"    fontVariant="normal"    fontWeight="normal"    imageRendering="auto"    letterSpacing="normal"    opacity="1"    overflow="visible"    shapeRendering="auto"    textAnchor="start"    textDecoration="none" textRendering="auto" vectorEffect="none" visibility="visible" wordSpacing="normal" writingMode="lr-tb"></path></g>
                                </svg>
                                <span>Scores</span>
                              </Link>
                            </li>  
                          <li>
                              <Link to={`/competetion/_/id/${currentPlayerInfo?.currentLeague?.id}/${currentPlayerInfo?.currentLeague?.slug}/fixtures`}> 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                  <path strokelinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                </svg>
                                <span>Schedule</span>
                              </Link>
                            </li>
                           
                            <li>
                              <Link to={`/competetion/_/id/${currentPlayerInfo?.currentLeague?.id}/${currentPlayerInfo?.currentLeague?.slug}/table`}> 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                  <path strokelinecap="round" strokeLinejoin="round" d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99" />
                                </svg>
                                <span>Table</span>
                              </Link>
                            </li>
              
                          </ul>
                        </div>
                      </section>
                  </div>
                  <div className="PageLayout__MainContainer">
                    <section className="nextGame">
                      <header className="cardHeader">
                        <div className="cardTitle">
                          <p>Next Match</p>
                        </div>   
                      </header>
                      <div className="Wrapper">
                        <div className="Gamestrip">
                          <div className="gameCompetetion">
                            <span>{currentPlayerInfo?.team?.nextGame?.competetion}</span>
                          </div>
                          <Link className="gameInfo" to={getGameLink(currentPlayerInfo?.team?.nextGame?.gameId,currentPlayerInfo?.team?.nextGame?.gameSlug)}>
                              <div className="homeTeam">
                                <p className="teamName">{currentPlayerInfo?.team?.nextGame?.homeTeam.name}</p>
                                <p className="teamName shortName">{generateShortName(currentPlayerInfo?.team?.nextGame?.homeTeam.name) }</p>
                                <div className="teamLogo">
                                  <img src={getTeamImage(currentPlayerInfo?.team?.nextGame?.homeTeam.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                                </div>
                              </div>

                                <div className="dateAndTime">
                                  <span className="date">{currentPlayerInfo?.team?.nextGame?.date}</span>
                                  <span className="time">{currentPlayerInfo?.team?.nextGame?.time}</span>
                                </div>

                              <div className="awayTeam">
                                <div className="teamLogo">
                                  <img src={getTeamImage(currentPlayerInfo?.team?.nextGame?.awayTeam.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                                </div>
                                <p className="teamName">{currentPlayerInfo?.team?.nextGame?.awayTeam.name}</p>
                                <p className="teamName shortName">{generateShortName(currentPlayerInfo?.team?.nextGame?.awayTeam.name)}</p>
                              </div>
                          </Link>
                        </div>
                      </div>
                    </section>
                    <PlayerStatsHomePageComp playerId={playerId} />
                    <section className="lastMatches">
                      <header className="cardHeader">
                        <div className="cardTitle">
                          <p>Last 5 Matches</p>
                          <Link>see all</Link>
                        </div>   
                      </header>
                      <div className="Wrapper">
                        <table>
                          <thead>
                            <tr>
                              <th>TEAM</th>
                              <th>DATE</th>
                              <th>OPP</th>
                              <th>COMP</th>
                              <th>RESULT</th>
                              <th>APP</th>
                              <th>G</th>
                              <th>A</th>
                              <th>SH</th>
                              <th>ST</th>
                              <th>FC</th>
                              <th>FA</th>
                              <th>OF</th>
                              <th>YC</th>
                              <th>RC</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentPlayerInfo?.lastMatches?.map((match,index)=>{
                              return <tr key={index}>
                              <td className='teamColumn'>
                                <div className="teamLogo">
                                  <img src={getTeamImage(match.homeTeam.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                                </div>
                                <div className="teamName">
                                  <Link to={`/team/_/id/${match.homeTeam.id}/${match.homeTeam.slug}`}><span>{match.homeTeam.name}</span></Link>
                                </div>
                              </td>
                              <td><span className='date'>{match.date}</span></td>
                              <td className='teamColumn'>
                                <div className="homeOrAway">{match.homeOrAway}</div>
                                <div className="teamLogo">
                                  <img src={getTeamImage(match.awayTeam.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                                </div>
                                <div className="teamName">
                                  <Link to={`/team/_/id/${match.awayTeam.id}/${match.awayTeam.slug}`}><span>{match.awayTeam.name}</span></Link>
                                </div>
                              </td>
                              <td className='hideStat'>{match.compet.length > 14 ? match.compet.slice(0,11) + "..." : match.compet}</td>
                              <td className='results'>
                                
                                <span className={ match.status === "W" ? " status win" : match.status === "L" ? " status lose" : " status draw"}>{match.status}</span>
                                <span className="score">{match.score}</span>
                              </td>
                              <td>{match.currentPlayer.APP}</td>
                              <td>{match.currentPlayer.G}</td>
                              <td>{match.currentPlayer.A}</td>
                              <td>{match.currentPlayer.SH}</td>
                              <td>{match.currentPlayer.ST}</td>
                              <td>{match.currentPlayer.FC}</td>
                              <td>{match.currentPlayer.FA}</td>
                              <td className='hideStat'>{match.currentPlayer.OF}</td>
                              <td className='hideStat'>{match.currentPlayer.YC}</td>
                              <td className='hideStat'>{match.currentPlayer.RC}</td>
                            </tr>
                            })}
                          </tbody>
                        </table>
                      </div>
                    </section>
                  </div>
                  <div className="PageLayout__RightAside hideRightside">
                    <section className="latestNews">
                      <header className="cardHeader">
                        <div className="cardTitle">
                          <p>Latest News</p>
                        </div>   
                      </header>
                      <div className="Wrapper">
                        <ul className="listOfPlayerNews">
                           {currentPlayerInfo?.allNews?.map((news,index)=>{
                              return  <li key={index}>
                                        <div className="newsImg">
                                          <img src={news.articleImageUrl} alt="" />
                                        </div>
                                        <div className="articleInfo">
                                          <Link  className='articleTitle'>{news.articleTitle.length > 82 ? news.articleTitle.slice(0,79) + "..." : news.articleTitle}</Link>
                                          <div className="articleMetaData">
                                            <span className='timeStamp'>{news.timeStamps}</span>
                                            <span className='author'>{news.author}</span>
                                          </div>
                                        </div>
                                      </li>
                           })}
                        </ul>
                      </div>
                    </section>
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
