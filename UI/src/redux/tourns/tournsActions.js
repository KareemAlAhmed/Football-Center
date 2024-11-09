

import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { GET_ALL_COMPET, GET_ALL_COMPET_FAILED, GET_ALL_COMPET_SUCCESS, GET_ALL_TEAMS, GET_ALL_TEAMS_FAILED, GET_ALL_TEAMS_SUCCESS,GET_ALL_TOURNS_BY_CAT, GET_ALL_TOURNS_BY_CAT_FAILED, GET_ALL_TOURNS_BY_CAT_SUCCESS, GET_COMPET_DATE_MATCHES, GET_COMPET_DATE_MATCHES_FAILED, GET_COMPET_DATE_MATCHES_SUCCESS, GET_COMPET_INFO, GET_COMPET_INFO_FAILED, GET_COMPET_INFO_SUCCESS, GET_COMPET_MATCHES_SCORES, GET_COMPET_MATCHES_SCORES_FAILED, GET_COMPET_MATCHES_SCORES_SUCCESS, GET_COMPET_STANDING, GET_COMPET_STANDING_FAILED, GET_COMPET_STANDING_SUCCESS, GET_COMPET_STATS_DISCPLINE, GET_COMPET_STATS_DISCPLINE_FAILED, GET_COMPET_STATS_DISCPLINE_SUCCESS, GET_COMPET_STATS_PERFORMANCE, GET_COMPET_STATS_PERFORMANCE_FAILED, GET_COMPET_STATS_PERFORMANCE_SUCCESS, GET_COMPET_STATS_SCORING, GET_COMPET_STATS_SCORING_FAILED, GET_COMPET_STATS_SCORING_SUCCESS, GET_COMPET_TEAMS, GET_COMPET_TEAMS_FAILED, GET_COMPET_TEAMS_SUCCESS, GET_COMPET_TRANSFER, GET_COMPET_TRANSFER_FAILED, GET_COMPET_TRANSFER_SUCCESS, GET_DATE_MATCHES, GET_DATE_MATCHES_FAILED, GET_DATE_MATCHES_SUCCESS, GET_FAV_COMPET_TEAMS_SUCCESS, GET_MATCHES_SCORES, GET_MATCHES_SCORES_FAILED, GET_MATCHES_SCORES_SUCCESS, GET_SPECIFIC_COMPET_TEAMS_SUCCESS, SET_FAV_COUNTRY, SET_FAV_COUNTRY_FAILED, SET_FAV_COUNTRY_SUCCESS } from "./tournsActionType";



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
    window.location.replace("/#/notFound")
    return{
        type:GET_ALL_COMPET_FAILED,
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
    window.location.replace("/#/notFound")
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
    window.location.replace("/#/notFound")
    return{
        type:GET_DATE_MATCHES_FAILED,
        payload:error
    }
}
export function getCompetDateMatches(){
    return{
        type:GET_COMPET_DATE_MATCHES
    }
}
export function getCompetDateMatchesSuccuessed(data){
    sessionStorage.setItem("currentCompetSchedule",JSON.stringify(data))
    return{
        type:GET_COMPET_DATE_MATCHES_SUCCESS,
        payload:data
    }
}
export function getCompetDateMatchesFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_COMPET_DATE_MATCHES_FAILED,
        payload:error
    }
}

export function getTournsByCat(){
    return{
        type:GET_ALL_TOURNS_BY_CAT
    }
}
export function getTournsByCatSuccuessed(data){
    sessionStorage.setItem("allCompetetionByCat",JSON.stringify(data.competetionsByCat))
    sessionStorage.setItem("allCompets",JSON.stringify(data.competetions))


    return{
        type:GET_ALL_TOURNS_BY_CAT_SUCCESS,
        payload:{competsByCat:data.competetionsByCat,allCompets:data.competetions}
    }
}
export function getTournsByCatsFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_ALL_TOURNS_BY_CAT_FAILED,
        payload:error
    }
}

