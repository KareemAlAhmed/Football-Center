

import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { GET_ALL_PLAYERS, GET_ALL_PLAYERS_FAILED, GET_ALL_PLAYERS_SUCCESS, GET_PLAYER_BIO, GET_PLAYER_BIO_FAILED, GET_PLAYER_BIO_SUCCESS, GET_PLAYER_CURRENT_TEAMS_STATS_FILTERED, GET_PLAYER_CURRENT_TEAMS_STATS_FILTERED_FAILED, GET_PLAYER_CURRENT_TEAMS_STATS_FILTERED_SUCCESS, GET_PLAYER_MATCHES, GET_PLAYER_MATCHES_FAILED, GET_PLAYER_MATCHES_FILTERED, GET_PLAYER_MATCHES_FILTERED_FAILED, GET_PLAYER_MATCHES_FILTERED_SUCCESS, GET_PLAYER_MATCHES_SUCCESS, GET_PLAYER_OVERVIEW_INFO, GET_PLAYER_OVERVIEW_INFO_FAILED, GET_PLAYER_OVERVIEW_INFO_SUCCESS, GET_PLAYER_STATS, GET_PLAYER_STATS_FAILED, GET_PLAYER_STATS_FILTERED, GET_PLAYER_STATS_FILTERED_FAILED, GET_PLAYER_STATS_FILTERED_SUCCESS, GET_PLAYER_STATS_SUCCESS, GET_TEAM_PLAYERS, GET_TEAM_PLAYERS_FAILED, GET_TEAM_PLAYERS_SUCCESS } from "./playersActionType";

export function getPlayerOveriewInfo(){
    return{
        type:GET_PLAYER_OVERVIEW_INFO
    }
}
export function getPlayerOveriewInfoSuccuessed(data){
    sessionStorage.setItem("currentPlayerInfo",JSON.stringify(data))

   
    return{
        type:GET_PLAYER_OVERVIEW_INFO_SUCCESS,
        payload:data
    }
}
export function getPlayerOveriewInfoFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_PLAYER_OVERVIEW_INFO_FAILED,
        payload:error
    }
}
export function getPlayerCurrentTeamsStats(){
    return{
        type:GET_PLAYER_CURRENT_TEAMS_STATS_FILTERED
    }
}
export function getPlayerCurrentTeamsStatsSuccuessed(data,competSlug,teamId){
    return{
        type:GET_PLAYER_CURRENT_TEAMS_STATS_FILTERED_SUCCESS,
        payload:data,
        competSlug:competSlug,
        teamId:teamId
    }
}
export function getPlayerCurrentTeamsStatsFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_PLAYER_CURRENT_TEAMS_STATS_FILTERED_FAILED,
        payload:error
    }
}

