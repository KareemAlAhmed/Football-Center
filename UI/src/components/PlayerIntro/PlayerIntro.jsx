import React, { useEffect } from 'react'
import "./PlayerIntro.css"
import { Link, useNavigate } from 'react-router-dom';
import { getCompetImage, getTeamImage } from '../../utils/baseUrl';
import { useDispatch ,useSelector} from 'react-redux';
import { REMOVE_FOLLOWED_PLAYER, UPDATE_FOLLOWING_PLAYERS_LIST_BUTTON } from '../../redux/user/userActions';
import { Bounce, toast } from 'react-toastify';
export default function PlayerIntro({player,playerSlug}) {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    let currentUser=useSelector(state=>state.users.currentUser)
    let userToken=useSelector(state=>state.users.userToken)
    let userPlayers=currentUser ? currentUser.followedPlayers : null
    let isTeamFollowed=false;
    if(userPlayers != null){
        let players=userPlayers?.filter(ele=>ele.id === player?.id)
        if(players.length > 0){
          isTeamFollowed=true
        }
      }

    useEffect(()=>{
        let allLis=document.querySelectorAll(".playerPageOpts .Nav__Secondary__Menu li")
        for (const li of allLis) {
            li.addEventListener("mouseenter", function(event) {     
                if(!li.classList.contains("activeli")){
                    document.querySelector(".playerPageOpts .activeli").style.boxShadow = "none";
                }
              // Add your custom logic to handle the click event as needed
            });
            li.addEventListener("mouseleave", function(event) {     
                if(!li.classList.contains("activeli")){
                    document.querySelector(".playerPageOpts .activeli").style.boxShadow = "inset 0 -3px 0 var(--text-color)";
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



    },[currentUser])
    const followPlayer=()=>{
        if(userToken != null){
          dispatch(UPDATE_FOLLOWING_PLAYERS_LIST_BUTTON(currentUser.name,player?.id))  
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
      const unfollowPlayer=(relationType)=>{
        if(userToken != null){
            dispatch(REMOVE_FOLLOWED_PLAYER(currentUser.name,player?.firstName + " " + player?.lastName))     
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
        <div className='playerHeaderInfo'>
            <div className="teamLogo">
                <img src={getTeamImage(player.team?.id)} alt="" />
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
                                    <img src={getTeamImage(player.team?.id)} alt="" />
                                </div>
                                <div className="playerTeamName">
                                    { 
                                        player.team?.id != null ? (
                                            <Link to={`/team/_/id/${player.team.id.id}/${player.team.slug}`}>{player.team.name}</Link>
                                        ) :(
                                            <p>{player.team?.name}</p>
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
                        {isTeamFollowed ? (
                            <button className='followBtn followedBtn' onClick={()=>unfollowPlayer()}>UnFollow</button>
                        ):(
                            <button className='followBtn' onClick={()=>followPlayer()}>Follow</button>
                        )}

                   </div>
                   <div className="playerBio hidePlayerBio">
                        <ul className="bioInfo">
                            <li>
                                <span className='bioSection'>HT/WT</span>
                                <span className='bioValue'>{player?.height},{player?.weight}</span>
                            </li>
                            <li>
                                <span className='bioSection'>Birthdate</span>
                                <span className='bioValue'>{player?.birthday}</span>

                            </li>
                            <li>
                                <span className='bioSection'>Nationality</span>
                                <span className='bioValue'>{player?.nationality}</span>

                            </li>
                        </ul>
                   </div>
                </div>
                <div className="playerCurrentStats hideLeftSide">
                   <div className="statsWrapper">
                    <div className="currentLeagueSeason">
                            <p>{player.currentStats?.name}</p>
                        </div>
                        <ul className="stats">
                            <li>
                                <span className='statSection'>START (SUB)</span>
                                <span className='statValue'>{player?.currentStats?.startAndSubs}</span>
                            </li>
                            <li>
                                <span className='statSection'>G</span>
                                <span className='statValue'>{player?.currentStats?.goals}</span>
                            </li>
                            <li>
                                <span className='statSection'>A</span>
                                <span className='statValue'>{player?.currentStats?.assists}</span>
                            </li>
                            <li>
                                <span className='statSection'>SH</span>
                                <span className='statValue'>{player?.currentStats?.shoots}</span>
                            </li>
                        </ul>
                   </div>
                </div>
            </div>
        </div>

        <div className="playerPageOpts">
            <ul className="Nav__Secondary__Menu">
                <li className="overviewSubTab " onClick={(e)=>{e.stopPropagation();navigate(`/player/_/id/${player.id}/${playerSlug}`)}}>
                <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();navigate(`/player/_/id/${player.id}/${playerSlug}`)}}>Overview</Link>
                </li>
                <li className="bioSubTab" onClick={(e)=>{e.stopPropagation();navigate(`/player/_/id/${player.id}/${playerSlug}/bio`)}}>
                <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();navigate(`/player/_/id/${player.id}/${playerSlug}/bio`)}}>Bio</Link>
                </li>
                <li className="newsSubTab" onClick={(e)=>{e.stopPropagation();navigate(`/player/_/id/${player.id}/${playerSlug}/news`)}}>
                <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();navigate(`/player/_/id/${player.id}/${playerSlug}/news`)}}>News</Link>
                </li>
                <li className="matchesSubTab" onClick={(e)=>{e.stopPropagation();navigate(`/player/_/id/${player.id}/${playerSlug}/matches`)}}>
                <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();navigate(`/player/_/id/${player.id}/${playerSlug}/matches`)}}>Matches</Link>
                </li>
                <li className="statsSubTab" onClick={(e)=>{e.stopPropagation();navigate(`/player/_/id/${player.id}/${playerSlug}/stats`)}}>
                <Link className='Nav__AnchorTag' onClick={(e)=>{e.preventDefault();e.stopPropagation();navigate(`/player/_/id/${player.id}/${playerSlug}/stats`)}}>Stats</Link>
                </li>
            
            </ul>
        </div>
        <div className="fallDown"></div>
</>
  )
}
