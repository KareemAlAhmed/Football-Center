import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import "./SchedulePage.css"
import { useDispatch, useSelector } from 'react-redux';
import { GET_DATE_MATCHES_INFO } from '../../redux/tourns/tournsActions';
export default function SchedulePage() {
    let month="8"
    let year="2024"
    let [currentSlidedDate,setCurrentSlidedDate]=useState(1);
    let [currentSlidedMonth,setCurrentSlidedMonth]=useState(1);
    const daysInMonth = new Date(year, month, 0).getDate();
    let [dateBtns,setDateBtns]=useState([])
    let matches=useSelector(state=>state.tourns.selectedDateMatches)
    const dispatch=useDispatch()
    useEffect(() => {
      const newDateButtons = [];
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month - 1, day);
        newDateButtons.push(date);
      }
      dispatch(GET_DATE_MATCHES_INFO())
      setDateBtns(newDateButtons);
    }, [daysInMonth, year, month]);
    const nextPhase = (type) => {
      // if(type){
        let con=document.querySelector(".date-list")
        if (currentSlidedDate < dateBtns.length - 1) {  // Check for right boundary
          setCurrentSlidedDate(currentSlidedDate + 1);
        }
        con.style.transform = `translateX(-${100 * currentSlidedDate}%)`;

      // }
    };
  return (
    <>
        <NavBar />
        <div className="schedule">
            <div className="container">
                <div className="wrapper">
                    <div className="date-timeline">
                        <h3>Schedule</h3>
                          <div className="wrapperList">
                            <ul className="date-list" id='date-list'>
                              {console.log(matches)}
                                {dateBtns.map((date,index)=>{ 
                                    return <li key={index + 1}>
                                    <a href="/" 
                                    style={{width:`calc(((${document.querySelector(".date-list").offsetWidth}px - 60px) / 7) - 40px)`}}>
                                      <time dateTime="${date.toISOString().slice(0, 10)}">{date.toLocaleString('en-US', { weekday: 'short' })} <span>{index + 1} {date.toLocaleString('en-US', { month: 'short' })}</span></time>
                                    </a>
                                  </li>
                                  
                                })}
                            </ul>
                          </div>
                        <button onClick={()=>nextPhase()}>Next</button>
                    </div>
                    <div className="allMatches">
                        {matches.map((ele,ind)=>{
                          return <div className='matchesBlock' key={ind}>
                              <h2>{ele.league}</h2>
                              <table>
                                <thead>
                                  <td>MATCH</td>
                                  <td>TIME</td>
                                  <td>LOCATION</td>
                                </thead>
                                <tbody>
                                  {ele.matches.map((match,mt)=>{
                                    return <tr key={mt}>
                                        <td className='teamsInfo'>
                                          <div className='team Away'>
                                            <p>{match.AwayTeam.TeamName}</p>
                                            <img src={`https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/${match.AwayTeam.id}.png`} alt="" />
                                          </div>
                                          <div className='team'>
                                            <div className="scores">
                                              <span>{match.scores}</span>
                                            </div>
                                            <div className='Home'>
                                              <img src={`https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/${match.HomeTeam.id}.png`} alt="" />
                                              <p>{match.HomeTeam.TeamName}</p>
                                            </div>
                                          </div>
                                        </td>
                                        <td className='time'>
                                          <span>{match.time}</span>
                                        </td>
                                        <td className='location'>
                                          <p>{match.location}</p>
                                        </td>
                                    </tr>
                                  })}
                                </tbody>
                              </table>
                          </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>
  )
}
