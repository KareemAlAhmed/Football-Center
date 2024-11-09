import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import "./UserFavorite.css"
import { useDispatch, useSelector } from 'react-redux';
import {  GET_TOURNS_BY_CAT, getLeagueTeamsInfo } from '../../redux/tourns/tournsActions';
import { useLocation, useNavigate } from 'react-router-dom';
import { GET_TEAMS } from '../../redux/team/teamsActions';
import { SETTING_FAV_COMPT_TEAM, UPDATE_FOLLOWING_COMPETS_LIST, UPDATE_FOLLOWING_TEAMS_LIST } from '../../redux/user/userActions';
import { ToastContainer } from 'react-toastify';
import { getCompetImage, getDefaultTeamOrCompetLogo } from '../../utils/baseUrl';
export default function UserFavorite() {
  const [teamsFiltered,setTeamsFiltered]=useState([])
  const [searchText,setSearchText]=useState("")
  const [isSearchMode,setSearchMode]=useState(false)
  const allTeams=useSelector(state=>state.teams.allTeams);
  const allCompetetionByCat=useSelector(state=>state.tourns.allCompetetionByCat);
  const allCompets=useSelector(state=>state.tourns.allCompets);
  const currentUser=useSelector(state=>state.users.currentUser);
  const dispatch=useDispatch();
  const navigate=useNavigate()

  if(Object.keys(currentUser).length === 0){
    window.location.replace("/#/auth")
  }
  const location = useLocation();
  let actionT=location.pathname.trim().split("/")[1]
  let lastElementInUrl=location.pathname.trim().split("/").length - 1
  let isCompetType=false;
  if(location.pathname.trim().split("/")[lastElementInUrl] === "specificCompet"){
    isCompetType=true
  }
  const [actionType,setActionType]=useState(actionT)
  const [isCompet,setIsCompet]=useState(isCompetType)

  const getLeagueTeams=async(ele)=>{
    if(isCompet){
      dispatch(UPDATE_FOLLOWING_COMPETS_LIST(currentUser.name,ele))
    }else{
      if(actionType=== "followings"){
        dispatch(getLeagueTeamsInfo(ele))
        navigate("/followings/competetions/"+ele.id+"/teams")
      }else if(actionType=== "favorite"){
        dispatch(getLeagueTeamsInfo(ele))
        navigate("/favorite/competetions/"+ele.id+"/teams")
      }
    }
 

  }
  const setFavoriteTeam=(team,competetions)=>{
    if(actionType==="followings"){
      dispatch(UPDATE_FOLLOWING_TEAMS_LIST(currentUser.name,competetions,team))
    }else if(actionType==="favorite"){
      dispatch(SETTING_FAV_COMPT_TEAM(currentUser.name,competetions,team))
    }
  }
  const getSearchedTeams=(name)=>{
    name.length > 0 ? setSearchMode(true) : setSearchMode(false)
    setSearchText(name)
    if(isSearchMode || name.length > 0){
      if(isCompet){
        let newCompets=allCompets.filter(e=> e.leagueName.startsWith(name) || e.leagueName.startsWith(name[0].toUpperCase() + name.slice(1)))
        setTeamsFiltered(newCompets)
      }else{
        let newTeams=allTeams.filter(e=> e.name.startsWith(name) || e.name.startsWith(name[0].toUpperCase() + name.slice(1)))
        setTeamsFiltered(newTeams)
      }
    }
  }

  useEffect(()=>{
    let loadingHeight=window.innerHeight - 95 - document.querySelector(".footer").offsetHeight - 50
    if(document.querySelector(".userFavoriteContainer")){
      document.querySelector(".userFavoriteContainer").style.minHeight=`${loadingHeight}px`
    }
    if(document.querySelector(".listOfCompetetions")){
      document.querySelector(".listOfCompetetions").style.width=`${document.querySelector(".searchBlock").offsetWidth}px`
    }
    const SB = document.querySelector('.searchBlock');

    SB.addEventListener('click', () => {
      SB.classList.add("focusedBlock")
      document.querySelector(".searchInp").focus()
    });

    document.addEventListener('click', (event) => {
      if (event.target !== SB && !SB.contains(event.target)) {
        SB.classList.remove("focusedBlock")
      }
    });
    if(document.querySelector(".listOfTeams")){
      document.querySelector(".listOfTeams").style.width=`${document.querySelector(".searchBlock").offsetWidth}px`
    }
    sessionStorage.getItem("allCompetetionByCat") === null && dispatch(GET_TOURNS_BY_CAT())
    sessionStorage.getItem("allTeams") === null && dispatch(GET_TEAMS())
  },[isSearchMode,teamsFiltered,location])
  return (
    <>
        <NavBar />
        <div className="userFavoriteContainer container">
          {
            !isCompet ? (
              <>
                <h3 className='searchTitle'>Add Favorite Team</h3>
                <p className='searchSubtitle'>Search by Name or by Competetion</p>
                <div className="searchBlock" id='searchBlock'>
                    <svg className="Header_headerNavLinkIcon__90yzK"  viewBox="0 0 24 24"><path  fillRule="evenodd" d="M16.6342 17.6949C15.1119 18.9773 13.1462 19.75 11 19.75c-4.8325 0-8.75-3.9175-8.75-8.75S6.1675 2.25 11 2.25s8.75 3.9175 8.75 8.75c0 2.1463-.7727 4.112-2.0552 5.6343l3.8354 3.8354a.75.75 0 0 1-1.0606 1.0607l-3.8354-3.8355ZM3.75 11c0-4.004 3.246-7.25 7.25-7.25 4.0041 0 7.25 3.246 7.25 7.25 0 1.9605-.7782 3.7393-2.0425 5.0443a.7492.7492 0 0 0-.1633.1633C14.7392 17.4719 12.9605 18.25 11 18.25c-4.004 0-7.25-3.2459-7.25-7.25Z" clipRule="evenodd"></path></svg>
                    <input type="text" placeholder='Search for teams' className='searchInp' value={searchText} onChange={(e)=>getSearchedTeams(e.target.value)}/>
                </div>
                {isSearchMode ? (
                   <div className="listOfTeams">
                    <h3 className='listTitle'>Teams</h3>
                    {teamsFiltered.length > 0 ? (
                        teamsFiltered.map((ele,index) =>{
                          return <div className="team" key={index} onClick={()=>setFavoriteTeam(ele,ele.leagues)}>
                              <div className="teamImg">
                                <img src={ele.logo} alt=""  onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }}/>
                              </div>
                              <div className="teamInfo">
                                <p>{ele.name}</p>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
                              </div>
                          </div>
                        })
                    ) :(
                      <div className="team justify-center" >
                          <p className='notFoundClass'>Team Not Found!</p>
                      </div>
                    )}

                 </div>
                ) : (
                  <div className="listOfCompetetions">
                    <h3 className='listTitle'>Competetions</h3>
                    {console.log(allCompetetionByCat)}
                  {allCompetetionByCat.map((ele,index) =>{
                    return <>
                      <h3 className='catName'>{ele.name}</h3>
                      {ele.leagues.map((league,index)=>{
                        return <div className="competetion" key={index} onClick={()=>getLeagueTeams(league)}>
                                  <div className="competetionImg">
                                    <img src={league.id != null ? league.leagueLogo : "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/default-team-logo-500.png&w=80&h=80&scale=crop&cquality=40&location=origin"} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                                  </div>
                                  <div className="competetionInfo">
                                    <p>{league.leagueName}</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
                                  </div>
                              </div>
                      })}
                    </>

                  })}
                </div>
            )}
              </>
            ) : (
              <>
                <h3 className='searchTitle'>Add The Competetion</h3>
                <p className='searchSubtitle'>Search by Name :</p>
                <div className="searchBlock" id='searchBlock'>
                    <svg className="Header_headerNavLinkIcon__90yzK"  viewBox="0 0 24 24"><path  fillRule="evenodd" d="M16.6342 17.6949C15.1119 18.9773 13.1462 19.75 11 19.75c-4.8325 0-8.75-3.9175-8.75-8.75S6.1675 2.25 11 2.25s8.75 3.9175 8.75 8.75c0 2.1463-.7727 4.112-2.0552 5.6343l3.8354 3.8354a.75.75 0 0 1-1.0606 1.0607l-3.8354-3.8355ZM3.75 11c0-4.004 3.246-7.25 7.25-7.25 4.0041 0 7.25 3.246 7.25 7.25 0 1.9605-.7782 3.7393-2.0425 5.0443a.7492.7492 0 0 0-.1633.1633C14.7392 17.4719 12.9605 18.25 11 18.25c-4.004 0-7.25-3.2459-7.25-7.25Z" clipRule="evenodd"></path></svg>
                    <input type="text" placeholder='Search for competetions' className='searchInp' value={searchText} onChange={(e)=>getSearchedTeams(e.target.value)}/>
                </div>
                {isSearchMode ? (
                   <div className="listOfTeams">
                    <h3 className='listTitle'>Competetions</h3>
                    {teamsFiltered.length > 0 ? (
                        teamsFiltered.map((ele,index) =>{
                          return <div className="team" key={index} onClick={()=>setFavoriteTeam(ele)}>
                              <div className="teamImg">
                                <img src={getCompetImage(ele.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                              </div>
                              <div className="teamInfo">
                                <p>{ele.leagueName}</p>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
                              </div>
                          </div>
                        })
                    ) :(
                      <div className="team justify-center" >
                          <p className='notFoundClass'>Team Not Found!</p>
                      </div>
                    )}

                 </div>
                ) : (
                  <div className="listOfCompetetions">
                    <h3 className='listTitle'>Competetions</h3>
                  {allCompetetionByCat.map((ele,index) =>{
                    return <>
                      <h3 className='catName'>{ele.name}</h3>
                      {ele.leagues.map((league,index)=>{
                        return <div className="competetion" key={index} onClick={()=>getLeagueTeams(league)}>
                                  <div className="competetionImg">
                                    <img src={league.id != null ? league.leagueLogo : "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/default-team-logo-500.png&w=80&h=80&scale=crop&cquality=40&location=origin"} onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} alt="" />
                                  </div>
                                  <div className="competetionInfo">
                                    <p>{league.leagueName}</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
                                  </div>
                              </div>
                      })}
                    </>

                  })}
                </div>
                )}
              </>
            )
          }
            
        </div>
        <Footer />
        <ToastContainer />
    </>
  )
}
