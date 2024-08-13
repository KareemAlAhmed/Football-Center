import React, { useEffect, useState } from 'react'
import "./CompetetionSlider.css"

export default function CompetetionSlider({type}) {
    let [currentSlidedTourns,setCurrentSlidedTourns]=useState(1);
    let [currentSlidedTeams,setCurrentSlidedTeams]=useState(1);
  let tournaments=[
    {
        name:"Premier League",
        imgUrl:"https://image-service.onefootball.com/transform?w=96&dpr=2&image=https://images.onefootball.com/icons/leagueColoredCompetition/128/9.png"
    },
    {
        name:"LaLiga",
        imgUrl:"https://image-service.onefootball.com/transform?w=96&dpr=2&image=https://images.onefootball.com/icons/leagueColoredCompetition/128/10.png"
    },
    {
        name:"Bundesliga",
        imgUrl:"https://image-service.onefootball.com/transform?w=96&dpr=2&image=https://images.onefootball.com/icons/leagueColoredCompetition/128/1.png"
    },
    {
        name:"UEFA Champions League",
        imgUrl:"https://image-service.onefootball.com/transform?w=96&dpr=2&image=https://images.onefootball.com/icons/leagueColoredCompetition/128/5.png"
    },
    {
        name:"Seria A",
        imgUrl:"https://image-service.onefootball.com/transform?w=96&dpr=2&image=https://images.onefootball.com/icons/leagueColoredCompetition/128/13.png"
    },
    {
        name:"Ligue 1",
        imgUrl:"https://image-service.onefootball.com/transform?w=96&dpr=2&image=https://images.onefootball.com/icons/leagueColoredCompetition/128/23.png"
    },
    {
        name:"EFL Championship",
        imgUrl:"https://image-service.onefootball.com/transform?w=96&dpr=2&image=https://images.onefootball.com/icons/leagueColoredCompetition/128/27.png"
    },
    {
        name:"Copa Del Rey",
        imgUrl:"https://image-service.onefootball.com/transform?w=32&h=32&dpr=2&image=https%253A%252F%252Fimages.onefootball.com%252Ficons%252FleagueColoredCompetition%252F128%252F18.png"
    },
    {
        name:"FA Cup",
        imgUrl:"https://image-service.onefootball.com/transform?w=32&h=32&dpr=2&image=https%253A%252F%252Fimages.onefootball.com%252Ficons%252FleagueColoredCompetition%252F128%252F17.png"
    },
]
let teams=[
  {
    name:"Barcelona",
    imgUrl:"https://image-service.onefootball.com/transform?w=96&dpr=2&image=https://images.onefootball.com/icons/teams/56/5.png"
  },
  {
    name:"Real Madrid",
    imgUrl:"https://image-service.onefootball.com/transform?w=96&dpr=2&image=https://images.onefootball.com/icons/teams/56/26.png"
  },
  {
    name:"Bayern Munich",
    imgUrl:"https://image-service.onefootball.com/transform?w=96&dpr=2&image=https://images.onefootball.com/icons/teams/56/6.png"
  },
  {
    name:"Manchester United",
    imgUrl:"https://image-service.onefootball.com/transform?w=96&dpr=2&image=https://images.onefootball.com/icons/teams/56/21.png"
  },
  {
    name:"Manchester City",
    imgUrl:"https://image-service.onefootball.com/transform?w=96&dpr=2&image=https://images.onefootball.com/icons/teams/56/209.png"
  },
  {
    name:"Liverpool",
    imgUrl:"https://image-service.onefootball.com/transform?w=96&dpr=2&image=https://images.onefootball.com/icons/teams/56/18.png"
  },
  {
    name:"PSG",
    imgUrl:"https://image-service.onefootball.com/transform?w=96&dpr=2&image=https://images.onefootball.com/icons/teams/56/263.png"
  },
  {
    name:"Chelsea",
    imgUrl:"https://image-service.onefootball.com/transform?w=96&dpr=2&image=https://images.onefootball.com/icons/teams/56/9.png"
  },
  {
    name:"Juventus",
    imgUrl:"https://image-service.onefootball.com/transform?w=96&dpr=2&image=https://images.onefootball.com/icons/teams/56/17.png"
  },
  {
    name:"Arsenal",
    imgUrl:"https://image-service.onefootball.com/transform?w=96&dpr=2&image=https://images.onefootball.com/icons/teams/56/2.png"
  },
]
let [totalTourns]=useState(tournaments.length);

const slideToTheRight=(type)=>{

    if(type === "tourns"){
      let forwardBtn=document.querySelector(".CompetetionSlider button:first-of-type")
      let previousBtn=document.querySelector(".CompetetionSlider button:last-of-type")

      if (currentSlidedTourns < totalTourns - 1) {  // Check for right boundary
          setCurrentSlidedTourns(currentSlidedTourns + 1);
        }
      (currentSlidedTourns + 1)  * 4 >= totalTourns ? forwardBtn.style.display="none" : forwardBtn.style.display="block"
        const listTourn = document.querySelector(".listOfTourns");
        listTourn.style.transform = `translateX(-${100 * currentSlidedTourns }%)`;
        previousBtn.style.display="block"
    }else{
      let forwardBtn=document.querySelector(".TeamsSlider button:first-of-type")
      let previousBtn=document.querySelector(".TeamsSlider button:last-of-type")

      if (currentSlidedTeams < teams.length - 1) {  // Check for right boundary
          setCurrentSlidedTeams(currentSlidedTeams + 1);
        }
      (currentSlidedTeams + 1)  * 4 >= teams.length ? forwardBtn.style.display="none" : forwardBtn.style.display="block"
        const listTourn = document.querySelector(".listOfTeams");
        listTourn.style.transform = `translateX(-${100 * currentSlidedTeams }%)`;
        previousBtn.style.display="block"
     }
    
}
const slideToTheLeft=(type)=>{
    if(type === "tourns"){
      let forwardBtn=document.querySelector(".CompetetionSlider button:first-of-type")
      let previousBtn=document.querySelector(".CompetetionSlider button:last-of-type")

      if (currentSlidedTourns > 0) {  // Check for left boundary
          setCurrentSlidedTeams(currentSlidedTeams);
          setCurrentSlidedTourns(currentSlidedTourns - 1);
        }
        const listTourn = document.querySelector(".listOfTourns");
        listTourn.style.transform = `translateX(-${100 * (currentSlidedTourns - 2) }%)`;
        forwardBtn.style.display="block"
        currentSlidedTourns - 1 === 1 ? previousBtn.style.display="none" : previousBtn.style.display="block"
    }else{
      let forwardBtn=document.querySelector(".TeamsSlider button:first-of-type")
      let previousBtn=document.querySelector(".TeamsSlider button:last-of-type")

      if (currentSlidedTeams > 0) {  // Check for left boundary
        setCurrentSlidedTourns(currentSlidedTourns);
        setCurrentSlidedTeams(currentSlidedTeams - 1);
        }
        const listTourn = document.querySelector(".listOfTeams");
        listTourn.style.transform = `translateX(-${100 * (currentSlidedTeams - 2) }%)`;
        forwardBtn.style.display="block"
        currentSlidedTeams - 1 === 1 ? previousBtn.style.display="none" : previousBtn.style.display="block"
    }
   
}
useEffect(()=>{
    let wrapperTourns=document.querySelector(".CompetetionSlider .wrapper")
    let wrapperTeams=document.querySelector(".TeamsSlider .wrapper")
    let forwardBtnTourns=document.querySelector(".CompetetionSlider button:first-of-type")
    let previousBtnTourns=document.querySelector(".CompetetionSlider button:last-of-type")
    let forwardBtnTeams=document.querySelector(".TeamsSlider button:first-of-type")
    let previousBtnTeams=document.querySelector(".TeamsSlider button:last-of-type")
    forwardBtnTourns.style.bottom=`${wrapperTourns.offsetHeight / 2}px`;
    forwardBtnTourns.style.transform=`translateY(50%)`;
    forwardBtnTourns.style.right=`-40px`;
    previousBtnTourns.style.bottom=`${wrapperTourns.offsetHeight / 2}px`;
    previousBtnTourns.style.transform=`translateY(50%)`;
    previousBtnTourns.style.left=`-40px`;


    forwardBtnTeams.style.bottom=`${wrapperTeams.offsetHeight / 2}px`;
    forwardBtnTeams.style.transform=`translateY(50%)`;
    forwardBtnTeams.style.right=`-40px`;
    previousBtnTeams.style.bottom=`${wrapperTeams.offsetHeight / 2}px`;
    previousBtnTeams.style.transform=`translateY(50%)`;
    previousBtnTeams.style.left=`-40px`;

},[currentSlidedTourns,currentSlidedTeams])
  return (
    <>
    {type === "tourns" ? (
      <div className='CompetetionSlider'>
        <div className="container">
            <h3>POPULAR COMPETITIONS</h3>
            <div className="wrapper">
              <div className="listOfTourns">
                  {tournaments.map(ele=>{
                    return <div className="competetion">
                              <img src={ele.imgUrl} alt="" />
                              <div className="tournInfo">
                                <p>Competition</p>
                                <p>{ele.name}</p>
                              </div>
                            </div>
                  })}
              </div>
              
            </div>
              <button onClick={()=>slideToTheRight("tourns")}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg></button>
              <button onClick={()=>slideToTheLeft("tourns")}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg></button>
            
        </div>
      </div>
    ) : (
      <div className='TeamsSlider'>
        <div className="container">
            <h3>POPULAR TEAMS</h3>
            <div className="wrapper">
              <div className="listOfTeams">
                  {teams.map(ele=>{
                    return <div className="team">
                              <img src={ele.imgUrl} alt="" />
                              <div className="teamInfo">
                                <p>Team</p>
                                <p>{ele.name}</p>
                              </div>
                            </div>
                  })}
              </div>
              
            </div>
              <button onClick={()=>slideToTheRight("team")}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg></button>
              <button onClick={()=>slideToTheLeft("team")}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg></button>
            
        </div>
      </div>
    )}
    </>
   
  )
}
