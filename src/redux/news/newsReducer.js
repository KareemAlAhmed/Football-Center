import { current } from "@reduxjs/toolkit";
import { GET_ARTICLE_CONTENT, GET_ARTICLE_CONTENT_FAILED, GET_ARTICLE_CONTENT_SUCCESS, GET_COMPET_MAJOR_TRANSFERS_SUCCESS, GET_HOMEPAGE_NEWS, GET_HOMEPAGE_NEWS_FAILED, GET_HOMEPAGE_NEWS_SUCCESS, GET_MAJOR_TRANSFERS, GET_MAJOR_TRANSFERS_FAILED, GET_MAJOR_TRANSFERS_SUCCESS, GET_TRANSFER_TOP_NEWS, GET_TRANSFER_TOP_NEWS_FAILED, GET_TRANSFER_TOP_NEWS_SUCCESS } from "./newsActionType";


const initalState={
    loading:false,
    newsError:"",
    laLigaNews:sessionStorage.getItem("listOfNews") !=null ? JSON.parse(sessionStorage.getItem("listOfNews")).laliga :[],
    premierLeagueNews:sessionStorage.getItem("listOfNews") !=null ? JSON.parse(sessionStorage.getItem("listOfNews")).premier :[],
    bundesLigaNews:sessionStorage.getItem("listOfNews") !=null ? JSON.parse(sessionStorage.getItem("listOfNews")).bundes :[],
    serieaNews:sessionStorage.getItem("listOfNews") !=null ? JSON.parse(sessionStorage.getItem("listOfNews")).seria :[],
    transferTopNews:sessionStorage.getItem("transferTopNews") !=null ? JSON.parse(sessionStorage.getItem("transferTopNews")) :[],
    majorTransfers:sessionStorage.getItem("currentLeagueMajorTransfer") !=null ? JSON.parse(sessionStorage.getItem("currentLeagueMajorTransfer")) :[],
    currentCompetTransfers:sessionStorage.getItem("currentCompetTransfers") !=null ? JSON.parse(sessionStorage.getItem("currentCompetTransfers")) :[],
    currentArticleData:sessionStorage.getItem("currentArticleData") !=null ? JSON.parse(sessionStorage.getItem("currentArticleData")) :{},

}

const newsReducer=(state=initalState,action)=>{
    switch(action.type){
       
        case GET_HOMEPAGE_NEWS:
            return {
                ...state,
                loading:true,
                newsError:""
            }
        case GET_HOMEPAGE_NEWS_SUCCESS:
            return {
                ...state,
                loading:false,
                laLigaNews:action.payload.laliga,
                premierLeagueNews:action.payload.premier,
                bundesLigaNews:action.payload.bundes,
                serieaNews:action.payload.seria
            }
        case GET_HOMEPAGE_NEWS_FAILED:
            return {
                ...state,
                loading:false,
                laLigaNews:[],
                premierLeagueNews:[],
                bundesLigaNews:[],
                serieaNews:[],
                newsError:action.payload,
            }
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
        case GET_ARTICLE_CONTENT:
            return {
                ...state,
                loading:true,
                newsError:""
            }
        case GET_ARTICLE_CONTENT_SUCCESS:
            return {
                ...state,
                loading:false,
                currentArticleData:action.payload
            }
        case GET_ARTICLE_CONTENT_FAILED:
            return {
                ...state,
                loading:false,
                currentArticleData:{},
                newsError:action.payload,
            }
        default: return state
    }
}

export default newsReducer;