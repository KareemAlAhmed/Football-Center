import { current } from "@reduxjs/toolkit";
import { GET_NATIONAL_TEAM, GET_NATIONAL_TEAM_FAILED, GET_NATIONAL_TEAM_SUCCESS, GET_TEAM_DATA, GET_TEAM_DATA_FAILED, GET_TEAM_DATA_SUCCESS, GET_TEAM_FIXTURE, GET_TEAM_FIXTURE_FAILED, GET_TEAM_FIXTURE_SUCCESS, GET_TEAM_RESULTS, GET_TEAM_RESULTS_FAILED, GET_TEAM_RESULTS_SUCCESS, GET_TEAM_SQUADS, GET_TEAM_SQUADS_FAILED, GET_TEAM_SQUADS_SUCCESS, GET_TEAM_STATS_DISCPLINE, GET_TEAM_STATS_DISCPLINE_FAILED, GET_TEAM_STATS_DISCPLINE_SUCCESS, GET_TEAM_STATS_PERFORMANCE, GET_TEAM_STATS_PERFORMANCE_FAILED, GET_TEAM_STATS_PERFORMANCE_SUCCESS, GET_TEAM_STATS_SCORING, GET_TEAM_STATS_SCORING_FAILED, GET_TEAM_STATS_SCORING_SUCCESS, GET_TEAM_TRANSFERS, GET_TEAM_TRANSFERS_FAILED, GET_TEAM_TRANSFERS_SUCCESS } from "./teamsActionType";


const initalState={
    loading:false,
    allTeams:sessionStorage.getItem("allTeams") !=null ? JSON.parse(sessionStorage.getItem("allTeams")) :[],
    currentTeamData:sessionStorage.getItem("currentTeamData") !=null ? JSON.parse(sessionStorage.getItem("currentTeamData")) :{},
    currentTeamFixture:sessionStorage.getItem("currentTeamFixture") !=null ? JSON.parse(sessionStorage.getItem("currentTeamFixture")) :{},
    currentTeamResults:sessionStorage.getItem("currentTeamResults") !=null ? JSON.parse(sessionStorage.getItem("currentTeamResults")) :{},
    currentTeamSquads:sessionStorage.getItem("currentTeamSquads") !=null ? JSON.parse(sessionStorage.getItem("currentTeamSquads")) :{},
    currentTeamStatsScoring:sessionStorage.getItem("currentTeamStatsScoring") !=null ? JSON.parse(sessionStorage.getItem("currentTeamStatsScoring")) :{},
    currentTeamStatsDiscpline:sessionStorage.getItem("currentTeamStatsDiscpline") !=null ? JSON.parse(sessionStorage.getItem("currentTeamStatsDiscpline")) :{},
    currentTeamStatsPerformance:sessionStorage.getItem("currentTeamStatsPerformance") !=null ? JSON.parse(sessionStorage.getItem("currentTeamStatsPerformance")) :{},
    currentTeamTransfers:sessionStorage.getItem("currentTeamTransfers") !=null ? JSON.parse(sessionStorage.getItem("currentTeamTransfers")) :{},
    allNationalTeams:sessionStorage.getItem("allNationalTeams") !=null ? JSON.parse(sessionStorage.getItem("allNationalTeams")) :[],
    currentError:"",

   
}

const teamsReducer=(state=initalState,action)=>{
    switch(action.type){
             

        case GET_TEAM_DATA:
            return {
                ...state,
                loading:true,
                currentUserError:""
            }
        case GET_TEAM_DATA_SUCCESS:
            return {
                ...state,
                loading:false,
                currentTeamData:action.payload
            }
        case GET_TEAM_DATA_FAILED:
            return {
                ...state,
                loading:false,
                currentTeamData:{},
                currentError:action.payload,

            }
        case GET_TEAM_FIXTURE:
            return {
                ...state,
                loading:true,
                currentUserError:""
            }
        case GET_TEAM_FIXTURE_SUCCESS:
            return {
                ...state,
                loading:false,
                currentTeamFixture:action.payload
            }
        case GET_TEAM_FIXTURE_FAILED:
            return {
                ...state,
                loading:false,
                currentTeamFixture:{},
                currentError:action.payload,
            }
        case GET_TEAM_RESULTS:
            return {
                ...state,
                loading:true,
                currentUserError:""
            }
        case GET_TEAM_RESULTS_SUCCESS:
            return {
                ...state,
                loading:false,
                currentTeamResults:action.payload
            }
        case GET_TEAM_RESULTS_FAILED:
            return {
                ...state,
                loading:false,
                currentTeamResults:{},
                currentError:action.payload,
            }
        case GET_TEAM_SQUADS:
            return {
                ...state,
                loading:true,
                currentUserError:""
            }
        case GET_TEAM_SQUADS_SUCCESS:
            return {
                ...state,
                loading:false,
                currentTeamSquads:action.payload
            }
        case GET_TEAM_SQUADS_FAILED:
            return {
                ...state,
                loading:false,
                currentTeamSquads:{},
                currentError:action.payload,
            }
        case GET_TEAM_STATS_SCORING:
            return {
                ...state,
                loading:true,
                currentUserError:""
            }
        case GET_TEAM_STATS_SCORING_SUCCESS:
            return {
                ...state,
                loading:false,
                currentTeamStatsScoring:action.payload
            }
        case GET_TEAM_STATS_SCORING_FAILED:
            return {
                ...state,
                loading:false,
                currentTeamStatsScoring:{},
                currentError:action.payload,
            }
        case GET_TEAM_STATS_DISCPLINE:
            return {
                ...state,
                loading:true,
                currentUserError:""
            }
        case GET_TEAM_STATS_DISCPLINE_SUCCESS:
            return {
                ...state,
                loading:false,
                currentTeamStatsDiscpline:action.payload
            }
        case GET_TEAM_STATS_DISCPLINE_FAILED:
            return {
                ...state,
                loading:false,
                currentTeamStatsDiscpline:{},
                currentError:action.payload,
            }
        case GET_TEAM_STATS_PERFORMANCE:
            return {
                ...state,
                loading:true,
                currentUserError:""
            }
        case GET_TEAM_STATS_PERFORMANCE_SUCCESS:
            return {
                ...state,
                loading:false,
                currentTeamStatsPerformance:action.payload
            }
        case GET_TEAM_STATS_PERFORMANCE_FAILED:
            return {
                ...state,
                loading:false,
                currentTeamStatsPerformance:{},
                currentError:action.payload,
            }
        case GET_TEAM_TRANSFERS:
            return {
                ...state,
                loading:true,
                currentUserError:""
            }
        case GET_TEAM_TRANSFERS_SUCCESS:
            return {
                ...state,
                loading:false,
                currentTeamTransfers:action.payload
            }
        case GET_TEAM_TRANSFERS_FAILED:
            return {
                ...state,
                loading:false,
                currentTeamTransfers:{},
                currentError:action.payload,
            }
        case GET_NATIONAL_TEAM:
            return {
                ...state,
                loading:true,
                currentUserError:""
            }
        case GET_NATIONAL_TEAM_SUCCESS:
            return {
                ...state,
                loading:false,
                allNationalTeams:action.payload
            }
        case GET_NATIONAL_TEAM_FAILED:
            return {
                ...state,
                loading:false,
                allNationalTeams:[],
                currentError:action.payload,
            }
        
        default: return state
    }
}

export default teamsReducer;