export function getLeagueTeamsInfo(data){
    sessionStorage.setItem("followedCompetetions",JSON.stringify(data))
   
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
    window.location.replace("/#/notFound")
    return{
        type:GET_MATCHES_SCORES_FAILED,
        payload:error
    }
}
export function getCompetMatchesScores(){
    return{
        type:GET_COMPET_MATCHES_SCORES
    }
}
export function getCompetMatchesScoresSuccuessed(data){
    sessionStorage.setItem("currentCompetScores",JSON.stringify(data))
    console.log(data)
    return{
        type:GET_COMPET_MATCHES_SCORES_SUCCESS,
        payload:data
    }
}
export function getCompetMatchesScoresFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_COMPET_MATCHES_SCORES_FAILED,
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
export function getSpecificCompetTeamsSuccuessed(data){
    sessionStorage.setItem("currentCompetTeams",JSON.stringify(data))
   
    return{
        type:GET_SPECIFIC_COMPET_TEAMS_SUCCESS,
        payload:data
    }
}
export function getCompetTeamsFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_COMPET_TEAMS_FAILED,
        payload:error
    }
}
export function getCompetInfo(){
    return{
        type:GET_COMPET_INFO
    }
}
export function getCompetInfoSuccuessed(data){
    sessionStorage.setItem("currentCompetData",JSON.stringify(data))
   
    return{
        type:GET_COMPET_INFO_SUCCESS,
        payload:data
    }
}
export function getCompetInfoFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_COMPET_INFO_FAILED,
        payload:error
    }
}
export function getCompetStanding(){
    return{
        type:GET_COMPET_STANDING
    }
}
export function getCompetStandingSuccuessed(data,competId){
    data.id=competId
    sessionStorage.setItem("currentCompetStanding",JSON.stringify(data))
   
    return{
        type:GET_COMPET_STANDING_SUCCESS,
        payload:data
    }
}
export function getCompetStandingFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_COMPET_STANDING_FAILED,
        payload:error
    }
}
export function getCompetTransfers(){
    return{
        type:GET_COMPET_TRANSFER
    }
}
export function getCompetTransfersSuccuessed(data){
    sessionStorage.setItem("currentCompetTransfers",JSON.stringify(data))
   
    return{
        type:GET_COMPET_TRANSFER_SUCCESS,
        payload:data
    }
}
export function getCompetTransfersFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_COMPET_TRANSFER_FAILED,
        payload:error
    }
}

export function getCompetStatsScoring(){
    return{
        type:GET_COMPET_STATS_SCORING
    }
}
export function getCompetStatsScoringSuccuessed(data,competId){
    data.id=competId
    sessionStorage.setItem("currentCompetStatsScoring",JSON.stringify(data))
   
    return{
        type:GET_COMPET_STATS_SCORING_SUCCESS,
        payload:data
    }
}
export function getCompetStatsScoringFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_COMPET_STATS_SCORING_FAILED,
        payload:error
    }
}

export function getCompetStatsDiscpline(){
    return{
        type:GET_COMPET_STATS_DISCPLINE
    }
}
export function getCompetStatsDiscplineSuccuessed(data,competId){
    data.id=competId
    sessionStorage.setItem("currentCompetStatsDiscpline",JSON.stringify(data))
   
    return{
        type:GET_COMPET_STATS_DISCPLINE_SUCCESS,
        payload:data
    }
}
export function getCompetStatsDiscplineFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_COMPET_STATS_DISCPLINE_FAILED,
        payload:error
    }
}
export function getCompetStatsPerformance(){
    return{
        type:GET_COMPET_STATS_PERFORMANCE
    }
}
export function getCompetStatsPerformanceSuccuessed(data,competId){
    data.id=competId
    sessionStorage.setItem("currentCompetStatsPerformance",JSON.stringify(data))
   
    return{
        type:GET_COMPET_STATS_PERFORMANCE_SUCCESS,
        payload:data
    }
}
export function getCompetStatsPerformanceFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_COMPET_STATS_PERFORMANCE_FAILED,
        payload:error
    }
}


