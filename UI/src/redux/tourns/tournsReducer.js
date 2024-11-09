import { current } from "@reduxjs/toolkit";
import { GET_ALL_COMPET, GET_ALL_COMPET_FAILED, GET_ALL_COMPET_SUCCESS, GET_ALL_TOURNS_BY_CAT, GET_ALL_TOURNS_BY_CAT_FAILED, GET_ALL_TOURNS_BY_CAT_SUCCESS, GET_COMPET_DATE_MATCHES, GET_COMPET_DATE_MATCHES_FAILED, GET_COMPET_DATE_MATCHES_SUCCESS, GET_COMPET_INFO, GET_COMPET_INFO_FAILED, GET_COMPET_INFO_SUCCESS, GET_COMPET_MATCHES_SCORES, GET_COMPET_MATCHES_SCORES_FAILED, GET_COMPET_MATCHES_SCORES_SUCCESS, GET_COMPET_STANDING, GET_COMPET_STANDING_FAILED, GET_COMPET_STANDING_SUCCESS, GET_COMPET_STATS_DISCPLINE, GET_COMPET_STATS_DISCPLINE_FAILED, GET_COMPET_STATS_DISCPLINE_SUCCESS, GET_COMPET_STATS_PERFORMANCE, GET_COMPET_STATS_PERFORMANCE_FAILED, GET_COMPET_STATS_PERFORMANCE_SUCCESS, GET_COMPET_STATS_SCORING, GET_COMPET_STATS_SCORING_FAILED, GET_COMPET_STATS_SCORING_SUCCESS, GET_COMPET_TEAMS, GET_COMPET_TEAMS_FAILED, GET_COMPET_TEAMS_SUCCESS, GET_COMPET_TRANSFER, GET_COMPET_TRANSFER_FAILED, GET_COMPET_TRANSFER_SUCCESS, GET_DATE_MATCHES, GET_DATE_MATCHES_FAILED, GET_DATE_MATCHES_SUCCESS, GET_FAV_COMPET_TEAMS_SUCCESS, GET_MATCHES_SCORES, GET_MATCHES_SCORES_FAILED, GET_MATCHES_SCORES_SUCCESS, GET_SPECIFIC_COMPET_TEAMS_SUCCESS, SET_FAV_COUNTRY, SET_FAV_COUNTRY_FAILED, SET_FAV_COUNTRY_SUCCESS } from "./tournsActionType";


const initalState={
    loading:false,
    allTourns:sessionStorage.getItem("allTourns") !=null ? JSON.parse(sessionStorage.getItem("allTourns")) :[],
    currentFavCompetetion:sessionStorage.getItem("followedCompetetions") !=null ? JSON.parse(sessionStorage.getItem("followedCompetetions")) :[],
    currentError:"",
    allCompetetionByCat:(sessionStorage.getItem("allCompetetionByCat") !=null || sessionStorage.getItem("allCompetetionByCat") !=null ) ? JSON.parse(sessionStorage.getItem("allCompetetionByCat")) :[],
    selectedDateMatches:sessionStorage.getItem("selectedDateMatches") !=null ? JSON.parse(sessionStorage.getItem("selectedDateMatches")) :[],
    selectedDateScores:sessionStorage.getItem("selectedDateScores") !=null ? JSON.parse(sessionStorage.getItem("selectedDateScores")) :[],
    selectedCompetTeams:sessionStorage.getItem("selectedCompetTeams") !=null ? JSON.parse(sessionStorage.getItem("selectedCompetTeams")) :[],
    allCompets:sessionStorage.getItem("allCompets") !=null ? JSON.parse(sessionStorage.getItem("allCompets")) :[],
    currentCompetData:sessionStorage.getItem("currentCompetData") !=null ? JSON.parse(sessionStorage.getItem("currentCompetData")) :{},
    currentCompetScores:sessionStorage.getItem("currentCompetScores") !=null ? JSON.parse(sessionStorage.getItem("currentCompetScores")) :{},
    currentCompetStanding:sessionStorage.getItem("currentCompetStanding") !=null ? JSON.parse(sessionStorage.getItem("currentCompetStanding")) :{},
    currentCompetSchedule:sessionStorage.getItem("currentCompetSchedule") !=null ? JSON.parse(sessionStorage.getItem("currentCompetSchedule")) :{},
    currentCompetTeams:sessionStorage.getItem("currentCompetTeams") !=null ? JSON.parse(sessionStorage.getItem("currentCompetTeams")) :{},
    currentCompetTransfers:sessionStorage.getItem("currentCompetTransfers") !=null ? JSON.parse(sessionStorage.getItem("currentCompetTransfers")) :{},
    currentCompetStatsScoring:sessionStorage.getItem("currentCompetStatsScoring") !=null ? JSON.parse(sessionStorage.getItem("currentCompetStatsScoring")) :{},
    currentCompetStatsDiscpline:sessionStorage.getItem("currentCompetStatsDiscpline") !=null ? JSON.parse(sessionStorage.getItem("currentCompetStatsDiscpline")) :{},
    currentCompetStatsPerformance:sessionStorage.getItem("currentCompetStatsPerformance") !=null ? JSON.parse(sessionStorage.getItem("currentCompetStatsPerformance")) :{},
   
}

