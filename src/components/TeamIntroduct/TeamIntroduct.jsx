import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import "./TeamIntroduct.css"
import { Link, useNavigate } from 'react-router-dom';
import { getTeamImage } from '../../utils/baseUrl';
export default function TeamIntroduct({teamId,teamSlug,teamInfo}) {
  const navigate=useNavigate()
    useEffect(()=>{
        let allLis=document.querySelectorAll(".pageHeader .Nav__Secondary__Menu li")
        for (const li of allLis) {
            li.addEventListener("mouseenter", function(event) {     
                if(!li.classList.contains("activeli")){
                    document.querySelector(".pageHeader .activeli").style.boxShadow = "none";
                }
              // Add your custom logic to handle the click event as needed
            });
            li.addEventListener("mouseleave", function(event) {     
                if(!li.classList.contains("activeli")){
                    document.querySelector(".pageHeader .activeli").style.boxShadow = "inset 0 -3px 0 var(--text-color)";
                }
              // Add your custom logic to handle the click event as needed
            });
            if(li.classList.contains("activeli")){
              li.classList.remove("activeli")
            }
            if(sessionStorage.getItem("currentTeamTag") != null){
              if(li.classList.contains(sessionStorage.getItem("currentTeamTag"))){
                li.classList.add("activeli")
              }
            }
          }
          // if(sessionStorage.getItem("currentTeamTag") != null){
              
          //     if(!document.querySelector(".pageHeader .activeli").classList.contains(sessionStorage.getItem("currentTeamTag"))){
          //       document.querySelector(".pageHeader .activeli").classList.remove("activeli")
          //       console.log(sessionStorage.getItem("currentTeamTag"))
          //       document.querySelector(`.${sessionStorage.getItem("currentTeamTag")}`).classList.add("activeli")
          //     }
          // }
    },[])
  return (
    <>
        <div className='teamInfo'>
            <div className="teamLogo">
                <img src={getTeamImage(teamId)} alt="" />
            </div>
            <div className="teamNameAndQuickStat">
                <h2 className='teamName'>{teamInfo?.name}</h2>
                <div className="followAndStat">
                    <button>Follow</button>
                    {teamInfo?.record ? (
                      <p>{teamInfo.record} &middot; {teamInfo?.positionInLeague}</p>
                    ) : (
                      <p>{teamInfo?.positionInLeague}</p>
                    )}
                </div>
            </div>
        </div>
        <div className="teamPageOpts">
            <ul className="Nav__Secondary__Menu">
                <li className="homeSubTab " onClick={(e)=>{e.stopPropagation();navigate(`/team/_/id/${teamId}/${teamSlug}`)}}>
                  <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();navigate(`/team/_/id/${teamId}/${teamSlug}`)}} >Home</Link>
                </li>
                <li className="fixtureSubTab" onClick={(e)=>{e.stopPropagation();navigate(`/team/_/id/${teamId}/${teamSlug}/fixture`)}}>
                  <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();navigate(`/team/_/id/${teamId}/${teamSlug}/fixture`)}}>Fixtures</Link>
                </li>
                <li className="resultsSubTab" onClick={(e)=>{e.stopPropagation();navigate(`/team/_/id/${teamId}/${teamSlug}/results`)}}>
                  <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();navigate(`/team/_/id/${teamId}/${teamSlug}/results`)}}>Results</Link>
                </li>
                <li className="squadSubTab" onClick={(e)=>{e.stopPropagation();navigate(`/team/_/id/${teamId}/${teamSlug}/squads`)}}>
                  <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();navigate(`/team/_/id/${teamId}/${teamSlug}/squads`)}}>Squad</Link>
                </li>
                <li className="statsSubTab" onClick={(e)=>{e.stopPropagation();navigate(`/team/_/id/${teamId}/${teamSlug}/stats/scoring`)}}>
                  <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();sessionStorage.setItem("currentStatTag","scoringStatTab");navigate(`/team/_/id/${teamId}/${teamSlug}/stats/scoring`)}}>Stats</Link>
                </li>
                <li className="transfersSubTab" onClick={(e)=>{e.stopPropagation();navigate(`/team/_/id/${teamId}/${teamSlug}/transfers`)}}>
                  <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();navigate(`/team/_/id/${teamId}/${teamSlug}/transfers`)}}>Transfers</Link>
                </li>
                <li className=""><a className='Nav__AnchorTag'><span class="Nav__Text">Table</span></a></li>
            </ul>
        </div>
        <div className="fallDown"></div>
    </>
  )
}
