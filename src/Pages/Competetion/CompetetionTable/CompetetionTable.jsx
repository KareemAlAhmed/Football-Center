import React, { useEffect, useState } from 'react'
import "./CompetetionTable.css"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../../components/Footer/Footer';
import CompetetionIntro from '../../../components/CompetetionIntro/CompetetionIntro';
import NavBar from '../../../components/NavBar/NavBar';
import { GET_COMPETETION_STANDING_DATA } from '../../../redux/tourns/tournsActions';
import { GET_TEAM_INFO } from '../../../redux/team/teamsActions';
import { getTeamImage, getTeamLink } from '../../../utils/baseUrl';
export default function CompetetionTable() {
    let { competId } = useParams();
    let { competSlug } = useParams();
    let [selectedSeason,setSelectedSeason]=useState(`${new Date().getFullYear()}`)
    let loading=useSelector(state=>state.tourns.loading) 
    let currentCompetStanding=useSelector(state=>state.tourns.currentCompetStanding) 
    let dispatch=useDispatch()
    const navigate=useNavigate()
    useEffect(()=>{
      let currentData=JSON.parse(sessionStorage.getItem("currentCompetStanding"))
      if(currentData != null){
          if(competId !== currentData.id){
              dispatch(GET_COMPETETION_STANDING_DATA(competSlug,"any",competId))
          }
      }else{
          dispatch(GET_COMPETETION_STANDING_DATA(competSlug,"any",competId))
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
    const getStatus=(content)=>{
        if(content[0] === "+"){
            return "positiveChange"
        }else if(content[0] === "-"){
             return "negativeChange"
        }
    }
    return (
      <>
          <NavBar />
          <div className="competTable">
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
                        {/* <TeamIntroduct teamId={teamId} teamSlug={teamSlug} teamInfo={currentTeamData} /> */}
                        <CompetetionIntro competId={competId} competSlug={competSlug}  competName={currentCompetStanding.name}/>
                      </div>
                      <div className="pageContent">
                        <div className="selectOpts">
                            <select className='dropdown__select' onChange={(e)=>{dispatch(GET_COMPETETION_STANDING_DATA(competSlug,e.target.value,competId));setSelectedSeason(e.target.value)}} >
                                {currentCompetStanding.seasons?.map((season,index)=>{
                                    if(selectedSeason === season.slug){
                                        return <option key={index} selected value={season.slug} >
                                            {season.fullSeason}
                                        </option>
                                    }else{
                                        return <option key={index} value={season.slug} >
                                            {season.fullSeason}
                                        </option>
                                    }
                                })}
                            </select>
                        </div>
                          <div className="competStanding">
                            <h4 className="leagueName">{currentCompetStanding.standing?.name}</h4>
                            <table>
                              <thead>
                                <tr>
                                  <th>{currentCompetStanding.season}</th>
                                  <th>GP</th>
                                  <th>W</th>
                                  <th>D</th>
                                  <th>L</th>
                                  <th>F</th>
                                  <th>A</th>
                                  <th>GD</th>
                                  <th>P</th>
                                </tr>
                              </thead>
                              <tbody>
                                {currentCompetStanding.standingList?.map((team,ind2)=>{
                                  return <tr key={ind2}>
                                        <td className='teamInfo'>
                                            <div className="teamLogo" onClick={()=>{dispatch(GET_TEAM_INFO(team.id));navigate(`/team/_/id/${team.id}/${team.slug}`)}}>
                                                <img src={getTeamImage(team.id)} alt="" onClick={()=>{dispatch(GET_TEAM_INFO(team.id));navigate(`/team/_/id/${team.id}/${team.slug}`)}} />
                                            </div>
                                            <Link to={getTeamLink(team.id,team.slug)} onClick={()=>dispatch(GET_TEAM_INFO(team.id))}>{team.name}</Link>
                                        </td>
                                      <td>{team.GP}</td>
                                      <td>{team.W}</td>
                                      <td>{team.D}</td>
                                      <td>{team.L}</td>
                                      <td>{team.F}</td>
                                      <td>{team.A}</td>
                                      <td className={getStatus(team.GD)}>{team.GD}</td>
                                      <td>{team.P}</td>
                                  </tr>
                                })}
                              </tbody>
                            </table>
                          </div>
                          <div class="glossary">
                            <h3 class="glossary__title">Glossary</h3>
                            <ul class="glossary__list">
                              <li class="glossary__item"><span class="glossary__abbr">GP:</span>Games Played</li>
                              <li class="glossary__item"><span class="glossary__abbr">W:</span>Wins</li>
                              <li class="glossary__item"><span class="glossary__abbr">D:</span>Draws</li>
                              <li class="glossary__item"><span class="glossary__abbr">L:</span>Losses</li>
                              <li class="glossary__item"><span class="glossary__abbr">F:</span>Goals For</li>
                              <li class="glossary__item"><span class="glossary__abbr">A:</span>Goals Against</li>
                              <li class="glossary__item"><span class="glossary__abbr">GD:</span>Goal Difference</li>
                              <li li class="glossary__item"><span class="glossary__abbr">P:</span>Points</li>
                            </ul>
                          </div>
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
