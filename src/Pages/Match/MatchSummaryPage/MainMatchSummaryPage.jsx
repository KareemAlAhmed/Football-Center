import React, { useEffect } from 'react'
import "./MainMatchSummaryPage.css"
import Footer from '../../../components/Footer/Footer';
import NavBar from '../../../components/NavBar/NavBar';
import PlayerIntro from '../../../components/PlayerIntro/PlayerIntro';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GET_MATCH_TEST_DATA, GET_PRE_MATCH_SUMMARY_DATA } from '../../../redux/matches/matchesAction';
import PreMatchSummary from './PreMatchSummary/PreMatchSummary';
import PostMatchSummary from './PostMatchSummary/PostMatchSummary';

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
      // let currentData=JSON.parse(sessionStorage.getItem("currentMatchSummary"))
      // if(currentData != null){
      //     if(gameId !== currentData.id){
      //         dispatch(GET_MATCH_TEST_DATA(gameId,gameSlug))
      //     }
      // }else{
      //     dispatch(GET_MATCH_TEST_DATA(gameId,gameSlug))
      // }

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
    <div className="gameBlock overviewMatchPage">
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
              currentMatchSummary?.status === "Not Started" ? (
                <PreMatchSummary gameId={gameId} gameSlug={gameSlug} />
              )  : (currentMatchSummary?.status === "Finished" || currentMatchSummary?.status === "Live") ? (
                <PostMatchSummary gameId={gameId} gameSlug={gameSlug} />
              ) :null

            )}
        </div>
      </div>
    </div>
    <Footer />
</>
  )
}
