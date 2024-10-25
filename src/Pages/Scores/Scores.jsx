import React from 'react'
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import DatesSlider from '../../components/DatesSlider/DatesSlider';
import { useSelector } from 'react-redux';
import "./Scores.css"
import DefaultLogo from "../../components/default.png"
import { Link } from 'react-router-dom';
import { generateShortName, getDefaultTeamOrCompetLogo, getGameLink, getGameStaticsLink, getPlayerLink, getTeamImage } from '../../utils/baseUrl';
export default function Scores() {
  let loading=useSelector(state=>state.tourns.loading)
  let scores=useSelector(state=>state.tourns.selectedDateScores)
  return (
    <>
        <NavBar />
        <div className="scores">
            <div className="container">
                <DatesSlider forComp="Scores" />
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
                        {scores.map((ele,ind)=>{
                          return <div className='matchScoresInfo' key={ind}>
                              <div className="leagueName">
                                <h2>{ele.leagueName}</h2>
                                </div>
                                {ele.allMatches.map((match,index)=>{
                                    return <div className="Scoreboard" key={index}>
                                              <div className={match.status ==="LIVE" ? "liveMatch teamsInfo" :  match.status ==="FT" ? "finishedTime teamsInfo" : "notStarted teamsInfo"}> 
                                                <div className="matchStatus">
                                                  <span className={match.status ==="LIVE" ? "live" :  match.status ==="FT" ? "finishedTime" : "notStarted"}>{match.status}</span>
                                                </div>
                                                <div className="home TeamsInfo">
                                                    <div className="teamLogo">
                                                      <Link to={`/team/_/id/${match.HomeTeam.id}/${match.HomeTeam.slug}`}><img src={match.HomeTeam.id != null ? getTeamImage(match.HomeTeam.id) : "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/default-team-logo-500.png&w=80&h=80&scale=crop&cquality=40&location=origin"} onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} alt="" /></Link>
                                                    </div>
                                                    <div className="teamNameAndRecord">
                                                        <div className="teamName">
                                                          <Link className='teamLink' to={`/team/_/id/${match.HomeTeam.id}/${match.HomeTeam.slug}`}>{match.HomeTeam.name}</Link>
                                                          <Link className='teamLink shortName' to={`/team/_/id/${match.HomeTeam.id}/${match.HomeTeam.slug}`}>{generateShortName(match.HomeTeam.name)}</Link>
                                                        </div>
                                                        <div className="teamRecord">
                                                          {match.HomeTeam.record}
                                                        </div>
                                                    </div>
                                                    <div className="teamScore">
                                                      <span>{match.HomeTeam.score}</span>
                                                    </div>
                                                </div>
                                                <div className="away TeamsInfo">
                                                <div className="teamLogo">
                                                    <Link to={`/team/_/id/${match.AwayTeam.id}/${match.AwayTeam.slug}`}><img src={match.AwayTeam.id != null ? getTeamImage(match.AwayTeam.id) : "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/default-team-logo-500.png&w=80&h=80&scale=crop&cquality=40&location=origin"} onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} alt="" /></Link>
                                                    </div>
                                                    <div className="teamNameAndRecord">
                                                        <div className="teamName">
                                                          <Link className='teamLink' to={`/team/_/id/${match.AwayTeam.id}/${match.AwayTeam.slug}`}>{match.AwayTeam.name}</Link>
                                                          <Link className='teamLink shortName' to={`/team/_/id/${match.AwayTeam.id}/${match.AwayTeam.slug}`}>{generateShortName(match.AwayTeam.name)}</Link>
                                                        </div>
                                                        <div className="teamRecord">
                                                          {match.AwayTeam.record}
                                                        </div>
                                                    </div>
                                                    <div className="teamScore">
                                                      <span>{match.AwayTeam.score}</span>
                                                    </div>

                                                </div>
                                              </div>
                                              <div className="matchLocation">
                                                  <div className="stadiumLoc">
                                                      <span>{match.location.stadium}</span>
                                                  </div>
                                                  <div className="cityLocation">
                                                    <span>{match.location.city}</span>
                                                  </div>
                                              </div>

                                              <div className="matchPerformer">
                                                <div className="Home TeamPerformer">
                                                  <div className="teamNameAndLogo">
                                                      <div className="teamLogo">
                                                        <img src={match.HomeTeam.id != null ? `https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/${match.HomeTeam.id}.png` : "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/default-team-logo-500.png&w=80&h=80&scale=crop&cquality=40&location=origin"} onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} alt="" />
                                                      </div>
                                                      <div className="teamName">
                                                        <span>{match.HomeTeam.name}</span>
                                                      </div>
                                                  </div>
                                                  {match.status === "NOT STARTED" ? (
                                                    <ul className='optionsList'>
                                                      <li><Link to={`/team/_/id/${match.HomeTeam.id}/${match.HomeTeam.slug}/squads`}>Squads</Link></li>
                                                      <li><Link to={`/team/_/id/${match.HomeTeam.id}/${match.HomeTeam.slug}/stats/scoring`}>Stats</Link></li>
                                                      <li><Link to={`/team/_/id/${match.HomeTeam.id}/${match.HomeTeam.slug}/fixture`}>Fixtures</Link></li>
                                                    </ul>
                                                  ) :(
                                                    <div className="scoredPlayerList">
                                                    {match.HomeTeam.playersScored.length > 0 && (
                                                      <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M417.3 360.1l-71.6-4.8c-5.2-.3-10.3 1.1-14.5 4.2s-7.2 7.4-8.4 12.5l-17.6 69.6C289.5 445.8 273 448 256 448s-33.5-2.2-49.2-6.4L189.2 372c-1.3-5-4.3-9.4-8.4-12.5s-9.3-4.5-14.5-4.2l-71.6 4.8c-17.6-27.2-28.5-59.2-30.4-93.6L125 228.3c4.4-2.8 7.6-7 9.2-11.9s1.4-10.2-.5-15l-26.7-66.6C128 109.2 155.3 89 186.7 76.9l55.2 46c4 3.3 9 5.1 14.1 5.1s10.2-1.8 14.1-5.1l55.2-46c31.3 12.1 58.7 32.3 79.6 57.9l-26.7 66.6c-1.9 4.8-2.1 10.1-.5 15s4.9 9.1 9.2 11.9l60.7 38.2c-1.9 34.4-12.8 66.4-30.4 93.6zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm14.1-325.7c-8.4-6.1-19.8-6.1-28.2 0L194 221c-8.4 6.1-11.9 16.9-8.7 26.8l18.3 56.3c3.2 9.9 12.4 16.6 22.8 16.6l59.2 0c10.4 0 19.6-6.7 22.8-16.6l18.3-56.3c3.2-9.9-.3-20.7-8.7-26.8l-47.9-34.8z"/></svg>
                                                        <ul className='playersScored'>
                                                            {match.HomeTeam.playersScored.map((player,ind1)=>{
                                                                return <li key={ind1}><Link className='playerLink' to={getPlayerLink(player.id,player.slug)}>{player.name}</Link><span>{player.scoreTime}{ind1 !== match.HomeTeam.playersScored.length - 1 ? ", " : "."}</span></li>
                                                            })}
                                                        </ul>
                                                      </>
                                                    )}
                                                    {
                                                      match.HomeTeam.playersScored.length === 0 && match.HomeTeam.score === "0" && (<p>No Goals...</p>)
                                                    }
                                                  </div>
                                                  )
                                                  }

                                                  
                                                </div>

                                                <div className="Away TeamPerformer">
                                                  <div className="teamNameAndLogo">
                                                      <div className="teamLogo">
                                                        <img src={match.AwayTeam.id != null ? `https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/${match.AwayTeam.id}.png` : "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/default-team-logo-500.png&w=80&h=80&scale=crop&cquality=40&location=origin"} onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} alt="" />
                                                      </div>
                                                      <div className="teamName">
                                                        <span>{match.AwayTeam.name}</span>
                                                      </div>
                                                  </div>

                                                  {match.status === "NOT STARTED" ? (
                                                    <ul className='optionsList'>
                                                      <li><Link to={`/team/_/id/${match.AwayTeam.id}/${match.AwayTeam.slug}/squads`}>Squads</Link></li>
                                                      <li><Link to={`/team/_/id/${match.AwayTeam.id}/${match.AwayTeam.slug}/stats/scoring`}>Stats</Link></li>
                                                      <li><Link to={`/team/_/id/${match.AwayTeam.id}/${match.AwayTeam.slug}/fixture`}>Fixtures</Link></li>
                                                    </ul>
                                                  ) :(
                                                    <div className="scoredPlayerList">
                                                      {match.AwayTeam.playersScored.length > 0 && (
                                                        <>
                                                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M417.3 360.1l-71.6-4.8c-5.2-.3-10.3 1.1-14.5 4.2s-7.2 7.4-8.4 12.5l-17.6 69.6C289.5 445.8 273 448 256 448s-33.5-2.2-49.2-6.4L189.2 372c-1.3-5-4.3-9.4-8.4-12.5s-9.3-4.5-14.5-4.2l-71.6 4.8c-17.6-27.2-28.5-59.2-30.4-93.6L125 228.3c4.4-2.8 7.6-7 9.2-11.9s1.4-10.2-.5-15l-26.7-66.6C128 109.2 155.3 89 186.7 76.9l55.2 46c4 3.3 9 5.1 14.1 5.1s10.2-1.8 14.1-5.1l55.2-46c31.3 12.1 58.7 32.3 79.6 57.9l-26.7 66.6c-1.9 4.8-2.1 10.1-.5 15s4.9 9.1 9.2 11.9l60.7 38.2c-1.9 34.4-12.8 66.4-30.4 93.6zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm14.1-325.7c-8.4-6.1-19.8-6.1-28.2 0L194 221c-8.4 6.1-11.9 16.9-8.7 26.8l18.3 56.3c3.2 9.9 12.4 16.6 22.8 16.6l59.2 0c10.4 0 19.6-6.7 22.8-16.6l18.3-56.3c3.2-9.9-.3-20.7-8.7-26.8l-47.9-34.8z"/></svg>
                                                          <ul className='playersScored'>
                                                              {match.AwayTeam.playersScored.map((player,ind1)=>{
                                                                  return <li key={ind1}><Link className='playerLink' to={getPlayerLink(player.id,player.slug)}>{player.name}</Link><span>{player.scoreTime}{ind1 !== match.AwayTeam.playersScored.length - 1 ? ", " : "."}</span></li>
                                                              })}
                                                          </ul>
                                                        </>
                                                      )}
                                                      {
                                                        match.AwayTeam.playersScored.length === 0 && match.AwayTeam.score === "0" && (<p>No Goals...</p>)
                                                      }
                                                    </div>
                                                  )}
                                                </div>
                                              </div>
                                              <div className="matchLinks">
                                                  <Link className='matchLink' to={getGameLink(match?.id,match?.slug)}>Summary</Link>
                                                  <Link className='matchLink' to={getGameStaticsLink(match?.id,match?.slug)}> Statistics</Link>
                                                </div>
                                          </div>
                                })}
                              
                          </div>
                        })}
                    </div>
                    )}  
            </div>
        </div>
        <Footer />
    </>
  )
}
