import React,{useState,useEffect} from 'react'
import "./TeamStatsDiscpline.css"
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GET_TEAM_STATS_DISCPLINE_DATA} from '../../../redux/team/teamsActions';
import TeamIntroduct from '../../../components/TeamIntroduct/TeamIntroduct';
import TeamStatsOpt from '../../../components/TeamStatsOpt/TeamStatsOpt';
import { getPlayerLink } from '../../../utils/baseUrl';
import { ToastContainer } from 'react-toastify';

export default function TeamStatsDiscpline() {
    let [selectedLeague,setSelectedLeague]=useState("all")
    let [selectedSeason,setSelectedSeason]=useState(`${new Date().getFullYear()}`)
    let { teamId } = useParams();
    let { teamSlug } = useParams();
    let loading=useSelector(state=>state.teams.loading) 
    let currentTeamStatsDiscpline=useSelector(state=>state.teams.currentTeamStatsDiscpline) 
    let dispatch=useDispatch()

    const navigate=useNavigate()

    useEffect(()=>{
        let currentData=JSON.parse(sessionStorage.getItem("currentTeamStatsDiscpline"))
        let firstLeague=JSON.parse(sessionStorage.getItem("currentTeamStatsScoring"))
        if(currentData != null){
            if(teamId !== currentData.id){
                dispatch(GET_TEAM_STATS_DISCPLINE_DATA(teamId,firstLeague.leagues[0].slug))
            }
        }else{
            dispatch(GET_TEAM_STATS_DISCPLINE_DATA(teamId,firstLeague.leagues[0].slug))
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
        <div className="teamStatDiscpline teamStat">
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
                      <TeamIntroduct teamId={teamId} teamSlug={teamSlug} teamInfo={currentTeamStatsDiscpline}/>
                    </div>
                    <div className="pageContent">
                        <h1>{currentTeamStatsDiscpline?.name} Discipline Stats</h1>
                        <TeamStatsOpt teamId={teamId} teamSlug={teamSlug} />
                        <div className="selectOpts">
                            <select className='dropdown__select' onChange={(e)=>{dispatch(GET_TEAM_STATS_DISCPLINE_DATA(teamId,e.target.value));setSelectedLeague(e.target.value)}} >
                                {currentTeamStatsDiscpline.leagues?.map((league,index)=>{
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
                            <select className='dropdown__select' onChange={(e)=>{dispatch(GET_TEAM_STATS_DISCPLINE_DATA(teamId,selectedLeague === "all" ? currentTeamStatsDiscpline.leagues[0].slug : selectedLeague,e.target.value));setSelectedSeason(e.target.value)}} >
                                {currentTeamStatsDiscpline.seasons?.map((season,index)=>{
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

                        {currentTeamStatsDiscpline.listOfDiscpline?.length > 0 ? (
                            <div className="listOfPlayers">           
                                <div className="Table__fixtures" >
                                        <div className="Table_Title"><h3>Discpline</h3></div>
                                        <div className="Table_Data">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>RK</th>
                                                        <th>NAME</th>
                                                        <th>P</th>
                                                        <th>YC</th>
                                                        <th>RC</th>
                                                        <th>PTS</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        currentTeamStatsDiscpline.listOfDiscpline?.map((player,index3)=>{
                                                            return <tr key={index3}>
                                                                    <td>{player.rank}</td>
                                                                    <td><Link className='playerLink' to={getPlayerLink(player.id,player.slug)}>{player.name}</Link></td>                                                          
                                                                    <td>{player.P}</td>
                                                                    <td>{player.YC}</td>
                                                                    <td>{player.RC}</td>
                                                                    <td>{player.PTS}</td>
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
                            <li className="glossary__item"><span className="glossary__abbr">YC:</span>Yellow cards</li>
                            <li className="glossary__item"><span className="glossary__abbr">RC:</span>Red cards</li>
                            <li className="glossary__item"><span className="glossary__abbr">PTS:</span>Pts</li>
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
