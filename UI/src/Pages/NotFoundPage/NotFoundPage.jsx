import React, { useEffect} from 'react'
import "./NotFoundPage.css"
import Footer from '../../components/Footer/Footer';

import NavBar from '../../components/NavBar/NavBar';
import { useSelector } from 'react-redux';

export default function NotFoundPage() {
  let loading=useSelector(state=>state.teams.loading) 
    const goToPreviousPath = () => {
      window.history.replaceState(null, '', document.referrer);
      window.location.replace("/#/"+document.referrer);
    }
  useEffect(()=>{
    let loadingHeight=window.innerHeight - 95 - document.querySelector(".footer").offsetHeight - 50
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
        <div className="notFoundPage">
          <div className="container">
            <div className="wrapper">
                {loading ? (
                   <div className="loadingBlock">
                   <span className="ouro ouro3">
                     <span className="left"><span className="anim"></span></span>
                     <span className="right"><span className="anim"></span></span>
                   </span>
                 </div>
                ):(
                  <>
                    <div className="pageContent">
                        <h1>Page not found.</h1>
                        <button onClick={goToPreviousPath}>Try Again</button>
                    </div>
                  </>
                )}
            </div>
          </div>
        </div>
        <Footer />
    </>
  )
}
