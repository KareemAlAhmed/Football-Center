

import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { GET_ARTICLE_CONTENT, GET_ARTICLE_CONTENT_FAILED, GET_ARTICLE_CONTENT_SUCCESS, GET_COMPET_MAJOR_TRANSFERS, GET_COMPET_MAJOR_TRANSFERS_SUCCESS, GET_HOMEPAGE_NEWS, GET_HOMEPAGE_NEWS_FAILED, GET_HOMEPAGE_NEWS_SUCCESS, GET_MAJOR_TRANSFERS, GET_MAJOR_TRANSFERS_FAILED, GET_MAJOR_TRANSFERS_SUCCESS, GET_TRANSFER_TOP_NEWS, GET_TRANSFER_TOP_NEWS_FAILED, GET_TRANSFER_TOP_NEWS_SUCCESS } from "./newsActionType";

export function getHomePageNews(){
    return{
        type:GET_HOMEPAGE_NEWS
    }
}
export function getHomePageNewsSuccuessed(data){
    sessionStorage.setItem("listOfNews",JSON.stringify(data))
   
    return{
        type:GET_HOMEPAGE_NEWS_SUCCESS,
        payload:data
    }
}
export function getHomePageNewsFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_HOMEPAGE_NEWS_FAILED,
        payload:error
    }
}

export function getTransferTopNews(){
    return{
        type:GET_TRANSFER_TOP_NEWS
    }
}
export function getTransferTopNewsSuccuessed(data){
    sessionStorage.setItem("transferTopNews",JSON.stringify(data))
   
    return{
        type:GET_TRANSFER_TOP_NEWS_SUCCESS,
        payload:data
    }
}
export function getTransferTopNewsFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_TRANSFER_TOP_NEWS_FAILED,
        payload:error
    }
}

export function getMajorTransfers(){
    return{
        type:GET_MAJOR_TRANSFERS
    }
}
export function getMajorTransfersSuccuessed(data){
    sessionStorage.setItem("currentLeagueMajorTransfer",JSON.stringify(data))  
    return{
        type:GET_MAJOR_TRANSFERS_SUCCESS,
        payload:data
    }
}
export function getMajorTransfersFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_MAJOR_TRANSFERS_FAILED,
        payload:error
    }
}
export function getCompetMajorTransfersSuccuessed(data,id){
    data.id=id
    sessionStorage.setItem("currentCompetTransfers",JSON.stringify(data))  
    return{
        type:GET_COMPET_MAJOR_TRANSFERS_SUCCESS,
        payload:data
    }
}

export function getArticleContent(){
    return{
        type:GET_ARTICLE_CONTENT
    }
}
export function getArticleContentSuccuessed(data){
    sessionStorage.setItem("currentArticleData",JSON.stringify(data))  
    return{
        type:GET_ARTICLE_CONTENT_SUCCESS,
        payload:data
    }
}
export function getArticleContentFailed(error){
    window.location.replace("/#/notFound")
    return{
        type:GET_ARTICLE_CONTENT_FAILED,
        payload:error
    }
}

export function GET_HOMEPAGE_NEWS_DATA(){
    return function(dispatch){
        dispatch(getHomePageNews());     
        axios.get(baseUrl+`api/news/getNews`)
        .then(re=>{
            dispatch(getHomePageNewsSuccuessed(re.data))
        })
        .catch(()=>{
            dispatch(getHomePageNewsFailed("Error While Getting The Data"))
            
        })
    }
}
export function GET_TRANSFERS_TOP_NEWS(){
    return function(dispatch){
        dispatch(getTransferTopNews());     
        axios.get(baseUrl+`api/news/getTransferNews`)
        .then(re=>{
            console.log(re.data)
            dispatch(getTransferTopNewsSuccuessed(re.data))
        })
        .catch(()=>{
            dispatch(getTransferTopNewsFailed("Error While Getting The Data"))
            
        })
    }
}
export function GET_MAJOR_TRANSFERS_DATA(competSlug='any',season='any',forPage=null,competId=null){
    return function(dispatch){
        dispatch(getMajorTransfers());     
        axios.get(baseUrl+`api/news/getMajorTransfer/${competSlug}/season/${season}`)
        .then(re=>{
            forPage == null ? dispatch(getMajorTransfersSuccuessed(re.data)) : dispatch(getCompetMajorTransfersSuccuessed(re.data,competId))
        })
        .catch(()=>{
            dispatch(getMajorTransfersFailed("Error While Getting The Data"))          
        })
    }
}
export function GET_ARTICLE_DATA(articleId,articleSlug){
    return function(dispatch){
        dispatch(getArticleContent());     
        axios.get(baseUrl+`api/news/${articleId}/${articleSlug}/getArticleData`)
        .then(re=>{
           dispatch(getArticleContentSuccuessed(re.data))
        })
        .catch((error)=>{
            console.log(error)
            dispatch(getArticleContentFailed("Error While Getting The Data"))          
        })
    }
}