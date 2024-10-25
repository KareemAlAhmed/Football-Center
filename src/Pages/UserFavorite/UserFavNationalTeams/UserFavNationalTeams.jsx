import { ToastContainer } from "react-toastify";
import "./UserFavNationalTeams.css"
import React, { useEffect, useState } from 'react'
import Footer from "../../../components/Footer/Footer";
import NavBar from "../../../components/NavBar/NavBar";
import { SETTING_FAV_NATIONAL_TEAM } from "../../../redux/user/userActions";
import { useDispatch, useSelector } from "react-redux";
import { GET_NATIONAL_TEAMS_DATA } from "../../../redux/team/teamsActions";
import { getDefaultTeamOrCompetLogo } from "../../../utils/baseUrl";

export default function UserFavNationalTeams() {
    const allNationalTeams=useSelector(state=>state.teams.allNationalTeams)
    const currentUser=useSelector(state=>state.users.currentUser)
  
    const [teamsFiltered,setTeamsFiltered]=useState([])
    const [searchText,setSearchText]=useState("")
    const [isSearchMode,setSearchMode]=useState(false)

    const loading=useSelector(state=>state.teams.loading)
  
    const dispatch=useDispatch();


    const getNationalTeams=()=>{
        let isNationalTeams=JSON.parse(sessionStorage.getItem("allNationalTeams"))
        if(isNationalTeams == null){
          dispatch(GET_NATIONAL_TEAMS_DATA())
        }else{
            setTeamsFiltered(isNationalTeams)
        }
    }
  
    const getSearchedTeams=(name)=>{
      name.length > 0 ? setSearchMode(true) : setSearchMode(false)
      setSearchText(name)
      if(name ===""){
        return getNationalTeams();
      }
      if(isSearchMode || name.length > 0){
        let newTeams=allNationalTeams.filter(e=> e.name.startsWith(name) || e.name.startsWith(name[0].toUpperCase() + name.slice(1)))
        setTeamsFiltered(newTeams)
      }
    }


    const setFavTeamsAndCompetetions=(team)=>{
      
      dispatch(SETTING_FAV_NATIONAL_TEAM(currentUser.name,team?.name))
    }
    useEffect(()=>{
        let loadingHeight=window.innerHeight - 95 - document.querySelector(".footer").offsetHeight  - 50
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
        getNationalTeams();
    },[])
    return (
      <>
          <NavBar />
          <div className="userFavoriteContainer container">
              <h3 className='searchTitle'>Add national team</h3>
              <p className='searchSubtitle'>Select a team below:</p>
              <div className="searchBlock" id='searchBlock'>
                  <svg className="Header_headerNavLinkIcon__90yzK"  viewBox="0 0 24 24"><path  fillRule="evenodd" d="M16.6342 17.6949C15.1119 18.9773 13.1462 19.75 11 19.75c-4.8325 0-8.75-3.9175-8.75-8.75S6.1675 2.25 11 2.25s8.75 3.9175 8.75 8.75c0 2.1463-.7727 4.112-2.0552 5.6343l3.8354 3.8354a.75.75 0 0 1-1.0606 1.0607l-3.8354-3.8355ZM3.75 11c0-4.004 3.246-7.25 7.25-7.25 4.0041 0 7.25 3.246 7.25 7.25 0 1.9605-.7782 3.7393-2.0425 5.0443a.7492.7492 0 0 0-.1633.1633C14.7392 17.4719 12.9605 18.25 11 18.25c-4.004 0-7.25-3.2459-7.25-7.25Z" clipRule="evenodd"></path></svg>
                  <input type="text" placeholder='Search for teams' className='searchInp' value={searchText} onChange={(e)=>getSearchedTeams(e.target.value)}/>
              </div>
              <div className="listOfTeams">
                <h3 className='listTitle'>Teams</h3>
                {loading ? (
                    <div className="loadingBlock">
                    <span className="ouro ouro3">
                      <span className="left"><span className="anim"></span></span>
                      <span className="right"><span className="anim"></span></span>
                    </span>
                  </div>
                ): (
                    isSearchMode ? (
                        teamsFiltered.length > 0 ? (
                            teamsFiltered.map((ele,index) =>{
                              return <div className="team" key={index} onClick={()=>setFavTeamsAndCompetetions(ele)}>
                                  <div className="teamImg">
                                    <img src={ele.logo} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }}/>
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
                        )
                    ) : (
                        teamsFiltered.length > 0 ? (
                            teamsFiltered.map((ele,index) =>{
                              return <div className="team" key={index} onClick={()=>setFavTeamsAndCompetetions(ele)}>
                                  <div className="teamImg">
                                    <img src={ele.logo} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
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
                        )
                    )
                )}
              
                 
               </div>
          </div>
          <Footer />
          <ToastContainer />
      </>
    )
}
