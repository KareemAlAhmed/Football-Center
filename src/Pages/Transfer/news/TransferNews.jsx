import React, { useEffect } from 'react'
import "./TransferNews.css"
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { GET_TRANSFERS_TOP_NEWS } from '../../../redux/news/newsActions';
import FeaturedNews from '../../../components/NewsContainers/FeaturedNews/FeaturedNews';
import NewsSmallCard from '../../../components/NewsContainers/NewsSmallCard/NewsSmallCard';

export default function TransferNews() {
    const dispatch=useDispatch()
    const loading=useSelector(state=>state.news.loading)
    const transferTopNews=useSelector(state=>state.news.transferTopNews)
    useEffect(()=>{
        sessionStorage.getItem("transferTopNews") == null && dispatch(GET_TRANSFERS_TOP_NEWS())
        let loadingHeight=window.innerHeight - 95  - document.querySelector(".footer").offsetHeight -50
        if(document.querySelector(".loadingBlock")){
          document.querySelector(".loadingBlock").style.height=`${loadingHeight}px`
        }
    },[])
  return (
    <>
        <NavBar />
        <div className="transferNews">
            <div className="container">
                <div className="wrap">
                {loading ? 
                    (
                      <div className="loadingBlock">
                        <span class="ouro ouro3">
                          <span class="left"><span class="anim"></span></span>
                          <span class="right"><span class="anim"></span></span>
                        </span>
                      </div>
                    ):(
                        <div className="listOfTransferNews">
                          <div className="topTransferNews">
                            {
                             'allNews' in transferTopNews && (
                                  <>
                                    <FeaturedNews news={transferTopNews.allNews[0]} />
                                    {transferTopNews.allNews.slice(1).map((news,index)=>{
                                      return <NewsSmallCard news={news} key={index} forComp="TopNews" />
                                    })}
                                  </>
                              )
                            }
                          </div>
                           <div className="trendingTransferNews">
                            <h1>Trending Transfers</h1>
                            <div className="trendingTransferNewsList">
                              {console.log(transferTopNews.length)}
                              {
                                
                                'sideNews' in transferTopNews && (
                                    <>
                                      <FeaturedNews news={transferTopNews.sideNews[0]} />
                                      {transferTopNews.sideNews.slice(1).map((news,index)=>{
                                        return <NewsSmallCard news={news} key={index} forComp="TrendingNews" />
                                      })}
                                    </>
                                )
                              }
                            </div>
                           
                           </div>





                        </div>
                  
                    )}
                </div>
            </div>
        </div>
        <Footer />
    </>
  )
}
