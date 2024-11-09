

import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { GET_MATCH_COMMENTARY, GET_MATCH_COMMENTARY_FAILED, GET_MATCH_COMMENTARY_SUCCESS, GET_MATCH_LINEUP, GET_MATCH_LINEUP_FAILED, GET_MATCH_LINEUP_SUCCESS, GET_MATCH_PREVIEW, GET_MATCH_PREVIEW_FAILED, GET_MATCH_PREVIEW_SUCCESS, GET_MATCH_REPORT, GET_MATCH_REPORT_FAILED, GET_MATCH_REPORT_SUCCESS, GET_MATCH_STATS, GET_MATCH_STATS_FAILED, GET_MATCH_STATS_SUCCESS, GET_MATCH_TEST, GET_MATCH_TEST_FAILED, GET_MATCH_TEST_SUCCESS, GET_PRE_MATCH_SUMMARY, GET_PRE_MATCH_SUMMARY_FAILED, GET_PRE_MATCH_SUMMARY_SUCCESS } from "./matchesActionType";

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
    window.location.replace("/#/notFound")
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
    window.location.replace("/#/notFound")
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
    window.location.replace("/#/notFound")
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
    window.location.replace("/#/notFound")
    return{
        type:GET_MATCH_LINEUP_FAILED,
        payload:error
    }
}
export function getMatchReport(){
    return{
        type:GET_MATCH_REPORT
    }
}
export function getMatchReportSuccuessed(data){
    sessionStorage.setItem("currentMatchReport",JSON.stringify(data))
   
    return{
        type:GET_MATCH_REPORT_SUCCESS,
        payload:data
    }
}
export function getMatchReportFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_MATCH_REPORT_FAILED,
        payload:error
    }
}
export function getMatchCommentary(){
    return{
        type:GET_MATCH_COMMENTARY
    }
}
export function getMatchCommentarySuccuessed(data){
    sessionStorage.setItem("currentMatchCommentary",JSON.stringify(data))
   
    return{
        type:GET_MATCH_COMMENTARY_SUCCESS,
        payload:data
    }
}
export function getMatchCommentaryFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_MATCH_COMMENTARY_FAILED,
        payload:error
    }
}
export function getMatchTest(){
    return{
        type:GET_MATCH_TEST
    }
}
export function getMatchTestSuccuessed(data){
    sessionStorage.setItem("currentMatchSummary",JSON.stringify(data))
   
    return{
        type:GET_MATCH_TEST_SUCCESS,
        payload:data
    }
}
export function getMatchTestFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_MATCH_TEST_FAILED,
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

            dispatch(getMatchPreviewFailed("Error While Getting The Data"))          
        })
    }
}
export function GET_MATCH_LINEUP_DATA(matchId,matchSlug,type=null){
    return function(dispatch){
        dispatch(getMatchLineUp());     
        axios.get(baseUrl+`api/match/_/gameId/${matchId}/${matchSlug}/LineUp`, {
            params: {
                type: type,
            }
        })
        .then(re=>{
           dispatch(getMatchLineUpSuccuessed(re.data))
        })
        .catch((err)=>{

            dispatch(getMatchLineUpFailed("Error While Getting The Data"))          
        })
    }
}
export function GET_MATCH_REPORT_DATA(matchId,matchSlug){
    return function(dispatch){
        dispatch(getMatchReport());     
        axios.get(baseUrl+`api/match/_/gameId/${matchId}/${matchSlug}/Report`)
        .then(re=>{
           dispatch(getMatchReportSuccuessed(re.data))
        })
        .catch((err)=>{

            dispatch(getMatchReportFailed("Error While Getting The Data"))          
        })
    }
}
export function GET_MATCH_COMMENTARY_DATA(matchId,matchSlug){
    return function(dispatch){
        dispatch(getMatchCommentary());     
        axios.get(baseUrl+`api/match/_/gameId/${matchId}/${matchSlug}/Commentary`)
        .then(re=>{
           dispatch(getMatchCommentarySuccuessed(re.data))
        })
        .catch((err)=>{

            dispatch(getMatchCommentaryFailed("Error While Getting The Data"))          
        })
    }
}
export function GET_MATCH_TEST_DATA(matchId,matchSlug){
    return function(dispatch){
        dispatch(getMatchTest());     
        axios.get(baseUrl+`api/match/_/gameId/${matchId}/${matchSlug}/testSumm`)
        .then(re=>{
           dispatch(getMatchTestSuccuessed(re.data))
        })
        .catch((err)=>{

            dispatch(getMatchTestFailed("Error While Getting The Data"))          
        })
    }
}