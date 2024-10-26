import React, { useEffect } from 'react'
import "./CompetetionHomePage.css"
import Footer from '../../../components/Footer/Footer';
import NavBar from '../../../components/NavBar/NavBar';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NewsSmallCard from '../../../components/News/NewsSmallCard/NewsSmallCard';
import CompetetionIntro from '../../../components/CompetetionIntro/CompetetionIntro';
import { GET_COMPET_DATA } from '../../../redux/tourns/tournsActions';
import { GET_TEAM_INFO } from '../../../redux/team/teamsActions';
import { generateShortName, getArticleLink } from '../../../utils/baseUrl';
export default function CompetetionHomePage() {
  let { competId } = useParams();
  let { competSlug } = useParams();
  let loading=useSelector(state=>state.tourns.loading) 
  let currentCompetData=useSelector(state=>state.tourns.currentCompetData) 
  let dispatch=useDispatch()
  useEffect(()=>{
    let currentData=JSON.parse(sessionStorage.getItem("currentCompetData"))
    if(currentData != null){
        if(competId !== currentData.id){
            dispatch(GET_COMPET_DATA(competSlug,competId))
        }
    }else{
        dispatch(GET_COMPET_DATA(competSlug,competId))
    }

    let loadingHeight=window.innerHeight - 95 - document.querySelector(".footer").offsetHeight - 50
        if(document.querySelector(".loadingBlock")){
          document.querySelector(".loadingBlock").style.height=`${loadingHeight}px`
        }
        if(document.querySelector(".pageHeader")){
          document.querySelector(".pageHeader").style.height=`fit-content`
        }
        if(document.querySelector(".wrapper")){
          document.querySelector(".wrapper").style.minHeight=`${loadingHeight}px`
        }
  },[])
  return (
    <>
        <NavBar />
        <div className="competBlock">
          <div className="container">
            <div className="wrapper">
                {loading ? (
                   <div className="loadingBlock">
                   <span className="ouro ouro3">
                     <span className="left"><span className="anim"></span></span>
                     <span className="right"><span className="anim"></span></span>
                   </span>
                 </div>
                ):(
                  <>
                    <div className="pageHeader">
                      {/* <TeamIntroduct teamId={teamId} teamSlug={teamSlug} teamInfo={currentTeamData} /> */}
                      <CompetetionIntro competId={currentCompetData.id} competSlug={currentCompetData.slug}  competName={currentCompetData.name}/>
                    </div>
                    <div className="pageContent">
                        <div className="listOfnews">
                            {currentCompetData.allNews?.map((article,index)=>{
                                return <article className="newsContainer">
                                        <div className="articleImage">
                                          <Link to={getArticleLink(article.id,article.slug,article.type)}>                                       
                                            <img src={article.imageUrl} alt="" />
                                          </Link>
                                        </div>
                                        <div className="text-container">
                                            <div className="article-meta-data">
                                                <div className="timeStamps">{article.timeStamps}</div>
                                                <div>-</div>
                                                <div className="author">{article.author}</div>
                                            </div>
                                            <Link to={getArticleLink(article.id,article.slug,article.type)}>  
                                              <h1 className="articleTitle">{article.title}</h1>
                                            </Link>
                                            <p className="articleQuickInfo">{article.quickContent}</p>
                                        </div>
                                </article>
                            })}
                        </div>
                        {currentCompetData.standing?.clubsList && (
                          <div className="competStanding">
                          <h4 className="leagueName">{currentCompetData.standing?.name}</h4>
                            <table>
                              <thead>
                                <tr>
                                  <th>TEAM</th>
                                  <th>GP</th>
                                  <th>W</th>
                                  <th>D</th>
                                  <th>L</th>
                                  <th>GD</th>
                                  <th>P</th>
                                </tr>
                              </thead>
                              <tbody>
                                {currentCompetData.standing?.clubsList?.map((team,ind2)=>{
                                  return <tr key={ind2}>
                                      <td>
                                        <Link to={`/team/_/id/${team.id}/${team.slug}`} onClick={()=>dispatch(GET_TEAM_INFO(team.id))}>{team.name}</Link>
                                        <Link to={`/team/_/id/${team.id}/${team.slug}`} onClick={()=>dispatch(GET_TEAM_INFO(team.id))}>{generateShortName(team.name)}</Link>
                                      </td>
                                      <td>{team.GP}</td>
                                      <td>{team.W}</td>
                                      <td>{team.D}</td>
                                      <td>{team.L}</td>
                                      <td>{team.GD}</td>
                                      <td>{team.P}</td>
                                  </tr>
                                })}
                              </tbody>
                            </table>
                            <Link to="" className='moreStandings'>Standings</Link>
                          </div>
                        )}
                        

                    </div>
                  </>
                )}
            </div>
          </div>
        </div>
        <Footer />
    </>
  )
}
