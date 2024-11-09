import React from 'react'
import "./SearchFilter.css"
import { useNavigate, useParams } from 'react-router-dom';
export default function SearchFilter({results,word}) {
    let { searchType } = useParams();
    const navigate=useNavigate()
    const getAllData=(type)=>{
        if(type === "Top Results"){
            navigate(`/search/_/q/${word}`)
        }else if(type === "Players"){
            navigate(`/search/_/q/${word}/type/players`)
        }else if(type === "Teams"){
            navigate(`/search/_/q/${word}/type/teams`)
        }else if(type === "Leagues"){
            navigate(`/search/_/q/${word}/type/leagues`)
        }
    }
  return (
      <div className="filtersOptions">

    {
      (results?.compets?.length > 0 || results?.players?.length > 0 || results?.teams?.length > 0)  && (
        <button className={ searchType == null ? "searchFilter activeSearchFilter" : "searchFilter"} onClick={()=>getAllData("Top Results")}>Top Results</button>
      )
    }
    {
      results?.players?.length > 0 && (
      <button className={ searchType === "players" ? "searchFilter activeSearchFilter" : "searchFilter"} onClick={()=>getAllData("Players")}>Players</button>
      )
    }
    {
      results?.teams?.length > 0 && (
        <button className={ searchType === "teams" ? "searchFilter activeSearchFilter" : "searchFilter"} onClick={()=>getAllData("Teams")}>Teams</button>
      )
    }
    {
      results?.compets?.length > 0 && (
      <button className={ searchType === "leagues" ? "searchFilter activeSearchFilter" : "searchFilter"} onClick={()=>getAllData("Leagues")}>Leagues</button>
      )
    }
  </div>
  )
}
