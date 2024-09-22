import "./CompetetionTransfers.css"
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../../components/Footer/Footer';
import CompetetionIntro from '../../../components/CompetetionIntro/CompetetionIntro';
import NavBar from '../../../components/NavBar/NavBar';
import { GET_COMPETETION_STANDING_DATA } from '../../../redux/tourns/tournsActions';
import { GET_TEAM_INFO } from '../../../redux/team/teamsActions';
import { getPlayerLink, getTeamImage } from '../../../utils/baseUrl';
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
                     <span class="ouro ouro3">
                       <span class="left"><span class="anim"></span></span>
                       <span class="right"><span class="anim"></span></span>
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
                      <th>From</th>
                      <th>To</th>
                      <th>FEE</th>
                    </tr>
                  </thead>
                  <tbody>
                      {currentCompetTransfers.transfers?.length > 0 && (
                    currentCompetTransfers.transfers.map(transfer=>{
                      return <tr>
                        <td>{transfer.date}</td>
                        <td><Link className='playerLink' to={getPlayerLink(transfer.player.id,transfer.player.slug)}>{transfer.player.name}</Link></td>
                        <td>
                          <div className="clubInfo">
                            <div className="clubLogo">
                              <Link to={`/team/_/id/${transfer.fromClub.id}/${transfer.fromClub.slug}`}>
                                <img src={transfer.fromClub.id != null ? getTeamImage(transfer.fromClub.id): "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/default-team-logo-500.png&w=80&h=80&scale=crop&cquality=40&location=origin"} alt="" />
                              </Link>
                            </div>
                            <Link className="teamLink" to={`/team/_/id/${transfer.fromClub.id}/${transfer.fromClub.slug}`}>
                              <span className='clubName'>{transfer.fromClub.name}</span>
                            </Link>
                          </div>
                        </td>
                        <td>
                          <div className="clubInfo">
                            <div className="clubLogo">
                              <Link to={`/team/_/id/${transfer.toClub.id}/${transfer.toClub.slug}`}>
                                <img src={transfer.toClub.id != null ? getTeamImage(transfer.toClub.id): "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/default-team-logo-500.png&w=80&h=80&scale=crop&cquality=40&location=origin"} alt="" />
                              </Link>
                            </div>
                            <Link className="teamLink" to={`/team/_/id/${transfer.toClub.id}/${transfer.toClub.slug}`}>
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
