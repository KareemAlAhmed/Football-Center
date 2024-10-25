import React from 'react'
import "./FeaturedNews.css"
import moment from 'moment';
import { Link } from 'react-router-dom';
import { getArticleLink, getDefaultArticleLogo } from '../../../utils/baseUrl';
export default function FeaturedNews({news}) {
    function timeAgo(timestamp) {
        const currentTime = new Date().getTime();
        const timeDifference = currentTime - new Date(timestamp).getTime();
      
        // Tolerance for "just now" (in milliseconds)
        const justNowThreshold = 60 * 1000; // 1 minute
      
        // Convert milliseconds to seconds, minutes, hours, etc.
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours   
       / 24);
      
        // Handle different time frames
        if (timeDifference < justNowThreshold) {
          return 'just now';
        } else if (days > 2) {
          return `${days} days ago`;
        } else if (days === 1) {
          return 'yesterday';
        } else if (hours >= 1) {
          return `about ${hours} hour${hours !== 1 ? 's' : ''} ago`;
        } else if (minutes >= 5) {
          return `about ${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
        } else {
          return `about ${seconds} second${seconds !== 1 ? 's' : ''} ago`;
        }
      }

      function timeAgo2(timestamp) {
        const currentTime = new Date().getTime();
        const timeDifference = currentTime - timestamp * 1000; // Convert to milliseconds
      
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
        const week = day * 7;
      
        const weeks = Math.floor(timeDifference   
       / week);
        const days = Math.floor((timeDifference % week) / day);
        const hours = Math.floor((timeDifference % day) / hour);
        const minutes = Math.floor((timeDifference % hour) / minute);
        const seconds = Math.floor((timeDifference % minute)   
       / second);
      
        if (weeks > 0) {
          return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
        } else if (days > 0) {
          return `${days} day${days !== 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
          return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        } else if (minutes   
       > 0) {
          return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
        } else {
          return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
        }
      }
      const style={
        borderRadius:"100%"
      }

  return (
    <div className="featuredNews">
        <div className="newsImg">
          {news?.title ? (
            <img src={news?.newsImg} alt="" />
          ) :(
            // <img src={news?.LINKS[0].IMAGE_VARIANT_URL} alt="" />
            <Link to={getArticleLink(news?.id,news?.slug,"story")}>
              <img src={news?.imgUrl === "No Img" ? getDefaultArticleLogo() : news?.imgUrl} alt="" />
            </Link>
          )}
            
        </div>
        <div className="newsInfo">
            {news?.title ? (
              <>
                <a href='/' className='newsTitle'>{news?.title}</a>
                <p className='newsContent'>{news?.content}</p>
                <div className="channel">
                    <div className="channelLogo">
                        <img src={news?.channelLogo} alt="" />
                    </div>
                    <p className='channelName'>{news?.channelName}</p>
                    <p className='channelName'>{news?.time ? timeAgo(news?.time ) : null}</p>
                </div>
              </>
              
            ) : (
              <>
                <Link to={getArticleLink(news?.id,news?.slug,"story")} className='newsTitle'>{news?.articleTitle}</Link>
                <div className="channel">
                    <div className="channelLogo">
                        <img src="http://res.cloudinary.com/dgo3fuaxg/image/upload/v1721929948/bhucqryzr7yrlr3lzuh2.jpg" alt="" style={style} />
                    </div>
                    <p className='channelName'>{news?.author}</p>
                    <p className='channelName'>{news?.timeStamps}</p>
                </div>
              </>
            )}
        </div>
    </div>
  )
}
