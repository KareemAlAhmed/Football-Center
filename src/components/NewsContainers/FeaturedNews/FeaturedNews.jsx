import React from 'react'
import "./FeaturedNews.css"

export default function FeaturedNews({news}) {
    
      const style={
        borderRadius:"100%"
      }

  return (
    <div className="featuredNews">
        <div className="headerBlock">
            {news.titleImageUrl !== "No Image" && (
              <div className="headerImg">
                <img src={news.titleImageUrl} alt="" />
              </div>
            )}
            <h1 className="headerTitle">
              {news.for}
            </h1>
        </div>
        <div className="newsContent">
          <div className="newsImg">

            <img src={news?.articleImageUrl} alt="" />
        
          </div>
          <div className="newsInfo">

              <a href='/' className='newsTitle'>{news?.articleTitle}</a>
              <p className='newsContent'>{news?.articleContent}</p>
              <div className="channel">
                  <div className="channelLogo">
                      <img src="http://res.cloudinary.com/dgo3fuaxg/image/upload/v1721929948/bhucqryzr7yrlr3lzuh2.jpg" alt="" style={style} />
                  </div>
                  <p className='channelName'>{news?.author}</p>
                  <p className='channelName'>{news?.timeStamps}</p>
              </div>
            
            
         
          </div>
        </div>
        
    </div>
  )
}
