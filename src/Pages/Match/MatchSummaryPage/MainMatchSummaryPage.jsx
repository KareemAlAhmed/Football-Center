import React, { useEffect } from 'react'
import "./MainMatchSummaryPage.css"
import Footer from '../../../components/Footer/Footer';
import NavBar from '../../../components/NavBar/NavBar';
import PlayerIntro from '../../../components/PlayerIntro/PlayerIntro';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GET_PRE_MATCH_SUMMARY_DATA } from '../../../redux/matches/matchesAction';
import PreMatchSummary from './PreMatchSummary/PreMatchSummary';

export default function MainMatchSummaryPage() {
    let { gameId } = useParams();
    let { gameSlug } = useParams();
    let loading=useSelector(state=>state.matches.loading) 

    let currentMatchSummary=useSelector(state=>state.matches.currentMatchSummary)    


    let dispatch=useDispatch()
    useEffect(()=>{
      let currentData=JSON.parse(sessionStorage.getItem("currentMatchSummary"))
      if(currentData != null){
          if(gameId !== currentData.id){
              dispatch(GET_PRE_MATCH_SUMMARY_DATA(gameId,gameSlug))
          }
      }else{
          dispatch(GET_PRE_MATCH_SUMMARY_DATA(gameId,gameSlug))
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
    <div className="gameBlock">
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
              currentMatchSummary?.status === "Not Started" ? (
                <PreMatchSummary gameId={gameId} gameSlug={gameSlug} />
              ) :null
            )}
        </div>
      </div>
    </div>
    <Footer />
</>
  )
}
