

import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { GET_ALL_TEAMS, GET_ALL_TEAMS_FAILED, GET_ALL_TEAMS_SUCCESS, GET_NATIONAL_TEAM, GET_NATIONAL_TEAM_FAILED, GET_NATIONAL_TEAM_SUCCESS, GET_TEAM_DATA, GET_TEAM_DATA_FAILED, GET_TEAM_DATA_SUCCESS, GET_TEAM_FIXTURE, GET_TEAM_FIXTURE_FAILED, GET_TEAM_FIXTURE_SUCCESS, GET_TEAM_RESULTS, GET_TEAM_RESULTS_FAILED, GET_TEAM_RESULTS_SUCCESS, GET_TEAM_SQUADS, GET_TEAM_SQUADS_FAILED, GET_TEAM_SQUADS_SUCCESS, GET_TEAM_STATS_DISCPLINE, GET_TEAM_STATS_DISCPLINE_FAILED, GET_TEAM_STATS_DISCPLINE_SUCCESS, GET_TEAM_STATS_PERFORMANCE, GET_TEAM_STATS_PERFORMANCE_FAILED, GET_TEAM_STATS_PERFORMANCE_SUCCESS, GET_TEAM_STATS_SCORING, GET_TEAM_STATS_SCORING_FAILED, GET_TEAM_STATS_SCORING_SUCCESS, GET_TEAM_TRANSFERS, GET_TEAM_TRANSFERS_FAILED, GET_TEAM_TRANSFERS_SUCCESS, SET_FAV_NATIONAL_TEAM, SET_FAV_NATIONAL_TEAM_FAILED } from "./teamsActionType";

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
    window.location.replace("/#/notFound")
    return{
        type:GET_ALL_TEAMS_FAILED,
        payload:error
    }
}

export function getTeamData(){
    return{
        type:GET_TEAM_DATA
    }
}
export function getTeamDataSuccuessed(data){
    sessionStorage.setItem("currentTeamData",JSON.stringify(data))
   
    return{
        type:GET_TEAM_DATA_SUCCESS,
        payload:data
    }
}
export function getTeamDataFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_TEAM_DATA_FAILED,
        payload:error
    }
}

export function getTeamFixture(){
    return{
        type:GET_TEAM_FIXTURE
    }
}
export function getTeamFixtureSuccuessed(data){
    sessionStorage.setItem("currentTeamFixture",JSON.stringify(data))
   
    return{
        type:GET_TEAM_FIXTURE_SUCCESS,
        payload:data
    }
}
export function getTeamFixtureFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_TEAM_FIXTURE_FAILED,
        payload:error
    }
}


export function getTeamResults(){
    return{
        type:GET_TEAM_RESULTS
    }
}
export function getTeamResultsSuccuessed(data){
    sessionStorage.setItem("currentTeamResults",JSON.stringify(data))
   
    return{
        type:GET_TEAM_RESULTS_SUCCESS,
        payload:data
    }
}
export function getTeamResultsFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_TEAM_RESULTS_FAILED,
        payload:error
    }
}

export function getTeamSquads(){
    return{
        type:GET_TEAM_SQUADS
    }
}
export function getTeamSquadsSuccuessed(data){
    sessionStorage.setItem("currentTeamSquads",JSON.stringify(data))
   
    return{
        type:GET_TEAM_SQUADS_SUCCESS,
        payload:data
    }
}
export function getTeamSquadsFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_TEAM_SQUADS_FAILED,
        payload:error
    }
}
export function getTeamStatsScoring(){
    return{
        type:GET_TEAM_STATS_SCORING
    }
}
export function getTeamStatsScoringSuccuessed(data){
    sessionStorage.setItem("currentTeamStatsScoring",JSON.stringify(data))
   
    return{
        type:GET_TEAM_STATS_SCORING_SUCCESS,
        payload:data
    }
}
export function getTeamStatsScoringFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_TEAM_STATS_SCORING_FAILED,
        payload:error
    }
}
export function getTeamStatsDiscpline(){
    return{
        type:GET_TEAM_STATS_DISCPLINE
    }
}
export function getTeamStatsDiscplineSuccuessed(data){
    sessionStorage.setItem("currentTeamStatsDiscpline",JSON.stringify(data))
   
    return{
        type:GET_TEAM_STATS_DISCPLINE_SUCCESS,
        payload:data
    }
}
export function getTeamStatsDiscplineFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_TEAM_STATS_DISCPLINE_FAILED,
        payload:error
    }
}
export function getTeamStatsPerformance(){
    return{
        type:GET_TEAM_STATS_PERFORMANCE
    }
}
export function getTeamStatsPerformanceSuccuessed(data){
    sessionStorage.setItem("currentTeamStatsPerformance",JSON.stringify(data))
   
    return{
        type:GET_TEAM_STATS_PERFORMANCE_SUCCESS,
        payload:data
    }
}
export function getTeamStatsPerformanceFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_TEAM_STATS_PERFORMANCE_FAILED,
        payload:error
    }
}
export function getTeamTransfers(){
    return{
        type:GET_TEAM_TRANSFERS
    }
}
export function getTeamTransfersSuccuessed(data){
    sessionStorage.setItem("currentTeamTransfers",JSON.stringify(data))
   
    return{
        type:GET_TEAM_TRANSFERS_SUCCESS,
        payload:data
    }
}
export function getTeamTransfersFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_TEAM_TRANSFERS_FAILED,
        payload:error
    }
}
export function getNationalTeams(){
    return{
        type:GET_NATIONAL_TEAM
    }
}
export function getNationalTeamsSuccuessed(data){
    sessionStorage.setItem("allNationalTeams",JSON.stringify(data))
   
    return{
        type:GET_NATIONAL_TEAM_SUCCESS,
        payload:data
    }
}
export function getNationalTeamsFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_NATIONAL_TEAM_FAILED,
        payload:error
    }
}

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

