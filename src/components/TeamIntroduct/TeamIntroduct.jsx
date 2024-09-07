import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import "./TeamIntroduct.css"
import { Link, useNavigate } from 'react-router-dom';
export default function TeamIntroduct({teamId,teamSlug,teamInfo}) {
  const navigate=useNavigate()
    useEffect(()=>{
        let allLis=document.querySelectorAll(".Nav__Secondary__Menu li")
        for (const li of allLis) {
            li.addEventListener("mouseenter", function(event) {     
                if(!li.classList.contains("activeli")){
                    document.querySelector(".activeli").style.boxShadow = "none";
                }
              // Add your custom logic to handle the click event as needed
            });
            li.addEventListener("mouseleave", function(event) {     
                if(!li.classList.contains("activeli")){
                    document.querySelector(".activeli").style.boxShadow = "inset 0 -3px 0 var(--text-color)";
                }
              // Add your custom logic to handle the click event as needed
            });
          }
          if(sessionStorage.getItem("currentTeamTag") != null){
              if(!document.querySelector(".activeli").classList.contains(sessionStorage.getItem("currentTeamTag"))){
                document.querySelector(".activeli").classList.remove("activeli")
                console.log(sessionStorage.getItem("currentTeamTag"))
                document.querySelector(`.${sessionStorage.getItem("currentTeamTag")}`).classList.add("activeli")
              }
          }
    },[])
  return (
    <>
        <div className='teamInfo'>
            <div className="teamLogo">
                <img src={`https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/${teamId}.png`} alt="" />
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
            <ul class="Nav__Secondary__Menu">
                <li class="homeSubTab activeli" onClick={(e)=>{e.stopPropagation();sessionStorage.setItem("currentTeamTag",e.target.classList[0]);navigate(`/team/_/id/${teamId}/${teamSlug}`)}}>
                  <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();sessionStorage.setItem("currentTeamTag",e.target.parentElement.classList[0]);navigate(`/team/_/id/${teamId}/${teamSlug}`)}} >Home</Link>
                </li>
                <li class="fixtureSubTab" onClick={(e)=>{e.stopPropagation();sessionStorage.setItem("currentTeamTag",e.target.classList[0]);navigate(`/team/_/id/${teamId}/${teamSlug}/fixture`)}}>
                  <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();sessionStorage.setItem("currentTeamTag",e.target.parentElement.classList[0]);navigate(`/team/_/id/${teamId}/${teamSlug}/fixture`)}}>Fixtures</Link>
                </li>
                <li class="resultsSubTab" onClick={(e)=>{e.stopPropagation();sessionStorage.setItem("currentTeamTag",e.target.classList[0]);navigate(`/team/_/id/${teamId}/${teamSlug}/results`)}}>
                  <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();sessionStorage.setItem("currentTeamTag",e.target.parentElement.classList[0]);navigate(`/team/_/id/${teamId}/${teamSlug}/results`)}}>Results</Link>
                </li>
                <li class="squadSubTab" onClick={(e)=>{e.stopPropagation();sessionStorage.setItem("currentTeamTag",e.target.classList[0]);navigate(`/team/_/id/${teamId}/${teamSlug}/squads`)}}>
                  <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();sessionStorage.setItem("currentTeamTag",e.target.parentElement.classList[0]);navigate(`/team/_/id/${teamId}/${teamSlug}/squads`)}}>Squad</Link>
                </li>
                <li class=""><a className='Nav__AnchorTag'><span class="Nav__Text">Stats</span></a></li>
                <li class=""><a className='Nav__AnchorTag'><span class="Nav__Text">Transfers</span></a></li>
                <li class=""><a className='Nav__AnchorTag'><span class="Nav__Text">Table</span></a></li>
            </ul>
        </div>
        <div className="fallDown"></div>
    </>
  )
}
