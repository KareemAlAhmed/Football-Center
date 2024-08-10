import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar';
import axios from 'axios';
import "./Homepage.css"
import FeaturedNews from '../../components/News/FeaturedNews/FeaturedNews';
import NewsSmallCard from '../../components/News/NewsSmallCard/NewsSmallCard';
import NewsMediumCard from '../../components/News/NewsMediumCard/NewsMediumCard';
import CompetetionSlider from '../../components/CompetetionSlider/CompetetionSlider';
export default function Homepage() {
    const [news,setNews]=useState([]);
    const [realNews,setRealNews]=useState([]);
    const [cityNews,setCityNews]=useState([]);
    const [liverNews,setLiverNews]=useState([]);
    const getNews=async ()=>{
        try {
            const res = await axios.get(`http://localhost:5000/api/getNews`);
            setNews(res.data.result)
            setRealNews(res.data.REAL)
            setCityNews(res.data.CITY)
            setLiverNews(res.data.LIVER)
            sessionStorage.setItem("listOfNews",JSON.stringify(res.data))
        } catch (error) {
            // Handle errors
        }
    }
    useEffect(()=>{
        if(sessionStorage.getItem("listOfNews") != null){
            setNews(JSON.parse(sessionStorage.getItem("listOfNews")).result)
            setRealNews(JSON.parse(sessionStorage.getItem("listOfNews")).REAL)
            setCityNews(JSON.parse(sessionStorage.getItem("listOfNews")).CITY)
            setLiverNews(JSON.parse(sessionStorage.getItem("listOfNews")).LIVER)
        }else{
            getNews()
            
        }
    },[])
  return (
        <>
            <NavBar />
            <div className='home'>
                {console.log(liverNews)}
                <div className="seperatorBlock"></div>
                <div className="container">
                    <h3>Top News</h3>
                    <div className="listOfNews">
                        <FeaturedNews news={news[0]} />
                        {news?.slice(1,news?.length - 2).map((ele,index)=>{
                            return <NewsSmallCard key={index} news={ele} />;
                        })}
                        {news?.slice(news?.length - 2).map((ele,index)=>{
                            return <NewsMediumCard key={index} news={ele} />;
                        })}
                    </div>
                </div>
                <div className="container">
                    <h3>Real Madrid News</h3>
                    <div className="listOfNews">
                        <FeaturedNews news={realNews[0]} />
                        {realNews?.slice(1,5).map((ele,index)=>{
                            return <NewsSmallCard key={index} news={ele} />;
                        })}
                        {realNews?.slice(5,7).map((ele,index)=>{
                            return <NewsMediumCard key={index} news={ele} />;
                        })}
                    </div>
                </div>
                <div className="container">
                    <h3>Man City News</h3>
                    <div className="listOfNews">
                        <FeaturedNews news={cityNews[0]} />
                        {cityNews?.slice(1,5).map((ele,index)=>{
                            return <NewsSmallCard key={index} news={ele} />;
                        })}
                        {cityNews?.slice(5,7).map((ele,index)=>{
                            return <NewsMediumCard key={index} news={ele} />;
                        })}
                    </div>
                </div>
                <div className="container">
                    <h3>Liverpool News</h3>
                    <div className="listOfNews">
                        <FeaturedNews news={liverNews[0]} />
                        {liverNews?.slice(1,5).map((ele,index)=>{
                            return <NewsSmallCard key={index} news={ele} />;
                        })}
                        {liverNews?.slice(5,7).map((ele,index)=>{
                            return <NewsMediumCard key={index} news={ele} />;
                        })}
                    </div>
                </div>
                <CompetetionSlider />
            </div>
        </>
  )
}
