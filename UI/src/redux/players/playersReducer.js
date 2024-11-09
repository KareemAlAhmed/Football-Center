import { current } from "@reduxjs/toolkit";
import { GET_ALL_PLAYERS, GET_ALL_PLAYERS_FAILED, GET_ALL_PLAYERS_SUCCESS, GET_PLAYER_BIO, GET_PLAYER_BIO_FAILED, GET_PLAYER_BIO_SUCCESS, GET_PLAYER_CURRENT_TEAMS_STATS_FILTERED, GET_PLAYER_CURRENT_TEAMS_STATS_FILTERED_FAILED, GET_PLAYER_CURRENT_TEAMS_STATS_FILTERED_SUCCESS, GET_PLAYER_MATCHES, GET_PLAYER_MATCHES_FAILED, GET_PLAYER_MATCHES_FILTERED, GET_PLAYER_MATCHES_FILTERED_FAILED, GET_PLAYER_MATCHES_FILTERED_SUCCESS, GET_PLAYER_MATCHES_SUCCESS, GET_PLAYER_OVERVIEW_INFO, GET_PLAYER_OVERVIEW_INFO_FAILED, GET_PLAYER_OVERVIEW_INFO_SUCCESS, GET_PLAYER_STATS, GET_PLAYER_STATS_FAILED, GET_PLAYER_STATS_FILTERED, GET_PLAYER_STATS_FILTERED_FAILED, GET_PLAYER_STATS_FILTERED_SUCCESS, GET_PLAYER_STATS_SUCCESS, GET_TEAM_PLAYERS, GET_TEAM_PLAYERS_FAILED, GET_TEAM_PLAYERS_SUCCESS } from "./playersActionType";


const initalState={
    loading:false,
    playersLoading:false,
    filterLoading:false,
    allPlayers:sessionStorage.getItem("allPlayers") !=null ? JSON.parse(sessionStorage.getItem("allPlayers")) :[],
    currentPlayerInfo:sessionStorage.getItem("currentPlayerInfo") !=null ? JSON.parse(sessionStorage.getItem("currentPlayerInfo")) :{},
    currentPlayerBio:sessionStorage.getItem("currentPlayerBio") !=null ? JSON.parse(sessionStorage.getItem("currentPlayerBio")) :{},
    currentPlayerMatches:sessionStorage.getItem("currentPlayerMatches") !=null ? JSON.parse(sessionStorage.getItem("currentPlayerMatches")) :{},
    currentPlayerStats:sessionStorage.getItem("currentPlayerStats") !=null ? JSON.parse(sessionStorage.getItem("currentPlayerStats")) :{},
    currentPlayerMatchesFiltered:sessionStorage.getItem("currentPlayerMatchesFiltered") !=null ? JSON.parse(sessionStorage.getItem("currentPlayerMatchesFiltered")) :{currentCompetMatches:[]},
    currentPlayerStatsFiltered:sessionStorage.getItem("currentPlayerStatsFiltered") !=null ? JSON.parse(sessionStorage.getItem("currentPlayerStatsFiltered")) :{everySeasonStats:[]},
    currentPlayerCurrentTeamsStatsFiltered:sessionStorage.getItem("currentPlayerCurrentTeamsStatsFiltered") !=null ? JSON.parse(sessionStorage.getItem("currentPlayerCurrentTeamsStatsFiltered")) :{everySeasonStats:[]},
    currentSwitchPlayers:sessionStorage.getItem("currentSwitchPlayers") !=null ? JSON.parse(sessionStorage.getItem("currentSwitchPlayers")) :[],
    currentError:"",
}

