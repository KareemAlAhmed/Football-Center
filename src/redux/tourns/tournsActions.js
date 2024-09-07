

import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { GET_ALL_COMPET, GET_ALL_COMPET_FAILED, GET_ALL_COMPET_SUCCESS, GET_ALL_TEAMS, GET_ALL_TEAMS_FAILED, GET_ALL_TEAMS_SUCCESS,GET_ALL_TOURNS_BY_CAT, GET_ALL_TOURNS_BY_CAT_FAILED, GET_ALL_TOURNS_BY_CAT_SUCCESS, GET_COMPET_TEAMS, GET_COMPET_TEAMS_FAILED, GET_COMPET_TEAMS_SUCCESS, GET_DATE_MATCHES, GET_DATE_MATCHES_FAILED, GET_DATE_MATCHES_SUCCESS, GET_FAV_COMPET_TEAMS_SUCCESS, GET_MATCHES_SCORES, GET_MATCHES_SCORES_FAILED, GET_MATCHES_SCORES_SUCCESS, SET_FAV_COUNTRY, SET_FAV_COUNTRY_FAILED, SET_FAV_COUNTRY_SUCCESS } from "./tournsActionType";



// export function getTourns(){
//     return{
//         type:GET_ALL_TOURNS
//     }
// }
// export function getTournsSuccuessed(data){
//     sessionStorage.setItem("allTeams",JSON.stringify(data))
   
//     return{
//         type:GET_ALL_TOURNS_SUCCESS,
//         payload:{tourns:data}
//     }
// }
// export function getTournsFailed(error){
//     return{
//         type:GET_ALL_TOURNS_FAILED,
//         payload:error
//     }
// }
export function getCompets(){
    return{
        type:GET_ALL_COMPET
    }
}
export function getCompetsSuccuessed(data){
    sessionStorage.setItem("allCompets",JSON.stringify(data))
   
    return{
        type:GET_ALL_COMPET_SUCCESS,
        payload:data
    }
}
export function getCompetsFailed(error){
    return{
        type:GET_ALL_COMPET_FAILED,
        payload:error
    }
}
export function getTeams(){
    return{
        type:GET_ALL_TEAMS
    }
}
export function getTeamsSuccuessed(data){
    sessionStorage.setItem("allTeams",JSON.stringify(data))
   
    return{
        type:GET_ALL_TEAMS_SUCCESS,
        payload:{teams:data}
    }
}
export function getTeamsFailed(error){
    return{
        type:GET_ALL_TEAMS_FAILED,
        payload:error
    }
}
export function setFavCountry(){
    return{
        type:SET_FAV_COUNTRY
    }
}
export function setFavCountrySuccuessed(data){
    sessionStorage.setItem("favCountry",JSON.stringify(data))
   
    return{
        type:SET_FAV_COUNTRY_SUCCESS,
        payload:data
    }
}
export function setFavCountryFailed(error){
    return{
        type:SET_FAV_COUNTRY_FAILED,
        payload:error
    }
}

export function getDateMatches(){
    return{
        type:GET_DATE_MATCHES
    }
}
export function getDateMatchesSuccuessed(data){
    sessionStorage.setItem("selectedDateMatches",JSON.stringify(data))
    return{
        type:GET_DATE_MATCHES_SUCCESS,
        payload:data
    }
}
export function getDateMatchesFailed(error){
    return{
        type:GET_DATE_MATCHES_FAILED,
        payload:error
    }
}

export function getTournsByCat(){
    return{
        type:GET_ALL_TOURNS_BY_CAT
    }
}
export function getTournsByCatSuccuessed(data){
    // sessionStorage.setItem("favCountryTourns",JSON.stringify(data))
   
    return{
        type:GET_ALL_TOURNS_BY_CAT_SUCCESS,
        payload:{teams:data}
    }
}
export function getTournsByCatsFailed(error){
    return{
        type:GET_ALL_TOURNS_BY_CAT_FAILED,
        payload:error
    }
}