const tournsReducer=(state=initalState,action)=>{
    switch(action.type){
       
        
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
                allCompetetionByCat:action.payload.competsByCat,
                allCompets:action.payload.allCompets
            }
        case GET_ALL_TOURNS_BY_CAT_FAILED:
            return {
                ...state,
                loading:false,
                allCompetetionByCat:[],
                currentError:action.payload,
            }
        case GET_ALL_COMPET:
            return {
                ...state,
                loading:true,
                currentUserError:""
            }
        case GET_ALL_COMPET_SUCCESS:
            return {
                ...state,
                loading:false,
                allCompets:action.payload
            }
        case GET_ALL_COMPET_FAILED:
            return {
                ...state,
                loading:false,
                allCompets:[],
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
        case GET_MATCHES_SCORES:
            return {
                ...state,
                loading:true,
                currentUserError:""
            }
        case GET_MATCHES_SCORES_SUCCESS:
            return {
                ...state,
                loading:false,
                selectedDateScores:action.payload
            }
        case GET_MATCHES_SCORES_FAILED:
            return {
                ...state,
                loading:false,
                selectedDateScores:[],
                currentError:action.payload,
                }    
        case GET_COMPET_MATCHES_SCORES:
            return {
                ...state,
                loading:true,
                currentUserError:""
            }
        case GET_COMPET_MATCHES_SCORES_SUCCESS:
            return {
                ...state,
                loading:false,
                currentCompetScores:action.payload
            }
        case GET_COMPET_MATCHES_SCORES_FAILED:
            return {
                ...state,
                loading:false,
                currentCompetScores:[],
                currentError:action.payload,
                }    
        case GET_COMPET_TEAMS:
            return {
                ...state,
                loading:true,
                currentUserError:""
            }
        case GET_COMPET_TEAMS_SUCCESS:
            return {
                ...state,
                loading:false,
                selectedCompetTeams:action.payload.teams
            }
        case GET_COMPET_TEAMS_FAILED:
            return {
                ...state,
                loading:false,
                selectedCompetTeams:[],
                currentError:action.payload,
                }    
                case GET_COMPET_INFO:
                    return {
                        ...state,
                        loading:true,
                        currentUserError:""
                    }
                case GET_COMPET_INFO_SUCCESS:
                    return {
                        ...state,
                        loading:false,
                        currentCompetData:action.payload
                    }
                case GET_COMPET_INFO_FAILED:
                    return {
                        ...state,
                        loading:false,
                        currentCompetData:{},
                        currentError:action.payload,
                        }    
                case GET_COMPET_STANDING:
                    return {
                        ...state,
                        loading:true,
                        currentUserError:""
                    }
                case GET_COMPET_STANDING_SUCCESS:
                    return {
                        ...state,
                        loading:false,
                        currentCompetStanding:action.payload
                    }
                case GET_COMPET_STANDING_FAILED:
                    return {
                        ...state,
                        loading:false,
                        currentCompetStanding:{},
                        currentError:action.payload,
                        }    
                case GET_COMPET_DATE_MATCHES:
                    return {
                        ...state,
                        loading:true,
                        currentUserError:""
                    }
                case GET_COMPET_DATE_MATCHES_SUCCESS:
                    return {
                        ...state,
                        loading:false,
                        currentCompetSchedule:action.payload
                    }
                case GET_COMPET_DATE_MATCHES_FAILED:
                    return {
                        ...state,
                        loading:false,
                        currentCompetSchedule:{},
                        currentError:action.payload,
                        }    
                case GET_SPECIFIC_COMPET_TEAMS_SUCCESS:
                    return {
                        ...state,
                        loading:false,
                        currentCompetTeams:action.payload
                        }  
                case GET_COMPET_TRANSFER:
                    return {
                        ...state,
                        loading:true,
                        currentUserError:""
                    }
                case GET_COMPET_TRANSFER_SUCCESS:
                    return {
                        ...state,
                        loading:false,
                        currentCompetTransfers:action.payload
                    }
                case GET_COMPET_TRANSFER_FAILED:
                    return {
                        ...state,
                        loading:false,
                        currentCompetTransfers:{},
                        currentError:action.payload,
                        }    
                case GET_COMPET_STATS_SCORING:
                    return {
                        ...state,
                        loading:true,
                        currentUserError:""
                    }
                case GET_COMPET_STATS_SCORING_SUCCESS:
                    return {
                        ...state,
                        loading:false,
                        currentCompetStatsScoring:action.payload
                    }
                case GET_COMPET_STATS_SCORING_FAILED:
                    return {
                        ...state,
                        loading:false,
                        currentCompetStatsScoring:{},
                        currentError:action.payload,
                        }    
                case GET_COMPET_STATS_DISCPLINE:
                    return {
                        ...state,
                        loading:true,
                        currentUserError:""
                    }
                case GET_COMPET_STATS_DISCPLINE_SUCCESS:
                    return {
                        ...state,
                        loading:false,
                        currentCompetStatsDiscpline:action.payload
                    }
                case GET_COMPET_STATS_DISCPLINE_FAILED:
                    return {
                        ...state,
                        loading:false,
                        currentCompetStatsDiscpline:{},
                        currentError:action.payload,
                        }    
                case GET_COMPET_STATS_PERFORMANCE:
                    return {
                        ...state,
                        loading:true,
                        currentUserError:""
                    }
                case GET_COMPET_STATS_PERFORMANCE_SUCCESS:
                    return {
                        ...state,
                        loading:false,
                        currentCompetStatsPerformance:action.payload
                    }
                case GET_COMPET_STATS_PERFORMANCE_FAILED:
                    return {
                        ...state,
                        loading:false,
                        currentCompetStatsPerformance:{},
                        currentError:action.payload,
                        }    
        default: return state
    }
}

export default tournsReducer;