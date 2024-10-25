import React, { useEffect, useState } from 'react'
import"./CompetetionStatScoring.css"
import Footer from '../../../components/Footer/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CompetetionIntro from '../../../components/CompetetionIntro/CompetetionIntro';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../../../components/NavBar/NavBar';
import CompetStatsOpt from '../../../components/CompetStatsOpt/CompetStatsOpt';
import { GET_COMPET_STATS_SCORING_INFO } from '../../../redux/tourns/tournsActions';
import { getPlayerLink } from '../../../utils/baseUrl';
export default function CompetetionStatScoring() {
    let [selectedSeason,setSelectedSeason]=useState(`${new Date().getFullYear()}`)
    let { competId } = useParams();
    let { competSlug } = useParams();
    let loading=useSelector(state=>state.tourns.loading) 
    let currentCompetStatsScoring=useSelector(state=>state.tourns.currentCompetStatsScoring) 
    let dispatch=useDispatch()
    useEffect(()=>{
      let currentData=JSON.parse(sessionStorage.getItem("currentCompetStatsScoring"))
      if(currentData != null){
          if(competId !== currentData.id){
              dispatch(GET_COMPET_STATS_SCORING_INFO(competSlug.toUpperCase(),"any",competId))
          }
      }else{
          dispatch(GET_COMPET_STATS_SCORING_INFO(competSlug.toUpperCase(),"any",competId))
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
        <div className="competStatsScoring competStat">
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
                        <CompetetionIntro competId={competId} competSlug={competSlug}  competName={currentCompetStatsScoring?.name}/>
                    </div>
                    <div className="pageContent">
                        {/* <h1>{currentTeamStatsScoring?.name} Scoring Stats</h1> */}
                        <CompetStatsOpt competId={competId} competSlug={competSlug} />
                        <div className="selectOpts">
                        
                            <select className='dropdown__select' onChange={(e)=>{dispatch(GET_COMPET_STATS_SCORING_INFO(competSlug,e.target.value,competId));setSelectedSeason(e.target.value)}} >
                                {currentCompetStatsScoring.seasons?.map((season,index)=>{
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

                        {currentCompetStatsScoring.TopScorers?.length > 0 ? (
                            <div className="listOfPlayers">           
                                <div className="Table__fixtures" >
                                        <div className="Table_Title"><h3>Top Scorers</h3></div>
                                        <div className="Table_Data">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>RK</th>
                                                        <th>NAME</th>
                                                        <th>TEAM</th>
                                                        <th>P</th>
                                                        <th>G</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        currentCompetStatsScoring.TopScorers.map((player,index3)=>{
                                                            return <tr key={index3}>
                                                                    <td>{player.rank}</td>
                                                                    <td><Link className='playerLink' to={getPlayerLink(player.id,player.slug)}>{player.name}</Link></td>                                                          
                                                                    <td><Link to={`/team/_/id/${player.team.id}/${player.team.slug}`}>{player.team.name}</Link></td>                                                          
                                                                    <td>{player.P}</td>
                                                                    <td>{player.G}</td>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="Table__fixtures" >
                                        <div className="Table_Title"><h3>Top Assists</h3></div>
                                        <div className="Table_Data">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>RK</th>
                                                        <th>NAME</th>
                                                        <th>TEAM</th>
                                                        <th>P</th>
                                                        <th>A</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        currentCompetStatsScoring.TopAssists.map((player,index3)=>{
                                                            return <tr key={index3}>
                                                                    <td>{player.rank}</td>
                                                                    <td><Link className='playerLink' to={getPlayerLink(player.id,player.slug)}>{player.name}</Link></td>      
                                                                    <td><Link to={`/team/_/id/${player.team.id}/${player.team.slug}`}>{player.team.name}</Link></td>                                                          
                                                                    <td>{player.P}</td>
                                                                    <td>{player.A}</td>
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
                    <div className="glossary">
                        <h3 className="glossary__title">Glossary</h3>
                        <ul className="glossary__list glossary__list--desktopLG">
                            <li className="glossary__item"><span className="glossary__abbr">RK:</span>Ranking</li>
                            <li className="glossary__item"><span className="glossary__abbr">NAME:</span>Athlete name</li>
                            <li className="glossary__item"><span className="glossary__abbr">TEAM:</span>Athlete Team Name</li>
                            <li className="glossary__item"><span className="glossary__abbr">P:</span>Games played</li>
                            <li className="glossary__item"><span className="glossary__abbr">G:</span>Goals scored</li>
                            <li className="glossary__item"><span className="glossary__abbr">A:</span>Assists</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>
  )
}
