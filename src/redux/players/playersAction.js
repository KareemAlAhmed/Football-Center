

import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { GET_PLAYER_OVERVIEW_INFO, GET_PLAYER_OVERVIEW_INFO_FAILED, GET_PLAYER_OVERVIEW_INFO_SUCCESS } from "./playersActionType";

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
    return{
        type:GET_PLAYER_OVERVIEW_INFO_FAILED,
        payload:error
    }
}

export function GET_PLAYER_INFO(playerId){
    return function(dispatch){
        dispatch(getPlayerOveriewInfo());     
        axios.get(baseUrl+`api/player/_/id/${playerId}`)
        .then(re=>{
            dispatch(getPlayerOveriewInfoSuccuessed(re.data))
        })
        .catch((err)=>{
            console.log(err)
            dispatch(getPlayerOveriewInfoFailed("Error While Getting The Data"))          
        })
    }
}