export function GET_COMPET_DATA(competSlug,competId){
    return function(dispatch){
        dispatch(getCompetInfo());     
        axios.get(baseUrl+`api/tourns/_/name/${competSlug}/id/${competId}`)
        .then(re=>{
            dispatch(getCompetInfoSuccuessed(re.data))
        })
        .catch(()=>{
            dispatch(getCompetInfoFailed("Error While Getting The Data"))
            
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
        axios.get(baseUrl+`api/tourns/schedule/_date/${date}/league/any`)
        .then(re=>{
            dispatch(getDateMatchesSuccuessed(re.data))
        })
        .catch(()=>{
            dispatch(getDateMatchesFailed("Error While Getting The Data"))
            
        })
    }
}
export function GET_LEAGUE_DATE_MATCHES_INFO(date){
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
        axios.get(baseUrl+`api/tourns/scoreboard/_date/${date}/league/any`)
        .then(re=>{
            dispatch(getMatchesScoresSuccuessed(re.data))
        })
        .catch(()=>{
            dispatch(getMatchesScoresFailed("Error While Getting The Data"))
            
        })
    }
}
export function GET_COMPET_DATE_SCORES(date,leagueSlug){
    return function(dispatch){
        dispatch(getCompetMatchesScores());     
        axios.get(baseUrl+`api/tourns/scoreboard/_date/${date}/league/${leagueSlug}`)
        .then(re=>{
            dispatch(getCompetMatchesScoresSuccuessed(...re.data))
        })
        .catch(()=>{
            dispatch(getCompetMatchesScoresFailed("Error While Getting The Data"))
            
        })
    }
}
export function GET_COMPETETION_TEAMS(competSlug,page){
    return function(dispatch){
        dispatch(getCompetTeams());     
        axios.get(baseUrl+`api/tourns/getLeagueTeams/${competSlug}`)
        .then(re=>{
            page === "teamsPage" ? dispatch(getCompetTeamsSuccuessed(re.data)) : dispatch(getSpecificCompetTeamsSuccuessed(re.data))
        })
        .catch(()=>{
            dispatch(getCompetTeamsFailed("Error While Getting The Data"))
            
        })
    }
}
export function GET_COMPETETION_STANDING_DATA(competSlug,season="any",competId){
    return function(dispatch){
        dispatch(getCompetStanding());     
        axios.get(baseUrl+`api/tourns/_/name/${competSlug}/standing/season/${season}`)
        .then(re=>{
            dispatch(getCompetStandingSuccuessed(re.data,competId))
        })
        .catch(()=>{
            dispatch(getCompetStandingFailed("Error While Getting The Data"))
            
        })
    }
}
export function GET_COMPET_DATE_MATCHES_INFO(date,competSlug){
    return function(dispatch){
        dispatch(getCompetDateMatches());     
        axios.get(baseUrl+`api/tourns/schedule/_date/${date}/league/${competSlug}`)
        .then(re=>{
            dispatch(getCompetDateMatchesSuccuessed(re.data))
        })
        .catch(()=>{
            dispatch(getCompetDateMatchesFailed("Error While Getting The Data"))
            
        })
    }
}
export function GET_COMPET_STATS_SCORING_INFO(competSlug,season='any',competId){
    return function(dispatch){
        dispatch(getCompetStatsScoring());     
        axios.get(baseUrl+`api/tourns/_/name/${competSlug}/stats/scoring/season/${season}`)
        .then(re=>{
            dispatch(getCompetStatsScoringSuccuessed(re.data,competId))
        })
        .catch(()=>{
            dispatch(getCompetStatsScoringFailed("Error While Getting The Data"))           
        })
    }
}
export function GET_COMPET_STATS_DISCPLINE_INFO(competSlug,season='any',competId){
    return function(dispatch){
        dispatch(getCompetStatsDiscpline());     
        axios.get(baseUrl+`api/tourns/_/name/${competSlug}/stats/discpline/season/${season}`)
        .then(re=>{
            dispatch(getCompetStatsDiscplineSuccuessed(re.data,competId))
        })
        .catch(()=>{
            dispatch(getCompetStatsDiscplineFailed("Error While Getting The Data"))           
        })
    }
}
export function GET_COMPET_STATS_PERFORMANCE_INFO(competSlug,season='any',competId){
    return function(dispatch){
        dispatch(getCompetStatsPerformance());     
        axios.get(baseUrl+`api/tourns/_/name/${competSlug}/stats/performance/season/${season}`)
        .then(re=>{
            dispatch(getCompetStatsPerformanceSuccuessed(re.data,competId))
        })
        .catch(()=>{
            dispatch(getCompetStatsPerformanceFailed("Error While Getting The Data"))           
        })
    }
}