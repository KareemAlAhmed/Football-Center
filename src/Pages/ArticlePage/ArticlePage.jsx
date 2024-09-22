import { Link, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import "./ArticlePage.css"
import React, { useEffect } from 'react'
import NavBar from "../../components/NavBar/NavBar";

import { useDispatch, useSelector } from "react-redux";
import { GET_ARTICLE_DATA } from "../../redux/news/newsActions";
import { getArticleLink } from "../../utils/baseUrl";

export default function ArticlePage() {
    let { articleId } = useParams();
    let { articleSlug } = useParams();
    const dispatch=useDispatch();
  
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
  return (
    <>  
        <NavBar />
        <div className="articlePage">
            <div className="container">
                <div className="wrapper">
                    
                    {loading ?
                            (
                            <div className="loadingBlock">
                                <span class="ouro ouro3">
                                <span class="left"><span class="anim"></span></span>
                                <span class="right"><span class="anim"></span></span>
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
                                                    <ul className="authors">
                                                        {currentArticleData?.mainArticleNews?.metaData?.authors?.map((author,index)=>{
                                                            return <li key={index}>{author} {index !== currentArticleData?.mainArticleNews?.metaData?.authors.length - 1 && "And"}</li>
                                                        })}
                                                    </ul>
                                                    <div className="timeStamps">
                                                        <span>{currentArticleData?.mainArticleNews?.metaData?.timeStamps}</span>
                                                    </div>
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
    </>
  )
}
