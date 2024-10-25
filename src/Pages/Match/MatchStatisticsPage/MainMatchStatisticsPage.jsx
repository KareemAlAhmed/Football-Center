import { useDispatch, useSelector } from "react-redux";
import Footer from "../../../components/Footer/Footer";
import NavBar from "../../../components/NavBar/NavBar";
import { GET_MATCH_STATS_DATA, GET_PRE_MATCH_SUMMARY_DATA } from "../../../redux/matches/matchesAction";
import PreMatchSummary from "../MatchSummaryPage/PreMatchSummary/PreMatchSummary";
import "./MainMatchStatisticsPage.css"
import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import PreMatchStatistics from "./PreMatchStatistics/PreMatchStatistics";
import PostMatchStatistics from "./PostMatchStatistics/PostMatchStatistics";

export default function MainMatchStatisticsPage() {
    let { gameId } = useParams();
    let { gameSlug } = useParams();
    let loading=useSelector(state=>state.matches.loading) 

    let currentMatchStats=useSelector(state=>state.matches.currentMatchStats)    


    let dispatch=useDispatch()
    useEffect(()=>{
      let currentData=JSON.parse(sessionStorage.getItem("currentMatchStats"))
      if(currentData != null){
          if(gameId !== currentData.id){
              dispatch(GET_MATCH_STATS_DATA(gameId,gameSlug))
          }
      }else{
          dispatch(GET_MATCH_STATS_DATA(gameId,gameSlug))
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
    <div className="gameBlock matchStats">
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
                currentMatchStats?.status === "Not Started" ? (
                <PreMatchStatistics  gameId={gameId} gameSlug={gameSlug} />
              ) :  (
                <PostMatchStatistics gameId={gameId} gameSlug={gameSlug} />
              ) 
            )}
        </div>
      </div>
    </div>
    <Footer />
</>
  )
}
