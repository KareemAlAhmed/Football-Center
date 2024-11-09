import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import Footer from '../../../components/Footer/Footer';
import UserIntro from '../../../components/UserIntro/UserIntro';
import NavBar from '../../../components/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./UserAccountPage.css"
import { DELETE_USER_DATA, logoutUserSuccuessed } from '../../../redux/user/userActions';
export default function UserAccountPage() {
    let loading=useSelector(state=>state.users.loading) 
    let currentUser=useSelector(state=>state.users.currentUser) 

    

  

    let dispatch=useDispatch()
    const navigate=useNavigate();
    const logout=()=>{
      dispatch(logoutUserSuccuessed())
    }
    const deleteAccount=()=>{
      dispatch(DELETE_USER_DATA(currentUser))
    }

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
          // let pageContentHeight=document.querySelector(".wrapper").offsetHeight - document.querySelector(".pageHeader").offsetHeight
          // if(document.querySelector(".pageContent")){
          //   document.querySelector(".pageContent").style.minHeight=`${pageContentHeight}px`
          // }
    },[])
    return (
      <>
          <NavBar />
          <div className="userPage userAccountPage">
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
                          <section className='Card userAccount'>
                            <div className="Wrapper">
                              <h1>Account Management</h1>
                              <div className="acountActions">
                                <button onClick={()=>logout()}>Sign Out</button>
                                <button onClick={()=>deleteAccount()}>Delete Account</button>
                              </div>

                            </div>  
                          </section>
                            
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
