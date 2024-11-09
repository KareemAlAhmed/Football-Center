import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "./TeamIntroduct.css"
import { Link, useNavigate } from 'react-router-dom';
import { getDefaultTeamOrCompetLogo, getTeamImage } from '../../utils/baseUrl';
import { REMOVE_FAVORITE_NATIONAL_TEAM, REMOVE_FOLLOWED_TEAM, SETTING_FAV_NATIONAL_TEAM, UPDATE_FOLLOWING_TEAMS_LIST_BUTTON } from '../../redux/user/userActions';
import { Bounce, toast } from 'react-toastify';
export default function TeamIntroduct({teamId,teamSlug,teamInfo}) {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  let currentUser=useSelector(state=>state.users.currentUser)
  let userToken=useSelector(state=>state.users.userToken)
  let userTeams=currentUser ? currentUser.followedTeams : null
  let isTeamFollowed=false;
  let relationType="follow"

  if(userTeams != null){
    let teams=userTeams?.filter(ele=>ele.id === parseInt(teamInfo?.id))
    if(teams.length > 0){
      isTeamFollowed=true
    }
    if(currentUser.favTeam?.id === parseInt(teamInfo?.id)){
      isTeamFollowed=true
      relationType="favTeam"
    }
    if(currentUser.favNationalTeam?.id === parseInt(teamInfo?.id)){
      isTeamFollowed=true
      relationType="favNatTeam"
    }
  }
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
    },[currentUser])

    const followTeam=()=>{
      if(userToken != null){
        dispatch(UPDATE_FOLLOWING_TEAMS_LIST_BUTTON(currentUser.name,teamInfo?.name,teamInfo?.id))  
      }else{
        toast.error("SignUp First!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce
      });
      }
    }
    const unfollowTeam=(relationType)=>{
      if(userToken != null){
        if(relationType === "follow"){
          dispatch(REMOVE_FOLLOWED_TEAM(currentUser.name,teamInfo?.name))
        }else if(relationType === "favTeam"){

        }else if(relationType === "favNatTeam"){
          dispatch(REMOVE_FAVORITE_NATIONAL_TEAM(currentUser.name,teamInfo?.name))
        }
      }else{
        toast.error("SignUp First!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce
      });
      }
    }

  return (
    <>
        <div className='teamInfo'>
            <div className="teamLogo">
                <img src={getTeamImage(teamId)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
            </div>
            <div className="teamNameAndQuickStat">
                <h2 className='teamName'>{teamInfo?.name}</h2>
                <div className="followAndStat">
                  {isTeamFollowed ? (
                    <button onClick={()=>unfollowTeam(relationType)} className='followedBtn'>UnFollow</button>
                  ) : (
                    <button onClick={()=>followTeam(relationType)}>Follow</button>
                  )}
                    
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
            </ul>
        </div>
        <div className="fallDown"></div>
    </>
  )
}
