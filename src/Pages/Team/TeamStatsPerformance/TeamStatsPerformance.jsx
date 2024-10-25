import React,{useState,useEffect} from 'react'
import "./TeamStatsPerformance.css"
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {GET_TEAM_STATS_PERFORMANCE_DATA} from '../../../redux/team/teamsActions';
import TeamIntroduct from '../../../components/TeamIntroduct/TeamIntroduct';
import TeamStatsOpt from '../../../components/TeamStatsOpt/TeamStatsOpt';
import { generateShortName, getDefaultTeamOrCompetLogo, getTeamImage } from '../../../utils/baseUrl';
import { ToastContainer } from 'react-toastify';

export default function TeamStatsPerformance() {
    let [selectedLeague,setSelectedLeague]=useState("all")
    let [selectedSeason,setSelectedSeason]=useState(`${new Date().getFullYear()}`)
    let { teamId } = useParams();
    let { teamSlug } = useParams();
    let loading=useSelector(state=>state.teams.loading) 
    let currentTeamStatsPerformance=useSelector(state=>state.teams.currentTeamStatsPerformance) 
    let dispatch=useDispatch()

    const navigate=useNavigate()

    useEffect(()=>{
        let currentData=JSON.parse(sessionStorage.getItem("currentTeamStatsPerformance"))
        let firstLeague=JSON.parse(sessionStorage.getItem("currentTeamStatsScoring"))
        if(currentData != null){
            if(teamId !== currentData.id){
                dispatch(GET_TEAM_STATS_PERFORMANCE_DATA(teamId,firstLeague.leagues[0].slug))
            }
        }else{
            dispatch(GET_TEAM_STATS_PERFORMANCE_DATA(teamId,firstLeague.leagues[0].slug))
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
        <div className="teamStatPerformance teamStat">
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
                      <TeamIntroduct teamId={teamId} teamSlug={teamSlug} teamInfo={currentTeamStatsPerformance}/>
                    </div>
                    <div className="pageContent">
                        <h1>{currentTeamStatsPerformance?.name} Discipline Stats</h1>
                        <TeamStatsOpt teamId={teamId} teamSlug={teamSlug} />
                        <div className="selectOpts">
                            <select className='dropdown__select' onChange={(e)=>{dispatch(GET_TEAM_STATS_PERFORMANCE_DATA(teamId,e.target.value));setSelectedLeague(e.target.value)}} >
                                {currentTeamStatsPerformance.leagues?.map((league,index)=>{
                                    if(selectedLeague === "all"){
                                        if(index === 0) {
                                            return <option key={index} selected value={league.slug} >
                                                {league.name}
                                            </option>
                                        }else{
                                            return <option key={index} value={league.slug} >
                                                {league.name}
                                            </option>
                                        }
                                    }else{
                                        if(selectedLeague === league.slug){
                                            return <option key={index} selected value={league.slug} >
                                                {league.name}
                                            </option>
                                        }else{
                                            return <option key={index} value={league.slug} >
                                                {league.name}
                                            </option>
                                        }
                                    }
                                    
                                })}
                            </select>
                            <select className='dropdown__select' onChange={(e)=>{dispatch(GET_TEAM_STATS_PERFORMANCE_DATA(teamId,selectedLeague === "all" ? currentTeamStatsPerformance.leagues[0].slug : selectedLeague,e.target.value));setSelectedSeason(e.target.value)}} >
                                {currentTeamStatsPerformance.seasons?.map((season,index)=>{
                                    if(selectedSeason === season.slug){
                                        return <option key={index} selected value={season.slug} >
                                            {season.name}
                                        </option>
                                    }else{
                                        return <option key={index} value={season.slug} >
                                            {season.name}
                                        </option>
                                    }
                                })}
                            </select>
                        </div>

                        {currentTeamStatsPerformance.listOfMatchPerformance?.length > 0 ? (
                            <div className="listOfStats">           
                                <div className="Table__fixtures" >
                                        <div className="Table_Title"><h3>Match Performance</h3></div>
                                        <div className="Table_Data">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>CATEGORY</th>
                                                        <th>GOALS</th>
                                                        <th>MATCH</th>                                                 
                                                        <th>DATES</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        currentTeamStatsPerformance.listOfMatchPerformance?.map((match,index3)=>{
                                                            return <tr key={index3}>
                                                                    <td>{match.category}</td>
                                                                    <td>{match.goals}</td>                                                          
                                                                    <td className='matchBlock'>
                                                                        <div className="homeTeamBlock">
                                                                            <div className="homeTeamName">
                                                                                <Link to={`/team/_/id/${match.homeTeam.id}/${match.homeTeam.slug}`}> 
                                                                                    <span className='hide-mobile'>{match.homeTeam.name}</span>
                                                                                    <span className='show-mobile'>{generateShortName(match.homeTeam.name)}</span>
                                                                                </Link>
                                                                            </div>
                                                                            <div className="teamLogo">
                                                                                <Link to={`/team/_/id/${match.homeTeam.id}/${match.homeTeam.slug}`}> 
                                                                                    <img src={getTeamImage(match.homeTeam.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                                                                                </Link>
                                                                            </div>
                                                                        </div>

                                                                        <div className="matchScore">
                                                                            <span>{match.score}</span>
                                                                        </div>
                                                                        <div className="awayTeamBlock">
                                                                            <div className="teamLogo">
                                                                                <Link to={`/team/_/id/${match.awayTeam.id}/${match.awayTeam.slug}`}> 
                                                                                    <img src={getTeamImage(match.awayTeam.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                                                                                </Link>
                                                                            </div>
                                                                            <div className="awayTeamName">
                                                                                <Link to={`/team/_/id/${match.awayTeam.id}/${match.awayTeam.slug}`}> 
                                                                                    <span className='hide-mobile'>{match.awayTeam.name}</span>
                                                                                    <span className='show-mobile'>{generateShortName(match.awayTeam.name)}</span>
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>{match.date}</td>
                                                                   
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                </div>
                                
                                        
                            </div>
                            <div className="Table__fixtures" >
                                        <div className="Table_Title"><h3>Streaks</h3></div>
                                        <div className="Table_Data">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>CATEGORY</th>
                                                        <th>GAMES</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        currentTeamStatsPerformance.listOfStreaks?.map((match,index3)=>{
                                                            return <tr key={index3}>
                                                                    <td>{match.name}</td>
                                                                    <td>{match.number}</td>                                                          
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                </div>
                                
                                        
                            </div>
                            <div className="Table__fixtures" >
                                        <div className="Table_Title"><h3>Attendance</h3></div>
                                        <div className="Table_Data">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>CATEGORY</th>
                                                        <th>ATT</th>
                                                        <th>MATCH</th>                                                 
                                                        <th>DATES</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        currentTeamStatsPerformance.listOfAttendance?.map((match,index3)=>{
                                                            return <tr key={index3}>
                                                                    <td>{match.category}</td>
                                                                    <td>{match.ATT}</td>                                                          
                                                                    <td className='matchBlock'>
                                                                       {match.match.score !== " - " ? (
                                                                        <>
                                                                             <div className="homeTeamBlock">
                                                                            <div className="homeTeamName">
                                                                                <Link to={`/team/_/id/${match.match.homeTeam?.id}/${match.match.homeTeam?.slug}`}> 
                                                                                    <span className='hide-mobile'>{match.match.homeTeam?.name}</span>
                                                                                    <span className='show-mobile'>{generateShortName(match.match.homeTeam?.name)}</span>
                                                                                </Link>
                                                                            </div>
                                                                            <div className="teamLogo">
                                                                                <Link to={`/team/_/id/${match.match.homeTeam?.id}/${match.match.homeTeam?.slug}`}> 
                                                                                    <img src={getTeamImage(match.match.homeTeam?.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                                                                                </Link>
                                                                            </div>
                                                                        </div>

                                                                        <div className="matchScore">
                                                                            <span>{match.match.score}</span>
                                                                        </div>
                                                                        <div className="awayTeamBlock">
                                                                            <div className="teamLogo">
                                                                                <Link to={`/team/_/id/${match.match.awayTeam?.id}/${match.match.awayTeam?.slug}`}> 
                                                                                    <img src={getTeamImage(match.match.awayTeam?.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                                                                                </Link>
                                                                            </div>
                                                                            <div className="awayTeamName">
                                                                                <Link to={`/team/_/id/${match.match.awayTeam?.id}/${match.match.awayTeam?.slug}`}>
                                                                                    <span className='hide-mobile'>{match.match.awayTeam?.name}</span>
                                                                                    <span className='show-mobile'>{generateShortName(match.match.awayTeam?.name)}</span>
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                        </>
                                                                       ): (
                                                                            match.match.score
                                                                       )}
                                                                    </td>
                                                                    <td>{match.date}</td>
                                                                   
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                </div>
                                
                                        
                            </div>
                            
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

