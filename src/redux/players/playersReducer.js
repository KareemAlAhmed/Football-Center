import { current } from "@reduxjs/toolkit";
import { GET_PLAYER_OVERVIEW_INFO, GET_PLAYER_OVERVIEW_INFO_FAILED, GET_PLAYER_OVERVIEW_INFO_SUCCESS } from "./playersActionType";


const initalState={
    loading:false,
    currentPlayerInfo:sessionStorage.getItem("currentPlayerInfo") !=null ? JSON.parse(sessionStorage.getItem("currentPlayerInfo")) :{},
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
                currentPlayerInfo:action.payload
            }
        case GET_PLAYER_OVERVIEW_INFO_FAILED:
            return {
                ...state,
                loading:false,
                currentPlayerInfo:{},
                currentError:action.payload,
            }   
        default: return state
    }
}

export default playerReducer;