const playerReducer=(state=initalState,action)=>{
    switch(action.type){
            
        case GET_PLAYER_OVERVIEW_INFO:
            return {
                ...state,
                loading:true,
                currentUserError:""
            }
        case GET_PLAYER_OVERVIEW_INFO_SUCCESS:
            return {
                ...state,
                loading:false,
                currentPlayerInfo:action.payload,
                currentSwitchPlayers:action.payload.team.squads,
                currentPlayerCurrentTeamsStatsFiltered:{
                    allCompetions:action.payload.allCompetions,
                    allTeams:action.payload.allTeams,
                    everySeasonStats:action.payload.stats.allInfo,
                    teamId:action.payload.team.id,
                    competSlug:action.payload.currentLeague.slug
                }
            }
        case GET_PLAYER_OVERVIEW_INFO_FAILED:
            return {
                ...state,
                loading:false,
                currentPlayerInfo:{},
                currentSwitchPlayers:[],
                currentPlayerCurrentTeamsStatsFiltered:{everySeasonStats:[]},
                currentError:action.payload,
            }   
            case GET_TEAM_PLAYERS:
                return {
                    ...state,
                    playersLoading:true,
                    currentUserError:""
                }
                case GET_TEAM_PLAYERS_SUCCESS:
                    return {
                ...state,
                playersLoading:false,
                currentSwitchPlayers:action.payload
            }
        case GET_TEAM_PLAYERS_FAILED:
            return {
                ...state,
                playersLoading:false,
                currentSwitchPlayers:[],
                currentError:action.payload,
            }   
            case GET_PLAYER_BIO:
                return {
                    ...state,
                    loading:true,
                    currentUserError:""
                }
            case GET_PLAYER_BIO_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    currentPlayerBio:action.payload
                }
            case GET_PLAYER_BIO_FAILED:
                return {
                    ...state,
                    loading:false,
                    currentPlayerBio:{},
                    currentError:action.payload,
                }   
            case GET_PLAYER_MATCHES:
                return {
                    ...state,
                    loading:true,
                    currentUserError:""
                }
            case GET_PLAYER_MATCHES_SUCCESS:
                let competSlug4=action.competSlug
                let year=action.year
                let teamId4=action.teamId
                let matches2=action.payload.currentCompetMatches
                let seasons=action.payload.allSeasons
                let teams4=action.payload.allTeams
                let compets4=action.payload.allCompets
                let newObject4={currentCompetMatches:matches2,allTeams:teams4,allCompets:compets4,allSeasons:seasons,competSlug:competSlug4,teamId:teamId4,year:year}

                return {
                    ...state,
                    loading:false,
                    currentPlayerMatches:action.payload,
                    currentPlayerMatchesFiltered:newObject4
                }
            case GET_PLAYER_MATCHES_FAILED:
                return {
                    ...state,
                    loading:false,
                    currentPlayerMatches:{},
                    currentError:action.payload,
                }   
            case GET_PLAYER_STATS:
                return {
                    ...state,
                    loading:true,
                    currentUserError:""
                }
            case GET_PLAYER_STATS_SUCCESS:
                let competSlug=action.competSlug
                let teamId=action.teamId
                let stats=action.payload.everySeasonStats
                let teams=action.payload.allTeams
                let compets=action.payload.allCompets
                let newObject={everySeasonStats:stats,allTeams:teams,allCompets:compets,competSlug,teamId}
                return {
                    ...state,
                    loading:false,
                    currentPlayerStats:action.payload,
                    currentPlayerStatsFiltered:newObject
                }
            case GET_PLAYER_STATS_FAILED:
                return {
                    ...state,
                    loading:false,
                    currentPlayerStats:{},
                    currentError:action.payload,
                }   
            case GET_PLAYER_STATS_FILTERED:
                return {
                    ...state,
                    filterLoading:true,
                    currentUserError:""
                }
            case GET_PLAYER_STATS_FILTERED_SUCCESS:
                let competSlug2=action.competSlug
                let teamId2=action.teamId
                let stats2=action.payload.everySeasonStats
                let teams2=action.payload.allTeams
                let compets2=action.payload.allCompets
                let newObject2={everySeasonStats:stats2,allTeams:teams2,allCompets:compets2,competSlug:competSlug2,teamId:teamId2}
                return {
                    ...state,
                    filterLoading:false,
                    currentPlayerStatsFiltered:newObject2
                }
            case GET_PLAYER_STATS_FILTERED_FAILED:
                return {
                    ...state,
                    filterLoading:false,
                    currentPlayerStatsFiltered:{},
                    currentError:action.payload,
                }   
            case GET_PLAYER_MATCHES_FILTERED:
                return {
                    ...state,
                    filterLoading:true,
                    currentUserError:""
                }
            case GET_PLAYER_MATCHES_FILTERED_SUCCESS:
                let competSlug3=action.competSlug
                let teamId3=action.teamId
                let year2=action.year
                let matches=action.payload.currentCompetMatches
                let seasons2=action.payload.allSeasons
                let teams3=action.payload.allTeams
                let compets3=action.payload.allCompets
                let newObject3={currentCompetMatches:matches,allTeams:teams3,allCompets:compets3,allSeasons:seasons2,competSlug:competSlug3,teamId:teamId3,year:year2}
                return {
                    ...state,
                    filterLoading:false,
                    currentPlayerMatchesFiltered:newObject3
                }
            case GET_PLAYER_MATCHES_FILTERED_FAILED:
                return {
                    ...state,
                    filterLoading:false,
                    currentPlayerMatchesFiltered:{},
                    currentError:action.payload,
                }   

                case GET_PLAYER_CURRENT_TEAMS_STATS_FILTERED:
                    return {
                        ...state,
                        filterLoading:true,
                        currentUserError:""
                    }
                case GET_PLAYER_CURRENT_TEAMS_STATS_FILTERED_SUCCESS:
                    return {
                        ...state,
                        filterLoading:false,
                        currentPlayerCurrentTeamsStatsFiltered:{
                            allCompetions:action.payload.allCompets,
                            allTeams:action.payload.allTeams,
                            everySeasonStats:action.payload.everySeasonStats,
                            teamId:action.teamId,
                            competSlug:action.competSlug
                        }
                    }
                case GET_PLAYER_CURRENT_TEAMS_STATS_FILTERED_FAILED:
                    return {
                        ...state,
                        filterLoading:false,
                        currentPlayerCurrentTeamsStatsFiltered:{everySeasonStats:[]},
                        currentError:action.payload,
                    }   
                case GET_ALL_PLAYERS:
                    return {
                        ...state,
                        loading:true,
                        currentUserError:""
                    }
                case GET_ALL_PLAYERS_SUCCESS:
                    return {
                        ...state,
                        loading:false,
                        allPlayers:action.payload
                    }
                case GET_ALL_PLAYERS_FAILED:
                    return {
                        ...state,
                        loading:false,
                        allPlayers:[],
                        currentError:action.payload,
                    }   
            default: return state
        }
}

export default playerReducer;