export function getLeagueTeamsInfo(data){
    sessionStorage.setItem("favCompetetions",JSON.stringify(data))
   
    return{
        type:GET_FAV_COMPET_TEAMS_SUCCESS,
        payload:{league:data}
    }
}

export function getMatchesScores(){
    return{
        type:GET_MATCHES_SCORES
    }
}
export function getMatchesScoresSuccuessed(data){
    sessionStorage.setItem("selectedDateScores",JSON.stringify(data))
   
    return{
        type:GET_MATCHES_SCORES_SUCCESS,
        payload:data
    }
}
export function getMatchesScoresFailed(error){
    return{
        type:GET_MATCHES_SCORES_FAILED,
        payload:error
    }
}

export function getCompetTeams(){
    return{
        type:GET_COMPET_TEAMS
    }
}
export function getCompetTeamsSuccuessed(data){
    sessionStorage.setItem("selectedCompetTeams",JSON.stringify(data.teams))
   
    return{
        type:GET_COMPET_TEAMS_SUCCESS,
        payload:data
    }
}
export function getCompetTeamsFailed(error){
    return{
        type:GET_COMPET_TEAMS_FAILED,
        payload:error
    }
}
// export function GET_TOURNS(){
//     return function(dispatch){
//         dispatch(getTourns());     
//         axios.get(baseUrl+"api/tourns/getAllTeams")
//         .then(re=>{
//             dispatch(getTournsSuccuessed(re.data))
//         })
//         .catch(()=>{
//             dispatch(getTournsFailed("Error While Getting The Data"))
            
//         })
//     }
// }
export function GET_TEAMS(){
    return function(dispatch){
        dispatch(getTeams());     
        axios.get(baseUrl+"api/tourns/getAllTeams")
        .then(re=>{
            dispatch(getTeamsSuccuessed(re.data))
            console.log(re.data)
        })
        .catch(()=>{
            dispatch(getTeamsFailed("Error While Getting The Data"))
            
        })
    }
}

export function GET_TOURNS_BY_CAT(){
    return function(dispatch){
        dispatch(getTournsByCat());     
        axios.get(baseUrl+"api/tourns/getCompetetionByCat")
        .then(re=>{
            dispatch(getTournsByCatSuccuessed(re.data))
        })
        .catch(()=>{
            dispatch(getTournsByCatsFailed("Error While Getting The Data"))
            
        })
    }
}
export function GET_ALL_COMPETETIONS(){
    return function(dispatch){
        dispatch(getCompets());     
        axios.get(baseUrl+"api/tourns/getAllCompetetions")
        .then(re=>{
            dispatch(getCompetsSuccuessed(re.data))
        })
        .catch(()=>{
            dispatch(getCompetsFailed("Error While Getting The Data"))
            
        })
    }
}
export function GET_DATE_MATCHES_INFO(date){
    return function(dispatch){
        dispatch(getDateMatches());     
        axios.get(baseUrl+`api/tourns/schedule/_date/${date}`)
        .then(re=>{
            dispatch(getDateMatchesSuccuessed(re.data))
        })
        .catch(()=>{
            dispatch(getDateMatchesFailed("Error While Getting The Data"))
            
        })
    }
}
export function GET_DATE_SCORES(date){
    return function(dispatch){
        dispatch(getMatchesScores());     
        axios.get(baseUrl+`api/tourns/scoreboard/_date/${date}`)
        .then(re=>{
            dispatch(getMatchesScoresSuccuessed(re.data))
        })
        .catch(()=>{
            dispatch(getMatchesScoresFailed("Error While Getting The Data"))
            
        })
    }
}
export function GET_COMPETETION_TEAMS(comptName){
    return function(dispatch){
        dispatch(getCompetTeams());     
        axios.get(baseUrl+`api/tourns/getLeagueTeams/${comptName}`)
        .then(re=>{
            dispatch(getCompetTeamsSuccuessed(re.data))
        })
        .catch(()=>{
            dispatch(getCompetTeamsFailed("Error While Getting The Data"))
            
        })
    }
}