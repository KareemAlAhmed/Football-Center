import React, { useEffect, useState } from 'react'
import "./CompetetionStatPerformance.css"
import CompetetionIntro from '../../../components/CompetetionIntro/CompetetionIntro';
import Footer from '../../../components/Footer/Footer';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../../../components/NavBar/NavBar';
import CompetStatsOpt from '../../../components/CompetStatsOpt/CompetStatsOpt';
import { GET_COMPET_STATS_PERFORMANCE_INFO } from '../../../redux/tourns/tournsActions';
import { getDefaultTeamOrCompetLogo, getTeamImage } from '../../../utils/baseUrl';
export default function CompetetionStatPerformance() {
    let [selectedSeason,setSelectedSeason]=useState(`${new Date().getFullYear()}`)
    let { competId } = useParams();
    let { competSlug } = useParams();
    let loading=useSelector(state=>state.tourns.loading) 
    let currentCompetStatsPerformance=useSelector(state=>state.tourns.currentCompetStatsPerformance) 
    let dispatch=useDispatch()
    useEffect(()=>{
      let currentData=JSON.parse(sessionStorage.getItem("currentCompetStatsPerformance"))
      if(currentData != null){
          if(competId !== currentData.id){
              dispatch(GET_COMPET_STATS_PERFORMANCE_INFO(competSlug.toUpperCase(),"any",competId))
          }
      }else{
          dispatch(GET_COMPET_STATS_PERFORMANCE_INFO(competSlug.toUpperCase(),"any",competId))
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
        <div className="competStatPerformance competStat">
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
                        <CompetetionIntro competId={competId} competSlug={competSlug}  competName={currentCompetStatsPerformance?.name}/>
                    </div>
                    <div className="pageContent">
                        <CompetStatsOpt competId={competId} competSlug={competSlug} />
                        <div className="selectOpts">
                        
                            <select className='dropdown__select' onChange={(e)=>{dispatch(GET_COMPET_STATS_PERFORMANCE_INFO(competSlug,e.target.value,competId));setSelectedSeason(e.target.value)}} >
                                {currentCompetStatsPerformance.seasons?.map((season,index)=>{
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

                        {currentCompetStatsPerformance.listOfMatchPerformance?.length > 0 ? (
                            <div className="listOfStats">           
                                <div className="matchPerTable" >
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
                                                        currentCompetStatsPerformance.listOfMatchPerformance?.map((match,index3)=>{
                                                            return <tr key={index3}>
                                                                    <td>{match.category}</td>
                                                                    <td>{match.goals}</td>                                                          
                                                                    <td className='matchBlock'>
                                                                        <div className="homeTeamBlock">
                                                                            <div className="homeTeamName">
                                                                                <Link to={`/team/_/id/${match.homeTeam.id}/${match.homeTeam.slug}`}>
                                                                                    <span className='hide-mobile'>{match.homeTeam.name}</span>
                                                                                    <span className='show-mobile'>{match.homeTeam.shortName}</span>
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
                                                                                    <span className='show-mobile'>{match.awayTeam.shortName}</span>
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
                            <div className="streaksTable" >
                                        <div className="Table_Title"><h3>Streaks</h3></div>
                                        <div className="Table_Data">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>CATEGORY</th>
                                                        <th>TEAM</th>
                                                        <th>GAMES</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        currentCompetStatsPerformance.listOfStreaks?.map((match,index3)=>{
                                                            return <tr key={index3}>
                                                                    <td>{match.name}</td>
                                                                    <td>{match.teamName}</td>
                                                                    <td>{match.number}</td>                                                          
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                </div>
                                
                                        
                            </div>
                            <div className="attendTable" >
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
                                                        currentCompetStatsPerformance.listOfAttendance?.map((match,index3)=>{
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
                                                                                <span className='show-mobile'>{match.match.homeTeam?.shortName}</span>
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
                                                                                    <img src={getTeamImage(match.match.awayTeam?.id)} alt=""  onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }}/>
                                                                                </Link>
                                                                            </div>
                                                                            <div className="awayTeamName">
                                                                                <Link to={`/team/_/id/${match.match.awayTeam?.id}/${match.match.awayTeam?.slug}`}>
        
                                                                                    <span className='hide-mobile'>{match.match.awayTeam?.name}</span>
                                                                                    <span className='show-mobile'>{match.match.awayTeam?.shortName}</span>
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
    </>
  )
}
