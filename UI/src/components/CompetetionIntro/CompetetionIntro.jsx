import React, { useEffect } from 'react'
import "./CompetetionIntro.css"
import { Link, useNavigate } from 'react-router-dom';
import { getCompetImage, getDefaultTeamOrCompetLogo } from '../../utils/baseUrl';
import { useDispatch } from 'react-redux';
export default function CompetetionIntro({competId,competSlug,competName}) {
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
            if(sessionStorage.getItem("currentCompetetionTag") != null){
              if(li.classList.contains(sessionStorage.getItem("currentCompetetionTag"))){
                li.classList.add("activeli")
              }
            }
      }



    },[])

    let availableTransferInfo=[
      "eng.1","esp.1","ger.1","usa.1","mex.1","ita.1","fra.1","ned.1","eng.2","sco.1","aus.1","arg.1","bra.1"
    ]

  return (
    <>
  
    <div className="competPageOpts">
        <div className='comptNameAndLogo'>
            <div className="comptLogo">
                <img src={getCompetImage(competId)} onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} alt="" />
            </div>
            <div className="comptName">
                <span>{competName}</span>
            </div>
        </div>
        <ul className="Nav__Secondary__Menu">
            <li className="homeSubTab " onClick={(e)=>{e.stopPropagation();navigate(`/competetion/_/id/${competId}/${competSlug}`)}}>
              <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();navigate(`/competetion/_/id/${competId}/${competSlug}`)}}>Home</Link>
            </li>
            <li className="scoresSubTab" onClick={(e)=>{e.stopPropagation();navigate(`/competetion/_/id/${competId}/${competSlug}/scores`)}}>
              <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();navigate(`/competetion/_/id/${competId}/${competSlug}/scores`)}}>Scores</Link>
            </li>
            <li className="tableSubTab" onClick={(e)=>{e.stopPropagation();navigate(`/competetion/_/id/${competId}/${competSlug}/table`)}}>
              <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();navigate(`/competetion/_/id/${competId}/${competSlug}/table`)}}>Table</Link>
            </li>
            <li className="fixturesSubTab" onClick={(e)=>{e.stopPropagation();navigate(`/competetion/_/id/${competId}/${competSlug}/fixtures`)}}>
              <Link className='Nav__AnchorTag ' onClick={(e)=>{e.preventDefault();e.stopPropagation();navigate(`/competetion/_/id/${competId}/${competSlug}/fixtures`)}}>Fixtures & Results</Link>
              <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();navigate(`/competetion/_/id/${competId}/${competSlug}/fixtures`)}}>Fix & Res</Link>
            </li>
            <li className="teamsSubTab" onClick={(e)=>{e.stopPropagation();navigate(`/competetion/_/id/${competId}/${competSlug}/teams`)}}>
              <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();navigate(`/competetion/_/id/${competId}/${competSlug}/teams`)}}>Teams</Link>
            </li>
            <li className="statsSubTab" onClick={(e)=>{e.stopPropagation();navigate(`/competetion/_/id/${competId}/${competSlug}/stats/scoring`)}}>
              <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();navigate(`/competetion/_/id/${competId}/${competSlug}/stats/scoring`)}}>Statistics</Link>
            </li>
            {
              availableTransferInfo.includes(competSlug) && (
                <li className="transfersSubTab" onClick={(e)=>{e.stopPropagation();navigate(`/competetion/_/id/${competId}/${competSlug}/transfers`)}}>
                  <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();navigate(`/competetion/_/id/${competId}/${competSlug}/transfers`)}}>Transfers</Link>
                </li>
              )
            }
        </ul>
    </div>
    <div className="fallDown"></div>
</>
  )
}
