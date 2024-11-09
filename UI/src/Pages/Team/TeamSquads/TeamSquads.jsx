import React,{useState,useEffect} from 'react'
import "./TeamSquads.css"
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {GET_TEAM_INFO, GET_TEAM_RESULTS_DATA, GET_TEAM_SQUADS_DATA } from '../../../redux/team/teamsActions';
import TeamIntroduct from '../../../components/TeamIntroduct/TeamIntroduct';
import { getPlayerLink, getTeamImage } from '../../../utils/baseUrl';
import { ToastContainer } from 'react-toastify';

export default function TeamSquads() {
    let [selectedLeague,setSelectedLeague]=useState("all")
    let [selectedSeason,setSelectedSeason]=useState(`${new Date().getFullYear()}`)
    let { teamId } = useParams();
    let { teamSlug } = useParams();
    let loading=useSelector(state=>state.teams.loading) 
    let currentTeamSquads=useSelector(state=>state.teams.currentTeamSquads) 
    let dispatch=useDispatch()
    const navigate=useNavigate()
    useEffect(()=>{
        let currentData=JSON.parse(sessionStorage.getItem("currentTeamSquads"))
        if(currentData != null){
            if(teamId !== currentData.id){
                dispatch(GET_TEAM_SQUADS_DATA(teamId))
            }
        }else{
            dispatch(GET_TEAM_SQUADS_DATA(teamId))
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
        <div className="teamSquad">
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
                      <TeamIntroduct teamId={teamId} teamSlug={teamSlug} teamInfo={currentTeamSquads}/>
                    </div>
                    <div className="pageContent">
                        <h1>{currentTeamSquads?.name} Squad</h1>

                        <div className="selectOpts">
                            <select className='dropdown__select' onChange={(e)=>{dispatch(GET_TEAM_SQUADS_DATA(teamId,e.target.value,selectedSeason));setSelectedLeague(e.target.value)}} >
                                {currentTeamSquads.leagues?.map((league,index)=>{

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
                            <select className='dropdown__select' onChange={(e)=>{dispatch(GET_TEAM_SQUADS_DATA(teamId,selectedLeague,e.target.value));setSelectedSeason(e.target.value)}} >
                                {currentTeamSquads.seasons?.map((season,index)=>{
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

                        {currentTeamSquads.squads?.length > 0 ? (
                            <div className="listOfPlayers">
                            {currentTeamSquads.squads?.map((squad,index2)=>{
                                return <div className="Table__fixtures" key={index2}>
                                        <div className="Table_Title"><h3>{squad.name}</h3></div>
                                        <div className="Table_Data">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>NAME</th>
                                                        <th>POS</th>
                                                        <th>AGE</th>
                                                        <th>HT</th>
                                                        <th>WT</th>
                                                        <th>NAT</th>
                                                        <th>APP</th>
                                                        <th>SUB</th>
                                                        <th>SV</th>
                                                        <th>GA</th>
                                                        <th>A</th>
                                                        <th>FC</th>
                                                        <th>FA</th>
                                                        <th>YC</th>
                                                        <th>RC</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        squad.listOfPlayer.map((player,index3)=>{
                                                            return <tr key={index3}>
                                                                    <td><Link className='playerLink' to={getPlayerLink(player.id,player.slug)}>{player.name}</Link></td>                                                          
                                                                    <td>{player.POS}</td>
                                                                    <td>{player.AGE}</td>
                                                                    <td>{player.HT}</td>
                                                                    <td>{player.WT}</td>
                                                                    <td>{player.NAT}</td>
                                                                    <td>{player.APP}</td>
                                                                    <td>{player.SUB}</td>
                                                                    <td>{player.SV}</td>
                                                                    <td>{player.GA}</td>
                                                                    <td>{player.A}</td>
                                                                    <td>{player.FC}</td>
                                                                    <td>{player.FA}</td>
                                                                    <td>{player.YC}</td>
                                                                    <td>{player.RC}</td>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                            })}
                    </div>
                        ) : (
                                <div className="noData">
                                    <h1>No Data Available.</h1>
                                </div>
                        )}
                    </div>
                  </>
                )}
                <div className="glossary glossary--fullWidth glossary--fullWidth--desktopLG"><h3 className="glossary__title">Glossary</h3><ul className="glossary__list glossary__list--desktopLG"><li className="glossary__item"><span className="glossary__abbr">Name:</span>Name</li><li className="glossary__item"><span className="glossary__abbr">POS:</span>Position </li><li className="glossary__item"><span className="glossary__abbr">Age:</span>Current age of player</li><li className="glossary__item"><span className="glossary__abbr">HT:</span>Height</li><li className="glossary__item"><span className="glossary__abbr">WT:</span>Weight</li><li className="glossary__item"><span className="glossary__abbr">NAT:</span>Nationality</li><li className="glossary__item"><span className="glossary__abbr">APP:</span>Appearances</li><li className="glossary__item"><span className="glossary__abbr">SUB:</span>Substitute Appearances</li><li className="glossary__item"><span className="glossary__abbr">G:</span>Total Goals</li><li className="glossary__item"><span className="glossary__abbr">A:</span>Assists</li><li className="glossary__item"><span className="glossary__abbr">SH:</span>Shots</li><li className="glossary__item"><span className="glossary__abbr">ST:</span>Shots On Target</li><li className="glossary__item"><span className="glossary__abbr">FC:</span>Fouls Committed</li><li className="glossary__item"><span className="glossary__abbr">FA:</span>Fouls Suffered</li><li className="glossary__item"><span className="glossary__abbr">YC:</span>Yellow Cards</li><li className="glossary__item"><span className="glossary__abbr">RC:</span>Red Cards</li><li className="glossary__item"><span className="glossary__abbr">SV:</span>Saves</li><li className="glossary__item"><span className="glossary__abbr">GA:</span>Goals Against</li></ul></div>
                </div>

            </div>
        </div>
        <Footer />
        <ToastContainer />
    </>
  )
}
