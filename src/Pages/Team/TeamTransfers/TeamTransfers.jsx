
import React,{useState,useEffect} from 'react'
import "./TeamTransfers.css"
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GET_TEAM_TRANSFER_DATA } from '../../../redux/team/teamsActions';
import TeamIntroduct from '../../../components/TeamIntroduct/TeamIntroduct';
import TeamStatsOpt from '../../../components/TeamStatsOpt/TeamStatsOpt';
import { getDefaultTeamOrCompetLogo, getPlayerLink, getTeamImage } from '../../../utils/baseUrl';
import { ToastContainer } from 'react-toastify';

export default function TeamTransfers() {
    let [selectedSeason,setSelectedSeason]=useState(`${new Date().getFullYear()}`)
    let { teamId } = useParams();
    let { teamSlug } = useParams();
    let loading=useSelector(state=>state.teams.loading) 
    let currentTeamTransfers=useSelector(state=>state.teams.currentTeamTransfers) 
    let dispatch=useDispatch()

    const navigate=useNavigate()

    useEffect(()=>{
        let currentData=JSON.parse(sessionStorage.getItem("currentTeamTransfers"))
        if(currentData != null){
            if(teamId !== currentData.id){
                dispatch(GET_TEAM_TRANSFER_DATA(teamId))
            }
        }else{
            dispatch(GET_TEAM_TRANSFER_DATA(teamId))
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
        <div className="teamTransfers">
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
                      <TeamIntroduct teamId={teamId} teamSlug={teamSlug} teamInfo={currentTeamTransfers}/>
                    </div>
                    <div className="pageContent">
                        <h1>{currentTeamTransfers?.name} Transfers</h1>
                        <div className="selectOpts">                       
                            <select className='dropdown__select' onChange={(e)=>{dispatch(GET_TEAM_TRANSFER_DATA(teamId,e.target.value));setSelectedSeason(e.target.value)}}>
                                {currentTeamTransfers.years?.map((year,index)=>{
                                    if(selectedSeason === year.slug){
                                        return <option key={index} selected value={year.slug} >
                                            {year.name}
                                        </option>
                                    }else{
                                        return <option key={index} value={year.slug} >
                                            {year.name}
                                        </option>
                                    }
                                })}
                            </select>
                        </div>

                        {currentTeamTransfers.listOfIncomingPlayer?.length > 0 ? (
                            <div className="listOfPlayers">           
                                <div className="Table__fixtures" >
                                        <div className="Table_Title"><h3>Player In</h3></div>
                                        <div className="Table_Data">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>DATE</th>
                                                        <th>PLAYER</th>
                                                        <th>FROM</th>
                                                        <th>FEE</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        currentTeamTransfers.listOfIncomingPlayer.map((player,index3)=>{
                                                            return <tr key={index3}>
                                                                    <td>{player.date}</td>
                                                                    <td><Link className='playerLink' to={getPlayerLink(player.player.id,player.player.slug)}>{player.player.name}</Link></td>                                                          
                                                                    <td>
                                                                        {
                                                                            player.fromTeam.id !== null ? (
                                                                                    <div className="teamWrapper">
                                                                                        <div className="teamLogo">
                                                                                            <Link to={`/team/_/id/${player.fromTeam.id}/${player.fromTeam.slug}`}>
                                                                                                <img src={getTeamImage(player.fromTeam.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                                                                                            </Link>
                                                                                        </div>
                                                                                        <div className="teamName">
                                                                                            <Link to={`/team/_/id/${player.fromTeam.id}/${player.fromTeam.slug}`}>{player.fromTeam.name}</Link>
                                                                                        </div>
                                                                                    </div>
                                                                            ) : (
                                                                                <div className="teamWrapper">
                                                                                     <div className="teamName">
                                                                                           <span>{player.fromTeam.name}</span> 
                                                                                        </div>
                                                                                </div>
                                                                            )
                                                                        }
                                                                    </td>
                                                                    <td>{player.fee}</td>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="Table__fixtures" >
                                        <div className="Table_Title"><h3>Player Out</h3></div>
                                        <div className="Table_Data">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>DATE</th>
                                                        <th>PLAYER</th>
                                                        <th>TO</th>
                                                        <th>FEE</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        currentTeamTransfers.listOfOutgoingPlayer.map((player,index3)=>{
                                                            return <tr key={index3}>
                                                                    <td>{player.date}</td>
                                                                    <td><Link className='playerLink' to={getPlayerLink(player.player.id,player.player.slug)}>{player.player.name}</Link></td>                                                          
                                                                    <td>
                                                                        {
                                                                            player.ToTeam.id !== null ? (
                                                                                    <div className="teamWrapper">
                                                                                        <div className="teamLogo">
                                                                                            <Link to={`/team/_/id/${player.ToTeam.id}/${player.ToTeam.slug}`}>
                                                                                                <img src={getTeamImage(player.ToTeam.id)} alt=""  onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }}/>
                                                                                            </Link>
                                                                                        </div>
                                                                                        <div className="teamName">
                                                                                            <Link to={`/team/_/id/${player.ToTeam.id}/${player.ToTeam.slug}`}>{player.ToTeam.name}</Link>
                                                                                        </div>
                                                                                    </div>
                                                                            ) : (
                                                                                <div className="teamWrapper">
                                                                                     <div className="teamName">
                                                                                           <span>{player.ToTeam.name}</span> 
                                                                                        </div>
                                                                                </div>
                                                                            )
                                                                        }
                                                                    </td>
                                                                    <td>{player.fee}</td>
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
                </div>
            </div>
        </div>
        <Footer />
        <ToastContainer />
    </>
  )
}

