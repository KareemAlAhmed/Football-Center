import React, { useEffect } from 'react'
import "./MatchReportPage.css"
import Footer from '../../../components/Footer/Footer';
import { Link, useParams } from 'react-router-dom';
import { GET_TEAM_INFO } from '../../../redux/team/teamsActions';
import GameInfo from '../../../components/GameComponents/GameInfo/GameInfo';
import GameIntro from '../../../components/GameComponents/GameIntro/GameIntro';
import NavBar from '../../../components/NavBar/NavBar';
import { GET_MATCH_REPORT_DATA } from '../../../redux/matches/matchesAction';
import { useDispatch, useSelector } from 'react-redux';
import { generateShortName } from '../../../utils/baseUrl';
export default function MatchReportPage() {
    let { gameId } = useParams();
    let { gameSlug } = useParams();
    let loading=useSelector(state=>state.matches.loading) 

    let currentMatchReport=useSelector(state=>state.matches.currentMatchReport)    


    let dispatch=useDispatch()
    useEffect(()=>{
      let currentData=JSON.parse(sessionStorage.getItem("currentMatchReport"))
      if(currentData != null){
          if(gameId !== currentData.id){
              dispatch(GET_MATCH_REPORT_DATA(gameId,gameSlug))
          }
      }else{
          dispatch(GET_MATCH_REPORT_DATA(gameId,gameSlug))
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
        <div className="gameBlock matchReport">
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
                        currentMatchReport?.status === "Finished" ? (
                            <>
                            <div className="pageHeader">
                              <GameIntro game={currentMatchReport} gameId={gameId}  gameSlug={gameSlug} />
                            </div>
                            <div className="pageContent">
                        
                                <div className="mainContainer">
                                    <div className="articleTitle">
                                        <h1>{currentMatchReport?.title}</h1>
                                    </div>
                                    <div className="articleMetaData">
                                        <ul className="authors">
                                            {currentMatchReport?.metaData?.authors?.map((author,index)=>{
                                                return <li key={index}>{author} {index !== currentMatchReport?.metaData?.authors.length - 1 && "And"}</li>
                                            })}
                                        </ul>
                                        <div className="timeStamps">
                                            <span>{currentMatchReport?.metaData?.timeStamps}</span>
                                        </div>
                                    </div>
                                    <div className="articleBody">
                                        {
                                            currentMatchReport?.allContent.map((elem,index)=>{
                                                if(elem.tagName=== "p"){
                                                    return  <p key={index}>{elem.text}</p>
                                                }else if(elem.tagName=== "h1"){
                                                    return  <h1 key={index}>{elem.text}</h1>
                                                }else if(elem.tagName=== "h2"){
                                                    return  <h2 key={index}>{elem.text}</h2>
                                                }else if(elem.tagName=== "h3"){
                                                    return  <h3 key={index}>{elem.text}</h3>
                                                }else if(elem.tagName=== "ul"){
                                                    return <ul key={index}>
                                                        {elem.textArray.map((text,index2)=>{
                                                            return <li key={index2}>{text}</li>
                                                        })}
                                                    </ul>
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                                {currentMatchReport.currentCompet?.clubsList && (
                                     <div className="rightSideContainer">
                                     <GameInfo info={currentMatchReport} />
                                     <div className="competStanding">
                                       <h4 className="leagueName">{currentMatchReport?.currentCompet?.name}</h4>
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
                                             {currentMatchReport.currentCompet?.clubsList?.map((team,ind2)=>{
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
