import React, { useEffect, useState } from 'react'
import "./MajorTransfers.css"
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { GET_MAJOR_TRANSFERS_DATA } from '../../../redux/news/newsActions';
import { Link } from 'react-router-dom';
import { getTeamImage } from '../../../utils/baseUrl';
export default function MajorTransfers() {
  const dispatch=useDispatch()
  let transferList=useSelector(state=>state.news.majorTransfers.transfers)
  let loading=useSelector(state=>state.news.loading)
  let [selectedLeague,setSelectedLeague]=useState("any")
  let [selectedSeason,setSelectedSeason]=useState("any")
  let seasons=["2024","2023","2022","2021","2020","2019","2018","2017","2016","2015","2014"]
  useEffect(()=>{
    (sessionStorage.getItem("currentLeagueMajorTransfer") == null || selectedLeague === "any") && dispatch(GET_MAJOR_TRANSFERS_DATA())
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
  const getSelectedLeagueTrans=(data,type)=>{
    if(type === "leagues"){
      dispatch(GET_MAJOR_TRANSFERS_DATA(data.toUpperCase(),selectedSeason))
      let name=compets.find(e=>e.slug=== data)
      setSelectedLeague(name)
    }else{
      dispatch(GET_MAJOR_TRANSFERS_DATA(selectedLeague.toUpperCase(),data))
      setSelectedSeason(data)
    }
    
  }
  let compets=[
    {
      slug:"any",
      name:"All Leagues"
    },
    {
      slug:"eng.1",
      name:"English Premier League"
    },
    {
      slug:"esp.1",
      name:"Spanish LALIGA"
    },
    {
      slug:"ger.1",
      name:"German Bundesliga"
    },
    {
      slug:"usa.1",
      name:"MLS"
    },
    {
      slug:"mex.1",
      name:"Mexican Liga BBVA MX"
    },
    {
      slug:"ita.1",
      name:"Italian Serie A"
    },
    {
      slug:"fra.1",
      name:"French Ligue 1"
    },
    {
      slug:"ned.1",
      name:"Dutch Eredivisie"
    },
    {
      slug:"eng.2",
      name:"English League Championship"
    },
    {
      slug:"sco.1",
      name:"Scottish Premiership"
    },
    {
      slug:"aus.1",
      name:"Australian A-League Men"
    },
    {
      slug:"arg.1",
      name:"Argentine Liga Profesional de Fútbol"
    },
    {
      slug:"bra.1",
      name:"Brazilian Serie A"
    },
  ]
  return (
    <>
        <NavBar />
        <div className="majorTransfers">
          <div className="container">
            <div className="wrapper">
              <h1>Transfer</h1>
              <div className="selectOpts">
                <select className="dropdown__select_leagues dropdown__select" onChange={(e)=>getSelectedLeagueTrans(e.target.value,'leagues')}>
                  {compets.map((compet,competIndex)=>{
                      return <option value={compet.slug} key={competIndex}>{compet.name}</option>
                  })}
                </select>
                {selectedLeague !== "any" && (
                   <select className="dropdown__select_seasons dropdown__select" onChange={(e)=>getSelectedLeagueTrans(e.target.value,'seasons')}>
                   {seasons.map((season,index)=>{
                     return <option value={season}>{season}</option>
                   })}
                 </select>
                )}
              </div>
              {loading ? 
                      (
                        <div className="loadingBlock">
                          <span class="ouro ouro3">
                            <span class="left"><span class="anim"></span></span>
                            <span class="right"><span class="anim"></span></span>
                          </span>
                        </div>
                      ):(

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
                      {transferList?.length > 0 && (
                    transferList.map(transfer=>{
                      return <tr>
                        <td>{transfer.date}</td>
                        <td>{transfer.player.name}</td>
                        <td>
                          <div className="clubInfo">
                            <div className="clubLogo">
                            <Link to={`/team/_/id/${transfer.fromClub.id}/${transfer.fromClub.slug}`}>
                              <img src={transfer.fromClub.id != null ? getTeamImage(transfer.fromClub.id): "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/default-team-logo-500.png&w=80&h=80&scale=crop&cquality=40&location=origin"} alt="" />
                            </Link>
                            </div>
                            <Link className='teamLink' to={`/team/_/id/${transfer.fromClub.id}/${transfer.fromClub.slug}`}>
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
                      )}
            </div>
          </div>
        </div>
        <Footer />
    </>
  )
}
