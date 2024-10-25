import { useDispatch, useSelector } from "react-redux";
import Footer from "../../../components/Footer/Footer";
import NavBar from "../../../components/NavBar/NavBar";
import "./MatchLineUpPage.css"
import React, { useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import { GET_MATCH_LINEUP_DATA } from "../../../redux/matches/matchesAction";
import GameInfo from "../../../components/GameComponents/GameInfo/GameInfo";
import GameIntro from "../../../components/GameComponents/GameIntro/GameIntro";
import { GET_TEAM_INFO } from "../../../redux/team/teamsActions";
import GameLineUp from "../../../components/GameComponents/GameLineUp/GameLineUp";
import { generateShortName } from "../../../utils/baseUrl";
import SideBarLineUp from "../../../components/GameComponents/SideBarLineUp/SideBarLineUp";
import GameStatsComp from "../../../components/GameComponents/GameStatsComp/GameStatsComp";

export default function MatchLineUpPage() {
    let { gameId } = useParams();
    let { gameSlug } = useParams();
    let loading=useSelector(state=>state.matches.loading) 

    let currentMatchLineUp=useSelector(state=>state.matches.currentMatchLineUp)    


    let dispatch=useDispatch()
    useEffect(()=>{
      let currentData=JSON.parse(sessionStorage.getItem("currentMatchLineUp"))
      if(currentData != null){
          if(gameId !== currentData.id){
              dispatch(GET_MATCH_LINEUP_DATA(gameId,gameSlug))
          }
      }else{
          dispatch(GET_MATCH_LINEUP_DATA(gameId,gameSlug))
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
    <div className="gameBlock matchLineUpPage">
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
                  <GameIntro game={currentMatchLineUp} gameId={gameId}  gameSlug={gameSlug} />
                </div>
                <div className="pageContent">
            
                    <div className="mainContainer">
                       <GameLineUp homeTeam={currentMatchLineUp?.homeTeam} awayTeam={currentMatchLineUp?.awayTeam} lineUp={currentMatchLineUp} />
                       <div className="extraComp">
                        {
                          currentMatchLineUp?.isLinupsAvai ? (
                            <SideBarLineUp homeTeam={currentMatchLineUp?.homeTeam} awayTeam={currentMatchLineUp?.awayTeam} lineUps={currentMatchLineUp?.lineUps} />
                          ) :(
                            <GameStatsComp stats={currentMatchLineUp} />
                          )
                        }
                        <GameInfo info={currentMatchLineUp} />
                      </div>
                    </div>
                    {currentMatchLineUp.currentCompet?.clubsList && (
                        <div className="rightSideContainer">
                        <GameInfo info={currentMatchLineUp} />
                        <div className="competStanding">
                          <h4 className="leagueName">{currentMatchLineUp?.currentCompet?.name}</h4>
                            <table>
                              <thead>
                                <tr>
                                  <th>TEAM</th>
                                  <th>GP</th>
                                  <th>W</th>
                                  <th>D</th>
                                  <th>L</th>
                                  <th>GD</th>
                                  <th>P</th>
                                </tr>
                              </thead>
                              <tbody>
                                {currentMatchLineUp.currentCompet?.clubsList?.map((team,ind2)=>{
                                  return <tr key={ind2}>
                                      <td>
                                        <Link to={`/team/_/id/${team.id}/${team.slug}`} onClick={()=>dispatch(GET_TEAM_INFO(team.id))}>{team.name}</Link>
                                        <Link to={`/team/_/id/${team.id}/${team.slug}`} onClick={()=>dispatch(GET_TEAM_INFO(team.id))}>{generateShortName(team.name)}</Link>
                                      </td>
                                      <td>{team.GP}</td>
                                      <td>{team.W}</td>
                                      <td>{team.D}</td>
                                      <td>{team.L}</td>
                                      <td>{team.GD}</td>
                                      <td>{team.P}</td>
                                  </tr>
                                })}
                              </tbody>
                            </table>
                            <Link to="" className='moreStandings'>Standings</Link>
                          </div>
                      </div>
                    )}
                    
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
