import React from 'react'
import "./GameStatsComp.css"
import { Link } from 'react-router-dom';
import { getDefaultTeamOrCompetLogo, getGameStaticsLink, getTeamImage, getTeamLink } from '../../../utils/baseUrl';
import PieChartComp from "../../PieChartComp/PieChartComp.jsx";
export default function GameStatsComp({stats,type}) {
    let HomeStatsColor;
    let AwayStatsColor;
    if(stats){
        HomeStatsColor={
            backgroundColor:stats?.homeTeam?.color1 === "#ffffff" ? "var(--text-color)" : stats?.homeTeam?.color1
        }
        AwayStatsColor={
            backgroundColor:stats?.awayTeam?.color1 === "#ffffff" ? "var(--text-color)" : stats?.awayTeam?.color1
        }
    }
    const getStatsProgress=(teamType,currentTeamStats,oppStatsValue)=>{
        let backColor;
        if(teamType==="homeTeam"){
            backColor=stats?.homeTeam?.color1 === "#ffffff" ? "var(--text-color)" : stats?.homeTeam?.color1;
        }else{
            backColor=stats?.awayTeam?.color1 === "#ffffff" ? "var(--text-color)" : stats?.awayTeam?.color1;
        }
        let width;
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
    const getSegments=(teamStat)=>{
        const homeAngle=teamStat.homeTeamStat.slice(0,teamStat.homeTeamStat.length - 1)
        const awayAngle=teamStat.awayTeamStat.slice(0,teamStat.awayTeamStat.length - 1)

        const HomebackColor=stats.homeTeam.color1 === "#ffffff" ? "var(--text-color)" : stats.homeTeam.color1;

        const AwaybackColor=stats.awayTeam.color1 === "#ffffff" ? "var(--text-color)" : stats.awayTeam.color1;
       
        const segments = [
            // { startAngle: 0, endAngle: 113.4, percentage: 20, color: "red" }, // 31.4%
            // { startAngle: 113.4, endAngle: 360, percentage: 80, color: "blue" }, // 68.6%
            { startAngle: 0, endAngle: 113.4, percentage: parseFloat(homeAngle), color: HomebackColor }, // 31.4%
            { startAngle: 118.4, endAngle: 360, percentage: parseFloat(awayAngle), color: AwaybackColor }, // 68.6%
        ];
        return segments
    }
    stats?.teamStats?.length > 0 ? (
        <section className='Card gameStats'>
        <header className="cardHeader">
            <div className="cardTitle">
                <p>Team Stats</p>
            </div>   
        </header>
        <div className="Wrapper">
            <div className="competitorsNames">
                <Link className='teamLink' to={getTeamLink(stats?.homeTeam?.id,stats?.homeTeam?.slug)}>
                    <img src={getTeamImage(stats?.homeTeam?.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                    <span>{stats?.homeTeam?.shortName}</span>
                </Link>
                <Link className='teamLink' to={getTeamLink(stats?.awayTeam?.id,stats?.awayTeam?.slug)}>
                    <img src={getTeamImage(stats?.awayTeam?.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                    <span>{stats?.awayTeam?.shortName}</span>
                </Link>
            </div>
            {type === "PreMatch" ? (
                stats?.teamStats?.map((teamStat,index)=>{
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
                })
            ):(
                stats?.teamStats?.map((teamStat,index)=>{
                    if(teamStat.name.toLowerCase() !== "possession" ){
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
                    }else{
                        return <div className='possesionStats'>
                                    <div className="statsName">
                                        <span>Possession</span>
                                    </div>
                                    <div className="statsValue">
                                        <div className="statsNumber">
                                            <span>{teamStat.homeTeamStat}</span>
                                        </div>
                                        <div className="chartWrapper">
                                            <PieChartComp segments={getSegments(teamStat)} />
                                            <div className="teamLogos">
                                                <img src={getTeamImage(stats?.homeTeam?.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                                                <img src={getTeamImage(stats?.awayTeam?.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                                            </div>
                                        </div>
                                        <div className="statsNumber">
                                            <span>{teamStat.awayTeamStat}</span>
                                        </div>
                                    </div>
                                </div>
                    }
                })
            )}
            <Link className='fullPageLink' to={getGameStaticsLink(stats?.id,stats?.slug)}>Full Team Stats</Link>
        </div>  

    </section>
        
    ): (
        <></>
    )
    
  
}
