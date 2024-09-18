import React, { useEffect } from 'react'
import "./PlayerOverview.css"
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GET_PLAYER_INFO } from '../../../redux/players/playersAction';
import Footer from '../../../components/Footer/Footer';
import NavBar from '../../../components/NavBar/NavBar';
import PlayerIntro from '../../../components/PlayerIntro/PlayerIntro';
export default function PlayerOverview() {
    let { playerId } = useParams();
    let { playerSlug } = useParams();
    let loading=useSelector(state=>state.players.loading) 
    let currentPlayerInfo=useSelector(state=>state.players.currentPlayerInfo) 
    let dispatch=useDispatch()
    useEffect(()=>{
      let currentData=JSON.parse(sessionStorage.getItem("currentPlayerInfo"))
      if(currentData != null){
          if(playerId !== currentData.id){
              dispatch(GET_PLAYER_INFO(playerId))
          }
      }else{
          dispatch(GET_PLAYER_INFO(playerId))
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
    <div className="teamBlock">
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
                  <PlayerIntro player={currentPlayerInfo} playerSlug={playerSlug}  />
                </div>
                <div className="pageContent">
                  
                 
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
