import React, { useEffect } from 'react'
import "./UserBookmarkedArticlePage.css"
import { ToastContainer } from 'react-toastify';
import Footer from '../../../components/Footer/Footer';
import { getArticleLink } from '../../../utils/baseUrl';
import { Link, useParams } from 'react-router-dom';
import NavBar from '../../../components/NavBar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import BookmarkedLogo from '../../../components/Icons/BookmarkedLogo/BookmarkedLogo';
import { REMOVE_FROM_USER_BOOKMARK_LIST } from '../../../redux/user/userActions';
export default function UserBookmarkedArticlePage() {
    let { articleId } = useParams();;
    const dispatch=useDispatch();
    let currentUser=useSelector(state=>state.users.currentUser)
    let loading=useSelector(state=>state.news.loading)
    // let currentArticleData=useSelector(state=>state.news.currentArticleData)
    let currentArticleData=currentUser.bookMarks.find(ele=>ele.articleId === articleId)

  useEffect(()=>{
    let currentData=JSON.parse(sessionStorage.getItem("currentArticleData"))
    let loadingHeight=window.innerHeight - 95  - document.querySelector(".footer").offsetHeight -50

        if(document.querySelector(".loadingBlock")){
          document.querySelector(".loadingBlock").style.height=`${loadingHeight}px`
        }
        if(document.querySelector(".allTeams")){
          document.querySelector(".allTeams").style.minHeight=`${loadingHeight}px`
        }
  },[])

const removeArticleFromBookMarks=()=>{
    dispatch(REMOVE_FROM_USER_BOOKMARK_LIST(currentUser?.name,currentArticleData.articleId))
}
const getBookmarkLogo=()=>{
    return <div className="bookmarkLogo"  onClick={()=>removeArticleFromBookMarks()}>
        <BookmarkedLogo />
    </div>

}
  return (
    <>  
        <NavBar />
        <div className="articlePage bookmarkedArticle">
            <div className="container">
                <div className="wrapper">
                    
                    {loading ?
                            (
                            <div className="loadingBlock">
                                <span className="ouro ouro3">
                                <span className="left"><span className="anim"></span></span>
                                <span className="right"><span className="anim"></span></span>
                                </span>
                            </div>
                            ):(
                                <>
                                    <section className="mainContainer">
                                        <article>
                                            <div className="articleContainer">
                                                <div className="articletitle">
                                                    <h1>{currentArticleData?.mainArticleNews?.articleTitle}</h1>
                                                </div>
                                                <div className="articleMetaData">
                                                    <div className="metaDataContent">
                                                        <ul className="authors">
                                                            {currentArticleData?.mainArticleNews?.metaData?.authors?.map((author,index)=>{
                                                                return <li key={index}>{author} {index !== currentArticleData?.mainArticleNews?.metaData?.authors.length - 1 && "And"}</li>
                                                            })}
                                                        </ul>
                                                        <div className="timeStamps">
                                                            <span>{currentArticleData?.mainArticleNews?.metaData?.timeStamps}</span>
                                                        </div>
                                                    </div>
                                                     {getBookmarkLogo()}   
                                                    
                                                </div>
                                                <div className="articleContent">
                                                    {currentArticleData?.mainArticleNews?.imgesUrl.length > 0 ? (
                                                        currentArticleData?.mainArticleNews?.allContent.length > 3 ? (
                                                            <>
                                                                {currentArticleData?.mainArticleNews?.allContent?.slice(0,3).map((text,index)=>{
                                                                    return  <p key={index}>{text}</p>
                                                                    })
                                                                }
                                                                <div className="inline-photo">
                                                                    <img src={currentArticleData?.mainArticleNews?.imgesUrl[0]} alt="" />
                                                                </div>
                                                                {currentArticleData?.mainArticleNews?.allContent?.slice(3).map((text,index)=>{
                                                                    return  <p key={index}>{text}</p>
                                                                    })
                                                                }
                                                            </>
                                                            
                                                        ) : (
                                                            <>
                                                                <div className="inline-photo">
                                                                    <img src={currentArticleData?.mainArticleNews?.imgesUrl[0]} alt="" />
                                                                </div>
                                                                {
                                                                    currentArticleData?.mainArticleNews?.allContent?.map((text,index)=>{
                                                                      return  <p key={index}>{text}</p>
                                                                    })
                                                                }
                                                            </>
                                                        )
                                                    ) :(
                                                        currentArticleData?.mainArticleNews?.allContent?.map((text,index)=>{
                                                            return  <p key={index}>{text}</p>
                                                        })
                                                    )}
                                                </div>
                                            </div>
                                        </article>
                                    </section>
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
