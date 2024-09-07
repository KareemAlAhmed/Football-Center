import { current } from "@reduxjs/toolkit";
import { GET_TEAM_DATA, GET_TEAM_DATA_FAILED, GET_TEAM_DATA_SUCCESS, GET_TEAM_FIXTURE, GET_TEAM_FIXTURE_FAILED, GET_TEAM_FIXTURE_SUCCESS, GET_TEAM_RESULTS, GET_TEAM_RESULTS_FAILED, GET_TEAM_RESULTS_SUCCESS, GET_TEAM_SQUADS, GET_TEAM_SQUADS_FAILED, GET_TEAM_SQUADS_SUCCESS } from "./teamsActionType";


const initalState={
    loading:false,
    currentTeamData:sessionStorage.getItem("currentTeamData") !=null ? JSON.parse(sessionStorage.getItem("currentTeamData")) :{},
    currentTeamFixture:sessionStorage.getItem("currentTeamFixture") !=null ? JSON.parse(sessionStorage.getItem("currentTeamFixture")) :{},
    currentTeamResults:sessionStorage.getItem("currentTeamResults") !=null ? JSON.parse(sessionStorage.getItem("currentTeamResults")) :{},
    currentTeamSquads:sessionStorage.getItem("currentTeamSquads") !=null ? JSON.parse(sessionStorage.getItem("currentTeamSquads")) :{},
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
        
        default: return state
    }
}

export default teamsReducer;