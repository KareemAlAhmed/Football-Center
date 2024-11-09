import { useDispatch, useSelector } from "react-redux";
import Footer from "../../../components/Footer/Footer";
import NavBar from "../../../components/NavBar/NavBar";
import PlayerIntro from "../../../components/PlayerIntro/PlayerIntro";
import "./PlayerMatches.css"
import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import { GET_PLAYER_FILTERED_MATCHES_DATA, GET_PLAYER_MATCHES_DATA } from "../../../redux/players/playersAction";
import { getTeamImage } from "../../../utils/baseUrl";
import PlayerMatchesComp from "../../../components/PlayerMatchesComp/PlayerMatchesComp";
import { ToastContainer } from "react-toastify";

export default function PlayerMatches() {
    let { playerId } = useParams();
    let { playerSlug } = useParams();
    let loading=useSelector(state=>state.players.loading) 
    let filterLoading=useSelector(state=>state.players.filterLoading) 
    let currentPlayerInfo=useSelector(state=>state.players.currentPlayerInfo) 
    let currentPlayerMatches=useSelector(state=>state.players.currentPlayerMatches) 
    let currentPlayerMatchesFiltered=useSelector(state=>state.players.currentPlayerMatchesFiltered) 
    
    let season=0;
    let team=currentPlayerInfo?.team?.id;
    // let compet=currentPlayerInfo?.currentLeague?.slug;
    let compet;
    if(currentPlayerMatches?.allSeasons){
        season= currentPlayerMatches?.allSeasons[0]?.slug
    }
    if(currentPlayerMatchesFiltered?.currentCompetMatches?.length > 0){
        console.log(currentPlayerMatchesFiltered)
        team=currentPlayerMatchesFiltered.teamId
        compet=currentPlayerMatchesFiltered.competSlug
        season=currentPlayerMatchesFiltered.year
        if(compet === "any"){
            let currentStage=currentPlayerMatchesFiltered.currentCompetMatches[0].competStage
            let currentCompet=currentPlayerMatchesFiltered.allCompets.filter(ele=>currentStage.includes(ele.name))
            if(currentCompet.length > 0){

                compet=currentCompet[0].slug
            }
            currentPlayerMatchesFiltered.competSlug=compet
        }
    }
    let [selectedTeam,setSelectedTeam]=useState(team)
    let [selectedSeason,setSelectedSeason]=useState(season)
    let [selectedCompet,setSelectedCompet]=useState(compet)


   
    let dispatch=useDispatch()
    useEffect(()=>{
      let currentData=JSON.parse(sessionStorage.getItem("currentPlayerMatches"))
      if(currentData != null){
          if(playerId !== currentData.id){
              dispatch(GET_PLAYER_MATCHES_DATA(playerId))
          }
      }else{
          dispatch(GET_PLAYER_MATCHES_DATA(playerId))
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
                          <PlayerIntro player={currentPlayerMatches} playerSlug={playerSlug}  />
                        </div>
                        <div className="pageContent">
                            <div className="PageLayout__MainContainer">

                            {currentPlayerMatchesFiltered?.currentCompetMatches?.length > 0 ? (
                                 filterLoading ?(
                                    <div className="loadingBlock">
                                        <span className="ouro ouro3">
                                            <span className="left"><span className="anim"></span></span>
                                            <span className="right"><span className="anim"></span></span>
                                        </span>
                                    </div>
                                ) : (
                                    <section className="playerMatches">
                                    <header className="cardHeader">
                                        <div className="cardTitle">
                                            <p>Matches</p>
                                            <div className="filters">
                                                <select className='dropdown__select' onChange={(e)=>{dispatch(GET_PLAYER_FILTERED_MATCHES_DATA(playerId,selectedTeam,selectedCompet,e.target.value));setSelectedSeason(e.target.value)}} >
                                                    {currentPlayerMatchesFiltered?.allSeasons && (
                                                        currentPlayerMatchesFiltered?.allSeasons.map((season,index)=>{
                                                            if(selectedSeason === season.slug){
                                                                return <option key={index} selected value={season.slug} >
                                                                    {season.name}
                                                                </option>
                                                            }else{
                                                                return <option key={index} value={season.slug} >
                                                                    {season.name}
                                                                </option>
                                                            }
                                                        })
                                                    )}
                                                   
                                                </select>
                                                <select className='dropdown__select' onChange={(e)=>{dispatch(GET_PLAYER_FILTERED_MATCHES_DATA(playerId,e.target.value));setSelectedTeam(e.target.value)}} >
                                                    {currentPlayerMatchesFiltered?.allTeams && (
                                                        currentPlayerMatchesFiltered?.allTeams.map((team,index)=>{
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
                                                <select className='dropdown__select' onChange={(e)=>{dispatch(GET_PLAYER_FILTERED_MATCHES_DATA(playerId,selectedTeam,e.target.value));setSelectedCompet(e.target.value)}} >
                                                    
                                                    {currentPlayerMatchesFiltered?.allCompets && (
                                                        currentPlayerMatchesFiltered?.allCompets.map((compet,index)=>{
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
                                        <div className="allPlayerMatches">
                                        { 
                                            currentPlayerMatchesFiltered?.currentCompetMatches?.length > 0 ? (
                                             currentPlayerMatchesFiltered?.currentCompetMatches?.map((competMatches,index)=>{
                                                    return <PlayerMatchesComp competetionMatches={competMatches} />
                                                })
                                            ) :(                                       
                                                <h2 className="noDataFound">No available information.</h2>
                                            )
                                        }
                                        
                                        </div>                
                                    </div>
                                </section>
                                )
                                  
                            ) : (
                                <section className="playerMatches">
                                <header className="cardHeader">
                                    <div className="cardTitle">
                                        <p>Matches</p>
                                        <div className="filters">
                                            <select className='dropdown__select' onChange={(e)=>{dispatch(GET_PLAYER_FILTERED_MATCHES_DATA(playerId,selectedTeam,selectedCompet,e.target.value));setSelectedSeason(e.target.value)}} >
                                                {currentPlayerMatches?.allSeasons && (
                                                    currentPlayerMatches?.allSeasons.map((season,index)=>{
                                                        if(selectedSeason === season.slug){
                                                            return <option key={index} selected value={season.slug} >
                                                                {season.name}
                                                            </option>
                                                        }else{
                                                            return <option key={index} value={season.slug} >
                                                                {season.name}
                                                            </option>
                                                        }
                                                    })
                                                )}
                                               
                                            </select>
                                            <select className='dropdown__select' onChange={(e)=>{dispatch(GET_PLAYER_FILTERED_MATCHES_DATA(playerId,e.target.value));setSelectedTeam(e.target.value)}} >
                                                {currentPlayerMatches?.allTeams && (
                                                    currentPlayerMatches?.allTeams.map((team,index)=>{
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
                                            <select className='dropdown__select' onChange={(e)=>{dispatch(GET_PLAYER_FILTERED_MATCHES_DATA(playerId,selectedTeam,e.target.value));setSelectedCompet(e.target.value)}} >
                                                
                                                {currentPlayerMatches?.allCompets && (
                                                    currentPlayerMatches?.allCompets.map((compet,index)=>{
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
                                    <div className="allPlayerMatches">
                                    { 
                                        currentPlayerMatches?.currentCompetMatches?.length > 0 ? (
                                            currentPlayerMatches?.currentCompetMatches?.map((competMatches,index)=>{
                                                return <PlayerMatchesComp competetionMatches={competMatches} />
                                            })
                                        ) :(                                       
                                            <h2 className="noDataFound">No available information.</h2>
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
