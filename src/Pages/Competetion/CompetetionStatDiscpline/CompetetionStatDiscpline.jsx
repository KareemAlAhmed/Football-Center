import React, { useEffect, useState } from 'react'
import "./CompetetionStatDiscpline.css"
import CompetetionIntro from '../../../components/CompetetionIntro/CompetetionIntro';
import Footer from '../../../components/Footer/Footer';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../../../components/NavBar/NavBar';
import CompetStatsOpt from '../../../components/CompetStatsOpt/CompetStatsOpt';
import { GET_COMPET_STATS_DISCPLINE_INFO } from '../../../redux/tourns/tournsActions';
export default function CompetetionStatDiscpline() {
    let [selectedSeason,setSelectedSeason]=useState(`${new Date().getFullYear()}`)
    let { competId } = useParams();
    let { competSlug } = useParams();
    let loading=useSelector(state=>state.tourns.loading) 
    let currentCompetStatsDiscpline=useSelector(state=>state.tourns.currentCompetStatsDiscpline) 
    let dispatch=useDispatch()
    useEffect(()=>{
      let currentData=JSON.parse(sessionStorage.getItem("currentCompetStatsDiscpline"))
      if(currentData != null){
          if(competId !== currentData.id){
              dispatch(GET_COMPET_STATS_DISCPLINE_INFO(competSlug.toUpperCase(),"any",competId))
          }
      }else{
          dispatch(GET_COMPET_STATS_DISCPLINE_INFO(competSlug.toUpperCase(),"any",competId))
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
        <div className="competStatDiscpline competStat">
            <div className="container">
                <div className="wrapper">
                    {loading ? (
                    <div className="loadingBlock">
                    <span class="ouro ouro3">
                        <span class="left"><span class="anim"></span></span>
                        <span class="right"><span class="anim"></span></span>
                    </span>
                    </div>
                    ):(
                    <>
                    <div className="pageHeader">
                        <CompetetionIntro competId={competId} competSlug={competSlug}  competName={currentCompetStatsDiscpline?.name}/>
                    </div>
                    <div className="pageContent">
                        <CompetStatsOpt competId={competId} competSlug={competSlug} />
                        <div className="selectOpts">
                        
                            <select className='dropdown__select' onChange={(e)=>{dispatch(GET_COMPET_STATS_DISCPLINE_INFO(competSlug,e.target.value,competId));setSelectedSeason(e.target.value)}} >
                                {currentCompetStatsDiscpline.seasons?.map((season,index)=>{
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

                        {currentCompetStatsDiscpline.listOfTeams?.length > 0 ? (
                            <div className="listOfPlayers">           
                                <div className="Table__fixtures" >
                                        <div className="Table_Title"><h3>Discpline</h3></div>
                                        <div className="Table_Data">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>RK</th>
                                                        <th>TEAM</th>
                                                        <th>P</th>
                                                        <th>YC</th>
                                                        <th>RC</th>
                                                        <th>PTS</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        currentCompetStatsDiscpline.listOfTeams?.map((team,index3)=>{
                                                            return <tr key={index3}>
                                                                    <td>{team.rank}</td>
                                                                    <td><Link to={`/team/_/id/${team.id}/${team.slug}`}>{team.name}</Link></td>                                                          
                                                                    <td>{team.P}</td>
                                                                    <td>{team.YC}</td>
                                                                    <td>{team.RC}</td>
                                                                    <td>{team.PTS}</td>
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
                    <div class="glossary">
                        <h3 class="glossary__title">Glossary</h3>
                        <ul class="glossary__list glossary__list--desktopLG">
                            <li class="glossary__item"><span class="glossary__abbr">RK:</span>Ranking</li>
                            <li class="glossary__item"><span class="glossary__abbr">NAME:</span>Athlete name</li>
                            <li class="glossary__item"><span class="glossary__abbr">P:</span>Games played</li>
                            <li class="glossary__item"><span class="glossary__abbr">YC:</span>Yellow cards</li>
                            <li class="glossary__item"><span class="glossary__abbr">RC:</span>Red cards</li>
                            <li class="glossary__item"><span class="glossary__abbr">PTS:</span>Pts</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>
  )
}
