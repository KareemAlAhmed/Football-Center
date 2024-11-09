import React, { useEffect, useState } from 'react'
import "./UserFollowingPlayers.css"
import { ToastContainer } from 'react-toastify';
import Footer from '../../../components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ALL_PLAYERS_DATA } from '../../../redux/players/playersAction';
import NavBar from '../../../components/NavBar/NavBar';
import { UPDATE_FOLLOWING_PLAYERS_LIST } from '../../../redux/user/userActions';

export default function UserFollowingPlayers() {
    const [playersFiltered,setPlayersFiltered]=useState([])
    const [searchText,setSearchText]=useState("")
    const [isSearchMode,setSearchMode]=useState(false)
    const currentUser=useSelector(state=>state.users.currentUser);
    const allPlayers=useSelector(state=>state.players.allPlayers);
    const dispatch=useDispatch();

    if(Object.keys(currentUser).length === 0){
      window.location.replace("/#/auth")
    }
   

    const followPlayer=(player)=>{
        dispatch(UPDATE_FOLLOWING_PLAYERS_LIST(currentUser?.name,player))
    }
    const getSearchedPlayers=(name)=>{
      name.length > 0 ? setSearchMode(true) : setSearchMode(false)
      setSearchText(name)
      if(isSearchMode || name.length > 0){
        let newTeams=allPlayers.filter(e=> e.name.startsWith(name) || e.name.startsWith(name[0].toUpperCase() + name.slice(1)))
        setPlayersFiltered(newTeams)     
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
      sessionStorage.getItem("allPlayers") === null && dispatch(GET_ALL_PLAYERS_DATA())
    },[isSearchMode,playersFiltered])
    return (
      <>
          <NavBar />
          <div className="userFavoriteContainer container">
                <h3 className='searchTitle'>Add The Player</h3>
                <p className='searchSubtitle'>Search by Name</p>
                <div className="searchBlock" id='searchBlock'>
                    <svg className="Header_headerNavLinkIcon__90yzK"  viewBox="0 0 24 24"><path  fillRule="evenodd" d="M16.6342 17.6949C15.1119 18.9773 13.1462 19.75 11 19.75c-4.8325 0-8.75-3.9175-8.75-8.75S6.1675 2.25 11 2.25s8.75 3.9175 8.75 8.75c0 2.1463-.7727 4.112-2.0552 5.6343l3.8354 3.8354a.75.75 0 0 1-1.0606 1.0607l-3.8354-3.8355ZM3.75 11c0-4.004 3.246-7.25 7.25-7.25 4.0041 0 7.25 3.246 7.25 7.25 0 1.9605-.7782 3.7393-2.0425 5.0443a.7492.7492 0 0 0-.1633.1633C14.7392 17.4719 12.9605 18.25 11 18.25c-4.004 0-7.25-3.2459-7.25-7.25Z" clipRule="evenodd"></path></svg>
                    <input type="text" placeholder='Search for players' className='searchInp' value={searchText} onChange={(e)=>getSearchedPlayers(e.target.value)}/>
                </div>
                {isSearchMode ? (
                   <div className="listOfPlayers">
                    <h3 className='listTitle'>Players</h3>
                    {playersFiltered.length > 0 ? (
                        playersFiltered.map((ele,index) =>{
                          return <div className="player" key={index} onClick={()=>followPlayer(ele)}>
                              <div className="playerImg">
                                <img  className="playersLogo" src="http://res.cloudinary.com/dgo3fuaxg/image/upload/v1721929948/bhucqryzr7yrlr3lzuh2.jpg" alt="https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/default-team-logo-500.png&w=80&h=80&scale=crop&cquality=40&location=origin" />
                              </div>
                              <div className="playerInfo">
                               
                                <div className="playerDetails">
                                    <p>{ele.name}</p>
                                    <span>{ele.leagueName}</span>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
                              </div>
                          </div>
                        })
                    ) :(
                      <div className="team justify-center" >
                          <p className='notFoundClass'>Player Not Found!</p>
                      </div>
                    )}

                 </div>
                ) : (
                <div className="listOfCompetetions">
                </div>
            )}
               
            
              
          </div>
          <Footer />
          <ToastContainer />
      </>
    )
}
