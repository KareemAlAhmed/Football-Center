

import axios from "axios";
import { ADD_TO_BOOKMARK_LIST, ADD_TO_BOOKMARK_LIST_FAILED, ADD_TO_BOOKMARK_LIST_SUCCESS, ADD_TO_FOLLOWING_COMPETS, ADD_TO_FOLLOWING_COMPETS_FAILED, ADD_TO_FOLLOWING_COMPETS_SUCCESS, ADD_TO_FOLLOWING_PLAYERS, ADD_TO_FOLLOWING_PLAYERS_FAILED, ADD_TO_FOLLOWING_PLAYERS_SUCCESS, ADD_TO_FOLLOWING_TEAMS, ADD_TO_FOLLOWING_TEAMS_FAILED, ADD_TO_FOLLOWING_TEAMS_SUCCESS, CHANGE_THEME, CHANGE_THEME_FAILED, CHANGE_THEME_SUCCESS, DELETE_USER_ACCOUNT, DELETE_USER_ACCOUNT_FAILED, DELETE_USER_ACCOUNT_SUCCESS, GET_SEARCH_CONTENT, GET_SEARCH_CONTENT_FAILED, GET_SEARCH_CONTENT_SUCCESS, LOGIN_USER, LOGIN_USER_FAILED, LOGIN_USER_SUCCESS, LOGOUT_USER_SUCCESS, REGISTER_USER, REGISTER_USER_FAILED, REGISTER_USER_SUCCESS, REMOVE_FAV_NATIONAL_TEAM, REMOVE_FAV_NATIONAL_TEAM_FAILED, REMOVE_FAV_NATIONAL_TEAM_SUCCESS, REMOVE_FAV_TEAM, REMOVE_FAV_TEAM_FAILED, REMOVE_FAV_TEAM_SUCCESS, REMOVE_FROM_BOOKMARK_LIST, REMOVE_FROM_BOOKMARK_LIST_FAILED, REMOVE_FROM_BOOKMARK_LIST_SUCCESS, REMOVE_FROM_FOLLOWING_COMPETS, REMOVE_FROM_FOLLOWING_COMPETS_FAILED, REMOVE_FROM_FOLLOWING_COMPETS_SUCCESS, REMOVE_FROM_FOLLOWING_PLAYERS, REMOVE_FROM_FOLLOWING_PLAYERS_FAILED, REMOVE_FROM_FOLLOWING_PLAYERS_SUCCESS, REMOVE_FROM_FOLLOWING_TEAMS, REMOVE_FROM_FOLLOWING_TEAMS_FAILED, REMOVE_FROM_FOLLOWING_TEAMS_SUCCESS, SET_FAV_COMPT_TEAMS, SET_FAV_COMPT_TEAMS_FAILED, SET_FAV_COMPT_TEAMS_SUCCESS, SET_FAV_NATIONAL_TEAM, SET_FAV_NATIONAL_TEAM_FAILED } from "./userActionType";
import { baseUrl } from "../../utils/baseUrl";
import { Bounce, toast } from "react-toastify";
import { GET_NATIONAL_TEAM_SUCCESS } from "../team/teamsActionType";



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
    window.location.replace("/#/favorite/competetions")
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
    if(data.user.theme === "light"){
        document.body.classList.add("light-theme");    
    }
    window.location.replace("/")    
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
export function logoutUserSuccuessed(){
    let userData;
    if(sessionStorage.getItem("user-token") != null){
        sessionStorage.removeItem("user-token")
    }
    if(sessionStorage.getItem("current-user") != null){
        userData=JSON.parse(sessionStorage.getItem("current-user"))
        sessionStorage.removeItem("current-user")
    }
    toast.success(`Goodbye ${userData.name}`, {
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
    window.location.replace("/")
    return{
        type:LOGOUT_USER_SUCCESS
    }
}
export function deletUserAccount(){
    return{
        type:DELETE_USER_ACCOUNT
    }
}
export function deletUserAccountSuccuessed(data){
    let userData;
    if(sessionStorage.getItem("user-token") != null){
        sessionStorage.removeItem("user-token")
    }
    if(sessionStorage.getItem("current-user") != null){
        userData=JSON.parse(sessionStorage.getItem("current-user"))
        sessionStorage.removeItem("current-user")
    }
    toast.success(`Goodbye ${userData.name}`, {
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
    window.location.replace("/")
    return{
        type:DELETE_USER_ACCOUNT_SUCCESS
    }
}
export function deletUserAccountFailed(error){
    return{
        type:DELETE_USER_ACCOUNT_FAILED,
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

    newData.followedCompetetions.push(...compts)
    newData.favTeam=team
    sessionStorage.setItem("current-user",JSON.stringify(newData))
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
    window.location.replace("/#/profile")
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
export function setFavNationalTeams(){
    return{
        type:SET_FAV_NATIONAL_TEAM
    }
}
export function setFavNationalTeamsSuccuessed(team){
    let currentUser=JSON.parse(sessionStorage.getItem("current-user"))
    currentUser.favNationalTeam=team
    sessionStorage.setItem("current-user",JSON.stringify(currentUser))
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
    window.location.replace("/#/profile")
    return{
        type:GET_NATIONAL_TEAM_SUCCESS,
        payload:currentUser
    }
}
export function setFavNationalTeamsFailed(error){
    return{
        type:SET_FAV_NATIONAL_TEAM_FAILED,
        payload:error
    }
}

export function updateFollowingTeamsList(){
    return{
        type:ADD_TO_FOLLOWING_TEAMS
    }
}
export function updateFollowingTeamsListSuccuessed(team,compets,type=null){
    let currentUser=JSON.parse(sessionStorage.getItem("current-user"))
    currentUser.followedTeams.push(team)
    currentUser.followedCompetetions.push(...compets)
    sessionStorage.setItem("current-user",JSON.stringify(currentUser))
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
    if(type == null){
        window.location.replace("/#/profile")
    }
    return{
        type:ADD_TO_FOLLOWING_TEAMS_SUCCESS,
        payload:currentUser
    }
}
export function updateFollowingTeamsListFailed(error){
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
        type:ADD_TO_FOLLOWING_TEAMS_FAILED,
        payload:error
    }
}
export function updateFollowingCompetsList(){
    return{
        type:ADD_TO_FOLLOWING_COMPETS
    }
}
export function updateFollowingCompetsListSuccuessed(compets){
    let currentUser=JSON.parse(sessionStorage.getItem("current-user"))
    currentUser.followedCompetetions.push(compets)
    sessionStorage.setItem("current-user",JSON.stringify(currentUser))
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
    window.location.replace("/#/profile")
    return{
        type:ADD_TO_FOLLOWING_COMPETS_SUCCESS,
        payload:currentUser
    }
}
export function updateFollowingCompetsListFailed(error){
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
        type:ADD_TO_FOLLOWING_COMPETS_FAILED,
        payload:error
    }
}
export function updateFollowingPlayersList(){
    return{
        type:ADD_TO_FOLLOWING_PLAYERS
    }
}
export function updateFollowingPlayersListSuccuessed(player,type=null){
    let currentUser=JSON.parse(sessionStorage.getItem("current-user"))
    currentUser.followedPlayers.push(player)
    sessionStorage.setItem("current-user",JSON.stringify(currentUser))
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
    if(type == null){
        window.location.replace("/#/profile")
    }
    return{
        type:ADD_TO_FOLLOWING_PLAYERS_SUCCESS,
        payload:currentUser
    }
}
export function updateFollowingPlayersListFailed(error){
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
        type:ADD_TO_FOLLOWING_PLAYERS_FAILED,
        payload:error
    }
}
export function removeFavTeam(){
    return{
        type:REMOVE_FAV_TEAM
    }
}
export function removeFavTeamSuccuessed(message){
    let currentUser=JSON.parse(sessionStorage.getItem("current-user"))
    currentUser.favTeam={}
    sessionStorage.setItem("current-user",JSON.stringify(currentUser))
    toast.success(message, {
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
        type:REMOVE_FAV_TEAM_SUCCESS,
        payload:currentUser
    }
}
export function removeFavTeamFailed(error){
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
        type:REMOVE_FAV_TEAM_FAILED,
        payload:error
    }
}
export function removeFavNationalTeam(){
    return{
        type:REMOVE_FAV_NATIONAL_TEAM
    }
}
export function removeFavNationalTeamSuccuessed(message){
    let currentUser=JSON.parse(sessionStorage.getItem("current-user"))
    currentUser.favNationalTeam={}
    sessionStorage.setItem("current-user",JSON.stringify(currentUser))
    toast.success(message, {
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
        type:REMOVE_FAV_NATIONAL_TEAM_SUCCESS,
        payload:currentUser
    }
}
export function removeFavNationalTeamFailed(error){
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
        type:REMOVE_FAV_NATIONAL_TEAM_FAILED,
        payload:error
    }
}

export function removeFollowedTeam(){
    return{
        type:REMOVE_FROM_FOLLOWING_TEAMS
    }
}
export function removeFollowedTeamSuccuessed(message,teamName){
    let currentUser=JSON.parse(sessionStorage.getItem("current-user"))
    currentUser.followedTeams=currentUser.followedTeams.filter(team=>team.name !== teamName)
    sessionStorage.setItem("current-user",JSON.stringify(currentUser))
    toast.success(message, {
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
        type:REMOVE_FROM_FOLLOWING_TEAMS_SUCCESS,
        payload:currentUser
    }
}
export function removeFollowedTeamFailed(error){
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
        type:REMOVE_FROM_FOLLOWING_TEAMS_FAILED,
        payload:error
    }
}

export function removeFollowedCompet(){
    return{
        type:REMOVE_FROM_FOLLOWING_COMPETS
    }
}
export function removeFollowedCompetSuccuessed(message,competName){
    let currentUser=JSON.parse(sessionStorage.getItem("current-user"))
    currentUser.followedCompetetions=currentUser.followedCompetetions.filter(compet=>compet.leagueName !== competName)
    sessionStorage.setItem("current-user",JSON.stringify(currentUser))
    toast.success(message, {
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
        type:REMOVE_FROM_FOLLOWING_COMPETS_SUCCESS,
        payload:currentUser
    }
}
export function removeFollowedCompetFailed(error){
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
        type:REMOVE_FROM_FOLLOWING_COMPETS_FAILED,
        payload:error
    }
}
export function removeFollowedPlayer(){
    return{
        type:REMOVE_FROM_FOLLOWING_PLAYERS
    }
}
export function removeFollowedPlayerSuccuessed(message,playerName){
    let currentUser=JSON.parse(sessionStorage.getItem("current-user"))
    currentUser.followedPlayers=currentUser.followedPlayers.filter(player=>player.name !== playerName.trim())
    sessionStorage.setItem("current-user",JSON.stringify(currentUser))
    toast.success(message, {
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
        type:REMOVE_FROM_FOLLOWING_PLAYERS_SUCCESS,
        payload:currentUser
    }
}
export function removeFollowedPlayerFailed(error){
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
        type:REMOVE_FROM_FOLLOWING_PLAYERS_FAILED,
        payload:error
    }
}
export function updateBookmarkList(){
    return{
        type:ADD_TO_BOOKMARK_LIST
    }
}
export function updateBookmarkListSuccuessed(message,article){
    let currentUser=JSON.parse(sessionStorage.getItem("current-user"))
    currentUser.bookMarks.push(article)
    sessionStorage.setItem("current-user",JSON.stringify(currentUser))
    toast.success(message, {
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
        type:ADD_TO_BOOKMARK_LIST_SUCCESS,
        payload:currentUser
    }
}
export function updateBookmarkListFailed(error){
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
        type:ADD_TO_BOOKMARK_LIST_FAILED,
        payload:error
    }
}
export function removeFromBookmarkList(){
    return{
        type:REMOVE_FROM_BOOKMARK_LIST
    }
}
export function removeFromBookmarkListSuccuessed(message,articleId){
    let currentUser=JSON.parse(sessionStorage.getItem("current-user"))
    currentUser.bookMarks=currentUser.bookMarks.filter(article=>article.articleId !== articleId)
    sessionStorage.setItem("current-user",JSON.stringify(currentUser))
    toast.success(message, {
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
        type:REMOVE_FROM_BOOKMARK_LIST_SUCCESS,
        payload:currentUser
    }
}
export function removeFromBookmarkListFailed(error){
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
        type:REMOVE_FROM_BOOKMARK_LIST_FAILED,
        payload:error
    }
}
export function changeTheme(){
    return{
        type:CHANGE_THEME
    }
}
export function changeThemeSuccuessed(theme){
    let currentUser=JSON.parse(sessionStorage.getItem("current-user"))
    currentUser.theme=theme
    sessionStorage.setItem("current-user",JSON.stringify(currentUser))
    toast.success("Theme Change Successfully", {
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
    if(theme === "dark"){
        if(document.body.classList.contains("light-theme")){
            document.body.classList.remove("light-theme");
        }     
    }else{
        document.body.classList.add("light-theme");
    }
    return{
        type:CHANGE_THEME_SUCCESS,
        payload:currentUser
    }
}
export function changeThemeFailed(error){
    return{
        type:CHANGE_THEME_FAILED,
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
export function DELETE_USER_DATA(user){
    return function(dispatch){
        dispatch(deletUserAccount());
        axios.put(baseUrl+"api/user/deleteUserAccount",user)
        .then(re=>{
            dispatch(deletUserAccountSuccuessed())
        })
        .catch(err=>{
            console.log(err)
            dispatch(deletUserAccountFailed(err.response.data.error))
        })
    }
}
export function SETTING_FAV_COMPT_TEAM(username,competetion,team){

    return function(dispatch){
        dispatch(setFavCompAndTeam());
        axios.put(baseUrl+"api/user/updateFavList",{username,competetion,team})
        .then(re=>{
            dispatch(setFavCompAndTeamSuccuessed(re.data.compets,team))         
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
export function SETTING_FAV_NATIONAL_TEAM(username,teamName){

    return function(dispatch){
        dispatch(setFavNationalTeams());
        axios.put(baseUrl+"api/user/setFavNationalTeam",{username,teamName})
        .then(re=>{
            dispatch(setFavNationalTeamsSuccuessed(re.data.team))         
        })
        .catch(err=>{
            console.log(err)
            dispatch(setFavNationalTeamsFailed(err.response.data.error))
        })
    }
}
export function UPDATE_FOLLOWING_TEAMS_LIST(username,competetion,team){

    return function(dispatch){
        dispatch(updateFollowingTeamsList());
        axios.put(baseUrl+"api/user/updateFollwingList/team/ProfilePage",{username,competetion,team})
        .then(re=>{
            dispatch(updateFollowingTeamsListSuccuessed(team,re.data.compets))         
        })
        .catch(err=>{
            dispatch(updateFollowingTeamsListFailed(err.response.data.error))
        })
    }
}
export function UPDATE_FOLLOWING_TEAMS_LIST_BUTTON(username,teamName,teamId){

    return function(dispatch){
        dispatch(updateFollowingTeamsList());
        axios.put(baseUrl+"api/user/updateFollwingList/team/Button",{username,teamName,teamId})
        .then(re=>{
            dispatch(updateFollowingTeamsListSuccuessed(re.data.team,re.data.compets,"btn"))         
        })
        .catch(err=>{
            dispatch(updateFollowingTeamsListFailed(err.response.data.error))
        })
    }
}
export function UPDATE_FOLLOWING_COMPETS_LIST(username,competetion){

    return function(dispatch){
        dispatch(updateFollowingCompetsList());
        axios.put(baseUrl+"api/user/updateFollwingList/compet/ProfilePage",{username,competetion})
        .then(re=>{
            dispatch(updateFollowingCompetsListSuccuessed(competetion))         
        })
        .catch(err=>{
            dispatch(updateFollowingCompetsListFailed(err.response.data.error))
        })
    }
}
export function UPDATE_FOLLOWING_PLAYERS_LIST(username,player){
    return function(dispatch){
        dispatch(updateFollowingPlayersList());
        axios.put(baseUrl+"api/user/updateFollwingList/player/ProfilePage",{username,player})
        .then(re=>{
            dispatch(updateFollowingPlayersListSuccuessed(player))         
        })
        .catch(err=>{
            dispatch(updateFollowingPlayersListFailed(err.response.data.error))
        })
    }
}
export function UPDATE_FOLLOWING_PLAYERS_LIST_BUTTON(username,playerId){
    return function(dispatch){
        dispatch(updateFollowingPlayersList());
        axios.put(baseUrl+"api/user/updateFollwingList/player/Button",{username,playerId})
        .then(re=>{
            dispatch(updateFollowingPlayersListSuccuessed(re.data.player,"button"))         
        })
        .catch(err=>{
            dispatch(updateFollowingPlayersListFailed(err.response.data.error))
        })
    }
}
export function REMOVE_FAVORITE_TEAM(username,teamName){
    return function(dispatch){
        dispatch(removeFavTeam());
        axios.put(baseUrl+"api/user/removeFavTeam/normal",{username,teamName})
        .then(re=>{
            dispatch(removeFavTeamSuccuessed(re.data.message))         
        })
        .catch(err=>{
            dispatch(removeFavTeamFailed(err.response.data.error))
        })
    }
}
export function REMOVE_FAVORITE_NATIONAL_TEAM(username,teamName){
    return function(dispatch){
        dispatch(removeFavNationalTeam());
        axios.put(baseUrl+"api/user/removeFavTeam/national",{username,teamName})
        .then(re=>{
            dispatch(removeFavNationalTeamSuccuessed(re.data.message))         
        })
        .catch(err=>{
            dispatch(removeFavNationalTeamFailed(err.response.data.error))
        })
    }
}
export function REMOVE_FOLLOWED_TEAM(username,teamName){
    return function(dispatch){
        dispatch(removeFollowedTeam());
        axios.put(baseUrl+"api/user/removeFromFollowedList/team",{username,teamName})
        .then(re=>{
            dispatch(removeFollowedTeamSuccuessed(re.data.message,teamName))         
        })
        .catch(err=>{
            dispatch(removeFollowedTeamFailed(err.response.data.error))
        })
    }
}
export function REMOVE_FOLLOWED_COMPET(username,competName){
    return function(dispatch){
        dispatch(removeFollowedCompet());
        axios.put(baseUrl+"api/user/removeFromFollowedList/compet",{username,competName})
        .then(re=>{
            dispatch(removeFollowedCompetSuccuessed(re.data.message,competName))         
        })
        .catch(err=>{
            dispatch(removeFollowedCompetFailed(err.response.data.error))
        })
    }
}
export function REMOVE_FOLLOWED_PLAYER(username,playerName){
    return function(dispatch){
        dispatch(removeFollowedPlayer());
        axios.put(baseUrl+"api/user/removeFromFollowedList/player",{username,playerName})
        .then(re=>{
            dispatch(removeFollowedPlayerSuccuessed(re.data.message,playerName))         
        })
        .catch(err=>{
            dispatch(removeFollowedPlayerFailed(err.response.data.error))
        })
    }
}
export function ADD_TO_USER_BOOKMARK_LIST(username,article){
    return function(dispatch){
        dispatch(updateBookmarkList());
        axios.put(baseUrl+"api/user/updateBookmarksList",{username,article})
        .then(re=>{
            dispatch(updateBookmarkListSuccuessed(re.data.message,article))         
        })
        .catch(err=>{
            dispatch(updateBookmarkListFailed(err.response.data.error))
        })
    }
}
export function REMOVE_FROM_USER_BOOKMARK_LIST(username,articleId){
    return function(dispatch){
        dispatch(removeFromBookmarkList());
        axios.put(baseUrl+"api/user/removeArticleFromBookmarks",{username,articleId})
        .then(re=>{
            dispatch(removeFromBookmarkListSuccuessed(re.data.message,articleId))         
        })
        .catch(err=>{
            dispatch(removeFromBookmarkListFailed(err.response.data.error))
        })
    }
}
export function CHANGE_USER_THEME(username,theme){
    return function(dispatch){
        dispatch(changeTheme());
        axios.put(baseUrl+"api/user/changeTheme",{username,theme})
        .then(re=>{
            dispatch(changeThemeSuccuessed(theme))         
        })
        .catch(err=>{
            dispatch(changeThemeFailed(err.response.data.error))
        })
    }
}