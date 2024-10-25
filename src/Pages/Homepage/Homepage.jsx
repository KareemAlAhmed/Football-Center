import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar';
import axios from 'axios';
import "./Homepage.css"
import FeaturedNews from '../../components/News/FeaturedNews/FeaturedNews';
import NewsSmallCard from '../../components/News/NewsSmallCard/NewsSmallCard';
import NewsMediumCard from '../../components/News/NewsMediumCard/NewsMediumCard';
import CompetetionSlider from '../../components/CompetetionSlider/CompetetionSlider';
import Footer from '../../components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { GET_HOMEPAGE_NEWS_DATA } from '../../redux/news/newsActions';

export default function Homepage() {

    const laLigaNews=useSelector(state=>state.news.laLigaNews)
    const premierLeagueNews=useSelector(state=>state.news.premierLeagueNews)
    const bundesLigaNews=useSelector(state=>state.news.bundesLigaNews)
    const serieaNews=useSelector(state=>state.news.serieaNews)
    const loading=useSelector(state=>state.news.loading)
    const dispatch=useDispatch()
  
    useEffect(()=>{
        let allNews=JSON.parse(sessionStorage.getItem("listOfNews"))
        if(allNews == null){
            dispatch(GET_HOMEPAGE_NEWS_DATA())
        }

        let loadingHeight=window.innerHeight - 95  - document.querySelector(".footer").offsetHeight -50

        if(document.querySelector(".loadingBlock")){
          document.querySelector(".loadingBlock").style.height=`${loadingHeight}px`
        }
        if(document.querySelector(".allTeams")){
          document.querySelector(".allTeams").style.minHeight=`${loadingHeight}px`
        }
    },[])
  return (
        <>
            <NavBar />
            <div className='home'>
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
                            <div className="container">
                            <h3>LaLiga News</h3>
                            <div className="listOfNews">
                                <FeaturedNews news={laLigaNews[0]} />
                                {laLigaNews?.slice(1,9).map((ele,index)=>{
                                    return <NewsSmallCard key={index} news={ele} />;
                                })}
                                {laLigaNews?.slice(9,11).map((ele,index)=>{
                                    return <NewsMediumCard key={index} news={ele} />;
                                })}
                            </div>
                            </div>
                            <div className="container">
                                <h3>Premier League News</h3>
                                <div className="listOfNews">
                                    <FeaturedNews news={premierLeagueNews[0]} />
                                    {premierLeagueNews?.slice(1,9).map((ele,index)=>{
                                        return <NewsSmallCard key={index} news={ele} />;
                                    })}
                                    {premierLeagueNews?.slice(9,11).map((ele,index)=>{
                                        return <NewsMediumCard key={index} news={ele} />;
                                    })}
                                </div>
                            </div>
                            <CompetetionSlider type="tourns" />
                            <CompetetionSlider type="teams" />
                            <div className="container">
                                <h3>BundesLiga News</h3>
                                <div className="listOfNews">
                                    <FeaturedNews news={bundesLigaNews[0]} />
                                    {bundesLigaNews?.slice(1,9).map((ele,index)=>{
                                        return <NewsSmallCard key={index} news={ele} />;
                                    })}
                                    {bundesLigaNews?.slice(9,11).map((ele,index)=>{
                                        return <NewsMediumCard key={index} news={ele} />;
                                    })}
                                </div>
                            </div>
                            <div className="container">
                                <h3>Serie A News</h3>
                                <div className="listOfNews">
                                    <FeaturedNews news={serieaNews[0]} />
                                    {serieaNews?.slice(1,9).map((ele,index)=>{
                                        return <NewsSmallCard key={index} news={ele} />;
                                    })}
                                    {serieaNews?.slice(9,11).map((ele,index)=>{
                                        return <NewsMediumCard key={index} news={ele} />;
                                    })}
                                </div>
                            </div>
                        </>
                    )}  
                <Footer />
            </div>
        </>
  )
}
