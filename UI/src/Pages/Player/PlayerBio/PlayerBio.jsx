import React, { useEffect, useState } from 'react'
import "./PlayerBio.css"
import Footer from '../../../components/Footer/Footer';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PlayerIntro from '../../../components/PlayerIntro/PlayerIntro';
import NavBar from '../../../components/NavBar/NavBar';
import { GET_PLAYER_BIO_DATA } from '../../../redux/players/playersAction';
import { getDefaultTeamOrCompetLogo, getTeamImage } from '../../../utils/baseUrl';
import { ToastContainer } from 'react-toastify';
export default function PlayerBio() {
    let { playerId } = useParams();
    let { playerSlug } = useParams();
    let loading=useSelector(state=>state.players.loading) 
    let currentPlayerInfo=useSelector(state=>state.players.currentPlayerInfo) 
    let currentPlayerBio=useSelector(state=>state.players.currentPlayerBio) 

    let dispatch=useDispatch()
    useEffect(()=>{
      let currentData=JSON.parse(sessionStorage.getItem("currentPlayerBio"))
      if(currentData != null){
          if(playerId !== currentData.id){
              dispatch(GET_PLAYER_BIO_DATA(playerId))
          }
      }else{
          dispatch(GET_PLAYER_BIO_DATA(playerId))
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
                          <PlayerIntro player={currentPlayerBio} playerSlug={playerSlug}  />
                        </div>
                        <div className="pageContent">
                          <div className="PageLayout__MainContainer">
                            <section className="playerBio">
                              <header className="cardHeader">
                                <div className="cardTitle">
                                  <p>Biography</p>
                                </div>   
                              </header>
                              <div className="Wrapper">
                                <div className="bioInfos">
                                    <ul className="listOfInfo">
                                        <li>
                                            <span className='bioSection'>TEAM</span>
                                            <span className='bioValue'>{currentPlayerBio?.team?.name}</span>
                                        </li>
                                        <li>
                                            <span className='bioSection'>Position</span>
                                            <span className='bioValue'>{currentPlayerBio?.position}</span>
                                        </li>
                                        <li>
                                            <span className='bioSection'>HT/WT</span>
                                            <span className='bioValue'>{currentPlayerBio?.height},{currentPlayerBio?.weight}</span>
                                        </li>
                                        <li>
                                            <span className='bioSection'>Birthdate</span>
                                            <span className='bioValue'>{currentPlayerBio?.birthday}</span>

                                        </li>
                                        <li>
                                            <span className='bioSection'>Nationality</span>
                                            <span className='bioValue'>{currentPlayerBio?.nationality}</span>
                                        </li>
                                     
                                    </ul>
                                </div>
                              </div>
                            </section>
                            <section className="playerHistory">
                              <header className="cardHeader">
                                <div className="cardTitle">
                                  <p>Career History</p>                               
                                </div>   
                              </header>
                              <div className="Wrapper">
                                <ul className="playerHistory">
                                    {currentPlayerBio?.careerHistory?.map((team,index)=>{
                                        return <li key={index}>
                                            <Link to={`/team/_/id/${team.id}/${team.slug}`}>
                                                <div className="teamLogo">
                                                    <img src={getTeamImage(team.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                                                </div>
                                                <div className="teamInfo">
                                                    <span className='teamName'>{team.name}</span>
                                                    <span className='seasonPlayed'>{team.seasons}</span>
                                                </div>
                                            </Link>
                                        </li>
                                    })}
                                </ul>
                                  
                              </div>
                            </section>
                                          
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
                                   {currentPlayerInfo?.allNews?.map((news,index)=>{
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
                                   })}
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
