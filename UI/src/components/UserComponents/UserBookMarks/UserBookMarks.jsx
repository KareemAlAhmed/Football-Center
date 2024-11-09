import React from 'react'
import "./UserBookMarks.css"
import { getDefaultArticleLogo, getDefaultLogo } from '../../../utils/baseUrl';
import { Link } from 'react-router-dom';
import BookmarkedLogo from '../../Icons/BookmarkedLogo/BookmarkedLogo';
import { REMOVE_FROM_USER_BOOKMARK_LIST } from '../../../redux/user/userActions';
import { useDispatch } from 'react-redux';
export default function UserBookMarks({userData}) {
    const dispatch=useDispatch();
    const removeArticleFromBookMarks=(article)=>{
        dispatch(REMOVE_FROM_USER_BOOKMARK_LIST(userData?.name,article.articleId))
    }
  return (
    <section className='Card userBookmarks'>
    <div className="Wrapper">
      
        {
            userData.bookMarks.length > 0 ? (
                <div className="bookmarksLists">
                    {userData.bookMarks.map(article=>{
                        return <div className="bookmarkedArticle">
                            <div className="articleLogo">
                                <Link to={`article/${article?.articleId}`}>
                                    {
                                        article.mainArticleNews.imgesUrl.length > 0 ? (
                                            <img src={article.mainArticleNews.imgesUrl[0]} alt="" />
                                        ) : (
                                            <img src={getDefaultArticleLogo()} alt="" />
                                        )
                                    }
                                </Link>
                            </div>
                            <div className="articleContent">
                                <div className="articleTitle">
                                    <Link to={`article/${article?.articleId}`}>{article.mainArticleNews?.articleTitle.length > 104 ? article.mainArticleNews?.articleTitle.slice(0,102)+"..." : article.mainArticleNews?.articleTitle}</Link>
                                </div>
                                <div className="articleMetaData">
                                    <div className="authorInfo">
                                        <img src={getDefaultLogo()} alt="" />
                                        <span>{article.mainArticleNews?.metaData.authors[0]}</span>
                                    </div>
                                    <div className="bookmarkLogo"  onClick={()=>removeArticleFromBookMarks(article)}>
                                        <BookmarkedLogo />
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                   </div>
            ) : (
                <h1 className='noBookMarks'>No Article BookMarked Yet.</h1>
            )
        }
       
   
    </div>  
  </section>
  )
}
