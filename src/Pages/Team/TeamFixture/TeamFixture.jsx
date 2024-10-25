import React, { useEffect, useState } from 'react'
import "./TeamFixture.css"
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GET_TEAM_FIXTURES, GET_TEAM_INFO } from '../../../redux/team/teamsActions';
import TeamIntroduct from '../../../components/TeamIntroduct/TeamIntroduct';
import { generateShortName, getDefaultTeamOrCompetLogo, getGameLink, getTeamImage } from '../../../utils/baseUrl';
import { ToastContainer } from 'react-toastify';
export default function TeamFixture() {
    let [selectedLeague,setSelectedLeague]=useState("all")
    let { teamId } = useParams();
    let { teamSlug } = useParams();
    let loading=useSelector(state=>state.teams.loading) 
    let currentTeamFixture=useSelector(state=>state.teams.currentTeamFixture) 
    let dispatch=useDispatch()
    const navigate=useNavigate()
    useEffect(()=>{
        let currentData=JSON.parse(sessionStorage.getItem("currentTeamFixture"))
        if(currentData != null){
            if(teamId !== currentData.id){
                dispatch(GET_TEAM_FIXTURES(teamId))
            }
        }else{
            dispatch(GET_TEAM_FIXTURES(teamId))
        }
        let loadingHeight=window.innerHeight - 95 - document.querySelector(".footer").offsetHeight - 50
            if(document.querySelector(".loadingBlock")){
            document.querySelector(".loadingBlock").style.height=`${loadingHeight}px`
            }
            if(document.querySelector(".wrapper")){
            document.querySelector(".wrapper").style.minHeight=`${loadingHeight}px`
            }
    },[])
  return (
    <>
        <NavBar />
        <div className="teamSchedule">
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
                      <TeamIntroduct teamId={teamId} teamSlug={teamSlug} teamInfo={currentTeamFixture}/>
                    </div>
                    <div className="pageContent">
                        <h1>{currentTeamFixture?.name} Fixtures</h1>

                        <div className="selectOpts">
                            <select className='dropdown__select' onChange={(e)=>{dispatch(GET_TEAM_FIXTURES(teamId,e.target.value));setSelectedLeague(e.target.value)}} >
                                {currentTeamFixture.leagues?.map((league,index)=>{
                                    if(selectedLeague === league.slug){
                                        return <option key={index} selected value={league.slug} >
                                            {league.name}
                                        </option>
                                    }else{
                                        return <option key={index} value={league.slug} >
                                            {league.name}
                                        </option>
                                    }
                                })}
                            </select>
                        </div>

                        {currentTeamFixture.fixtureMatches?.length > 0 ? (
                            <div className="listOfMatches">
                            {currentTeamFixture.fixtureMatches?.map((matches,index2)=>{
                                return <div className="Table__fixtures" key={index2}>
                                        <div className="Table_Title"><h3>{matches.month}</h3></div>
                                        <div className="Table_Data">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>DATE</th>
                                                        <th></th>
                                                        <th>MATCH</th>
                                                        <th></th>
                                                        <th>TIME</th>
                                                        <th>COMPETETION</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        matches.listOfMatches.map((match,index3)=>{
                                                            return <tr key={index3}>
                                                                    <td>{match.date}</td>
                                                                    <td>
                                                                        <div className="homeTeam">
                                                                            <Link to={`/team/_/id/${match.homeTeam.id}/${match.homeTeam.slug}`}>
                                                                                <span>{match.homeTeam.name}</span>
                                                                                <span>{generateShortName(match.homeTeam.name)}</span>
                                                                            </Link>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="TeamsLogos">
                                                                            <div className="homeTeamLogo" >
                                                                                <Link to={`/team/_/id/${match.homeTeam.id}/${match.homeTeam.slug}`} >
                                                                                    <img src={getTeamImage(match.homeTeam.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                                                                                </Link>
                                                                            </div>
                                                                            <div className="matchScores">
                                                                                <Link to={getGameLink(match.gameId,match.gameSlug)}>v</Link>
                                                                            </div>
                                                                            <div className="awayTeamLogo">
                                                                                <Link to={`/team/_/id/${match.awayTeam.id}/${match.awayTeam.slug}`} >   
                                                                                    <img src={getTeamImage(match.awayTeam.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="awayTeam">
                                                                            <Link to={`/team/_/id/${match.awayTeam.id}/${match.awayTeam.slug}`}>
                                                                                <span>{match.awayTeam.name}</span>
                                                                                <span>{generateShortName(match.awayTeam.name)}</span>
                                                                            </Link>
                                                                        </div>
                                                                    </td>
                                                                    <td>{match.time}</td>
                                                                    <td>{match.competetion}</td>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                            })}
                    </div>
                        ) : (
                                <div className="noData">
                                    <h1>No Data Available.</h1>
                                </div>
                        )}
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
