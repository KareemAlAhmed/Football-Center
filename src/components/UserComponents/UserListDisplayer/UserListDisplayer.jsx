import React from 'react'
import EmptySlut from '../../Icons/EmptySlut/EmptySlut';
import { Link } from 'react-router-dom';
import "./UserListDisplayer.css"
import { getCompetImage, getCompetLink, getDefaultTeamOrCompetLogo, getPlayerLink, getTeamImage, getTeamLink } from '../../../utils/baseUrl';
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_FAVORITE_NATIONAL_TEAM, REMOVE_FAVORITE_TEAM, REMOVE_FOLLOWED_COMPET, REMOVE_FOLLOWED_PLAYER, REMOVE_FOLLOWED_TEAM } from '../../../redux/user/userActions';
export default function UserListDisplayer({type,list,favTeam,favNationalTeam,editMode}) {
  const dispatch=useDispatch()
  let currentUser=useSelector(state=>state.users.currentUser)
  let listLength=list.length
  let emptySlut= 3 - (listLength % 3)
  let getEmptySlut=()=>{
    let slutArray=[]
    for(let i =0;i< emptySlut;i++){
      slutArray.push(<li>
        <Link to={type=== "MY COMPETITIONS" ? "/followings/competetions/specificCompet" : type=== "MY PLAYERS" ? "/followings/players" : "/followings/competetions"}>
            <div className="FollowedContent">
              <div className="followedLogo">
                <EmptySlut />
              </div>
              <p className="followedSubtitle">Follow</p>
            </div>
        </Link>
      </li>) 
    }
    return [...slutArray]
  }
  let hasFavTeam=false;
  if(favTeam != null){
    if(Object.keys(favTeam).length !== 0){
      hasFavTeam=true
    }
  }
  let hasFavNatTeam=false;
  if(favNationalTeam != null){
    if(Object.keys(favNationalTeam).length !== 0){
      hasFavNatTeam=true
    }
  }
  return (
    <section className="followingListsWrapper">
            <header className="cardHeader">
              <div className="cardTitle">
                  <p>{type}</p>
                  <span>({(hasFavTeam ? 1 : 0) + (hasFavNatTeam ? 1 : 0) + (list.length) })</span>
              </div>   
            </header>
            <div className="Wrapper">
              {type === "MY TEAMS" && (
                <div className="userFavorites">
                  <div className="userFavoriteTeam">
                    {hasFavTeam ? (
                      <>
                          <Link to={getTeamLink(favTeam?.id,favTeam?.slug)} className='activeSlut'>
                            <div className="FollowedContent">
                              <div className="followedLogo">
                                <img src={getTeamImage(favTeam?.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                              </div>
                              <div className="subtitlesContent">
                                <div className="slutSubtitle">
                                  Favourite Team
                                </div>
                                <p className="followedSubtitle">{favTeam?.name}</p>
                              </div>
                            </div>
                          </Link>
                          <div className={!editMode ? "hideSvg favLogo removeLogo" :"favLogo removeLogo"} onClick={()=>dispatch(REMOVE_FAVORITE_TEAM(currentUser?.name,favTeam?.name))}>
                            <img src="https://image-service.onefootball.com/transform?w=48&dpr=2&image=https://images.onefootball.com/cw/icons/remove_entity_dark.svg" alt="" />
                          </div>
                      </>
                    ) : (
                      <Link to="/favorite/competetions">
                        <div className="FollowedContent">
                          <div className="followedLogo">
                            <EmptySlut />
                          </div>
                          <div className="subtitlesContent">
                            <div className="slutSubtitle">
                              Favourite Team
                            </div>
                            <p className="followedSubtitle">Add favorite team</p>
                          </div>
                        </div>
                      </Link>
                    )}
                   
                    <div className={editMode ? "hideSvg favLogo" :"favLogo"}>
                      <img src="https://image-service.onefootball.com/transform?w=48&dpr=2&image=https://images.onefootball.com/cw/icons/heart-circle-dark.svg" alt="" />
                    </div>
                    
                  </div>
                  <div className="verticalLineSeperator"></div>
                  <div className="userFavoriteNationalTeam">
                    {hasFavNatTeam ? (
                      <>
                        <Link to={getTeamLink(favNationalTeam?.id,favNationalTeam?.slug)} className='activeSlut'>
                          <div className="FollowedContent">
                            <div className="followedLogo">
                            <img src={getTeamImage(favNationalTeam?.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                            </div>
                            <div className="subtitlesContent">
                              <div className="slutSubtitle">
                                National Team
                              </div>
                              <p className="followedSubtitle">{favNationalTeam?.name}</p>
                            </div>
                          </div>
                        </Link>
                        <div className={!editMode ? "hideSvg favLogo removeLogo" :"favLogo removeLogo"} onClick={()=>dispatch(REMOVE_FAVORITE_NATIONAL_TEAM(currentUser?.name,favNationalTeam?.name))}>
                          <img src="https://image-service.onefootball.com/transform?w=48&dpr=2&image=https://images.onefootball.com/cw/icons/remove_entity_dark.svg" alt="" />
                        </div>
                      </>
                    ) : (
                      <Link to="/followings/nationalTeams">
                        <div className="FollowedContent">
                          <div className="followedLogo">
                            <EmptySlut />
                          </div>
                          <div className="subtitlesContent">
                            <div className="slutSubtitle">
                              National Team
                            </div>
                            <p className="followedSubtitle">Add national Team</p>
                          </div>
                        </div>
                    </Link>
                    )}
                    
                    <div className={editMode ? "hideSvg favLogo removeLogo " :"favLogo removeLogo"}>
                      <img src="https://image-service.onefootball.com/transform?w=48&dpr=2&image=https://images.onefootball.com/cw/icons/heart-circle-dark.svg" alt="" />
                    </div>
                
                  </div>
                </div>
              )}
              <ul className="listOfFollowed">
                {type=== "MY TEAMS" && (
                  <>
                    {
                        list.map((team,index)=>{
                          return  <li key={index} className='activeSlut'>
                          <Link to={getTeamLink(team.id,team.slug)}>
                              <div className="FollowedContent">
                                <div className="followedLogo">
                                  <img src={getTeamImage(team.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                                </div>
                                <p className="followedSubtitle">{team.name}</p>
                              </div>
                          </Link>
                          <div className={!editMode ? "hideSvg favLogo removeLogo" :"favLogo removeLogo"} onClick={()=>dispatch(REMOVE_FOLLOWED_TEAM(currentUser?.name,team.name))}>
                            <img src="https://image-service.onefootball.com/transform?w=48&dpr=2&image=https://images.onefootball.com/cw/icons/remove_entity_dark.svg" alt="" />
                          </div>
                        </li>
                        })
                    }

                  </>
                )}
                {type=== "MY COMPETITIONS" && (
                  <>
                    {
                        list.map((compet,index)=>{
                          return  <li key={index} className='activeSlut'>
                          <Link to={getCompetLink(compet.id,compet.slug)}>
                              <div className="FollowedContent">
                                <div className="followedLogo">
                                  <img src={getCompetImage(compet.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                                </div>
                                <p className="followedSubtitle">{compet.leagueName}</p>
                              </div>
                          </Link>
                          <div className={!editMode ? "hideSvg favLogo removeLogo" :"favLogo removeLogo"} onClick={()=>dispatch(REMOVE_FOLLOWED_COMPET(currentUser?.name,compet.leagueName))}>
                            <img src="https://image-service.onefootball.com/transform?w=48&dpr=2&image=https://images.onefootball.com/cw/icons/remove_entity_dark.svg" alt="" />
                          </div>
                        </li>
                        })
                    }
                  </>
                )}
                {type=== "MY PLAYERS" && (
                  <>
                    {
                        list.map((player,index)=>{
                          return  <li key={index} className='activeSlut'>
                          <Link to={getPlayerLink(player.id,player.slug)}>
                              <div className="FollowedContent">
                                <div className="followedLogo">
                                  <img className='playersLogo' src="http://res.cloudinary.com/dgo3fuaxg/image/upload/v1721929948/bhucqryzr7yrlr3lzuh2.jpg" alt="" />
                                </div>
                                <p className="followedSubtitle">{player.name}</p>
                              </div>
                          </Link>
                          <div className={!editMode ? "hideSvg favLogo removeLogo" :"favLogo removeLogo"} onClick={()=>dispatch(REMOVE_FOLLOWED_PLAYER(currentUser?.name,player.name))}>
                            <img src="https://image-service.onefootball.com/transform?w=48&dpr=2&image=https://images.onefootball.com/cw/icons/remove_entity_dark.svg" alt="" />
                          </div>
                        </li>
                        })
                    }
                  </>
                )}
                {
                  getEmptySlut()
                }                     
              </ul>
            </div>
          </section>
  )
}
