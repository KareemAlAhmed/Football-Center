import React, { useEffect } from 'react'
import "./MatchCommentaryPage.css"
import { Link, useParams } from 'react-router-dom';
import { GET_TEAM_INFO } from '../../../redux/team/teamsActions';
import GameTimeLine from '../../../components/GameComponents/GameTimeLine/GameTimeLine';
import GameCommentary from '../../../components/GameComponents/GameCommentary/GameCommentary';
import GameInfo from '../../../components/GameComponents/GameInfo/GameInfo';
import SideBarLineUp from '../../../components/GameComponents/SideBarLineUp/SideBarLineUp';
import GameIntro from '../../../components/GameComponents/GameIntro/GameIntro';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../../components/Footer/Footer';
import NavBar from '../../../components/NavBar/NavBar';
import { GET_MATCH_COMMENTARY_DATA } from '../../../redux/matches/matchesAction';
import { generateShortName } from '../../../utils/baseUrl';
export default function MatchCommentaryPage() {
    let { gameId } = useParams();
    let { gameSlug } = useParams();
    let loading=useSelector(state=>state.matches.loading) 
    let currentMatchCommentary=useSelector(state=>state.matches.currentMatchCommentary)    
    let dispatch=useDispatch()
    useEffect(()=>{
        let currentData=JSON.parse(sessionStorage.getItem("currentMatchCommentary"))
        if(currentData != null){
            if(gameId !== currentData.id){
                dispatch(GET_MATCH_COMMENTARY_DATA(gameId,gameSlug))
            }
        }else{
            dispatch(GET_MATCH_COMMENTARY_DATA(gameId,gameSlug))
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
            <div className="gameBlock matchCommentary">
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
                            (currentMatchCommentary?.status === "Finished" || currentMatchCommentary?.status === "Live") ? (
                                <>
                                    <div className="pageHeader">
                                        <GameIntro game={currentMatchCommentary} gameId={gameId}  gameSlug={gameSlug} />
                                    </div>
                                <div className="pageContent">
                                    <div className="leftSideContainer">                           
                                        <SideBarLineUp homeTeam={currentMatchCommentary?.homeTeam} awayTeam={currentMatchCommentary?.awayTeam} lineUps={currentMatchCommentary?.lineUps} />                                                                        
                                        <GameInfo info={currentMatchCommentary} />
                                    </div>
                                  
                                    <div className="mainContainer">
                                      {
                                        currentMatchCommentary?.gameStory && (
                                          Object.keys(currentMatchCommentary?.gameStory).length !== 0 && (
                                            <div className="gamePreviewQuickInfo">
                                                <Link to={`/match/_/${currentMatchCommentary?.id}/${currentMatchCommentary?.slug}/report`} > 
                                                  <h2 className="gamePreviewLink">{currentMatchCommentary?.gameStory?.title}</h2>
                                                  <p className="gamePreviewContent">{currentMatchCommentary?.gameStory?.content}</p>
                                                  <p className="gamePreviewMetaDeta">{currentMatchCommentary?.gameStory?.dateAndTime}</p>
                                                </Link>
                                               
                                            </div>
                                          )
                                        )
                                      }
                            
                                        <GameCommentary gameComm={currentMatchCommentary?.gameCommentary} keyEvents={currentMatchCommentary?.keyEvents} type="mainPage"/>
                                        <div className="extraComp">
                                          <GameInfo info={currentMatchCommentary} />
                                        </div>
                                    </div>
                                    {currentMatchCommentary.currentCompet?.clubsList && (
                                      <div className="rightSideContainer">
                                      <div className="competStanding">
                                        <h4 className="leagueName">{currentMatchCommentary.currentCompet?.name}</h4>
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
                                              {currentMatchCommentary.currentCompet?.clubsList?.map((team,ind2)=>{
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
                        ) :null
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
      )
}
