import { Link, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import "./ArticlePage.css"
import React, { useEffect } from 'react'
import NavBar from "../../components/NavBar/NavBar";

import { useDispatch, useSelector } from "react-redux";
import { GET_ARTICLE_DATA } from "../../redux/news/newsActions";
import { getArticleLink } from "../../utils/baseUrl";
import BookmarkLogo from "../../components/Icons/BookmarkLogo/BookmarkLogo";
import BookmarkedLogo from "../../components/Icons/BookmarkedLogo/BookmarkedLogo";
import { ADD_TO_USER_BOOKMARK_LIST, REMOVE_FROM_USER_BOOKMARK_LIST } from "../../redux/user/userActions";
import { ToastContainer } from "react-toastify";

export default function ArticlePage() {
    let { articleId } = useParams();
    let { articleSlug } = useParams();
    const dispatch=useDispatch();
    let currentUser=useSelector(state=>state.users.currentUser)
    let loading=useSelector(state=>state.news.loading)
    let currentArticleData=useSelector(state=>state.news.currentArticleData)


  useEffect(()=>{
    let currentData=JSON.parse(sessionStorage.getItem("currentArticleData"))
    if(currentData != null){
        if(articleId !== currentData.articleId){
            dispatch(GET_ARTICLE_DATA(articleId,articleSlug))
        }
    }else{
        dispatch(GET_ARTICLE_DATA(articleId,articleSlug))
    }
    let loadingHeight=window.innerHeight - 95  - document.querySelector(".footer").offsetHeight -50

        if(document.querySelector(".loadingBlock")){
          document.querySelector(".loadingBlock").style.height=`${loadingHeight}px`
        }
        if(document.querySelector(".allTeams")){
          document.querySelector(".allTeams").style.minHeight=`${loadingHeight}px`
        }
  },[])
const getArticleData=(id,slug)=>{
    if(articleId !== id){
        dispatch(GET_ARTICLE_DATA(id,slug))
    }
}
const saveArticleInBookMarks=()=>{
    dispatch(ADD_TO_USER_BOOKMARK_LIST(currentUser?.name,currentArticleData))
}
const removeArticleFromBookMarks=()=>{
    dispatch(REMOVE_FROM_USER_BOOKMARK_LIST(currentUser?.name,currentArticleData.articleId))
}
const getBookmarkLogo=()=>{
    if(sessionStorage.getItem("current-user") != null){
        if(currentUser?.bookMarks.some(ele => ele.articleId === currentArticleData?.articleId)){
            return <div className="bookmarkLogo"  onClick={()=>removeArticleFromBookMarks()}>
                <BookmarkedLogo />
            </div>
        }else{
            return <div className="bookmarkLogo" onClick={()=>saveArticleInBookMarks()}>
                    <BookmarkLogo />
                </div>
        }
    }else{
        return  <div className="bookmarkLogo">
                    <BookmarkLogo />
                </div>
    }
}
  return (
    <>  
        <NavBar />
        <div className="articlePage">
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
       
                                    <section className="sideBarNews">
                                        {currentArticleData?.sideBarNews && (
                                            currentArticleData?.sideBarNews.map((article,index)=>{
                                                return <div className={article.id === articleId ? "news-feed-item activeFeed" : "news-feed-item"} key={index}>
                                                    
                                                        <div className="text-container">
                                                            <div className="articleTitle">
                                                                <Link  to={getArticleLink(article.id,article.slug,article.type)} onClick={(e)=>getArticleData(article.id,article.slug)}>
                                                                    {article.title}
                                                                </Link>
                                                            </div>
                                                            <div className="article-meta-data">                                                            
                                                                <span className="timestamps">
                                                                    {article.timestamp}
                                                                </span>
                                                                <span className="author">
                                                                    {article.author}
                                                                </span>                                                         
                                                            </div>
                                                        </div>
                                                    
                                                </div>
                                            })
                                        )}
                                    </section>
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
                                                <div className="articleContent">                                                                               {
                                            currentArticleData?.mainArticleNews?.allContent?.map((elem,index)=>{
                                                if(elem.tagName=== "p"){
                                                    return  <p key={index}>{elem.text}</p>
                                                }else if(elem.tagName=== "h1"){
                                                    return  <h1 key={index}>{elem.text}</h1>
                                                }else if(elem.tagName=== "h2"){
                                                    return  <h2 key={index}>{elem.text}</h2>
                                                }else if(elem.tagName=== "h3"){
                                                    return  <h3 key={index}>{elem.text}</h3>
                                                }else if(elem.tagName=== "ul"){
                                                    return <ul key={index}>
                                                        {elem.textArray.map((text,index2)=>{
                                                            return <li key={index2}>{text}</li>
                                                        })}
                                                    </ul>
                                                }else if(elem.tagName=== "img"){
                                                    return  <img key={index} src={elem.src} alt="" />
                                                }
                                            })
                                        }
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
