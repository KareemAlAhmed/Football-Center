
// import { GET_USER,REGISTERING_USER,REGISTERING_USER_SUCCESS,REGISTERING_USER_FAILED, LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAILED, ADDING_PRODUCT_TO_CART, ADDING_PRODUCT_TO_CART_SUCCESSED, ADDING_PRODUCT_TO_CART_FAILED, PURCHASING_CART, PURCHASE_CART_SUCCESSED, PURCHASE_CART_FAILED, LOGOUT_USER, FETCH_USER_INFO, FETCH_USER_INFO_SUCCESSED, FETCH_USER_INFO_FAILED, FOLLOW_USER, FOLLOW_USER_SUCCESSED, FOLLOW_USER_FAILED, UNFOLLOW_USER, UNFOLLOW_USER_SUCCESSED, UNFOLLOW_USER_FAILED, GET_ALL_PURCHASES, GET_ALL_PURCHASES_SUCCESSED, GET_ALL_PURCHASES_FAILED, GET_ALL_USERS, GET_ALL_USERS_SUCCESSED, GET_ALL_USERS_FAILED, DELETE_USER, DELETE_USER_SUCCESSED, DELETE_USER_FAILED, REQUEST_MONEY, REQUEST_MONEY_SUCCESSED, REQUEST_MONEY_FAILED, VERIFY_CODE, VERIFY_CODE_SUCCESSED, VERIFY_CODE_FAILED, CANCEL_REQUEST, CANCEL_REQUEST_SUCCESSED, CANCEL_REQUEST_FAILED } from "./actionsType";

import { ADD_TO_BOOKMARK_LIST, ADD_TO_BOOKMARK_LIST_FAILED, ADD_TO_BOOKMARK_LIST_SUCCESS, ADD_TO_FOLLOWING_COMPETS, ADD_TO_FOLLOWING_COMPETS_FAILED, ADD_TO_FOLLOWING_COMPETS_SUCCESS, ADD_TO_FOLLOWING_PLAYERS, ADD_TO_FOLLOWING_PLAYERS_FAILED, ADD_TO_FOLLOWING_PLAYERS_SUCCESS, ADD_TO_FOLLOWING_TEAMS, ADD_TO_FOLLOWING_TEAMS_FAILED, ADD_TO_FOLLOWING_TEAMS_SUCCESS, CHANGE_THEME, CHANGE_THEME_FAILED, CHANGE_THEME_SUCCESS, DELETE_USER_ACCOUNT, DELETE_USER_ACCOUNT_FAILED, DELETE_USER_ACCOUNT_SUCCESS, GET_SEARCH_CONTENT, GET_SEARCH_CONTENT_FAILED, GET_SEARCH_CONTENT_SUCCESS, LOGIN_USER, LOGIN_USER_FAILED, LOGIN_USER_SUCCESS, LOGOUT_USER_SUCCESS, REGISTER_USER, REGISTER_USER_FAILED, REGISTER_USER_SUCCESS, REMOVE_FAV_NATIONAL_TEAM, REMOVE_FAV_NATIONAL_TEAM_FAILED, REMOVE_FAV_NATIONAL_TEAM_SUCCESS, REMOVE_FAV_TEAM, REMOVE_FAV_TEAM_FAILED, REMOVE_FAV_TEAM_SUCCESS, REMOVE_FROM_BOOKMARK_LIST, REMOVE_FROM_BOOKMARK_LIST_FAILED, REMOVE_FROM_BOOKMARK_LIST_SUCCESS, REMOVE_FROM_FOLLOWING_COMPETS, REMOVE_FROM_FOLLOWING_COMPETS_FAILED, REMOVE_FROM_FOLLOWING_COMPETS_SUCCESS, REMOVE_FROM_FOLLOWING_PLAYERS, REMOVE_FROM_FOLLOWING_PLAYERS_FAILED, REMOVE_FROM_FOLLOWING_PLAYERS_SUCCESS, REMOVE_FROM_FOLLOWING_TEAMS, REMOVE_FROM_FOLLOWING_TEAMS_FAILED, REMOVE_FROM_FOLLOWING_TEAMS_SUCCESS, SET_FAV_COMPT_TEAMS, SET_FAV_COMPT_TEAMS_FAILED, SET_FAV_COMPT_TEAMS_SUCCESS } from "./userActionType";


