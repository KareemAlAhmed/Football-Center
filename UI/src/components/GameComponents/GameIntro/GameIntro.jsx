import { Link, useNavigate } from "react-router-dom";
import "./GameIntro.css"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { generateShortName, getDefaultTeamOrCompetLogo, getTeamImage, getTeamLink } from "../../../utils/baseUrl";
import GoalIcon from "../../Icons/GoalIcon/GoalIcon";
import RedCardSvg from "../../Icons/RedCardSvg/RedCardSvg";

export default function GameIntro({game,gameId,gameSlug}) {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    let currentMatchSummary=useSelector(state=>state.matches.currentMatchSummary)  


    useEffect(()=>{
        let allLis=document.querySelectorAll(".gamePageOpts .Nav__Secondary__Menu li")
        for (const li of allLis) {
            li.addEventListener("mouseenter", function(event) {     
                if(!li.classList.contains("activeli")){
                    document.querySelector(".gamePageOpts .activeli").style.boxShadow = "none";
                }
              // Add your custom logic to handle the click event as needed
            });
            li.addEventListener("mouseleave", function(event) {     
                if(!li.classList.contains("activeli")){
                    document.querySelector(".gamePageOpts .activeli").style.boxShadow = "inset 0 -3px 0 var(--text-color)";
                }
              // Add your custom logic to handle the click event as needed
            });
            if(li.classList.contains("activeli")){
              li.classList.remove("activeli")
            }
            if(sessionStorage.getItem("currentGameTag") != null){
              if(li.classList.contains(sessionStorage.getItem("currentGameTag"))){
                li.classList.add("activeli")
              }
            }
      }



    },[])

    let HomebackColor1;
    let HomebackColor2;
    let HomebackColor3;
    let AwaybackColor1;
    let AwaybackColor2;
    let AwaybackColor3;
    if(game){
        HomebackColor1={
            backgroundColor:game?.homeTeam?.color1
        }
        HomebackColor2={
            backgroundColor:game?.homeTeam?.color2
        }
        HomebackColor3={
            backgroundColor:game?.homeTeam?.color2
        }
        AwaybackColor1={
            backgroundColor:game?.awayTeam?.color1
        }
        AwaybackColor2={
            backgroundColor:game?.awayTeam?.color2
        }
        AwaybackColor3={
            backgroundColor:game?.awayTeam?.color2
        }
    }

  return (
    <>
        <div className='gameHeaderInfo'>
            <div className="gameCompet">
                <p>{game?.competName}</p>
            </div>
            <div className="competitorsInfo">
                <div className="homeTeamInfo">
                    
                    <div className="Logo-Container Logo-Container-left">
                        <div className="TeamLogo " style={HomebackColor1}>
                            <img  src={getTeamImage(game?.homeTeam?.id)} alt=""  onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }}/>
                        </div>
                        <div className="SkewedLine SkewedLine--1" style={HomebackColor2}></div>
                        <div className="SkewedLine SkewedLine--2" style={HomebackColor3}></div>
                    </div>
                    <div className="competitorInfo">

                        <div className="teamInfoWrapper">
                            <div className="teamInfos homeTeamInfo">
                                <div className="teamNameAndPoints">
                                    <Link className="teamLink" to={getTeamLink(game?.homeTeam?.id,game?.homeTeam?.slug)}>{game?.homeTeam?.name}</Link>
                                    <Link className="teamLink" to={getTeamLink(game?.homeTeam?.id,game?.homeTeam?.slug)}>{generateShortName(game?.homeTeam?.name)}</Link>
                                    <span>{game?.homeTeam?.record.split(",")[0]}<span className="teamPoints">{game?.homeTeam?.record.length > 0 && (", " +game?.homeTeam?.record.split(",")[1])}</span></span>
                                </div>
                                <div className="competitorLogo">
                                    <img src={getTeamImage(game?.homeTeam?.id)} alt=""  onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                                </div>
                            </div>
                        </div>
                        {game?.status === "Finished" && (
                            <div className="teamScore">
                                <span className={game?.homeTeam?.score > game?.awayTeam?.score && "winnerScore"}>{game?.homeTeam?.score}</span>
                                <span className={game?.homeTeam?.score > game?.awayTeam?.score && "winnerScore"}>{generateShortName(game?.homeTeam?.name)}</span>
                            </div>
                        )}
                    </div>

                </div>

                <div className="matchDataAndTime">
                {game?.status === "Finished" ? (
                    <>
                        {game?.homeTeam?.score > game?.awayTeam?.score && (
                            <svg className="arrowIcon leftArrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"></path></svg>
                        )}              
                        <span className="finishedTime">FT</span>
                        {game?.homeTeam?.score < game?.awayTeam?.score && (
                            <svg className="arrowIcon rightArrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg>
                        )}  
                       
                    </>
                ) : game?.status === "Live" ? (
                    <>
                        <span className="matchLiveTime">{game?.matchTime ? Math.ceil(parseFloat(game.matchTime)) :  Math.ceil(parseFloat(currentMatchSummary.matchTime))}'</span>
                    </>
                ) : (
                    <>
                        <span className="matchDate">{game?.date}</span>
                        <span className="matchTime">{game?.time}</span>
                    </>
                )}

                </div>

                <div className="awayTeamInfo">
                    
                    <div className="competitorInfo">
                        {game?.status === "Finished" && (
                            <div className="teamScore">
                                <span className={game?.awayTeam?.score > game?.homeTeam?.score && "winnerScore"}>{game?.awayTeam?.score}</span>
                                <span className={game?.awayTeam?.score > game?.homeTeam?.score && "winnerScore"}>{generateShortName(game?.awayTeam?.name)}</span>
                            </div>
                        )}

                        <div className="teamInfoWrapper">
                            <div className="teamInfos awayTeamInfo">
                                <div className="competitorLogo">
                                    <img src={getTeamImage(game?.awayTeam?.id)} alt=""   onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }}/>
                                </div>
                                <div className="teamNameAndPoints">
                                    <Link className="teamLink" to={getTeamLink(game?.awayTeam?.id,game?.awayTeam?.slug)}>{game?.awayTeam?.name}</Link>
                                    <Link className="teamLink" to={getTeamLink(game?.homeTeam?.id,game?.homeTeam?.slug)}>{generateShortName(game?.awayTeam?.name)}</Link>
                                    <span>{game?.awayTeam?.record.split(",")[0]}<span className="teamPoints">{game?.awayTeam?.record.length > 0 && (", " +game?.awayTeam?.record.split(",")[1])}</span></span>
                                </div>
                            </div>
                        </div>
                        
                        
                    </div>

                    <div className="Logo-Container Logo-Container-right">
                        <div className="TeamLogo " style={AwaybackColor1}>
                            <img src={getTeamImage(game?.awayTeam?.id)} alt=""  onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                        </div>
                        <div className="SkewedLine SkewedLine--1" style={AwaybackColor2}></div>
                        <div className="SkewedLine SkewedLine--2" style={AwaybackColor3}></div>
                    </div>
                </div>

            </div>
            <div className="performedPlayers">
                <div className="performedPlayersList homePlayers">
                    {game?.homeTeam?.events?.goals.length > 0 && (
                        <div className="scorredPlayers">
                            <div className="scorredPlayersWrapper">
                                <ul>
                                    {game?.homeTeam?.events.goals.map((goal,index)=>{
                                        return  <li key={index}>
                                                    <span className="playerName">{goal.playerName}</span>
                                                    <span className="goalTime">{goal.goalTime}</span>
                                                </li>
                                    })}
                                </ul>
                            </div>
                            <GoalIcon />
                        </div>
                    )}
                    {game?.homeTeam?.events?.redCards.length > 0 && (
                        <div className="redCardPlayers">
                            <div className="redCardPlayerssWrapper">
                                <ul>
                                    {game?.homeTeam?.events.redCards.map((goal,index)=>{
                                        return  <li key={index}>
                                                    <span className="playerName">{goal.playerName}</span>
                                                    <span className="goalTime">{goal.goalTime}</span>
                                                </li>
                                    })}
                                </ul>
                            </div>
                            <RedCardSvg />
                        </div>
                    )}
                   
                </div>
                <div className="seperatorList"></div>
                <div className="performedPlayersList awayPlayers">
                    {game?.awayTeam?.events?.goals.length > 0 && (
                        <div className="scorredPlayers">
                            <GoalIcon />
                            <div className="scorredPlayersWrapper">                            
                                <ul>
                                    {game?.awayTeam?.events.goals.map((goal,index)=>{
                                        return  <li key={index}>
                                                    <span className="playerName">{goal.playerName}</span>
                                                    <span className="goalTime">{goal.goalTime}</span>
                                                </li>
                                    })}
                                </ul>
                            </div>                   
                        </div>
                    )}
                    {game?.awayTeam?.events?.redCards.length > 0 && (
                        <div className="redCardPlayers">
                            <RedCardSvg />
                            <div className="redCardPlayerssWrapper">
                                <ul>
                                    {game?.awayTeam?.events.redCards.map((goal,index)=>{
                                        return  <li key={index}>
                                                    <span className="playerName">{goal.playerName}</span>
                                                    <span className="goalTime">{goal.goalTime}</span>
                                                </li>
                                    })}
                                </ul>
                            </div>
                        </div>
                    )}
                   
                </div>
            </div>
        </div>

        <div className="gamePageOpts">
            <ul className="Nav__Secondary__Menu">
                {
                    game?.navItems?.map((ele,index)=>{
                        if(ele.text !== "Videos"){
                            return <li key={index} className={ele.slug+"SubTab" } onClick={(e)=>{e.stopPropagation();navigate(`/match/_/${gameId}/${gameSlug}/${ele.slug}`)}}>
                            <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();navigate(`/match/_/${gameId}/${gameSlug}/${ele.slug}`)}}>{ele.text}</Link>
                        </li>
                        }                     
                    })                  
                }
            </ul>
        </div>
        <div className="fallDown"></div>
</>
  )
}