export function getTeamPlayers(){
    return{
        type:GET_TEAM_PLAYERS
    }
}
export function getTeamPlayersSuccuessed(data){
  
    return{
        type:GET_TEAM_PLAYERS_SUCCESS,
        payload:data
    }
}
export function getTeamPlayersFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_TEAM_PLAYERS_FAILED,
        payload:error
    }
}
export function getPlayerBio(){
    return{
        type:GET_PLAYER_BIO
    }
}
export function getPlayerBioSuccuessed(data){
    sessionStorage.setItem("currentPlayerBio",JSON.stringify(data))
    
    return{
        type:GET_PLAYER_BIO_SUCCESS,
        payload:data
    }
}
export function getPlayerBioFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_PLAYER_BIO_FAILED,
        payload:error
    }
}
export function getPlayerMatches(){
    return{
        type:GET_PLAYER_MATCHES
    }
}
export function getPlayerMatchesSuccuessed(data,teamId,competSlug,year){
    sessionStorage.setItem("currentPlayerMatches",JSON.stringify(data))
    
    return{
        type:GET_PLAYER_MATCHES_SUCCESS,
        payload:data,
        teamId:teamId,
        competSlug:competSlug,
        year:year
    }
}
export function getPlayerMatchesFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_PLAYER_MATCHES_FAILED,
        payload:error
    }
}
export function getPlayerStats(){
    return{
        type:GET_PLAYER_STATS
    }
}
export function getPlayerStatsSuccuessed(data,teamId,competSlug){
    sessionStorage.setItem("currentPlayerStats",JSON.stringify(data))

    return{
        type:GET_PLAYER_STATS_SUCCESS,
        payload:data,
        teamId:teamId,
        competSlug:competSlug
    }
}
export function getPlayerStatsFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_PLAYER_STATS_FAILED,
        payload:error
    }
}
export function getPlayerStatsFiltered(){
    return{
        type:GET_PLAYER_STATS_FILTERED
    }
}
export function getPlayerStatsFilteredSuccuessed(data,teamId,competSlug){

    return{
        type:GET_PLAYER_STATS_FILTERED_SUCCESS,
        payload:data,
        teamId:teamId,
        competSlug:competSlug
    }
}
export function getPlayerStatsFilteredFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_PLAYER_STATS_FILTERED_FAILED,
        payload:error
    }
}
export function getPlayerFilteredMatches(){
    return{
        type:GET_PLAYER_MATCHES_FILTERED
    }
}
export function getPlayerFilteredMatchesSuccuessed(data,teamId,competSlug,year){

    return{
        type:GET_PLAYER_MATCHES_FILTERED_SUCCESS,
        payload:data,
        teamId:teamId,
        competSlug:competSlug,
        year:year
    }
}
export function getPlayerFilteredMatchesFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_PLAYER_MATCHES_FILTERED_FAILED,
        payload:error
    }
}
export function getAllPlayers(){
    return{
        type:GET_ALL_PLAYERS
    }
}
export function getAllPlayersSuccuessed(data){
    sessionStorage.setItem("allPlayers",JSON.stringify(data))
    return{
        type:GET_ALL_PLAYERS_SUCCESS,
        payload:data
    }
}
export function getAllPlayersFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_ALL_PLAYERS_FAILED,
        payload:error
    }
}
export function GET_PLAYER_INFO(playerId,playerSlug){
    return function(dispatch){
        dispatch(getPlayerOveriewInfo());     
        axios.get(baseUrl+`api/player/_/id/${playerId}/${playerSlug}`)
        .then(re=>{
            dispatch(getPlayerOveriewInfoSuccuessed(re.data))
        })
        .catch((err)=>{
            dispatch(getPlayerOveriewInfoFailed("Error While Getting The Data"))          
        })
    }
}
export function GET_TEAM_PLAYERS_DATA(teamId){
    return function(dispatch){
        dispatch(getTeamPlayers());     
        axios.get(baseUrl+`api/player/team/_/id/${teamId}/players`)
        .then(re=>{
            dispatch(getTeamPlayersSuccuessed(re.data))
        })
        .catch((err)=>{
            dispatch(getTeamPlayersFailed("Error While Getting The Data"))          
        })
    }
}
export function GET_PLAYER_BIO_DATA(playerId){
    return function(dispatch){
        dispatch(getPlayerBio());     
        axios.get(baseUrl+`api/player/bio/_/id/${playerId}`)
        .then(re=>{
            dispatch(getPlayerBioSuccuessed(re.data))
        })
        .catch((err)=>{
            dispatch(getPlayerBioFailed("Error While Getting The Data"))          
        })
    }
}
export function GET_PLAYER_MATCHES_DATA(playerId,teamId="any",competSlug="any",year="any"){
    return function(dispatch){
        dispatch(getPlayerMatches());     
        axios.get(baseUrl+`api/player/matches/_/id/${playerId}/team/${teamId}/type/${competSlug}/year/${year}`)
        .then(re=>{
            dispatch(getPlayerMatchesSuccuessed(re.data,teamId,competSlug,year))
        })
        .catch((err)=>{
            dispatch(getPlayerMatchesFailed("Error While Getting The Data"))          
        })
    }
}
export function GET_PLAYER_FILTERED_MATCHES_DATA(playerId,teamId="any",competSlug="any",year="any"){
    return function(dispatch){
        dispatch(getPlayerFilteredMatches());     
        axios.get(baseUrl+`api/player/matches/_/id/${playerId}/team/${teamId}/type/${competSlug}/year/${year}/filtered`)
        .then(re=>{
            dispatch(getPlayerFilteredMatchesSuccuessed(re.data,teamId,competSlug,year))
        })
        .catch((err)=>{
            dispatch(getPlayerFilteredMatchesFailed("Error While Getting The Data"))          
        })
    }
}
export function GET_PLAYER_STATS_DATA(playerId,teamId="any",competSlug="any"){
    return function(dispatch){
        dispatch(getPlayerStats());     
        axios.get(baseUrl+`api/player/stats/_/id/${playerId}/team/${teamId}/type/${competSlug}`)
        .then(re=>{
            dispatch(getPlayerStatsSuccuessed(re.data,teamId,competSlug))
        })
        .catch((err)=>{
            dispatch(getPlayerStatsFailed("Error While Getting The Data"))          
        })
    }
}
export function GET_PLAYER_STATS_FILTERED_DATA(playerId,teamId="any",competSlug="any"){
    return function(dispatch){
        dispatch(getPlayerStatsFiltered());     
        axios.get(baseUrl+`api/player/stats/_/id/${playerId}/team/${teamId}/type/${competSlug}/filtered`)
        .then(re=>{
            dispatch(getPlayerStatsFilteredSuccuessed(re.data,teamId,competSlug))
        })
        .catch((err)=>{
            dispatch(getPlayerStatsFilteredFailed("Error While Getting The Data"))          
        })
    }
}
export function GET_PLAYER_CURRENT_TEAMS_STATS_INFO(playerId,teamId="any",competSlug="any",type="none"){
    return function(dispatch){
        dispatch(getPlayerCurrentTeamsStats());     
        axios.get(baseUrl+`api/player/_/id/${playerId}/currentTeamsStats/team/${teamId}/compet/${competSlug}/type/${type}`)
        .then(re=>{
            dispatch(getPlayerCurrentTeamsStatsSuccuessed(re.data,re.data.competSlug,re.data.teamId))
        })
        .catch((err)=>{
            dispatch(getPlayerCurrentTeamsStatsFailed("Error While Getting The Data"))          
        })
    }
}
export function GET_ALL_PLAYERS_DATA(){
    return function(dispatch){
        dispatch(getAllPlayers());     
        axios.get(baseUrl+`api/player/getAllPlayers`)
        .then(re=>{
            dispatch(getAllPlayersSuccuessed(re.data))
        })
        .catch((err)=>{
            dispatch(getAllPlayersFailed("Error While Getting The Data"))          
        })
    }
}