import React from 'react'
import "./NewsSmallCard.css"
import { Link } from 'react-router-dom';
import { getArticleLink } from '../../../utils/baseUrl';
export default function NewsSmallCard({news,forComp}) {
      const style={
        borderRadius:"100%"
      }
      const contHeihtTop={
        height: `calc(336px - 200px - 45px)`
      }
      const contHeihtTopTrending={
        height: `calc(336px - 200px)`
      }
      const totalHeight={
        height:"260px"
      }
  return (
    <div className='NewsSmallCard' style={forComp !== "TopNews" ? totalHeight : null}>
       {forComp === "TopNews" && (
        <div className="headerBlock">
          {news.titleImageUrl !== "No Image" && (
            <div className="headerImg">
              <img src={news.titleImageUrl} alt="" />
            </div>
          )}
          <h4 className="headerTitle">
            {news.for}
          </h4>
        </div>
       )}
        
        <div className="newsContent">
          <div className="newsImg">
          {forComp === "TopNews"  ? (
            <Link to={getArticleLink(news?.id,news?.slug,"story")}>
              <img src={news?.articleImageUrl} alt="" /> 
            </Link>
          ) :(
            <Link to={getArticleLink(news?.id,news?.slug,"story")}>
              <img src={news?.articleImageUrl} alt="" /> 
            </Link>
          )}
         
           
        
          </div> 
          <div className="newsInfo" style={forComp === "TopNews" ? contHeihtTop : contHeihtTopTrending}>

              {/* <p className='newsContent'>{news?.articleContent}</p> */}
              {forComp === "TopNews"  ? (
                <>
                  {/* <a href='/' className='newsTitle'>{news?.articleTitle}</a> */}
                  <Link className='articleLink' to={getArticleLink(news?.id,news?.slug,"story")}>{news?.articleTitle}</Link>
                  <div className="channel">
                    <div className="channelLogo">
                      
                      <img src="http://res.cloudinary.com/dgo3fuaxg/image/upload/v1721929948/bhucqryzr7yrlr3lzuh2.jpg" alt="" style={style} />
                    </div> 
                    <p className='channelName'>{news?.author !== "" ?news?.author : "Source Not Found"}</p>
                    <p className='channelName'>{news?.timeStamps}</p>
                  </div>
                </>
              ) : (
                <Link className='articleLink' to={getArticleLink(news?.id,news?.slug,"story")}>{news?.articleTitle}</Link>
              )} 
            
            
         
          </div>
        </div>
        
    </div>
  )
}
