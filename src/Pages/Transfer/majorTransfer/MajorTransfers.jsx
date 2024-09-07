import React, { useEffect, useState } from 'react'
import "./MajorTransfers.css"
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { GET_MAJOR_TRANSFERS_DATA } from '../../../redux/news/newsActions';
export default function MajorTransfers() {
  const dispatch=useDispatch()
  let transferList=useSelector(state=>state.news.majorTransfers)
  let loading=useSelector(state=>state.news.loading)
  let [selectedLeague,setSelectedLeague]=useState("any")
  let [selectedSeason,setSelectedSeason]=useState("any")
  let seasons=["2024","2023","2022","2021","2020","2019","2018","2017","2016","2015","2014",]
  useEffect(()=>{
    (sessionStorage.getItem("currentLeagueMajorTransfer") == null || selectedLeague === "any") && dispatch(GET_MAJOR_TRANSFERS_DATA())
  },[])
  const getSelectedLeagueTrans=(data,type)=>{
    if(type === "leagues"){
      dispatch(GET_MAJOR_TRANSFERS_DATA(data,selectedSeason))
      setSelectedLeague(data)
    }else{
      dispatch(GET_MAJOR_TRANSFERS_DATA(selectedLeague,data))
      setSelectedSeason(data)
    }
    
  }
  return (
    <>
        <NavBar />
        <div className="majorTransfers">
          <div className="container">
            <div className="wrapper">
              <h1>Transfer</h1>
              <div className="selectOpts">
                <select className="dropdown__select_leagues dropdown__select" onChange={(e)=>getSelectedLeagueTrans(e.target.value,'leagues')}>
                  <option value="any">All Leagues</option>
                  <option value="English Premier League">English Premier League</option>
                  <option value="Spanish LALIGA">Spanish LALIGA</option>
                  <option value="German Bundesliga">German Bundesliga</option>
                  <option value="MLS">MLS</option>
                  <option value="Mexican Liga BBVA MX">Mexican Liga BBVA MX</option>
                  <option value="Italian Serie A">Italian Serie A</option>
                  <option value="French Ligue 1">French Ligue 1</option>
                  <option value="English League Championship">English League Championship</option>
                  <option value="Dutch Eredivisie">Dutch Eredivisie</option>
                  <option value="Scottish Premiership">Scottish Premiership</option>
                  <option value="Australian A-League Men">Australian A-League Men</option>
                  <option value="Argentine Liga Profesional de Fútbol">Argentine Liga Profesional de Fútbol</option>
                  <option value="Brazilian Serie A">Brazilian Serie A</option>
                </select>
                {selectedLeague !== "any" && (
                   <select className="dropdown__select_seasons dropdown__select" onChange={(e)=>getSelectedLeagueTrans(e.target.value,'seasons')}>
                   {seasons.map((season,index)=>{
                     return <option value={season}>{season}</option>
                   })}
                 </select>
                )}
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
                      {transferList.length > 0 && (
                    transferList.map(transfer=>{
                      return <tr>
                        <td>{transfer.date}</td>
                        <td>{transfer.player.name}</td>
                        <td>
                          <div className="clubInfo">
                            <div className="clubLogo">
                              <img src={transfer.fromClub.id != null ? `https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/${transfer.fromClub.id}.png&scale=crop&cquality=40&location=origin&w=32&h=32`: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/default-team-logo-500.png&w=80&h=80&scale=crop&cquality=40&location=origin"} alt="" />
                            </div>
                            <span className='clubName'>{transfer.fromClub.name}</span>
                          </div>
                        </td>
                        <td>
                          <div className="clubInfo">
                            <div className="clubLogo">
                              <img src={transfer.toClub.id != null ? `https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/${transfer.toClub.id}.png&scale=crop&cquality=40&location=origin&w=32&h=32`: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/default-team-logo-500.png&w=80&h=80&scale=crop&cquality=40&location=origin"} alt="" />
                            </div>
                            <span className='clubName'>{transfer.toClub.name}</span>
                          </div>
                        </td>
                        <td>{transfer.status}</td>
                      </tr>
                    })
                  )}
                  </tbody>
                </table>
            </div>
          </div>
        </div>
        <Footer />
    </>
  )
}
