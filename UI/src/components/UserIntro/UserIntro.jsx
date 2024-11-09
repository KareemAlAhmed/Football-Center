import React, { useEffect } from 'react'
import "./UserIntro.css"
import { Link, useNavigate } from 'react-router-dom';
export default function UserIntro({userInfo}) {

    const navigate=useNavigate()
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
            if(sessionStorage.getItem("currentUserPageTag") != null){
              if(li.classList.contains(sessionStorage.getItem("currentUserPageTag"))){
                li.classList.add("activeli")
              }
            }
          }
          // if(sessionStorage.getItem("currentTeamTag") != null){
              
          //     if(!document.querySelector(".pageHeader .activeli").classList.contains(sessionStorage.getItem("currentTeamTag"))){
          //       document.querySelector(".pageHeader .activeli").classList.remove("activeli")
          //       console.log(sessionStorage.getItem("currentTeamTag"))
          //       document.querySelector(`.${sessionStorage.getItem("currentTeamTag")}`).classList.add("activeli")
          //     }
          // }
    },[])
  return (
    <>
        <div className='userInfo'>
            <div className="userLogo">
                <img src={userInfo?.image_url} alt="" onError={(e) => { e.target.src = "http://res.cloudinary.com/dgo3fuaxg/image/upload/v1721929948/bhucqryzr7yrlr3lzuh2.jpg"; }} />
            </div>
            <div className="userDetails">
                <div>Welcome</div>
                <h2 className='userName'>{userInfo?.name}</h2>

            </div>
        </div>
        <div className="teamPageOpts">
            <ul className="Nav__Secondary__Menu">
                <li className="followingSubTab activeli" onClick={(e)=>{e.stopPropagation();navigate(`/profile/following`)}}>
                  <Link className='Nav__AnchorTag' to="/profile/following">Following</Link>
                </li>
                <li className="bookMarksSubTab" onClick={(e)=>{e.stopPropagation();navigate(`/profile/bookmarks`)}}>
                  <Link className='Nav__AnchorTag' to="/profile/bookmarks">Bookmarks</Link>
                </li>
                <li className="accountSubTab" onClick={(e)=>{e.stopPropagation();navigate(`/profile/account`)}}>
                  <Link className='Nav__AnchorTag' to="/profile/account">Account</Link>
                </li>
                <li className="settingSubTab" onClick={(e)=>{e.stopPropagation();navigate(`/profile/setting`)}}>
                  <Link className='Nav__AnchorTag' to="/profile/setting">Settings</Link>
                </li>
            </ul>
        </div>
        <div className="fallDown"></div>
    </>
  )
}