const initalState={
    loading:false,
    currentUser:sessionStorage.getItem("current-user") !=null ? JSON.parse(sessionStorage.getItem("current-user")) :{},
    searchedQuery:sessionStorage.getItem("searchedQuery") !=null ? sessionStorage.getItem("current-user") : "",
    dataFounded:sessionStorage.getItem("dataFounded") !=null ? JSON.parse(sessionStorage.getItem("dataFounded")) :{},
    userToken:sessionStorage.getItem("user-token"),
    currentUserError:"",
    authenticated:false
   
}

const userReducer=(state=initalState,action)=>{
    switch(action.type){
       
        case REGISTER_USER:
            return {
                ...state,
                loading:true,
                currentUserError:""
            }
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                currentUser:action.payload.user,
                userToken:action.payload.token,
            }
        case REGISTER_USER_FAILED:
            return {
                ...state,
                loading:false,
                currentUser:{},
                currentUserError:action.payload,
                userToken:action.payload.token,
            }

        case LOGIN_USER:
            return {
                ...state,
                loading:true,
                currentUserError:""
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                currentUser:action.payload.user,
            }
        case LOGIN_USER_FAILED:
            return {
                ...state,
                loading:false,
                currentUser:{},
                currentUserError:action.payload
            }
        case LOGOUT_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                currentUser:{},
                userToken:""
            }
        case DELETE_USER_ACCOUNT:
            return {
                ...state,
                loading:true,
                currentUserError:""
            }
        case DELETE_USER_ACCOUNT_SUCCESS:
            return {
                ...state,
                loading:false,
                currentUser:{},
                userToken:""
            }
        case DELETE_USER_ACCOUNT_FAILED:
            return {
                ...state,
                loading:false,
                currentUser:{},
                currentUserError:action.payload
            }    
        case SET_FAV_COMPT_TEAMS:
            return {
                ...state,
                loading:true,
                currentUserError:""
            }
        case SET_FAV_COMPT_TEAMS_SUCCESS:
            return {
                ...state,
                loading:false,
                currentUser:action.payload.user,
            }
        case SET_FAV_COMPT_TEAMS_FAILED:
            return {
                ...state,
                loading:false,
                currentUserError:action.payload
            }
       
            case GET_SEARCH_CONTENT:
                return {
                    ...state,
                    loading:true,
                    currentUserError:""
                }
            case GET_SEARCH_CONTENT_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    dataFounded:action.payload.data,
                    searchedQuery:action.payload.query,
                }
            case GET_SEARCH_CONTENT_FAILED:
                return {
                    ...state,
                    loading:false,
                    dataFounded:{},
                    searchedQuery:"",
                    currentUserError:action.payload
                }
                case ADD_TO_FOLLOWING_TEAMS:
                    return {
                        ...state,
                        loading:true,
                        currentUserError:""
                    }
                case ADD_TO_FOLLOWING_TEAMS_SUCCESS:
                    return {
                        ...state,
                        loading:false,
                        currentUser:action.payload,
                    }
                case ADD_TO_FOLLOWING_TEAMS_FAILED:
                    return {
                        ...state,
                        loading:false,
                        currentUserError:action.payload
                    }
                case ADD_TO_FOLLOWING_COMPETS:
                    return {
                        ...state,
                        loading:true,
                        currentUserError:""
                    }
                case ADD_TO_FOLLOWING_COMPETS_SUCCESS:
                    return {
                        ...state,
                        loading:false,
                        currentUser:action.payload,
                    }
                case ADD_TO_FOLLOWING_COMPETS_FAILED:
                    return {
                        ...state,
                        loading:false,
                        currentUserError:action.payload
                    }
                case ADD_TO_FOLLOWING_PLAYERS:
                    return {
                        ...state,
                        loading:true,
                        currentUserError:""
                    }
                case ADD_TO_FOLLOWING_PLAYERS_SUCCESS:
                    return {
                        ...state,
                        loading:false,
                        currentUser:action.payload,
                    }
                case ADD_TO_FOLLOWING_PLAYERS_FAILED:
                    return {
                        ...state,
                        loading:false,
                        currentUserError:action.payload
                    }
                case REMOVE_FAV_TEAM:
                    return {
                        ...state,
                        loading:true,
                        currentUserError:""
                    }
                case REMOVE_FAV_TEAM_SUCCESS:
                    return {
                        ...state,
                        loading:false,
                        currentUser:action.payload,
                    }
                case REMOVE_FAV_TEAM_FAILED:
                    return {
                        ...state,
                        loading:false,
                        currentUserError:action.payload
                    }
                case REMOVE_FAV_NATIONAL_TEAM:
                    return {
                        ...state,
                        loading:true,
                        currentUserError:""
                    }
                case REMOVE_FAV_NATIONAL_TEAM_SUCCESS:
                    return {
                        ...state,
                        loading:false,
                        currentUser:action.payload,
                    }
                case REMOVE_FAV_NATIONAL_TEAM_FAILED:
                    return {
                        ...state,
                        loading:false,
                        currentUserError:action.payload
                    }
                case REMOVE_FROM_FOLLOWING_TEAMS:
                    return {
                        ...state,
                        loading:true,
                        currentUserError:""
                    }
                case REMOVE_FROM_FOLLOWING_TEAMS_SUCCESS:
                    return {
                        ...state,
                        loading:false,
                        currentUser:action.payload,
                    }
                case REMOVE_FROM_FOLLOWING_TEAMS_FAILED:
                    return {
                        ...state,
                        loading:false,
                        currentUserError:action.payload
                    }
                case REMOVE_FROM_FOLLOWING_COMPETS:
                    return {
                        ...state,
                        loading:true,
                        currentUserError:""
                    }
                case REMOVE_FROM_FOLLOWING_COMPETS_SUCCESS:
                    return {
                        ...state,
                        loading:false,
                        currentUser:action.payload,
                    }
                case REMOVE_FROM_FOLLOWING_COMPETS_FAILED:
                    return {
                        ...state,
                        loading:false,
                        currentUserError:action.payload
                    }
                case REMOVE_FROM_FOLLOWING_PLAYERS:
                    return {
                        ...state,
                        loading:true,
                        currentUserError:""
                    }
                case REMOVE_FROM_FOLLOWING_PLAYERS_SUCCESS:
                    return {
                        ...state,
                        loading:false,
                        currentUser:action.payload,
                    }
                case REMOVE_FROM_FOLLOWING_PLAYERS_FAILED:
                    return {
                        ...state,
                        loading:false,
                        currentUserError:action.payload
                    }
                case ADD_TO_BOOKMARK_LIST:
                    return {
                        ...state,
                        loading:true,
                        currentUserError:""
                    }
                case ADD_TO_BOOKMARK_LIST_SUCCESS:
                    return {
                        ...state,
                        loading:false,
                        currentUser:action.payload,
                    }
                case ADD_TO_BOOKMARK_LIST_FAILED:
                    return {
                        ...state,
                        loading:false,
                        currentUserError:action.payload
                    }
                case REMOVE_FROM_BOOKMARK_LIST:
                    return {
                        ...state,
                        loading:true,
                        currentUserError:""
                    }
                case REMOVE_FROM_BOOKMARK_LIST_SUCCESS:
                    return {
                        ...state,
                        loading:false,
                        currentUser:action.payload,
                    }
                case REMOVE_FROM_BOOKMARK_LIST_FAILED:
                    return {
                        ...state,
                        loading:false,
                        currentUserError:action.payload
                    }
                case CHANGE_THEME:
                    return {
                        ...state,
                        loading:true,
                        currentUserError:""
                    }
                case CHANGE_THEME_SUCCESS:
                    return {
                        ...state,
                        loading:false,
                        currentUser:action.payload,
                    }
                case CHANGE_THEME_FAILED:
                    return {
                        ...state,
                        loading:false,
                        currentUserError:action.payload
                    }

        default: return state
    }
}

export default userReducer;