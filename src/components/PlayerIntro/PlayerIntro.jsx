import React, { useEffect } from 'react'
import "./PlayerIntro.css"
import { Link, useNavigate } from 'react-router-dom';
import { getCompetImage, getTeamImage } from '../../utils/baseUrl';
import { useDispatch } from 'react-redux';
export default function PlayerIntro({player,playerSlug}) {
    const navigate=useNavigate()
    const dispatch=useDispatch()



    useEffect(()=>{
        let allLis=document.querySelectorAll(".competPageOpts .Nav__Secondary__Menu li")
        for (const li of allLis) {
            li.addEventListener("mouseenter", function(event) {     
                if(!li.classList.contains("activeli")){
                    document.querySelector(".competPageOpts .activeli").style.boxShadow = "none";
                }
              // Add your custom logic to handle the click event as needed
            });
            li.addEventListener("mouseleave", function(event) {     
                if(!li.classList.contains("activeli")){
                    document.querySelector(".competPageOpts .activeli").style.boxShadow = "inset 0 -3px 0 var(--text-color)";
                }
              // Add your custom logic to handle the click event as needed
            });
            if(li.classList.contains("activeli")){
              li.classList.remove("activeli")
            }
            if(sessionStorage.getItem("currentPlayerTag") != null){
              if(li.classList.contains(sessionStorage.getItem("currentPlayerTag"))){
                li.classList.add("activeli")
              }
            }
      }



    },[])



  return (
    <>
        <div className='playerHeaderInfo'>
            <div className="teamLogo">
                <img src={getTeamImage(player.team.id)} alt="" />
                <div className="leftlayer"></div>
                <div className="rightlayer"></div>
            </div>
            <div className="playerQuickInfoAndStats">
                <div className="playerQuickInfo">
                   <div className="playerNameAndTeam">
                        <h1 className='playerName'>
                            <span>{player?.firstName}</span><br />
                            <span>{player?.lastName}</span>
                        </h1>
                        <div className="playerTeamHeader">
                            <div className="playerTeamInfo">
                                <div className="playerTeamLogo">
                                    <img src={getTeamImage(player.team.id)} alt="" />
                                </div>
                                <div className="playerTeamName">
                                    { 
                                        player.team?.id != null ? (
                                            <Link to={`/team/_/id/${player.team.id.id}/${player.team.slug}`}>{player.team.name}</Link>
                                        ) :(
                                            <p>{player.team.name}</p>
                                        )
                                    }
                                </div>
                            </div>          
                            &middot;
                            <div className="playerNumber">
                                <span>{player?.number}</span>
                            </div>
                            &middot;
                            <div className="playerPosition">
                                <span>{player?.position}</span>
                            </div>
                        </div>

                        <button className='followBtn'>Follow</button>

                   </div>
                   <div className="playerBio">

                   </div>
                </div>
                
            </div>
        </div>

        <div className="playerPageOpts">
            <ul className="Nav__Secondary__Menu">
                <li className="overviewSubTab " onClick={(e)=>{e.stopPropagation();navigate(`/player/_/id/${player.id}/${playerSlug}`)}}>
                <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();navigate(`/player/_/id/${player.id}/${playerSlug}`)}}>Overview</Link>
                </li>
                <li className="bioSubTab" onClick={(e)=>{e.stopPropagation();navigate(`/player/_/id/${player.id}/${playerSlug}/scores`)}}>
                <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();navigate(`/player/_/id/${player.id}/${playerSlug}/scores`)}}>Bio</Link>
                </li>
                <li className="newsSubTab" onClick={(e)=>{e.stopPropagation();navigate(`/player/_/id/${player.id}/${playerSlug}/table`)}}>
                <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();navigate(`/player/_/id/${player.id}/${playerSlug}/table`)}}>News</Link>
                </li>
                <li className="matchesSubTab" onClick={(e)=>{e.stopPropagation();navigate(`/player/_/id/${player.id}/${playerSlug}/fixtures`)}}>
                <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();navigate(`/player/_/id/${player.id}/${playerSlug}/fixtures`)}}>Matches</Link>
                </li>
                <li className="statsSubTab" onClick={(e)=>{e.stopPropagation();navigate(`/player/_/id/${player.id}/${playerSlug}/teams`)}}>
                <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();navigate(`/player/_/id/${player.id}/${playerSlug}/teams`)}}>Stats</Link>
                </li>
            
            </ul>
        </div>
        <div className="fallDown"></div>
</>
  )
}
