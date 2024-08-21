import { current } from "@reduxjs/toolkit";
import { GET_ALL_TEAMS, GET_ALL_TEAMS_FAILED, GET_ALL_TEAMS_SUCCESS, GET_ALL_TOURNS, GET_ALL_TOURNS_BY_CAT, GET_ALL_TOURNS_BY_CAT_FAILED, GET_ALL_TOURNS_BY_CAT_SUCCESS, GET_ALL_TOURNS_FAILED, GET_ALL_TOURNS_SUCCESS, GET_DATE_MATCHES, GET_DATE_MATCHES_FAILED, GET_DATE_MATCHES_SUCCESS, GET_FAV_COMPET_TEAMS_SUCCESS, SET_FAV_COUNTRY, SET_FAV_COUNTRY_FAILED, SET_FAV_COUNTRY_SUCCESS } from "./tournsActionType";


const initalState={
    loading:false,
    allTourns:sessionStorage.getItem("allTourns") !=null ? JSON.parse(sessionStorage.getItem("allTourns")) :[],
    allTeams:sessionStorage.getItem("allTeams") !=null ? JSON.parse(sessionStorage.getItem("allTeams")) :[],
    currentFavCompetetion:sessionStorage.getItem("favCompetetions") !=null ? JSON.parse(sessionStorage.getItem("favCompetetions")) :[],
    currentError:"",
    allCompetetionByCat:sessionStorage.getItem("allCompetetionByCat") !=null ? JSON.parse(sessionStorage.getItem("allCompetetionByCat")) :[],
    selectedDateMatches:sessionStorage.getItem("selectedDateMatches") !=null ? JSON.parse(sessionStorage.getItem("selectedDateMatches")) :[],

   
}

const tournsReducer=(state=initalState,action)=>{
    switch(action.type){
       
        case GET_ALL_TOURNS:
            return {
                ...state,
                loading:true,
                currentUserError:""
            }
        case GET_ALL_TOURNS_SUCCESS:
            return {
                ...state,
                loading:false,
                allTourns:action.payload
            }
        case GET_ALL_TOURNS_FAILED:
            return {
                ...state,
                loading:false,
                allTourns:[],
                currentError:action.payload,

            }

        case GET_ALL_TEAMS:
            return {
                ...state,
                loading:true,
                currentUserError:""
            }
        case GET_ALL_TEAMS_SUCCESS:
            return {
                ...state,
                loading:false,
                allTeams:action.payload.teams
            }
        case GET_ALL_TEAMS_FAILED:
            return {
                ...state,
                loading:false,
                allTeams:[],
                currentError:action.payload,

            }
        case SET_FAV_COUNTRY:
            return {
                ...state,
                loading:true,
                currentUserError:""
            }
        case SET_FAV_COUNTRY_SUCCESS:
            return {
                ...state,
                loading:true,
                currentFavCountry:action.payload
            }
        case SET_FAV_COUNTRY_FAILED:
            return {
                ...state,
                loading:true,
                currentFavCountry:{},
                currentError:action.payload,

            }

        case GET_ALL_TOURNS_BY_CAT:
            return {
                ...state,
                loading:true,
                currentUserError:""
            }
        case GET_ALL_TOURNS_BY_CAT_SUCCESS:
            return {
                ...state,
                loading:false,
                allCompetetionByCat:action.payload.teams
            }
        case GET_ALL_TOURNS_BY_CAT_FAILED:
            return {
                ...state,
                loading:false,
                allCompetetionByCat:[],
                currentError:action.payload,

            }
        case GET_FAV_COMPET_TEAMS_SUCCESS:
            return{
                ...state,
                currentFavCompetetion:action.payload.league
            }
        
        case GET_DATE_MATCHES:
            return {
                ...state,
                loading:true,
                currentUserError:""
            }
        case GET_DATE_MATCHES_SUCCESS:
            return {
                ...state,
                loading:false,
                selectedDateMatches:action.payload
            }
        case GET_DATE_MATCHES_FAILED:
            return {
                ...state,
                loading:false,
                selectedDateMatches:[],
                currentError:action.payload,

            }

        default: return state
    }
}

export default tournsReducer;