export function GET_TEAM_INFO(teamId){
    return function(dispatch){
        dispatch(getTeamData());     
        axios.get(baseUrl+`api/teams/team/_/id/${teamId}`)
        .then(re=>{
            dispatch(getTeamDataSuccuessed(re.data))
        })
        .catch((err)=>{
            console.log("eerr 1")
            console.log(err)
            dispatch(getTeamDataFailed("Error While Getting The Data"))          
        })
    }
}
export function GET_TEAM_FIXTURES(teamId,leagueSlug='any'){
    return function(dispatch){
        dispatch(getTeamFixture());     
        axios.get(baseUrl+`api/teams/team/_/id/${teamId}/fixture/league/${leagueSlug}`)
        .then(re=>{
            dispatch(getTeamFixtureSuccuessed(re.data))
        })
        .catch(()=>{
            dispatch(getTeamFixtureFailed("Error While Getting The Data"))
            
        })
    }
}
export function GET_TEAM_RESULTS_DATA(teamId,leagueSlug='any',seasonId='any'){
    return function(dispatch){
        dispatch(getTeamResults());     
        console.log(seasonId)
        axios.get(baseUrl+`api/teams/team/_/id/${teamId}/results/league/${leagueSlug}/season/${seasonId}`)
        .then(re=>{
            dispatch(getTeamResultsSuccuessed(re.data))
        })
        .catch(()=>{
            dispatch(getTeamResultsFailed("Error While Getting The Data"))
            
        })
    }
}
export function GET_TEAM_SQUADS_DATA(teamId,leagueSlug='any',seasonId='any'){
    return function(dispatch){
        dispatch(getTeamSquads());     
        axios.get(baseUrl+`api/teams/team/_/id/${teamId}/squads/league/${leagueSlug}/season/${seasonId}`)
        .then(re=>{
            dispatch(getTeamSquadsSuccuessed(re.data))
        })
        .catch(()=>{
            dispatch(getTeamSquadsFailed("Error While Getting The Data"))         
        })
    }
}
export function GET_TEAM_STATS_SCORING_DATA(teamId,leagueSlug='any',seasonId='any'){
    return function(dispatch){
        dispatch(getTeamStatsScoring());     
        console.log(leagueSlug,seasonId)
        axios.get(baseUrl+`api/teams/team/_/id/${teamId}/stats/scoring/league/${leagueSlug}/season/${seasonId}`)
        .then(re=>{
            dispatch(getTeamStatsScoringSuccuessed(re.data))
        })
        .catch(()=>{
            dispatch(getTeamStatsScoringFailed("Error While Getting The Data"))         
        })
    }
}
export function GET_TEAM_STATS_DISCPLINE_DATA(teamId,leagueSlug='any',seasonId='any'){
    return function(dispatch){
        console.log(leagueSlug,seasonId)
        dispatch(getTeamStatsDiscpline());     
        axios.get(baseUrl+`api/teams/team/_/id/${teamId}/stats/discpline/league/${leagueSlug}/season/${seasonId}`)
        .then(re=>{
            dispatch(getTeamStatsDiscplineSuccuessed(re.data))
        })
        .catch(()=>{
            dispatch(getTeamStatsDiscplineFailed("Error While Getting The Data"))         
        })
    }
}
export function GET_TEAM_STATS_PERFORMANCE_DATA(teamId,leagueSlug='any',seasonId='any'){
    return function(dispatch){
        dispatch(getTeamStatsPerformance());     
        axios.get(baseUrl+`api/teams/team/_/id/${teamId}/stats/performance/league/${leagueSlug}/season/${seasonId}`)
        .then(re=>{
            dispatch(getTeamStatsPerformanceSuccuessed(re.data))
        })
        .catch(()=>{
            dispatch(getTeamStatsPerformanceFailed("Error While Getting The Data"))         
        })
    }
}
export function GET_TEAM_TRANSFER_DATA(teamId,seasonId='any'){
    return function(dispatch){
        dispatch(getTeamTransfers());     
        axios.get(baseUrl+`api/teams/team/_/id/${teamId}/transfers/season/${seasonId}`)
        .then(re=>{
            dispatch(getTeamTransfersSuccuessed(re.data))
        })
        .catch(()=>{
            dispatch(getTeamTransfersFailed("Error While Getting The Data"))         
        })
    }
}
export function GET_NATIONAL_TEAMS_DATA(){
    return function(dispatch){
        dispatch(getNationalTeams());     
        axios.get(baseUrl+`api/teams/getNationalTeams`)
        .then(re=>{
            dispatch(getNationalTeamsSuccuessed(re.data))
        })
        .catch((err)=>{
            console.log(err)
            dispatch(getNationalTeamsFailed("Error While Getting The Data"))         
        })
    }
}