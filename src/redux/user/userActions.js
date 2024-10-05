

import axios from "axios";
import { GET_SEARCH_CONTENT, GET_SEARCH_CONTENT_FAILED, GET_SEARCH_CONTENT_SUCCESS, LOGIN_USER, LOGIN_USER_FAILED, LOGIN_USER_SUCCESS, REGISTER_USER, REGISTER_USER_FAILED, REGISTER_USER_SUCCESS, SET_FAV_COMPT_TEAMS, SET_FAV_COMPT_TEAMS_FAILED, SET_FAV_COMPT_TEAMS_SUCCESS } from "./userActionType";
import { baseUrl } from "../../utils/baseUrl";
import { Bounce, toast } from "react-toastify";



export function registeringUser(){
    return{
        type:REGISTER_USER
    }
}
export function registeringUserSuccuessed(data){
    sessionStorage.setItem("user-token",data.token)
    sessionStorage.setItem("current-user",JSON.stringify(data.user))
    toast.success(`Welcome User ${data.user.name}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce
    });
    window.location.href="/followings/competetions"
    return{
        type:REGISTER_USER_SUCCESS,
        payload:{user:data.user,token:data.token}
    }
}
export function registeringUserFailed(error){
    return{
        type:REGISTER_USER_FAILED,
        payload:error
    }
}

export function logingInUser(){
    return{
        type:LOGIN_USER
    }
}
export function logingInUserSuccuessed(data){
    sessionStorage.setItem("user-token",data.token)
    sessionStorage.setItem("current-user",JSON.stringify(data.user))
    toast.success(`Welcome Back ${data.user.name}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce
    });
    window.location.href="/"
    return{
        type:LOGIN_USER_SUCCESS,
        payload:{user:data.user,token:data.token}
    }
}
export function logingInUserFailed(error){
    return{
        type:LOGIN_USER_FAILED,
        payload:error
    }
}

export function setFavCompAndTeam(){
    return{
        type:SET_FAV_COMPT_TEAMS
    }
}
export function setFavCompAndTeamSuccuessed(compts,team){
    // sessionStorage.setItem("user-token",data.token)
    let newData=JSON.parse(sessionStorage.getItem("current-user"))

    newData.favCompetetions.push(compts)
    newData.favTeams.push(team)
    toast.success(`Data Added Successfully`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce
    });
    window.location.href="/"
    return{
        type:SET_FAV_COMPT_TEAMS_SUCCESS,
        payload:{user:newData}
    }
}
export function setFavCompAndTeamFailed(error){
    toast.error(error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce
    });
    return{
        type:SET_FAV_COMPT_TEAMS_FAILED,
        payload:error
    }
}
export function getSearchContent(){
    return{
        type:GET_SEARCH_CONTENT
    }
}
export function getSearchContentSuccuessed(query,data){
    sessionStorage.setItem("searchedQuery",query)
    sessionStorage.setItem("dataFounded",JSON.stringify(data))

    return{
        type:GET_SEARCH_CONTENT_SUCCESS,
        payload:{query,data}
    }
}
export function getSearchContentFailed(error){
    return{
        type:GET_SEARCH_CONTENT_FAILED,
        payload:error
    }
}
export function REGISTERING_USER(data){
    return function(dispatch){
        dispatch(registeringUser());
        axios.post(baseUrl+"api/user/register",data)
        .then(re=>{
            dispatch(registeringUserSuccuessed(re.data))
            return re.data;
        }

    )
        .catch(err=>{
            console.log(err)
            dispatch(registeringUserFailed(err.response.data.error))
            
        })
    }
}
export function LOGINGIN_USER(data){
    return function(dispatch){
        dispatch(logingInUser());
        axios.post(baseUrl+"api/user/login",data)
        .then(re=>{
            dispatch(logingInUserSuccuessed(re.data))
        }
    )
        .catch(err=>{
            console.log(err)
            dispatch(logingInUserFailed(err.response.data.error))
        })
    }
}
export function SETTING_FAV_COMPT_TEAM(username,competetion,team){
    console.log(competetion,team)
    return function(dispatch){
        dispatch(setFavCompAndTeam());
        axios.put(baseUrl+"api/user/updataFollowingList",{username,competetion,team})
        .then(re=>{
            dispatch(setFavCompAndTeamSuccuessed(competetion,team))         
        })
        .catch(err=>{
            console.log(err)
            dispatch(setFavCompAndTeamFailed(err.response.data.error))
        })
    }
}
export function GET_SEARCH_DATA(searchText){
    return function(dispatch){
        dispatch(getSearchContent());
        axios.get(baseUrl+`api/search/_/q/${searchText}`)
        .then(re=>{
            dispatch(getSearchContentSuccuessed(searchText,re.data))
        })
        .catch(err=>{
            console.log(err)
            dispatch(getSearchContentFailed("Error while getting the data"))
            
        })
    }
}