import React, { useEffect } from 'react'
import "./UserSettingPage.css"
import { ToastContainer } from 'react-toastify';
import Footer from '../../../components/Footer/Footer';
import UserIntro from '../../../components/UserIntro/UserIntro';
import NavBar from '../../../components/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import EmptyCheckBox from '../../../components/Icons/EmptyCheckBox/EmptyCheckBox';
import FilledCheckBox from '../../../components/Icons/FilledCheckBox/FilledCheckBox';
import { CHANGE_USER_THEME } from '../../../redux/user/userActions';
export default function UserSettingPage() {
    let loading=useSelector(state=>state.users.loading) 
    let currentUser=useSelector(state=>state.users.currentUser) 
    const navigate=useNavigate();

    const dispatch=useDispatch()
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
    const changeTheme=(theme)=>{
        if(theme!==currentUser.theme){
            dispatch(CHANGE_USER_THEME(currentUser.name,theme))
        }
    }
    return (
      <>
          <NavBar />
          <div className="userPage userSettingPage">
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
                            <section className='Card userSetting'>
                                <header className="cardHeader">
                                    <div className="cardTitle">
                                        <p>Display mode</p>
                                    </div>   
                                </header>
                                <div className="Wrapper">
                                    <ul className="themeOptions">
                                        <li>
                                            <button onClick={()=>changeTheme("dark")}>
                                                <span className='optionWrapper'>
                                                    <span className='optionName'>Dark</span>
                                                    {
                                                        currentUser.theme === "dark" ? (
                                                            <span className='checkedLogo'>
                                                                <FilledCheckBox />
                                                            </span> 
                                                        ) : (
                                                            <span className='checkLogo'>
                                                                <EmptyCheckBox />
                                                            </span>
                                                        )
                                                    }                                               
                                                </span>
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={()=>changeTheme("light")}>
                                                <span className='optionWrapper'>
                                                    <span className='optionName'>Light</span>
                                                    {
                                                        currentUser.theme === "light" ? (
                                                            <span className='checkedLogo'>
                                                                <FilledCheckBox />
                                                            </span> 
                                                        ) : (
                                                            <span className='checkLogo'>
                                                                <EmptyCheckBox />
                                                            </span>
                                                        )
                                                    }                                             
                                                </span>
                                            </button>
                                        </li>
                                        
                                        
                                    </ul>
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
