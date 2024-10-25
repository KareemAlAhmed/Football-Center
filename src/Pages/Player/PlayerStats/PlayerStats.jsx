import { Link, useParams } from "react-router-dom";
import Footer from "../../../components/Footer/Footer";
import "./PlayerStats.css"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { GET_PLAYER_STATS_DATA, GET_PLAYER_STATS_FILTERED_DATA } from "../../../redux/players/playersAction";
import NavBar from "../../../components/NavBar/NavBar";
import PlayerIntro from "../../../components/PlayerIntro/PlayerIntro";
import PlayerStatsTable from "../../../components/PlayerStatsTable/PlayerStatsTable";
import { ToastContainer } from "react-toastify";

export default function PlayerStats() {
    let { playerId } = useParams();
    let { playerSlug } = useParams();
    let loading=useSelector(state=>state.players.loading) 
    let filterLoading=useSelector(state=>state.players.filterLoading) 
    let currentPlayerInfo=useSelector(state=>state.players.currentPlayerInfo) 
    let currentPlayerStats=useSelector(state=>state.players.currentPlayerStats) 
    let currentPlayerStatsFiltered=useSelector(state=>state.players.currentPlayerStatsFiltered) 

    let filter;
    let team=currentPlayerInfo?.team?.id;
    
    let compet=currentPlayerInfo?.currentLeague?.slug;
    
    if(currentPlayerStatsFiltered.everySeasonStats.length > 0){
        team=currentPlayerStatsFiltered.teamId
        compet=currentPlayerStatsFiltered.competSlug
    }

    let [isFilterOn]=useState(filter)
    let [selectedTeam,setSelectedTeam]=useState(team)
    let [selectedCompet,setSelectedCompet]=useState(compet)
    // console.log(isFilterOn)
   
    let dispatch=useDispatch()
    useEffect(()=>{
      let currentData=JSON.parse(sessionStorage.getItem("currentPlayerStats"))
      if(currentData != null){
          if(playerId !== currentData.id){
              dispatch(GET_PLAYER_STATS_DATA(playerId))
          }
      }else{
          dispatch(GET_PLAYER_STATS_DATA(playerId))
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
            <div className="playerBlock">
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
                          <PlayerIntro player={currentPlayerStats} playerSlug={playerSlug}  />
                        </div>
                        <div className="pageContent">
                            <div className="PageLayout__MainContainer">

                            {currentPlayerStatsFiltered.everySeasonStats.length > 0 ? (
                                    filterLoading ?(
                                        <div className="loadingBlock">
                                            <span className="ouro ouro3">
                                                <span className="left"><span className="anim"></span></span>
                                                <span className="right"><span className="anim"></span></span>
                                            </span>
                                        </div>
                                    ) : (
                                        <section className="currentPlayerStats">
                                    <header className="cardHeader">
                                        <div className="cardTitle">
                                            <p>Stats</p>
                                            <div className="filters">
                                                <select className='dropdown__select' onChange={(e)=>{dispatch(GET_PLAYER_STATS_FILTERED_DATA(playerId,e.target.value));sessionStorage.setItem("selectedTeam",e.target.value);setSelectedTeam(e.target.value)}} >
                                                    {currentPlayerStatsFiltered?.allTeams && (
                                                        currentPlayerStatsFiltered?.allTeams.map((team,index)=>{
                                                           
                                                            if(selectedTeam === team.id){
                                                                return <option key={index} selected value={team.id} >
                                                                    {team.name}
                                                                </option>
                                                            }else{
                                                                return <option key={index} value={team.id} >
                                                                    {team.name}
                                                                </option>
                                                            }
                                                        })
                                                    )}
                                                    
                                                </select>
                                              
                                                    
                                                    {currentPlayerStatsFiltered?.allCompets && (
                                                        currentPlayerStatsFiltered?.allCompets.length > 0 && (
                                                            <select className='dropdown__select' onChange={(e)=>{dispatch(GET_PLAYER_STATS_FILTERED_DATA(playerId,selectedTeam,e.target.value));sessionStorage.setItem("selectedCompet",e.target.value);setSelectedCompet(e.target.value)}} >
                                                                {
                                                                    currentPlayerStatsFiltered?.allCompets.map((compet,index)=>{
                                                                        if(selectedCompet === compet.slug){
                                                                            return <option key={index} selected value={compet.slug} >
                                                                                {compet.name}
                                                                            </option>
                                                                        }else{
                                                                            return <option key={index} value={compet.slug} >
                                                                                {compet.name}
                                                                            </option>
                                                                        }
                                                                    })
                                                                }
                                                              </select>
                                                        )
                                                    )}
                                                   
                                              
                                            </div>
                                        </div>   
                                    </header>
                                    <div className="Wrapper">
                                        <div className="allPlayerStats"> 

                                            {
                                                currentPlayerStatsFiltered?.everySeasonStats && (
                                                    currentPlayerStatsFiltered?.everySeasonStats?.map((competStats,index)=>{
                                                        return   <PlayerStatsTable key={index} stats={competStats} />
                                                    })
                                                )
                                            }

                                                    
                                        </div>                
                                    </div>
                                </section>
                                    )

                                    
                    
                                
                            ) : (
                                <section className="currentPlayerStats">
                                <header className="cardHeader">
                                    <div className="cardTitle">
                                        <p>Stats</p>
                                        <div className="filters">
                                            <select className='dropdown__select' onChange={(e)=>{dispatch(GET_PLAYER_STATS_FILTERED_DATA(playerId,e.target.value));sessionStorage.setItem("selectedTeam",e.target.value);setSelectedTeam(e.target.value)}} >
                                                {currentPlayerStats?.allTeams && (
                                                    currentPlayerStats?.allTeams.map((team,index)=>{
                                                       
                                                        if(selectedTeam === team.id){
                                                            return <option key={index} selected value={team.id} >
                                                                {team.name}
                                                            </option>
                                                        }else{
                                                            return <option key={index} value={team.id} >
                                                                {team.name}
                                                            </option>
                                                        }
                                                    })
                                                )}
                                                
                                            </select>
                                            <select className='dropdown__select' onChange={(e)=>{dispatch(GET_PLAYER_STATS_FILTERED_DATA(playerId,selectedTeam,e.target.value));sessionStorage.setItem("selectedCompet",e.target.value);setSelectedCompet(e.target.value)}} >
                                                
                                                {currentPlayerStats?.allCompets && (
                                                    currentPlayerStats?.allCompets.map((compet,index)=>{
                                                        if(selectedCompet === compet.slug){
                                                            return <option key={index} selected value={compet.slug} >
                                                                {compet.name}
                                                            </option>
                                                        }else{
                                                            return <option key={index} value={compet.slug} >
                                                                {compet.name}
                                                            </option>
                                                        }
                                                    })
                                                )}
                                               
                                            </select>
                                        </div>
                                    </div>   
                                </header>
                                <div className="Wrapper">
                                    <div className="allPlayerStats"> 

                                        {
                                            currentPlayerStats?.everySeasonStats && (
                                                currentPlayerStats?.everySeasonStats?.map((competStats,index)=>{
                                                    return   <PlayerStatsTable key={index} stats={competStats} />
                                                })
                                            )
                                        }

                                                
                                    </div>                
                                </div>
                            </section>
                            )}
                                  
                            </div>
                          <div className="PageLayout__RightAside hideRightside">
                            <section className="latestNews">
                              <header className="cardHeader">
                                <div className="cardTitle">
                                  <p>Latest News</p>
                                </div>   
                              </header>
                              <div className="Wrapper">
                                <ul className="listOfPlayerNews">
                                    {currentPlayerInfo?.allNews && (
                                        currentPlayerInfo?.allNews?.map((news,index)=>{
                                            return  <li key={index}>
                                                      <div className="newsImg">
                                                        <img src={news.articleImageUrl} alt="" />
                                                      </div>
                                                      <div className="articleInfo">
                                                        <Link  className='articleTitle'>{news.articleTitle.length > 82 ? news.articleTitle.slice(0,79) + "..." : news.articleTitle}</Link>
                                                        <div className="articleMetaData">
                                                          <span className='timeStamp'>{news.timeStamps}</span>
                                                          <span className='author'>{news.author}</span>
                                                        </div>
                                                      </div>
                                                    </li>
                                         })
                                    )}
                                   
                                </ul>
                              </div>
                            </section>  
                            <p>{currentPlayerStatsFiltered.everySeasonStats.length > 0  ? "FilterIsOn" : "FilterIsOFF"}</p>
                          </div>
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
