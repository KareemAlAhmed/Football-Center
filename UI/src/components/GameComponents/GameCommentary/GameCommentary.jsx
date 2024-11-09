import { Link } from "react-router-dom";
import CornerSvg from "../../Icons/CornerSvg/CornerSvg";
import GoalIcon from "../../Icons/GoalIcon/GoalIcon";
import MissedGoal from "../../Icons/MissedGoal/MissedGoal";
import OffsideSvg from "../../Icons/OffsideSvg/OffsideSvg";
import RedCardSvg from "../../Icons/RedCardSvg/RedCardSvg";
import SaveBallSvg from "../../Icons/SaveBallSvg/SaveBallSvg";
import SubsSvg from "../../Icons/SubsSvg/SubsSvg";
import WatchSvg from "../../Icons/WatchSvg/WatchSvg";
import WhisleSvg from "../../Icons/WhisleSvg/WhisleSvg";
import YellowCardSvg from "../../Icons/YellowCardSvg/YellowCardSvg";
import "./GameCommentary.css"
import React, { useState } from 'react'

export default function GameCommentary({gameComm,keyEvents,type}) {
    const [filtered,setFilter]=useState("Match Commentary")
    const getCommentSVG=(type)=>{
        if(type=== "Time"){
           return <WatchSvg />
        }else if(type=== "Goal"){
            return  <GoalIcon />
        }else if(type=== "Subs"){
            return  <SubsSvg />
        }else if(type=== "Yellow Card"){
            return  <YellowCardSvg />
        }else if(type=== "Red Card"){
            return  <RedCardSvg />
        }else if(type=== "Foul"){
            return  <WhisleSvg />
        }else if(type=== "Missed Chance"){
            return  <MissedGoal />
        }else if(type=== "Corner Kick"){
            return  <CornerSvg />
        }else if(type=== "Keeper Save"){
            return  <SaveBallSvg />
        }else if(type=== "Offside"){
            return  <OffsideSvg />
        }
    }
    return (
    <section className='Card gameCommentary'>
        {type === "summaryPage" ? (
            <>
                <header className="cardHeader">
                  <div className="cardTitle">
                      <p>Match Commentary</p>
                  </div>   
                </header>
                <div className="Wrapper">
                    <table>
                        <tbody>
                            {gameComm?.map((comment,index)=>{
                                return <tr>
                                    <div className="commentDetails">
                                        <div className="commentTime">
                                            <span>{comment.time}</span>
                                        </div>
                                        <div className="commentEventLogo">
                                            {comment.event !== "" && (
                                                getCommentSVG(comment.event)
                                            )}
                                        </div>
                                        <div className="commentContent">
                                            <span>{comment.content}</span>
                                        </div>
                                    </div>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                <footer>
                    <Link to="">Full Commentary</Link>
                </footer>
            </>
        ) : (
            <>
                <div className="tabList">
                    <button className={filtered === "Match Commentary" && "activeFilter"} onClick={()=>setFilter("Match Commentary")}>
                        <span className="filterOpt">
                            Match Commentary
                        </span>
                    </button>
                    <button className={filtered === "Key Events" && "activeFilter"} onClick={()=>setFilter("Key Events")}>
                        <span className="filterOpt">
                            Key Events
                        </span>      
                    </button>
                </div>
                <header className="cardHeader">
                  <div className="cardTitle">
                      <p>{filtered}</p>
                  </div>   
                </header>
                <div className="Wrapper">
                    <table>
                        <tbody>
                            {filtered === "Match Commentary" ? (
                                gameComm?.map((comment,index)=>{
                                    return <tr>
                                        <div className="commentDetails">
                                            <div className="commentTime">
                                                <span>{comment.time}</span>
                                            </div>
                                            <div className="commentEventLogo">
                                                {comment.event !== "" && (
                                                    getCommentSVG(comment.event)
                                                )}
                                            </div>
                                            <div className="commentContent">
                                                <span>{comment.content}</span>
                                            </div>
                                        </div>
                                    </tr>
                                })
                            ) : (
                                keyEvents?.map((comment,index)=>{
                                    return <tr>
                                        <div className="commentDetails">
                                            <div className="commentTime">
                                                <span>{comment.time}</span>
                                            </div>
                                            <div className="commentEventLogo">
                                                {comment.event !== "" && (
                                                    getCommentSVG(comment.event)
                                                )}
                                            </div>
                                            <div className="commentContent">
                                                <span>{comment.content}</span>
                                            </div>
                                        </div>
                                    </tr>
                                })
                            )}
                          
                        </tbody>
                    </table>
                </div>
            </>
        )}
    </section>
  )
}
