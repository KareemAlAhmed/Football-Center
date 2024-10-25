
import React,{useState,useEffect} from 'react'
import "./TeamStatsScoring.css"
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GET_TEAM_STATS_SCORING_DATA } from '../../../redux/team/teamsActions';
import TeamIntroduct from '../../../components/TeamIntroduct/TeamIntroduct';
import TeamStatsOpt from '../../../components/TeamStatsOpt/TeamStatsOpt';
import { getPlayerLink } from '../../../utils/baseUrl';
import { ToastContainer } from 'react-toastify';

export default function TeamStatsScoring() {
    let [selectedLeague,setSelectedLeague]=useState("all")
    let [selectedSeason,setSelectedSeason]=useState(`${new Date().getFullYear()}`)
    let { teamId } = useParams();
    let { teamSlug } = useParams();
    let loading=useSelector(state=>state.teams.loading) 
    let currentTeamStatsScoring=useSelector(state=>state.teams.currentTeamStatsScoring) 
    let dispatch=useDispatch()

    const navigate=useNavigate()

    useEffect(()=>{
        let currentData=JSON.parse(sessionStorage.getItem("currentTeamStatsScoring"))
        if(currentData != null){
            if(teamId !== currentData.id){
                dispatch(GET_TEAM_STATS_SCORING_DATA(teamId))
            }
        }else{
            dispatch(GET_TEAM_STATS_SCORING_DATA(teamId))
        }
        let loadingHeight=window.innerHeight - 95 - document.querySelector(".footer").offsetHeight - 50
            if(document.querySelector(".loadingBlock")){
            document.querySelector(".loadingBlock").style.height=`${loadingHeight}px`
            }
            if(document.querySelector(".wrapper")){
            document.querySelector(".wrapper").style.minHeight=`${loadingHeight}px`
            }
    },[])
  return (
    <>
          <NavBar />
        <div className="teamStatsScoring teamStat">
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
                      <TeamIntroduct teamId={teamId} teamSlug={teamSlug} teamInfo={currentTeamStatsScoring}/>
                    </div>
                    <div className="pageContent">
                        <h1>{currentTeamStatsScoring?.name} Scoring Stats</h1>
                        <TeamStatsOpt teamId={teamId} teamSlug={teamSlug} />
                        <div className="selectOpts">
                            <select className='dropdown__select' onChange={(e)=>{dispatch(GET_TEAM_STATS_SCORING_DATA(teamId,e.target.value,selectedSeason));setSelectedLeague(e.target.value)}} >
                                {currentTeamStatsScoring.leagues?.map((league,index)=>{
                                    if(selectedLeague === "all"){
                                        if(index === 0) {
                                            return <option key={index} selected value={league.slug} >
                                                {league.name}
                                            </option>
                                        }else{
                                            return <option key={index} value={league.slug} >
                                                {league.name}
                                            </option>
                                        }
                                    }else{
                                        if(selectedLeague === league.slug){
                                            return <option key={index} selected value={league.slug} >
                                                {league.name}
                                            </option>
                                        }else{
                                            return <option key={index} value={league.slug} >
                                                {league.name}
                                            </option>
                                        }
                                    }
                                    
                                })}
                            </select>
                            <select className='dropdown__select' onChange={(e)=>{dispatch(GET_TEAM_STATS_SCORING_DATA(teamId,selectedLeague === "all" && currentTeamStatsScoring.leagues[0].slug,e.target.value));setSelectedSeason(e.target.value)}} >
                                {currentTeamStatsScoring.seasons?.map((season,index)=>{
                                    if(selectedSeason === season.slug){
                                        return <option key={index} selected value={season.slug} >
                                            {season.name}
                                        </option>
                                    }else{
                                        return <option key={index} value={season.slug} >
                                            {season.name}
                                        </option>
                                    }
                                })}
                            </select>
                        </div>

                        {currentTeamStatsScoring.TopScorers?.length > 0 ? (
                            <div className="listOfPlayers">           
                                <div className="Table__fixtures" >
                                        <div className="Table_Title"><h3>Top Scorers</h3></div>
                                        <div className="Table_Data">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>RK</th>
                                                        <th>NAME</th>
                                                        <th>P</th>
                                                        <th>G</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        currentTeamStatsScoring.TopScorers.map((player,index3)=>{
                                                            return <tr key={index3}>
                                                                    <td>{player.rank}</td>
                                                                    <td><Link className='playerLink' to={getPlayerLink(player.id,player.slug)}>{player.name}</Link></td>                                                          
                                                                    <td>{player.P}</td>
                                                                    <td>{player.G}</td>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="Table__fixtures" >
                                        <div className="Table_Title"><h3>Top Assists</h3></div>
                                        <div className="Table_Data">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>RK</th>
                                                        <th>NAME</th>
                                                        <th>P</th>
                                                        <th>A</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        currentTeamStatsScoring.TopAssists.map((player,index3)=>{
                                                            return <tr key={index3}>
                                                                    <td>{player.rank}</td>
                                                                    <td><Link className='playerLink' to={getPlayerLink(player.id,player.slug)}>{player.name}</Link></td>                                                          
                                                                    <td>{player.P}</td>
                                                                    <td>{player.A}</td>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                            
                    </div>
                        ) : (
                                <div className="noData">
                                    <h1>No Data Available.</h1>
                                </div>
                        )}
                    </div>
                  </>
                )}
                    <div className="glossary">
                        <h3 className="glossary__title">Glossary</h3>
                        <ul className="glossary__list glossary__list--desktopLG">
                            <li className="glossary__item"><span className="glossary__abbr">RK:</span>Ranking</li>
                            <li className="glossary__item"><span className="glossary__abbr">NAME:</span>Athlete name</li>
                            <li className="glossary__item"><span className="glossary__abbr">P:</span>Games played</li>
                            <li className="glossary__item"><span className="glossary__abbr">G:</span>Goals scored</li>
                            <li className="glossary__item"><span className="glossary__abbr">A:</span>Assists</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        <ToastContainer />
    </>
  )
}
