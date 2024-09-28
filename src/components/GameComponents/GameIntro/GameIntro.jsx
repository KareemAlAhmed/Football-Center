import { Link, useNavigate } from "react-router-dom";
import "./GameIntro.css"
import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { getTeamImage, getTeamLink } from "../../../utils/baseUrl";

export default function GameIntro({game,gameId,gameSlug}) {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    


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
                            <img  src={getTeamImage(game?.homeTeam?.id)} alt="" />
                        </div>
                        <div className="SkewedLine SkewedLine--1" style={HomebackColor2}></div>
                        <div className="SkewedLine SkewedLine--2" style={HomebackColor3}></div>
                    </div>
                    <div className="competitorInfo">
                        <div className="teamNameAndPoints">
                            <Link className="teamLink" to={getTeamLink(game?.homeTeam?.id,game?.homeTeam?.slug)}>{game?.homeTeam?.name}</Link>
                            <span>{game?.homeTeam?.record}</span>
                        </div>
                        <div className="competitorLogo">
                            <img src={getTeamImage(game?.homeTeam?.id)} alt="" />
                        </div>
                    </div>

                </div>

                <div className="matchDataAndTime">
                    <span className="matchDate">{game?.date}</span>
                    <span className="matchTime">{game?.time}</span>
                </div>

                <div className="awayTeamInfo">
                   
                    <div className="competitorInfo">
                        <div className="competitorLogo">
                            <img src={getTeamImage(game?.awayTeam?.id)} alt="" />
                        </div>
                        <div className="teamNameAndPoints">
                            <Link className="teamLink" to={getTeamLink(game?.awayTeam?.id,game?.awayTeam?.slug)}>{game?.awayTeam?.name}</Link>
                            <span>{game?.awayTeam?.record}</span>
                        </div>
                        
                    </div>

                    <div className="Logo-Container Logo-Container-right">
                        <div className="TeamLogo " style={AwaybackColor1}>
                            <img src={getTeamImage(game?.awayTeam?.id)} alt="" />
                        </div>
                        <div className="SkewedLine SkewedLine--1" style={AwaybackColor2}></div>
                        <div className="SkewedLine SkewedLine--2" style={AwaybackColor3}></div>
                    </div>
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




                {/* <li className="overviewSubTab summarySubTab" onClick={(e)=>{e.stopPropagation();navigate(`/player/_/id/${gameId}/${gameSlug}`)}}>
                <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();navigate(`/player/_/id/${gameId}/${gameSlug}`)}}>Overview</Link>
                </li>
                <li className="bioSubTab" onClick={(e)=>{e.stopPropagation();navigate(`/player/_/id/${gameId}/${gameSlug}/bio`)}}>
                <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();navigate(`/player/_/id/${gameId}/${gameSlug}/bio`)}}>Bio</Link>
                </li>
                <li className="newsSubTab" onClick={(e)=>{e.stopPropagation();navigate(`/player/_/id/${gameId}/${gameSlug}/news`)}}>
                <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();navigate(`/player/_/id/${gameId}/${gameSlug}/news`)}}>News</Link>
                </li>
                <li className="matchesSubTab" onClick={(e)=>{e.stopPropagation();navigate(`/player/_/id/${gameId}/${gameSlug}/matches`)}}>
                <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();navigate(`/player/_/id/${gameId}/${gameSlug}/matches`)}}>Matches</Link>
                </li>
                <li className="statsSubTab" onClick={(e)=>{e.stopPropagation();navigate(`/player/_/id/${gameId}/${gameSlug}/stats`)}}>
                <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();navigate(`/player/_/id/${gameId}/${gameSlug}/stats`)}}>Stats</Link>
                </li> */}
            
            </ul>
        </div>
        <div className="fallDown"></div>
</>
  )
}
