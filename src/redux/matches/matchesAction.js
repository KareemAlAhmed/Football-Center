

import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { GET_MATCH_LINEUP, GET_MATCH_LINEUP_FAILED, GET_MATCH_LINEUP_SUCCESS, GET_MATCH_PREVIEW, GET_MATCH_PREVIEW_FAILED, GET_MATCH_PREVIEW_SUCCESS, GET_MATCH_STATS, GET_MATCH_STATS_FAILED, GET_MATCH_STATS_SUCCESS, GET_PRE_MATCH_SUMMARY, GET_PRE_MATCH_SUMMARY_FAILED, GET_PRE_MATCH_SUMMARY_SUCCESS } from "./matchesActionType";

export function getPreMatchSummary(){
    return{
        type:GET_PRE_MATCH_SUMMARY
    }
}
export function getPreMatchSummarySuccuessed(data){
    sessionStorage.setItem("currentMatchSummary",JSON.stringify(data))
   
    return{
        type:GET_PRE_MATCH_SUMMARY_SUCCESS,
        payload:data
    }
}
export function getPreMatchSummaryFailed(error){
    return{
        type:GET_PRE_MATCH_SUMMARY_FAILED,
        payload:error
    }
}
export function getMatchStats(){
    return{
        type:GET_MATCH_STATS
    }
}
export function getMatchStatsSuccuessed(data){
    sessionStorage.setItem("currentMatchStats",JSON.stringify(data))
   
    return{
        type:GET_MATCH_STATS_SUCCESS,
        payload:data
    }
}
export function getMatchStatsFailed(error){
    return{
        type:GET_MATCH_STATS_FAILED,
        payload:error
    }
}
export function getMatchPreview(){
    return{
        type:GET_MATCH_PREVIEW
    }
}
export function getMatchPreviewSuccuessed(data){
    sessionStorage.setItem("currentMatchPreview",JSON.stringify(data))
   
    return{
        type:GET_MATCH_PREVIEW_SUCCESS,
        payload:data
    }
}
export function getMatchPreviewFailed(error){
    return{
        type:GET_MATCH_PREVIEW_FAILED,
        payload:error
    }
}
export function getMatchLineUp(){
    return{
        type:GET_MATCH_LINEUP
    }
}
export function getMatchLineUpSuccuessed(data){
    sessionStorage.setItem("currentMatchLineUp",JSON.stringify(data))
   
    return{
        type:GET_MATCH_LINEUP_SUCCESS,
        payload:data
    }
}
export function getMatchLineUpFailed(error){
    return{
        type:GET_MATCH_LINEUP_FAILED,
        payload:error
    }
}
export function GET_PRE_MATCH_SUMMARY_DATA(matchId,matchSlug){
    return function(dispatch){
        dispatch(getPreMatchSummary());     
        axios.get(baseUrl+`api/match/_/gameId/${matchId}/${matchSlug}`)
        .then(re=>{
           dispatch(getPreMatchSummarySuccuessed(re.data))
        })
        .catch((err)=>{
            console.log(err)
            dispatch(getPreMatchSummaryFailed("Error While Getting The Data"))          
        })
    }
}
export function GET_MATCH_STATS_DATA(matchId,matchSlug){
    return function(dispatch){
        dispatch(getMatchStats());     
        axios.get(baseUrl+`api/match/_/gameId/${matchId}/${matchSlug}/MatchStats`)
        .then(re=>{
           dispatch(getMatchStatsSuccuessed(re.data))
        })
        .catch((err)=>{
            console.log(err)
            dispatch(getMatchStatsFailed("Error While Getting The Data"))          
        })
    }
}
export function GET_MATCH_PREVIEW_DATA(matchId,matchSlug){
    return function(dispatch){
        dispatch(getMatchPreview());     
        axios.get(baseUrl+`api/match/_/gameId/${matchId}/${matchSlug}/preview`)
        .then(re=>{
           dispatch(getMatchPreviewSuccuessed(re.data))
        })
        .catch((err)=>{
            console.log(err)
            dispatch(getMatchPreviewFailed("Error While Getting The Data"))          
        })
    }
}
export function GET_MATCH_LINEUP_DATA(matchId,matchSlug){
    return function(dispatch){
        dispatch(getMatchLineUp());     
        axios.get(baseUrl+`api/match/_/gameId/${matchId}/${matchSlug}/LineUp`)
        .then(re=>{
           dispatch(getMatchLineUpSuccuessed(re.data))
        })
        .catch((err)=>{
            console.log(err)
            dispatch(getMatchLineUpFailed("Error While Getting The Data"))          
        })
    }
}