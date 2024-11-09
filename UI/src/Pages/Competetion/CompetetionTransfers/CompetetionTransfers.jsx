import "./CompetetionTransfers.css"
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../../components/Footer/Footer';
import CompetetionIntro from '../../../components/CompetetionIntro/CompetetionIntro';
import NavBar from '../../../components/NavBar/NavBar';
import { GET_COMPETETION_STANDING_DATA } from '../../../redux/tourns/tournsActions';
import { GET_TEAM_INFO } from '../../../redux/team/teamsActions';
import { generateShortName, getDefaultTeamOrCompetLogo, getPlayerLink, getTeamImage } from '../../../utils/baseUrl';
import { GET_MAJOR_TRANSFERS_DATA } from "../../../redux/news/newsActions";
export default function CompetetionTransfers() {
    let { competId } = useParams();
    let { competSlug } = useParams();
    let [selectedSeason,setSelectedSeason]=useState(`${new Date().getFullYear()}`)
    let loading=useSelector(state=>state.news.loading) 
    let currentCompetTransfers=useSelector(state=>state.news.currentCompetTransfers) 
    let dispatch=useDispatch()
    const navigate=useNavigate()
    useEffect(()=>{
      let currentData=JSON.parse(sessionStorage.getItem("currentCompetTransfers"))
      if(currentData != null){
          if(competId !== currentData.id){
              dispatch(GET_MAJOR_TRANSFERS_DATA(competSlug.toUpperCase(),"any","competTransfers",competId))
          }
      }else{
          dispatch(GET_MAJOR_TRANSFERS_DATA(competSlug.toUpperCase(),"any","competTransfers",competId))
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

    let allYears=["2024","2023","2022","2021","2020","2019","2018","2017","2016","2015","2014"]

    return (
      <>
          <NavBar />
          <div className="competTransfers">
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
                        {/* <TeamIntroduct teamId={teamId} teamSlug={teamSlug} teamInfo={currentTeamData} /> */}
                        <CompetetionIntro competId={competId} competSlug={competSlug}  competName={currentCompetTransfers.competName}/>
                      </div>
                      <div className="pageContent">
                        <div className="selectOpts">
                          <select className='dropdown__select' onChange={(e)=>{dispatch(GET_MAJOR_TRANSFERS_DATA(competSlug.toUpperCase(),e.target.value,"competTransfers",competId));setSelectedSeason(e.target.value)}} >
                              {allYears.map((season,index)=>{
                                  if(selectedSeason === season){
                                      return <option key={index} selected value={season} >
                                          {season}
                                      </option>
                                  }else{
                                      return <option key={index} value={season} >
                                          {season}
                                      </option>
                                  }
                              })}
                          </select>
                        </div>
                        <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Player</th>
                      <th className='hideMobile'>From</th>
                      <th className='hideMobile'>To</th>
                      <th>FEE</th>
                    </tr>
                  </thead>
                  <tbody>
                      {currentCompetTransfers.transfers?.length > 0 && (
                    currentCompetTransfers.transfers.map(transfer=>{
                      return <tr>
                        <td>{transfer.date}</td>
                        <td className='showMobile'>
                          <div className="playerAndTeams">
                            <Link className='playerLink' to={getPlayerLink(transfer.player.id,transfer.player.slug)}>{transfer.player.name}</Link>
                            <div className="transferTeams">
                              <div className="clubInfo">
                                <div className="clubLogo">
                                <Link to={`/team/_/id/${transfer.fromClub.id}/${transfer.fromClub.slug}`}>
                                  <img src={transfer.fromClub.id != null ? getTeamImage(transfer.fromClub.id): "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/default-team-logo-500.png&w=80&h=80&scale=crop&cquality=40&location=origin"} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                                </Link>
                                </div>
                                <Link className='teamLink' to={`/team/_/id/${transfer.fromClub.id}/${transfer.fromClub.slug}`}>
                                  <span className='clubName'>{generateShortName(transfer.fromClub.name)}</span>
                                </Link>
                              </div>
                              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                              </svg>
                              <div className="clubInfo">
                                <div className="clubLogo">
                                  <Link to={`/team/_/id/${transfer.toClub.id}/${transfer.toClub.slug}`}>
                                    <img src={transfer.toClub.id != null ? getTeamImage(transfer.toClub.id): "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/default-team-logo-500.png&w=80&h=80&scale=crop&cquality=40&location=origin"} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                                  </Link>
                                </div>
                                <Link className='teamLink' to={`/team/_/id/${transfer.toClub.id}/${transfer.toClub.slug}`}>
                                  <span className='clubName'>{generateShortName(transfer.toClub.name)}</span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className='hideMobile'><Link className='playerLink' to={getPlayerLink(transfer.player.id,transfer.player.slug)}>{transfer.player.name}</Link></td>
                        <td className='hideMobile'>
                          <div className="clubInfo">
                            <div className="clubLogo">
                            <Link to={`/team/_/id/${transfer.fromClub.id}/${transfer.fromClub.slug}`}>
                              <img src={transfer.fromClub.id != null ? getTeamImage(transfer.fromClub.id): "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/default-team-logo-500.png&w=80&h=80&scale=crop&cquality=40&location=origin"} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                            </Link>
                            </div>
                            <Link className='teamLink' to={`/team/_/id/${transfer.fromClub.id}/${transfer.fromClub.slug}`}>
                              <span className='clubName'>{transfer.fromClub.name}</span>
                            </Link>
                          </div>
                        </td>
                        <td className='hideMobile'>
                          <div className="clubInfo">
                            <div className="clubLogo">
                              <Link to={`/team/_/id/${transfer.toClub.id}/${transfer.toClub.slug}`}>
                                <img src={transfer.toClub.id != null ? getTeamImage(transfer.toClub.id): "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/default-team-logo-500.png&w=80&h=80&scale=crop&cquality=40&location=origin"} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                              </Link>
                            </div>
                            <Link className='teamLink' to={`/team/_/id/${transfer.toClub.id}/${transfer.toClub.slug}`}>
                              <span className='clubName'>{transfer.toClub.name}</span>
                            </Link>
                          </div>
                        </td>
                        <td>{transfer.status}</td>
                      </tr>
                    })
                  )}
                  </tbody>
                </table>
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
