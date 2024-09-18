import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./CompetStatsOpt.css"
export default function CompetStatsOpt({competId,competSlug}) {
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
    <ul className="Nav__Secondary__Menu">
        <li className="scoringStatTab " onClick={(e)=>{e.stopPropagation();navigate(`/competetion/_/id/${competId}/${competSlug}/stats/scoring`)}}>
            <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();navigate(`/competetion/_/id/${competId}/${competSlug}/stats/scoring`)}} >Scoring</Link>
        </li>
        <li className="discplineStatTab" onClick={(e)=>{e.stopPropagation();;navigate(`/competetion/_/id/${competId}/${competSlug}/stats/discpline`)}}>
            <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();navigate(`/competetion/_/id/${competId}/${competSlug}/stats/discpline`)}}>Discpline</Link>
        </li>
        <li className="performanceStatTab" onClick={(e)=>{e.stopPropagation();navigate(`/competetion/_/id/${competId}/${competSlug}/stats/performance`)}}>
            <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();navigate(`/competetion/_/id/${competId}/${competSlug}/stats/performance`)}}>Performance</Link>
        </li>
    </ul>
  )
}
