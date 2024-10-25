import React, { useEffect } from 'react'
import "./TeamStatsOpt.css"
import { Link, useNavigate } from 'react-router-dom';
export default function TeamStatsOpt({teamId,teamSlug}) {
    const navigate=useNavigate()
    useEffect(()=>{
        let allLis=document.querySelectorAll(".pageContent .Nav__Secondary__Menu li")


        for (const li of allLis) {
            li.addEventListener("mouseenter", function(event) {     
                if(!li.classList.contains("activeli")){
                    document.querySelector(".pageContent .activeli").style.boxShadow = "none";
                }
              // Add your custom logic to handle the click event as needed
            });
            li.addEventListener("mouseleave", function(event) {     
                if(!li.classList.contains("activeli")){
                    document.querySelector(".pageContent .activeli").style.boxShadow = "inset 0 -3px 0 var(--text-color)";
                }
              // Add your custom logic to handle the click event as needed
            });

            if(li.classList.contains("activeli")){
              li.classList.remove("activeli")
            }
            if(sessionStorage.getItem("currentStatTag") != null){
              if(li.classList.contains(sessionStorage.getItem("currentStatTag"))){
                li.classList.add("activeli")
              }
            }

          }
         
    },[])
  return (
    <div className="statsOptsWrapper">
      <ul className="Nav__Secondary__Menu">
        <li className="scoringStatTab " onClick={(e)=>{e.stopPropagation();navigate(`/team/_/id/${teamId}/${teamSlug}/stats/scoring`)}}>
            <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();navigate(`/team/_/id/${teamId}/${teamSlug}/stats/scoring`)}} >Scoring</Link>
        </li>
        <li className="discplineStatTab" onClick={(e)=>{e.stopPropagation();;navigate(`/team/_/id/${teamId}/${teamSlug}/stats/discpline`)}}>
            <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();navigate(`/team/_/id/${teamId}/${teamSlug}/stats/discpline`)}}>Discpline</Link>
        </li>
        <li className="performanceStatTab" onClick={(e)=>{e.stopPropagation();navigate(`/team/_/id/${teamId}/${teamSlug}/stats/performance`)}}>
            <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();navigate(`/team/_/id/${teamId}/${teamSlug}/stats/performance`)}}>Performance</Link>
        </li>
      </ul>
    </div>
  )
}
