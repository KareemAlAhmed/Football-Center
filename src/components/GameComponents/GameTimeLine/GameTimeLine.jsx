import { Link } from "react-router-dom";
import { getDefaultTeamOrCompetLogo, getTeamImage, getTeamLink } from "../../../utils/baseUrl";
import "./GameTimeLine.css"
import React from 'react'
import YellowCardSvg from "../../Icons/YellowCardSvg/YellowCardSvg";
import SubsSvg from "../../Icons/SubsSvg/SubsSvg";
import RedCardSvg from "../../Icons/RedCardSvg/RedCardSvg";
import GoalIcon from "../../Icons/GoalIcon/GoalIcon";
import MissedGoal from "../../Icons/MissedGoal/MissedGoal";

export default function GameTimeLine({homeTeam,awayTeam,timeLine,game}) {
    const getStyle=(event,index)=>{
        let currentTime=parseInt(event.time)
        let prevTime;
        let margin=`0px`;
        if(index !== 0){
            prevTime=parseInt(timeLine[index - 1].time)
            let difference=currentTime - prevTime
            if((currentTime !== 90 && prevTime !== 90) && difference <= 1){
                margin=`15px`
            }else if((currentTime !== 90 && prevTime !== 90) && difference === 2){
                margin=`17px`
            }else if(difference <= 4){
                if(currentTime === 90 && prevTime !== 90){
                    margin=`27px`
                }else if(currentTime === 90 && prevTime === 90){
                    margin=`21px`
                }else if(currentTime === prevTime){
                    margin=`23px`
                }else if(event.time === "FT"){
                    margin=`33px`
                }
                else{
                    margin=`15px`
                }
                
            }
        }
        if(index === timeLine.length - 1){
            if(event.time === "FT"){            
                // let extend=(timeLine.length * 10) - 137
                let extend=(  (10/3) * timeLine.length) - 17
                margin=`${extend}px`
            }
        } 
        if(game?.status === "Live"){
            if(event.time === "FT"){ 
                return {
                    display:"none"
                }
            }
        }
      
        return {
            left:event.style.left,
            marginLeft:margin
        }
    }
    const getStyle2=(event,index)=>{
        let currentTime=parseInt(event.time)
        let currentLeft=parseInt(event.style.left.slice(0,event.style.left.length - 1))

        // let currentTime=parseInt(timeLine[index - 1].style.left.slice(0,timeLine[index - 1].style.left.length - 1))
        let prevTime;
        let prevLeft;
        let prevMargin;
        let margin=`0px`;
        if(index !== 0){
            prevTime=parseInt(timeLine[index - 1].time)
            prevLeft=parseInt(timeLine[index - 1].style.left.slice(0,timeLine[index - 1].style.left.length - 1))
            prevMargin=parseInt(timeLine[index - 1].style.margin.slice(0,timeLine[index - 1].style.margin?.length - 1))
            let difference=currentLeft - prevLeft

            if((currentTime !== 90 && prevTime !== 90) && difference === 0){
                margin=`${prevMargin + 17}px`
            }else if((currentTime !== 90 && prevTime !== 90) && difference === 1){            
                margin=`${prevMargin + 10}px`
            }else if((currentTime !== 90 && prevTime !== 90) && difference === 2){            
                margin=`${prevMargin + 7}px`
            }else if(difference <= 4){
                if(currentTime === 90 && prevTime !== 90){
                    margin=`27px`
                }else if(currentTime === 90 && prevTime === 90){
                    margin=`21px`
                }else if(currentTime === prevTime){
                    margin=`23px`
                }else if(event.time === "FT"){
                    margin=`33px`
                }
                else{
                    margin=`15px`
                }
                
            }
        }
        if(index === timeLine.length - 1){
            if(event.time === "FT"){            
                // let extend=(timeLine.length * 10) - 137
                let extend=(  (10/3) * timeLine.length) - 17
                margin=`${extend}px`
            }
        } 
        timeLine[index].style.margin=margin;
        if(game?.status === "Live"){
            if(event.time === "FT"){ 
                return {
                    display:"none"
                }
            }
        }
      
        return {
            left:event.style.left,
            marginLeft:margin
        }
    }
    const getTotalWidth=(n)=>{
        if(game?.status !== "Live"){
            let totalExtend=(  (10/3) * n) + 11
            return {
                width:`calc(100% + ${totalExtend}px)`
            }
        }else{
            return {
                width:`calc(${game?.timeLineLength})`
            }
        }
   
    }
    const getSvgMargin=(length,teamType)=>{
        if(teamType === "homeTeam"){
            let normalNumber=21
            let margin=`${normalNumber + ((length - 1) * 11)+(11 * length)}px`
            return {
                marginTop:`-${margin}`
            }
        }else{
            if(length > 0){
                return {
                    marginTop:`14px`
                }
            }else{
                return {
                    marginTop:`7px`
                }
            }
        }
      
    }

    return (
    <section className='Card gameTimeLine'>
        <header className="cardHeader">
          <div className="cardTitle">
              <p>Match Timeline</p>
          </div>   
        </header>
        <div className="Wrapper">
            <div className="timelineContentWrapper">
                <div className="timelineContentCompetitor">
                    <img src={getTeamImage(homeTeam?.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }}/>
                    <Link className="teamLink" to={getTeamLink(homeTeam?.id,homeTeam?.slug)}>{homeTeam?.name}</Link>
                </div>
                <div className="timelineContentCompetitor timelineContentCompetitor--away">
                    <img src={getTeamImage(awayTeam?.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }}/>
                    <Link className="teamLink" to={getTeamLink(awayTeam?.id,awayTeam?.slug)}>{awayTeam?.name}</Link>
                </div>
                <div className="timelineContent">
                    <div className="timelineContentMatch">
                        <div className="timelineContentMatchProgress">
                            <div className="timelineContentMatchProgressProgressBarWrapper" style={getTotalWidth(timeLine.length)}>                         
                                <div className="timelineContentMatchProgressProgressBar"></div>
                            </div>
                        </div>
                        <div className="timelineContentMatchProgressEvents">
                            <ul>
                                {timeLine?.map((matchEvent,index)=>{
                                    return  <li style={getStyle2(matchEvent,index)}
                                            className={matchEvent.time === "HT" && "timelineContentMatchProgressEventsEvent--halftime"}>
                                                <span className="timelineContentMatchProgressEventsEventTime">
                                                    {matchEvent.time}
                                                </span>
                                                <div className="timelineContentMatchProgressEvents">
                                                    {
                                                        matchEvent?.events?.homeTeam.length > 0 && (
                                                            <div className="homeTeamEvents" style={getSvgMargin(matchEvent?.events?.homeTeam.length,"homeTeam")}>
                                                                {
                                                                    matchEvent?.events?.homeTeam.map((event,index)=>{

                                                                        if(event.type==="Goal"){
                                                                            return <>
                                                                                <GoalIcon />
                                                                            </>
                                                                        }
                                                                        if(event.type==="Missed Penalty"){
                                                                            return <>
                                                                                <MissedGoal />
                                                                            </>
                                                                        }
                                                                        if(event.type==="Yellow Card"){
                                                                            return <>
                                                                                <YellowCardSvg />
                                                                            </>
                                                                        }
                                                                        if(event.type==="Red Card"){
                                                                            return <>
                                                                                <RedCardSvg />
                                                                            </>
                                                                        }
                                                                        if(event.type==="Subs"){
                                                                            return <>
                                                                                <SubsSvg />
                                                                            </>
                                                                        }
                                                                        if(event.type==="Subs"){
                                                                            return <>
                                                                                <SubsSvg />
                                                                            </>
                                                                        }
                                                                    })
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        matchEvent?.events?.awayTeam.length > 0 && (
                                                            <div className="awayTeamEvents" style={getSvgMargin(matchEvent?.events?.homeTeam.length,"awayTeam")}>
                                                                {
                                                                    matchEvent?.events?.awayTeam.map((event,index)=>{
                                                                        if(event.type==="Goal"){
                                                                            return <>
                                                                                <GoalIcon />
                                                                            </>
                                                                        }
                                                                        if(event.type==="Missed Penalty"){
                                                                            return <>
                                                                                <MissedGoal />
                                                                            </>
                                                                        }
                                                                        if(event.type==="Yellow Card"){
                                                                            return <>
                                                                                <YellowCardSvg />
                                                                            </>
                                                                        }
                                                                        if(event.type==="Red Card"){
                                                                            return <>
                                                                                <RedCardSvg />
                                                                            </>
                                                                        }
                                                                        if(event.type==="Subs"){
                                                                            return <>
                                                                                <SubsSvg />
                                                                            </>
                                                                        }
                                                                        if(event.type==="Subs"){
                                                                            return <>
                                                                                <SubsSvg />
                                                                            </>
                                                                        }
                                                                    })
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
