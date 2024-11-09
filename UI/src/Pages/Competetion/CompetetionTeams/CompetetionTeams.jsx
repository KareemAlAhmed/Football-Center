import "./CompetetionTeams.css"
import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Footer from '../../../components/Footer/Footer';
import CompetetionIntro from '../../../components/CompetetionIntro/CompetetionIntro';
import NavBar from '../../../components/NavBar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { GET_COMPET_DATA, GET_COMPET_DATE_SCORES, GET_COMPETETION_TEAMS } from '../../../redux/tourns/tournsActions';
import { GET_TEAM_INFO } from '../../../redux/team/teamsActions';
import DatesSlider from '../../../components/DatesSlider/DatesSlider';
import { getDefaultTeamOrCompetLogo, getTeamImage } from '../../../utils/baseUrl';
import DefaultLogo from "../../../components/default.png"
export default function CompetetionTeams() {
    let { competId } = useParams();
    let { competSlug } = useParams();
    let loading=useSelector(state=>state.tourns.loading) 
    let currentCompetTeams=useSelector(state=>state.tourns.currentCompetTeams) 
    const dispatch=useDispatch()
    const navigate=useNavigate()
    useEffect(()=>{
  
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
          let currentData=JSON.parse(sessionStorage.getItem("currentCompetTeams"))
          if(currentData != null){
              if(competSlug !== currentData.leagueSlug){
                  dispatch(GET_COMPETETION_TEAMS(competSlug,"competTeams"))
              }
          }else{
              dispatch(GET_COMPETETION_TEAMS(competSlug,"competTeams"))
          }
    },[])
    return (
      <>
          <NavBar />
          <div className="competBlock">
            <div className="container">
              <div className="wrapper">
  
                  <CompetetionIntro competId={competId} competSlug={competSlug}  competName={currentCompetTeams?.leagueName}/>

                  {loading ? 
                      (
                        <div className="loadingBlock">
                          <span className="ouro ouro3">
                            <span className="left"><span className="anim"></span></span>
                            <span className="right"><span className="anim"></span></span>
                          </span>
                        </div>
                      ):(
                        <div className="allTeams">
                        {currentCompetTeams.teams?.map((team,index)=>{
                          return <div className="team" key={index} >
                          <div className="teamImg">
                          <Link to={`/team/_/id/${team.id}/${team.slug}`}>
                            <img src={team.id != null ? getTeamImage(team.id) : "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/default-team-logo-500.png&w=80&h=80&scale=crop&cquality=40&location=origin"} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }}/>
                          </Link>
                          </div>
                          <div className="teamInfo">
                              <div className="teamNameAndOpt">
                                    <p><Link className='teamLink' to={`/team/_/id/${team.id}/${team.slug}`}>{team.name}</Link></p>
                                    <ul className='optionsList'>
                                        <li><Link to={`/team/_/id/${team.id}/${team.slug}/squads`}>Squads</Link></li>
                                        <li><Link to={`/team/_/id/${team.id}/${team.slug}/stats/scoring`}>Stats</Link></li>
                                        <li><Link to={`/team/_/id/${team.id}/${team.slug}/fixture`}>Fixtures</Link></li>
                                    </ul>
                              </div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
                          </div>
                      </div>
                        })}
                      </div>
                    )}
            
              </div>
            </div>
          </div>
          <Footer />
      </>
    )
}
