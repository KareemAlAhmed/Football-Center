import React, { useEffect, useState } from 'react'
import { GET_COMPET_DATE_MATCHES_INFO, GET_COMPET_DATE_SCORES, GET_DATE_MATCHES_INFO, GET_DATE_SCORES } from '../../redux/tourns/tournsActions';
import { useDispatch, useSelector } from 'react-redux';
import "./DatesSlider.css"
import { Link } from 'react-router-dom';
export default function DatesSlider({forComp,competSlug=null}) {
    let [currentSlidedDate,setCurrentSlidedDate]=useState(1);
    let [dateBtns,setDateBtns]=useState([])
    const dispatch=useDispatch()
    let loading=useSelector(state=>state.tourns.loading)
    let [currentDate,setCurrentDate]=useState("");

    const nextPhase = () => {
        let con=document.querySelector(".date-list")
        let nextBtn=document.querySelector(".nextPhase")
        let prevBtn=document.querySelector(".prevPhase")
        
        if(currentSlidedDate === (dateBtns.length / 7) - 1){
            nextBtn.style.visibility="hidden"
        }else{
            nextBtn.style.visibility="visible"
            prevBtn.style.visibility="visible"

        }
        if ((currentSlidedDate < dateBtns.length - 1 || currentSlidedDate < 1) && currentSlidedDate !== (dateBtns.length / 7) - 1) {  // Check for right boundary
            setCurrentSlidedDate(currentSlidedDate + 1);
            con.style.transform = `translateX(-${(((((document.querySelector(".date-list").offsetWidth - 60) / 7)) * 7) + 70 ) *  (currentSlidedDate + 1)}px)`;
        }
    };
    const prevPhase = () => {
        let con=document.querySelector(".date-list")
        let nextBtn=document.querySelector(".nextPhase")
        let prevBtn=document.querySelector(".prevPhase")
        if(currentSlidedDate <= 1){
          prevBtn.style.visibility="hidden"
        }else{
          prevBtn.style.visibility="visible"
          nextBtn.style.visibility="visible"
        }
        if (currentSlidedDate < dateBtns.length - 1 && currentSlidedDate !== 0) {  // Check for right boundary
          setCurrentSlidedDate(currentSlidedDate - 1);
          con.style.transform = `translateX(-${(((((document.querySelector(".date-list").offsetWidth - 60) / 7)) * 7) + 70 ) *  (currentSlidedDate - 1)}px)`;
        
        }
    };


    const getDateMatches=(e,date)=>{
        document.querySelector(".activeLi").classList.remove("activeLi")
        e.target.closest('li').classList.add('activeLi')
        dispatch(GET_DATE_MATCHES_INFO(date))
    }
    const getDateScores=(e,date,selectedDateString)=>{
        document.querySelector(".activeLi").classList.remove("activeLi")
        e.target.closest('li').classList.add('activeLi')
        dispatch(GET_DATE_SCORES(date))
        const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
        const formatted_date2 = selectedDateString.toLocaleDateString('en-US', options);
        document.querySelector(".selectedDateString").innerHTML=formatted_date2
    }
    const getCompetDateScores=(e,date,selectedDateString)=>{
      document.querySelector(".activeLi").classList.remove("activeLi")
      e.target.closest('li').classList.add('activeLi')
      dispatch(GET_COMPET_DATE_SCORES(date,competSlug))
      const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
      const formatted_date2 = selectedDateString.toLocaleDateString('en-US', options);
      document.querySelector(".selectedDateString").innerHTML=formatted_date2
  }
  const getCompetDateSchedules=(e,date,selectedDateString)=>{
    document.querySelector(".activeLi").classList.remove("activeLi")
    e.target.closest('li').classList.add('activeLi')
    dispatch(GET_COMPET_DATE_MATCHES_INFO(date,competSlug))
}
const increase=()=>{
  if(document.querySelector(".wrapperList")){
    document.querySelector(".wrapperList").scrollLeft += 120;
  }
}

    useEffect(() => {
        const newDateButtonsFull = [];     
        let monthsDate=[
          {
            month:"8",
            year:"2024"
          },
          {
            month:"9",
            year:"2024"
          },
          {
            month:"10",
            year:"2024"
          },
          {
            month:"11",
            year:"2024"
          },
          {
            month:"12",
            year:"2024"
          },
          {
            month:"1",
            year:"2025"
          },
          {
            month:"2",
            year:"2025"
          },
          {
            month:"3",
            year:"2025"
          },
          {
            month:"4",
            year:"2025"
          },
          {
            month:"5",
            year:"2025"
          },
        ]
        for(let i=0;i<monthsDate.length -1;i++){
          const daysInMonth = new Date(monthsDate[i].year, monthsDate[i].month, 0).getDate();
          for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(monthsDate[i].year, monthsDate[i].month - 1, day);
            newDateButtonsFull.push(date);
          }
        }
        // const currentDateIndex = newDateButtonsFull.findIndex(date => date.getDate() === new Date().getDate()) + 1;
        const currentDateIndex = newDateButtonsFull.findIndex(date => {
          const currentDate = new Date();
          return date.getDate() === currentDate.getDate() &&
                 date.getMonth() === currentDate.getMonth() &&
                 date.getFullYear() === currentDate.getFullYear();   
        
        }) + 1;
        let con=document.querySelector(".date-list")
        const today = new Date();
        const year1 = today.getFullYear();
        const month1 = (today.getMonth() + 1).toString().padStart(2, '0'); // Add leading 0 if necessary
        const day1 = today.getDate().toString().padStart(2, '0');
        if(currentDate === ""){
          const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
          const formatted_date2 = today.toLocaleDateString('en-US', options);
          setCurrentDate(formatted_date2)
        }
        const formattedDate = `${year1}${month1}${day1}`;
        let body=document.body
        con.scrollRight += 78;
        console.log(body.offsetWidth < 1199)
        if(body.offsetWidth < 1199){
            
        
          console.log(document.querySelector(".wrapperList"))
          document.querySelector(".wrapperList").scrollLeft += 120;
       
        }else{
          if(parseInt(currentDateIndex % 7) === 0){
            con.style.transform = `translateX(-${((((document.querySelector(".date-list").offsetWidth - 60) / 7) * 7) + 70 ) *  parseInt((currentDateIndex - 1) / 7)}px)`;
            setCurrentSlidedDate(parseInt((currentDateIndex - 1) / 7))
          }else{
            con.style.transform = `translateX(-${((((document.querySelector(".date-list").offsetWidth - 60) / 7) * 7) + 70 ) *  parseInt(currentDateIndex / 7)}px)`;
            setCurrentSlidedDate(parseInt(currentDateIndex / 7))
          }
        }
        if(forComp === "Schedule"){
          dispatch(GET_DATE_MATCHES_INFO(formattedDate))
        }
        if(forComp === "Scores"){
          dispatch(GET_DATE_SCORES(formattedDate))
        }
        if(forComp === "CompetScores"){
          dispatch(GET_COMPET_DATE_SCORES(formattedDate,competSlug))
        }
        if(forComp === "CompetSchedule"){
          dispatch(GET_COMPET_DATE_MATCHES_INFO(formattedDate,competSlug))
        }



        setDateBtns(newDateButtonsFull);
        let loadingHeight=window.innerHeight - 95 -con.offsetHeight - 50 - document.querySelector(".footer").offsetHeight -35
        if(document.querySelector(".loadingBlock")){
          document.querySelector(".loadingBlock").style.height=`${loadingHeight}px`
        }
      }, []);
      if(loading){
        let con=document.querySelector(".date-list")
        let loadingHeight=window.innerHeight - 95 -con.offsetHeight - 50 - document.querySelector(".footer").offsetHeight -35
        if(document.querySelector(".loadingBlock")){
          document.querySelector(".loadingBlock").style.height=`${loadingHeight}px`
        }
      }
    
  return (
    <div className="date-timeline">
   
      {(forComp !== "CompetScores" && forComp !== "CompetSchedule") &&
      (
        <h3 onClick={()=>increase()}>Schedule</h3>
      )
      }
      <div className="scheduler">
        <button className='prevPhase' onClick={()=>prevPhase()}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg></button>
        <div className="wrapperList">
          <ul className="date-list" id='date-list'>
              {dateBtns.map((date,index)=>{ 
                  // const currentDateIndex = dateBtns.findIndex(date => date.getDate() === new Date().getDate()) + 1;
                  const currentDateIndex = dateBtns.findIndex(date => {
                    const currentDate = new Date();
                    return date.getDate() === currentDate.getDate() &&
                           date.getMonth() === currentDate.getMonth() &&
                           date.getFullYear() === currentDate.getFullYear();   
                  
                  }) + 1;
                  const dateyear = date.getFullYear();
                  const datemonth = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading 0 if necessary
                  const dateday = date.getDate().toString().padStart(2, '0');
                  
                  const NewformattedDate = `${dateyear}${datemonth}${dateday}`;

                  if(forComp === "Schedule"){
                    return <li key={index + 1} className={index + 1 === currentDateIndex && "activeLi"} onClick={(e)=>{e.stopPropagation();getDateMatches(e,NewformattedDate)}}>
                    <Link onClick={(e)=>{e.preventDefault();e.stopPropagation();getDateMatches(e,NewformattedDate)}}
                    style={{width:`calc(((${document.querySelector(".date-list").offsetWidth}px - 60px) / 7) - 40px)`}}>
                      <time dateTime="${date.toISOString().slice(0, 10)}">{date.toLocaleString('en-US', { weekday: 'short' })} <span>{date.getDate()} {date.toLocaleString('en-US', { month: 'short' })}</span></time>
                    </Link>
                  </li>   
                  }

                  else if(forComp === "Scores"){
                    return <li key={index + 1} className={index + 1 === currentDateIndex && "activeLi"} onClick={(e)=>{e.stopPropagation();getDateScores(e,NewformattedDate,date)}}>
                    <Link  onClick={(e)=>{e.preventDefault();e.stopPropagation();getDateScores(e,NewformattedDate,date)}}
                    style={{width:`calc(((${document.querySelector(".date-list").offsetWidth}px - 60px) / 7) - 40px)`}}>
                      <time dateTime="${date.toISOString().slice(0, 10)}">{date.toLocaleString('en-US', { weekday: 'short' })} <span>{date.getDate()} {date.toLocaleString('en-US', { month: 'short' })}</span></time>
                    </Link>
                  </li>  
                  }
                  else if(forComp === "CompetScores"){
                    return <li key={index + 1} className={index + 1 === currentDateIndex && "activeLi"} onClick={(e)=>{e.stopPropagation();getCompetDateScores(e,NewformattedDate,date)}}>
                    <Link onClick={(e)=>{e.preventDefault();e.stopPropagation();getCompetDateScores(e,NewformattedDate,date)}}
                    style={{width:`calc(((${document.querySelector(".date-list").offsetWidth}px - 60px) / 7) - 40px)`}}>
                      <time dateTime="${date.toISOString().slice(0, 10)}">{date.toLocaleString('en-US', { weekday: 'short' })} <span>{date.getDate()} {date.toLocaleString('en-US', { month: 'short' })}</span></time>
                    </Link>
                  </li>  
                  }
                  else if(forComp === "CompetSchedule"){
                    return <li key={index + 1} className={index + 1 === currentDateIndex && "activeLi"} onClick={(e)=>{e.stopPropagation();getCompetDateSchedules(e,NewformattedDate,date)}}>
                    <Link onClick={(e)=>{e.preventDefault();e.stopPropagation();getCompetDateSchedules(e,NewformattedDate,date)}}
                    style={{width:`calc(((${document.querySelector(".date-list").offsetWidth}px - 60px) / 7) - 40px)`}}>
                      <time dateTime="${date.toISOString().slice(0, 10)}">{date.toLocaleString('en-US', { weekday: 'short' })} <span>{date.getDate()} {date.toLocaleString('en-US', { month: 'short' })}</span></time>
                    </Link>
                  </li>  
                  }



                      
              })}
          </ul>
        </div>
        <button className='nextPhase' onClick={()=>nextPhase()}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg></button>
      </div>
      {(forComp === "Scores" || forComp ==="CompetScores") && (
        <h3 className='selectedDateString'>{currentDate}</h3>
      )}
    </div>
  )
}
