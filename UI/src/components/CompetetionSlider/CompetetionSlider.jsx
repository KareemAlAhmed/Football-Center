import React, { useEffect, useState } from 'react'
import "./CompetetionSlider.css"
import { getDefaultTeamOrCompetLogo, getTeamImage } from '../../utils/baseUrl';
import { Link } from 'react-router-dom';

export default function CompetetionSlider({type}) {
    let [currentSlidedTourns,setCurrentSlidedTourns]=useState(1);
    let [currentSlidedTeams,setCurrentSlidedTeams]=useState(1);
  let tournaments=[
    {
      id: 2,
      leagueName: "UEFA Champions League",
      leaguesTeamsLink: "https://www.espn.com/soccer/teams/_/league/uefa.champions",
      leagueLogo: "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/2.png",
      slug: "uefa.champions"
  },
  {
      id: 23,
      leagueName: "English Premier League",
      leaguesTeamsLink: "https://www.espn.com/soccer/teams/_/league/eng.1",
      leagueLogo: "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/23.png",
      slug: "eng.1"
  },
  {
      id: 15,
      leagueName: "Spanish LALIGA",
      leaguesTeamsLink: "https://www.espn.com/soccer/teams/_/league/esp.1",
      leagueLogo: "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/15.png",
      slug: "esp.1"
  },
  {
      id: 12,
      leagueName: "Italian Serie A",
      leaguesTeamsLink: "https://www.espn.com/soccer/teams/_/league/ita.1",
      leagueLogo: "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/12.png",
      slug: "ita.1"
  },
  {
      id: 10,
      leagueName: "German Bundesliga",
      leaguesTeamsLink: "https://www.espn.com/soccer/teams/_/league/ger.1",
      leagueLogo: "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/10.png",
      slug: "ger.1"
  },
  {
      id: 9,
      leagueName: "French Ligue 1",
      leaguesTeamsLink: "https://www.espn.com/soccer/teams/_/league/fra.1",
      leagueLogo: "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/9.png",
      slug: "fra.1"
  },
  {
      id: 2310,
      leagueName: "UEFA Europa League",
      leaguesTeamsLink: "https://www.espn.com/soccer/teams/_/league/uefa.europa",
      leagueLogo: "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/2310.png",
      slug: "uefa.europa"
  },
  {
      id: 40,
      leagueName: "English FA Cup",
      leaguesTeamsLink: "https://www.espn.com/soccer/teams/_/league/eng.fa",
      leagueLogo: "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/40.png",
      slug: "eng.fa"
  },
  {
    id: 19,
    leagueName: "MLS",
    leaguesTeamsLink: "https://www.espn.com/soccer/teams/_/league/usa.1",
    leagueLogo: "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/19.png&scale=crop&cquality=40&location=origin&w=80&h=80",
    slug: "usa.1"
},
  {
      id: 83,
      leagueName: "Copa América",
      leaguesTeamsLink: "https://www.espn.com/soccer/teams/_/league/conmebol.america",
      leagueLogo: "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/83.png",
      slug: "conmebol.america"
  }
]

let teams=[
  {
    id: 86,
    name: "Real Madrid",
    logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/86.png",
    slug: "real-madrid"
  },
  {
    id: 83,
    name: "Barcelona",
    logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/83.png",
    slug: "barcelona"
  },{
    id: 132,
    name: "Bayern Munich",
    logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/132.png",
    slug: "bayern-munich"
},{
    id: 160,
    name: "Paris Saint-Germain",
    logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/160.png",
    slug: "paris-saint-germain"
},{
  id: 1068,
  name: "Atlético Madrid",
  logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/1068.png",
  slug: "atlético-madrid"
},{
  id: 382,
  name: "Manchester City",
  logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/382.png",
  slug: "manchester-city"
},
{
  id: 360,
  name: "Manchester United",
  logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/360.png",
  slug: "manchester-united"
}, {
  id: 364,
  name: "Liverpool",
  logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/364.png",
  slug: "liverpool"
}, {
  id: 363,
  name: "Chelsea",
  logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/363.png",
  slug: "chelsea"
}, {
  id: 359,
  name: "Arsenal",
  logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/359.png",
  slug: "arsenal"
},{
  id: 111,
  name: "Juventus",
  logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/111.png",
  slug: "juventus"
}
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
        // listTourn.style.transform = `translateX(-${100 * currentSlidedTourns }%)`;
        listTourn.style.transform = `translateX(-${(((((document.querySelector(".listOfTeams").offsetWidth - 60) / 4)) * 4) + 80 ) * (currentSlidedTourns )}px)`;

        previousBtn.style.display="block"
    }else{
      let forwardBtn=document.querySelector(".TeamsSlider button:first-of-type")
      let previousBtn=document.querySelector(".TeamsSlider button:last-of-type")

      if (currentSlidedTeams < teams.length - 1) {  // Check for right boundary
        setCurrentSlidedTeams(currentSlidedTeams + 1);
      }
      (currentSlidedTeams + 1)  * 4 >= teams.length ? forwardBtn.style.display="none" : forwardBtn.style.display="block"
        const listTourn = document.querySelector(".listOfTeams");
        listTourn.style.transform = `translateX(-${(((((document.querySelector(".listOfTeams").offsetWidth - 60) / 4)) * 4) + 80 ) *  (currentSlidedTeams)}px)`;
        // listTourn.style.transform = `translateX(-${100 * currentSlidedTeams }%)`;
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
        // listTourn.style.transform = `translateX(-${100 * (currentSlidedTourns - 2) }%)`;
        listTourn.style.transform = `translateX(-${(((((document.querySelector(".listOfTeams").offsetWidth - 60) / 4)) * 4) + 80 ) * (currentSlidedTourns - 2)}px)`;

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
        listTourn.style.transform = `translateX(-${(((((document.querySelector(".listOfTeams").offsetWidth - 60) / 4)) * 4) + 80 ) * (currentSlidedTeams - 2)}px)`;

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
                  {tournaments.map((ele,index)=>{
                    return <div className="competetion" key={index}>
                              <Link to={`/competetion/_/id/${ele.id}/${ele.slug}`}>
                                <img src={ele.leagueLogo} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                                <div className="tournInfo">
                                  <p>Competition</p>
                                  <p>{ele.leagueName}</p>
                                </div>
                              </Link>
                              
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
                  {teams.map((ele,index)=>{
                    return <div className="team" key={index}>
                              <Link to={`/team/_/id/${ele.id}/${ele.slug}`}>
                                <img src={getTeamImage(ele.id)} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }} />
                                <div className="teamInfo">
                                  <p>Team</p>
                                  <p>{ele.name}</p>
                                </div>
                              </Link>
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
