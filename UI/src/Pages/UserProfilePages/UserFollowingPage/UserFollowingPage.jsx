import React, { useEffect } from 'react'
import "./UserFollowingPage.css"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import UserIntro from '../../../components/UserIntro/UserIntro';
import UserFollowing from '../../../components/UserComponents/UserFollowing/UserFollowing';
import { ToastContainer } from 'react-toastify';
export default function UserFollowingPage() {
    let loading=useSelector(state=>state.users.loading) 
    let currentUser=useSelector(state=>state.users.currentUser) 

    const navigate=useNavigate();


    useEffect(()=>{
      let currentData=JSON.parse(sessionStorage.getItem("current-user"))
      if(currentData == null){
        navigate("/")
      }
      
          let loadingHeight=window.innerHeight - 95 - document.querySelector(".footer").offsetHeight  - 50
          if(document.querySelector(".loadingBlock")){
            document.querySelector(".loadingBlock").style.height=`${loadingHeight}px`
          }
          if(document.querySelector(".pageHeader")){
            document.querySelector(".pageHeader").style.height=`fit-content`
          }
          if(document.querySelector(".wrapper")){
            document.querySelector(".wrapper").style.minHeight=`${loadingHeight}px`
          }

    },[])
    return (
      <>
          <NavBar />
          <div className="userPage userFollowingTeams">
            <div className="container">
              <div className="wrapper">
              {loading ? (
                     <div className="loadingBlock">
                     <span className="ouro ouro3">
                       <span className="left"><span className="anim"></span></span>
                       <span className="right"><span className="anim"></span></span>
                     </span>
                   </div>
                  ) :(
                    <>
                        <div className="pageHeader">
                          <UserIntro userInfo={currentUser} />
                        </div>
                        <div className="pageContent">
                            <UserFollowing userData={currentUser} />
                        </div>
                    </>
                   )}                 
              </div>
            </div>
          </div>
          <Footer />
          <ToastContainer />
      </>
    )
}
