import React, { useEffect } from 'react'
import "./Clubs.css"
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ALL_COMPETETIONS, GET_COMPETETION_TEAMS } from '../../redux/tourns/tournsActions';
import { Link } from 'react-router-dom';
import { getDefaultTeamOrCompetLogo, getTeamLink } from '../../utils/baseUrl';
export default function Clubs() {
  const dispatch=useDispatch();
  const allCompets=useSelector(state=>state.tourns.allCompets)
  let loading=useSelector(state=>state.tourns.loading)
  let teams=useSelector(state=>state.tourns.selectedCompetTeams)

  useEffect(()=>{
    sessionStorage.getItem("allCompets") == null && dispatch(GET_ALL_COMPETETIONS())
    sessionStorage.getItem("selectedCompetTeams") == null && dispatch(GET_COMPETETION_TEAMS("eng.1","teamsPage"))
    let titleBlock=document.querySelector(".titleBlock")
    let loadingHeight=window.innerHeight - 95 -titleBlock.offsetHeight - document.querySelector(".footer").offsetHeight -35
        if(document.querySelector(".loadingBlock")){
          document.querySelector(".loadingBlock").style.minHeight=`${loadingHeight}px`
        }
        if(document.querySelector(".allTeams")){
          document.querySelector(".allTeams").style.minHeight=`${loadingHeight}px`
        }
  },[])
  const getCompetTeams=(name)=>{
    dispatch(GET_COMPETETION_TEAMS(name,"teamsPage"))
  }
  return (
    <>  
        <NavBar />
        <div className="teams">
          <div className="container">
            <div className="wrapper">
              <div className="titleBlock">
                <h3>Teams</h3>
                <select name="league" id="league" onChange={(e)=>getCompetTeams(e.target.value)}>
                  {allCompets?.map((league,index)=>{
                    if(league.leagueName === "English Premier League"){
                      return <option value={league.slug} selected key={index}>{league.leagueName}</option>
                    }else{                     
                      return <option value={league.slug} key={index}>{league.leagueName}</option>
                    }
                  })}
                </select>
              </div>
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
                        {teams?.map((team,index)=>{
                          return <div className="team" key={index} >
                          <div className="teamImg">
                            <img src={team.id != null ? team.logo : "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/default-team-logo-500.png&w=80&h=80&scale=crop&cquality=40&location=origin"} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                          </div>
                          <div className="teamInfo">
                              <div className="teamNameAndOpt">
                                  <Link className='teamLink' to={getTeamLink(team.id,team.slug)}>{team.name}</Link>
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
