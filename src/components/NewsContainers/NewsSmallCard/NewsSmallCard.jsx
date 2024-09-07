import React from 'react'
import "./NewsSmallCard.css"
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

            <img src={news?.articleImageUrl} alt="" />
        
          </div> 
          <div className="newsInfo" style={forComp === "TopNews" ? contHeihtTop : contHeihtTopTrending}>

              <a href='/' className='newsTitle'>{news?.articleTitle}</a>
              {/* <p className='newsContent'>{news?.articleContent}</p> */}
              {forComp === "TopNews" && (
                <div className="channel">
                  <div className="channelLogo">
                      <img src="http://res.cloudinary.com/dgo3fuaxg/image/upload/v1721929948/bhucqryzr7yrlr3lzuh2.jpg" alt="" style={style} />
                  </div> 
                  <p className='channelName'>{news?.author !== "" ?news?.author : "Source Not Found"}</p>
                  <p className='channelName'>{news?.timeStamps}</p>
                </div>
              )} 
            
            
         
          </div>
        </div>
        
    </div>
  )
}
