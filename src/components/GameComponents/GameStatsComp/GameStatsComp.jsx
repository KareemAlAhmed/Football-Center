import React from 'react'
import "./GameStatsComp.css"
import { Link } from 'react-router-dom';
import { getTeamImage, getTeamLink } from '../../../utils/baseUrl';
export default function GameStatsComp({stats}) {
    let HomeStatsColor;
    let AwayStatsColor;
    if(stats){
        HomeStatsColor={
            backgroundColor:stats.homeTeam.color1 === "#ffffff" ? "var(--text-color)" : stats.homeTeam.color1
        }
        AwayStatsColor={
            backgroundColor:stats.awayTeam.color1 === "#ffffff" ? "var(--text-color)" : stats.awayTeam.color1
        }
    }
    const getStatsProgress=(teamType,currentTeamStats,oppStatsValue)=>{
        let backColor;
        if(teamType==="homeTeam"){
            backColor=stats.homeTeam.color1 === "#ffffff" ? "var(--text-color)" : stats.homeTeam.color1;
        }else{
            backColor=stats.awayTeam.color1 === "#ffffff" ? "var(--text-color)" : stats.awayTeam.color1;
        }
        let width;
        console.log(currentTeamStats,oppStatsValue , currentTeamStats > oppStatsValue)
        if(parseInt(currentTeamStats) > parseInt(oppStatsValue) || parseInt(currentTeamStats) === parseInt(oppStatsValue)){
            width="100%";
        }else{
            let percentageProd=parseInt(currentTeamStats) * 100
            let currentwidth=Math.round(parseInt(percentageProd / oppStatsValue))
            width=`${currentwidth}%`
        }
        return {
            backgroundColor:backColor,
            width:width
        }
    }
  return (
    <section className='Card gameStats'>
        <header className="cardHeader">
            <div className="cardTitle">
                <p>Team Stats</p>
            </div>   
        </header>
        <div className="Wrapper">
            <div className="competitorsNames">
                <Link className='teamLink' to={getTeamLink(stats?.homeTeam?.id,stats?.homeTeam?.slug)}>
                    <img src={getTeamImage(stats?.homeTeam?.id)} alt="" />
                    <span>{stats?.homeTeam?.shortName}</span>
                </Link>
                <Link className='teamLink' to={getTeamLink(stats?.awayTeam?.id,stats?.awayTeam?.slug)}>
                    <img src={getTeamImage(stats?.awayTeam?.id)} alt="" />
                    <span>{stats?.awayTeam?.shortName}</span>
                </Link>
            </div>
            {stats?.teamStats?.map((teamStat,index)=>{
                return  <div className="teamStat">
                            <div className="homeTeamStats">
                                <span className='statNumber'>{teamStat.homeTeamStat}</span>
                                <div className="progressBarContainer">
                                    <div className="standerBar">
                                        <div className="blockLine"></div>
                                        <div className="blockLine"></div>
                                        <div className="blockLine"></div>
                                        <div className="blockLine"></div>
                                        <div className="blockLine"></div>
                                    </div>
                                    <div className="progressBar">
                                        <div className="progressLine" style={getStatsProgress("homeTeam",teamStat.homeTeamStat,teamStat.awayTeamStat)}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="statsName">
                                <span className='statSlug'>{teamStat.name}</span>                        
                            </div>
                            <div className="homeTeamStats">
                                <span className='statNumber'>{teamStat.awayTeamStat}</span>
                                <div className="progressBarContainer">
                                    <div className="standerBar">
                                        <div className="blockLine"></div>
                                        <div className="blockLine"></div>
                                        <div className="blockLine"></div>
                                        <div className="blockLine"></div>
                                        <div className="blockLine"></div>
                                    </div>
                                    <div className="progressBar">
                                        <div className="progressLine" style={getStatsProgress("awayTeam",teamStat.awayTeamStat,teamStat.homeTeamStat)}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
            })}
        </div>  

    </section>
  )
}
