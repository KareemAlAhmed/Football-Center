import { current } from "@reduxjs/toolkit";
import { GET_COMPET_MAJOR_TRANSFERS_SUCCESS, GET_MAJOR_TRANSFERS, GET_MAJOR_TRANSFERS_FAILED, GET_MAJOR_TRANSFERS_SUCCESS, GET_TRANSFER_TOP_NEWS, GET_TRANSFER_TOP_NEWS_FAILED, GET_TRANSFER_TOP_NEWS_SUCCESS } from "./newsActionType";


const initalState={
    loading:false,
    newsError:"",
    transferTopNews:sessionStorage.getItem("transferTopNews") !=null ? JSON.parse(sessionStorage.getItem("transferTopNews")) :[],
    majorTransfers:sessionStorage.getItem("currentLeagueMajorTransfer") !=null ? JSON.parse(sessionStorage.getItem("currentLeagueMajorTransfer")) :[],
    currentCompetTransfers:sessionStorage.getItem("currentCompetTransfers") !=null ? JSON.parse(sessionStorage.getItem("currentCompetTransfers")) :[],

}

const newsReducer=(state=initalState,action)=>{
    switch(action.type){
       
        case GET_TRANSFER_TOP_NEWS:
            return {
                ...state,
                loading:true,
                newsError:""
            }
        case GET_TRANSFER_TOP_NEWS_SUCCESS:
            return {
                ...state,
                loading:false,
                transferTopNews:action.payload
            }
        case GET_TRANSFER_TOP_NEWS_FAILED:
            return {
                ...state,
                loading:false,
                transferTopNews:[],
                newsError:action.payload,
            }
        case GET_MAJOR_TRANSFERS:
            return {
                ...state,
                loading:true,
                newsError:""
            }
        case GET_MAJOR_TRANSFERS_SUCCESS:
            return {
                ...state,
                loading:false,
                majorTransfers:action.payload
            }
        case GET_MAJOR_TRANSFERS_FAILED:
            return {
                ...state,
                loading:false,
                majorTransfers:[],
                newsError:action.payload,
            }
            case GET_COMPET_MAJOR_TRANSFERS_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    currentCompetTransfers:action.payload
                }
        default: return state
    }
}

export default newsReducer;