
const axios = require('axios');
const fs = require('fs');

let express=require("express")
let router=express.Router()
const cheerio = require('cheerio');  // new addition

const espnUrl = `https://www.espn.com`;
const allTeams=require("../webScrappingESPN/tournsAndTeams/allLeaguesTeams.json");
const allCompet=require("../webScrappingESPN/tournsAndTeams/allComptetion.json")
const moment=require("moment")
const { getLocalTime }=require("./tourns.js")

async function getPreMatchData(container,$){
    try{
        let matchData={}
        matchData.status="Not Started"
    
        let header=$(container).find(".Gamestrip ")
        matchData.competName=$(header).find(".ScoreCell__GameNote ").text()
        let teamsContainer=$(header).find(".Gamestrip__Competitors ")
    
        matchData.homeTeam={}
        let homeTeamContainer=$(teamsContainer).find(".Gamestrip__Team:first-of-type")
        let homeTeamColorBlock=$(homeTeamContainer).find(".LogoEnhanced").attr("style").split(":")
        let homeTeamColorBlock2=$(homeTeamContainer).find(".SkewedLine--1").attr("style").split(":")
        let homeTeamColorBlock3=$(homeTeamContainer).find(".SkewedLine--2").attr("style").split(":")
        matchData.homeTeam.color1=homeTeamColorBlock[1]
        matchData.homeTeam.color2=homeTeamColorBlock2[1]
        matchData.homeTeam.color3=homeTeamColorBlock3[1]
        let homeTeamInfo=$(homeTeamContainer).find(".Gamestrip__Info ")
        let homeTeamAddress=$(homeTeamInfo).find(".Gamestrip__InfoWrapper a")
        if(homeTeamAddress.length > 0){
            let teamHref=$(homeTeamAddress).attr("href").split("/")
            matchData.homeTeam.id=teamHref[teamHref.length - 2]
            matchData.homeTeam.slug=teamHref[teamHref.length - 1]
            matchData.homeTeam.name=$(homeTeamAddress).text()
        }else{
            matchData.homeTeam.id=null
            matchData.homeTeam.slug=null
            matchData.homeTeam.name=$(homeTeamInfo).find(".Gamestrip__InfoWrapper").text()
        }
        let homeTeamRecord=$(homeTeamInfo).find(".Gamestrip__Record ").text()
        matchData.homeTeam.record=homeTeamRecord
    
        matchData.awayTeam={}
        let awayTeamContainer=$(teamsContainer).find(".Gamestrip__Team:last-of-type")
        let awayTeamColorBlock=$(awayTeamContainer).find(".LogoEnhanced").attr("style").split(":")
        let awayTeamColoBlock2=$(awayTeamContainer).find(".SkewedLine--1").attr("style").split(":")
        let awayTeamColoBlock3=$(awayTeamContainer).find(".SkewedLine--2").attr("style").split(":")
        matchData.awayTeam.color1=awayTeamColorBlock[1]
        matchData.awayTeam.color2=awayTeamColoBlock2[1]
        matchData.awayTeam.color3=awayTeamColoBlock3[1]
        
        let awayTeamInfo=$(awayTeamContainer).find(".Gamestrip__Info ")
        let awayteamAddress=$(awayTeamInfo).find(".Gamestrip__InfoWrapper a")
        if(awayteamAddress.length > 0){
            let teamHref=$(awayteamAddress).attr("href").split("/")
            matchData.awayTeam.id=teamHref[teamHref.length - 2]
            matchData.awayTeam.slug=teamHref[teamHref.length - 1]
            matchData.awayTeam.name=$(awayteamAddress).text()
        }else{
            matchData.awayTeam.id=null
            matchData.awayTeam.slug=null
            matchData.awayTeam.name=$(awayTeamInfo).find(".Gamestrip__InfoWrapper").text()
        }
        let awayTeamRecord=$(awayTeamInfo).find(".Gamestrip__Record ").text()
        matchData.awayTeam.record=awayTeamRecord
    
        let dateAndTimeBlock=$(teamsContainer).find(".Gamestrip__Overview__Wrapper .Gamestrip__Overview ")
        matchData.date=$(dateAndTimeBlock).find(".ScoreCell__ScoreDate ").text()
    
    
        matchData.navItems=[]
        let barBlock=$(container).find("nav.Nav__Secondary .Nav__Secondary__Menu")
        $(barBlock).find("li").each(async(index,li)=>{
            if(index === 0 ){
                let text=$(li).find("a").text()
                let slug="summary"
                matchData.navItems.push({text,slug})
            }else{
                let link=$(li).find("a")
                let href=$(link).attr("href").split("/")
                let text=$(link).text()
                let slug=href[2]
                matchData.navItems.push({text,slug})
            }
        })
    
        let mainContainer=$(container).find(".PageLayout  ")
    
        let leftSideContainer=$(mainContainer).find(".PageLayout__LeftAside")
        let teamStatsBlock=$(leftSideContainer).find(".theme-light  section")
        let teamStatsHeader=$(teamStatsBlock).find("div.Kiog:not(.LOSQp)")
        matchData.homeTeam.shortName=$(teamStatsHeader).find("a:nth-child(1) span").text()
        matchData.awayTeam.shortName=$(teamStatsHeader).find("a:nth-child(2) span").text()
        matchData.teamStats=[]
        $(teamStatsBlock).find("div.LOSQp ").each(async(i,elem)=>{
            let stats={}
            stats.name=$(elem).find("span.OkRBU ").text()
            stats.homeTeamStat=$(elem).find(".UGvDX:nth-child(2) span.bLeWt").text()
            stats.awayTeamStat=$(elem).find(".UGvDX:nth-child(3) span.bLeWt").text()
            matchData.teamStats.push(stats)
        })
        matchData.locationInfo={}
        let gameInformationBlock=$(leftSideContainer).find(".GameInfo .ContentList__Item")
        matchData.locationInfo.stadium=$(gameInformationBlock).find(".ContentList__Item:nth-child(1) .GameInfo__Location").text()
        let originalTimeAndDate=$(gameInformationBlock).find(".ContentList__Item:nth-child(1) .GameInfo__Meta span:first-of-type").text().split(",")
        if(originalTimeAndDate[0] !== "FT" && originalTimeAndDate[0] !== "LIVE" && originalTimeAndDate[0] !=="Postponed" && originalTimeAndDate[0] !=="Canceled" && originalTimeAndDate[0] !=="TBD"){
            let localTime=getLocalTime(originalTimeAndDate[0])
            originalTimeAndDate[0]=localTime
            matchData.time=localTime
        }else{
            matchData.time=originalTimeAndDate[0]
        }
       
        matchData.locationInfo.timeAndDate=originalTimeAndDate.join(",")
        matchData.locationInfo.city=$(gameInformationBlock).find(".ContentList__Item:nth-child(2) .Location__Text").text()
    
        let centerContainer=$(mainContainer).find(".PageLayout__Main")
        matchData.gameStory={}
        let isGameStoryExists=false
        let GameStory=$(centerContainer).find("section.GameStory") 
    
        if(GameStory.length > 0){
            let previewContent=$(GameStory).find(".Card__Content:last-of-type")
            matchData.gameStory.title=$(previewContent).find("h2").text() 
            matchData.gameStory.content=$(previewContent).find(".contentItem__subhead:nth-child(2)").text() 
            matchData.gameStory.dateAndTime=$(previewContent).find(".contentItem__subhead:nth-child(3)").text() 
            isGameStoryExists=true
        }
      
        matchData.topScorers={
            homeTeamScorers:[],
            awayTeamScorers:[]
        }
        matchData.mostAssisters={
            homeTeamAssisters:[],
            awayTeamAssisters:[]
        }
        let TopScorersContainer;
        let MostAssistsContainer;
        if(isGameStoryExists ){
            TopScorersContainer=$(centerContainer).find(".ResponsiveWrapper:nth-child(2) .Card__Content")
            MostAssistsContainer=$(centerContainer).find(".ResponsiveWrapper:nth-child(3) .Card__Content")
        }else{
            TopScorersContainer=$(centerContainer).find(".ResponsiveWrapper:nth-child(1) .Card__Content")
            MostAssistsContainer=$(centerContainer).find(".ResponsiveWrapper:nth-child(2) .Card__Content")
        }
    
        $(TopScorersContainer).find(".ContentList .ContentList__Item").each(async (i,subContainer)=>{
            $(subContainer).find(".SoccerLeaders__Leaders a").each(async (i2,elem)=>{
                let player={}
                let playerHref=$(elem).attr("href").split("/")
                player.id=playerHref[playerHref.length - 2]
                player.slug=playerHref[playerHref.length - 1]
                let jersyInfoBlock=$(elem).find(".jerseyV2 ")
                player.jersyColor=$(jersyInfoBlock).find("svg path:first-of-type").attr("fill")
                player.number=$(jersyInfoBlock).find(".headshot-jerseyV2__player-number").text()
                player.name=$(elem).find(".Athlete__PlayerName").text()
                player.allStats=$(elem).find(".Athlete__Stats ").text().split("\n")
                if(i === 0){
                    matchData.topScorers.homeTeamScorers.push(player)
                }else if(i === 1){
                    matchData.topScorers.awayTeamScorers.push(player)
                }
            })
        })
    
        $(MostAssistsContainer).find(".ContentList .ContentList__Item").each(async (i,subContainer)=>{
            $(subContainer).find(".SoccerLeaders__Leaders a").each(async (i2,elem)=>{
                let player={}
                let playerHref=$(elem).attr("href").split("/")
                player.id=playerHref[playerHref.length - 2]
                player.slug=playerHref[playerHref.length - 1]
                let jersyInfoBlock=$(elem).find(".jerseyV2 ")
                player.jersyColor=$(jersyInfoBlock).find("svg path:first-of-type").attr("fill")
                player.number=$(jersyInfoBlock).find(".headshot-jerseyV2__player-number").text()
                player.name=$(elem).find(".Athlete__PlayerName").text()
                player.allStats=$(elem).find(".Athlete__Stats ").text().split("\n")
                if(i === 0){
                    matchData.mostAssisters.homeTeamAssisters.push(player)
                }else if(i === 1){
                    matchData.mostAssisters.awayTeamAssisters.push(player)
                }
            })
        })
        let lastMatches=$(centerContainer).find("section.MatchFormTable .Card__Content") 
        matchData.lastMatches=[]
        if(lastMatches.length > 0){
            $(lastMatches).find(".Table__Scroller .Table__TBODY tr").each(async (i,elem)=>{
                let match={}
                match.homeTeam={}
                match.awayTeam={}
                let homeTeamBlock=$(elem).find("td:nth-child(1) a")
        
                if(homeTeamBlock.length > 0){
                    match.homeTeam.name=homeTeamBlock.text()
                  let homeTeamHref=homeTeamBlock.attr("href").split("/")
                  match.homeTeam.id=homeTeamHref[homeTeamHref.length - 2]
                  match.homeTeam.slug=homeTeamHref[homeTeamHref.length - 1]
                }else{
                    match.homeTeam.name=$(elem).find("td:nth-child(1)").text()
                    match.homeTeam.id=null
                    match.homeTeam.slug=null
                }
    
    
                let awayTeamBlock=$(elem).find("td:nth-child(5) a")
        
                if(awayTeamBlock.length > 0){
                    match.awayTeam.name=awayTeamBlock.text()
                    let awayTeamHref=awayTeamBlock.attr("href").split("/")
                    match.awayTeam.id=awayTeamHref[awayTeamHref.length - 2]
                    match.awayTeam.slug=awayTeamHref[awayTeamHref.length - 1]
                }else{
                    match.awayTeam.name=$(elem).find("td:nth-child(5)").text()
                    match.awayTeam.id=null
                    match.awayTeam.slug=null
                }
    
                let matchLink=$(elem).find("td:nth-child(3) a").attr("href").split("/")
                match.id=matchLink[matchLink.length - 2]
                match.slug=matchLink[matchLink.length - 1]
                match.score=$(elem).find("td:nth-child(3) a").text()
                match.date=$(elem).find("td:nth-child(6)").text()
                match.compet=$(elem).find("td:nth-child(7)").text()
                matchData.lastMatches.push(match)
            })
        }
        let rightSideContainer=$(mainContainer).find(".PageLayout__RightAside")
        let standingTableBlock=$(rightSideContainer).find("section.TeamStandings")
        matchData.currentCompet={}
        if(standingTableBlock.length > 0){
            matchData.currentCompet.name=$(standingTableBlock).find("header h3").text()
            matchData.currentCompet.clubsList=[]
            $(standingTableBlock).find(".Card__Content table tbody tr").each(async (i, elem3) => {
                let CompetTeam={}
                let teamHref=$(elem3).find("td:nth-child(1) a").attr("href").split("/")
                CompetTeam.name=$(elem3).find("td:nth-child(1) a").text()
                CompetTeam.id=teamHref[teamHref.length - 2]
                CompetTeam.slug=teamHref[teamHref.length - 1]
                CompetTeam.GP=$(elem3).find("td:nth-child(2)").text()
                CompetTeam.W=$(elem3).find("td:nth-child(3)").text()
                CompetTeam.D=$(elem3).find("td:nth-child(4)").text()
                CompetTeam.L=$(elem3).find("td:nth-child(5)").text()
                CompetTeam.GD=$(elem3).find("td:nth-child(6)").text()
                CompetTeam.P=$(elem3).find("td:nth-child(7)").text()
                matchData.currentCompet.clubsList.push(CompetTeam)
            })
        }
        return {
            status:200,            
            matchData
        };
    }catch(error){
        return {
            status:400,
            error:error
        }
    }
}
async function getPostMatchData(gameId,gameSlug,container,$){
    try{
        let matchData={}
        matchData.status="Finished"
    
        let header=$(container).find(".Gamestrip ")
        matchData.competName=$(header).find(".ScoreCell__GameNote ").text()
        let teamsContainer=$(header).find(".Gamestrip__Competitors ")
    
        matchData.homeTeam={}
        let homeTeamContainer=$(teamsContainer).find(".Gamestrip__Team:first-of-type")
        let homeTeamColorBlock=$(homeTeamContainer).find(".LogoEnhanced").attr("style").split(":")
        let homeTeamColorBlock2=$(homeTeamContainer).find(".SkewedLine--1").attr("style").split(":")
        let homeTeamColorBlock3=$(homeTeamContainer).find(".SkewedLine--2").attr("style").split(":")
        matchData.homeTeam.color1=homeTeamColorBlock[1]
        matchData.homeTeam.color2=homeTeamColorBlock2[1]
        matchData.homeTeam.color3=homeTeamColorBlock3[1]
        let homeTeamInfo=$(homeTeamContainer).find(".Gamestrip__Info ")
        let homeTeamAddress=$(homeTeamInfo).find(".Gamestrip__InfoWrapper a")
        if(homeTeamAddress.length > 0){
            let teamHref=$(homeTeamAddress).attr("href").split("/")
            matchData.homeTeam.id=teamHref[teamHref.length - 2]
            matchData.homeTeam.slug=teamHref[teamHref.length - 1]
            matchData.homeTeam.name=$(homeTeamAddress).text()
        }else{
            matchData.homeTeam.id=null
            matchData.homeTeam.slug=null
            matchData.homeTeam.name=$(homeTeamInfo).find(".Gamestrip__InfoWrapper").text()
        }
        let homeTeamRecord=$(homeTeamInfo).find(".Gamestrip__Record ").text()
        matchData.homeTeam.record=homeTeamRecord
        $(homeTeamContainer).find('.Gamestrip__Score svg ').remove();
        matchData.homeTeam.score=$(homeTeamContainer).find(".Gamestrip__Score:not(svg) ").text()
    
        matchData.awayTeam={}
        let awayTeamContainer=$(teamsContainer).find(".Gamestrip__Team:last-of-type")
        let awayTeamColorBlock=$(awayTeamContainer).find(".LogoEnhanced").attr("style").split(":")
        let awayTeamColoBlock2=$(awayTeamContainer).find(".SkewedLine--1").attr("style").split(":")
        let awayTeamColoBlock3=$(awayTeamContainer).find(".SkewedLine--2").attr("style").split(":")
        matchData.awayTeam.color1=awayTeamColorBlock[1]
        matchData.awayTeam.color2=awayTeamColoBlock2[1]
        matchData.awayTeam.color3=awayTeamColoBlock3[1]
        
        let awayTeamInfo=$(awayTeamContainer).find(".Gamestrip__Info ")
        let awayteamAddress=$(awayTeamInfo).find(".Gamestrip__InfoWrapper a")
        if(awayteamAddress.length > 0){
            let teamHref=$(awayteamAddress).attr("href").split("/")
            matchData.awayTeam.id=teamHref[teamHref.length - 2]
            matchData.awayTeam.slug=teamHref[teamHref.length - 1]
            matchData.awayTeam.name=$(awayteamAddress).text()
        }else{
            matchData.awayTeam.id=null
            matchData.awayTeam.slug=null
            matchData.awayTeam.name=$(awayTeamInfo).find(".Gamestrip__InfoWrapper").text()
        }
        let awayTeamRecord=$(awayTeamInfo).find(".Gamestrip__Record ").text()
        matchData.awayTeam.record=awayTeamRecord
        $(awayTeamContainer).find('.Gamestrip__Score svg ').remove();
        matchData.awayTeam.score=$(awayTeamContainer).find(".Gamestrip__Score:not(svg) ").text()
    
        let dateAndTimeBlock=$(teamsContainer).find(".Gamestrip__Overview__Wrapper .Gamestrip__Overview ")
        matchData.date=$(dateAndTimeBlock).find(".ScoreCell__ScoreDate ").text()
    
        let eventContainer=$(container).find(".SoccerPerformers  ")
        matchData.homeTeam.events={
            goals:[],
            redCards:[]
        }
        let homeTeamEventContainer=$(eventContainer).find(".SoccerPerformers__Competitor--left")
        $(homeTeamEventContainer).find(".SoccerPerformers__Competitor__Info").each(async(i,elem)=>{
            
            let hasGoals=$(elem).find("svg.SoccerPerformers__GoalIcon ")
            if(hasGoals.length > 0){
                $(elem).find("ul li").each(async(i2,elem2)=>{
                    let playerName=$(elem2).find(".Soccer__PlayerName").text().trim()
                    let goalTime=$(elem2).find(".GoalScore__Time").text().trim()
                    matchData.homeTeam.events.goals.push({playerName,goalTime})
                })
            }
            let hasRCs=$(elem).find("svg.SoccerPerformers__RedCardIcon  ")
            if(hasRCs.length > 0){
                $(elem).find("ul li").each(async(i2,elem2)=>{
                    let playerName=$(elem2).find(".Soccer__PlayerName").text().trim()
                    let rcTime=$(elem2).find(".GoalScore__Time").text().trim()
                    matchData.homeTeam.events.redCards.push({playerName,rcTime})
                })
            }
        })
        matchData.awayTeam.events={
            goals:[],
            redCards:[]
        }
        let awayTeamEventContainer=$(eventContainer).find(".SoccerPerformers__Competitor--right")
        $(awayTeamEventContainer).find(".SoccerPerformers__Competitor__Info").each(async(i,elem)=>{
            let hasGoals=$(elem).find("svg.SoccerPerformers__GoalIcon")
            if(hasGoals.length > 0){
                $(elem).find("ul li").each(async(i2,elem2)=>{
                    let playerName=$(elem2).find(".Soccer__PlayerName").text().trim()
                    let goalTime=$(elem2).find(".GoalScore__Time").text().trim()
                    matchData.awayTeam.events.goals.push({playerName,goalTime})
                })
            }
            let hasRCs=$(elem).find("svg.SoccerPerformers__RedCardIcon")
            if(hasRCs.length > 0){
                $(elem).find("ul li").each(async(i2,elem2)=>{
                    let playerName=$(elem2).find(".Soccer__PlayerName").text().trim()
                    let rcTime=$(elem2).find(".GoalScore__Time").text().trim()
                    matchData.awayTeam.events.redCards.push({playerName,rcTime})
                })
            }
        })
    
    
    
        matchData.navItems=[]
        let barBlock=$(container).find("nav.Nav__Secondary .Nav__Secondary__Menu")
        $(barBlock).find("li").each(async(index,li)=>{
            if(index === 0 ){
                let text=$(li).find("a").text()
                let slug="summary"
                matchData.navItems.push({text,slug})
            }else{
                let link=$(li).find("a")
                let href=$(link).attr("href").split("/")
                let text=$(link).text()
                let slug=href[2]
                matchData.navItems.push({text,slug})
            }
        })
    
        let mainContainer=$(container).find(".PageLayout  ")
    
        let leftSideContainer=$(mainContainer).find(".PageLayout__LeftAside")
    
    
        matchData.locationInfo={}
        let gameInformationBlock=$(leftSideContainer).find(".GameInfo .ContentList__Item")
        matchData.locationInfo.stadium=$(gameInformationBlock).find(".ContentList__Item:nth-child(1) .GameInfo__Location").text()
        let originalTimeAndDate=$(gameInformationBlock).find(".ContentList__Item:nth-child(1) .GameInfo__Meta span:first-of-type").text().split(",")
    
        let localTime=getLocalTime(originalTimeAndDate[0])
        originalTimeAndDate[0]=localTime
        matchData.time=localTime
        matchData.locationInfo.timeAndDate=originalTimeAndDate.join(",")
        matchData.locationInfo.city=$(gameInformationBlock).find(".ContentList__Item:nth-child(2) .Location__Text").text()
    
        let centerContainer=$(mainContainer).find(".PageLayout__Main")
        matchData.gameStory={}
        let GameStory=$(centerContainer).find("section.GameStory") 
    
        if(GameStory.length > 0){
            let previewContent=$(GameStory).find(".Card__Content:last-of-type")
            matchData.gameStory.title=$(previewContent).find("h2").text() 
            matchData.gameStory.content=$(previewContent).find(".contentItem__subhead:nth-child(2)").text() 
            matchData.gameStory.dateAndTime=$(previewContent).find(".contentItem__subhead:nth-child(3)").text() 
        }
        matchData.timeLine=[]
        let Timeline=$(centerContainer).find("section.Timeline .Wrapper .Timeline__Content") 
        $(Timeline).find("ul li").each(async(i,elem)=>{
            let matchEvents={
                time:"",
                events:{
                    homeTeam:[],
                    awayTeam:[],
                },style:{
                    left:""
                }
            }
            let event={
                type:"",
            }
            let team="";
            if(i != 0 && i!=  $(Timeline).find("ul li").length - 1){
                if($(elem).find("svg").length > 0){
                    let svgType=$(elem).find("svg use").attr("href")
                    if(svgType === "#icon__soccer__penalty_shot"){
                        if($(elem).find("svg.IconSoccer--PenaltyMissed").length > 0){
                            event.type="Missed Penalty"
                        }else{
                            event.type="Goal"
                        }
                    }else if(svgType === "#icon__soccer__substitution"){
                        event.type="Subs"
                    }else if(svgType === "#icon__soccer__card"){
                        if($(elem).find("svg.IconSoccer--YellowCard").length > 0){
                            event.type="Yellow Card"
                        }else{
                            event.type="Red Card"
                        }
                    }
                    let teamType=$(elem).find(".Timeline__Content__Match__Progress__Events__Event__Details--homeTeam")
                    if(teamType.length > 0){
                        team="homeTeam"
                    }else{
                        team="awayTeam"
                    }
                }else{         
                    event.type="Half Time"
                }
    
                matchEvents.time=$(elem).find(".Timeline__Content__Match__Progress__Events__Event__Time").text()
                
            }else{
                if(i == 0){
                    event.type="Start Time"
                    matchEvents.time="KO"
                }else{
                    event.type="End Time"
                    matchEvents.time="FT"
                }
            }
          
            let styleBLock=$(elem).attr("style").split(";")
            if(styleBLock.length == 2){
                matchEvents.style.left=styleBLock[0].split(":")[1]
            }else{
                matchEvents.style.left=styleBLock[0].split(":")[1]
            }
    
          
            let existEventIndex = matchData.timeLine.findIndex((ele) => ele.time === matchEvents.time);
            if(existEventIndex !== -1){
                if(team === "homeTeam"){
                    matchData.timeLine[existEventIndex].events.homeTeam.push(event)
                }else{
                    matchData.timeLine[existEventIndex].events.awayTeam.push(event)
                }
            }else{
                if(team === "homeTeam"){
                    matchEvents.events.homeTeam.push(event)
                }else{
                    matchEvents.events.awayTeam.push(event)
                }
                matchData.timeLine.push(matchEvents)
            }
        })
        let gameCommentary=$(centerContainer).find("section.MatchCommentary .Wrapper table") 
        matchData.gameCommentary=[]
        $(gameCommentary).find("tbody tr").each(async(i,elem)=>{
            let contentContainer=$(elem).find(".MatchCommentary__Comment")
            let comment={
                time:"",
                type:"",
                content:"",
                event:""
            }
            comment.time=$(contentContainer).find(".MatchCommentary__Comment__Timestamp").text()
            comment.content=$(contentContainer).find(".MatchCommentary__Comment__GameDetails").text()
            if($(contentContainer).find("svg").length > 0){
                comment.type="keyEvent"
                let svgType=$(contentContainer).find("svg use").attr("href")
                if(svgType === "#icon__soccer__penalty_shot"){                   
                    comment.event="Goal"
                }else if(svgType === "#icon__soccer__substitution"){
                    comment.event="Subs"
                }else if(svgType === "#icon__soccer__card"){
                    if($(elem).find("svg.MatchCommentary__Comment__PlayIcon__Icon--YellowCard").length > 0){
                        comment.event="Yellow Card"
                    }else{
                        comment.event="Red Card"
                    }
                }else if(svgType ==="#icon__soccer__foul"){
                    comment.event="Foul"
                }else if(svgType ==="#icon__soccer__time_possession"){
                    comment.event="Time"
                }else if(svgType ==="#icon__soccer__missed_penalty" || svgType === "#icon__soccer__shot"){
                    comment.event="Missed Chance"
                }else if(svgType ==="#icon__soccer__corner_kick"){
                    comment.event="Corner Kick"
                }else if(svgType ==="#icon__soccer__save"){
                    comment.event="Keeper Save"
                }else if(svgType ==="#icon__soccer__off_sides"){
                    comment.event="Offside"
                }
            }else{
                comment.type="normalComment"
            }
            matchData.gameCommentary.push(comment)
        })
        let teamStatsBlock=$(centerContainer).find(".theme-light  section")
        let teamStatsHeader=$(teamStatsBlock).find("div.Kiog:not(.LOSQp)")
        matchData.homeTeam.shortName=$(teamStatsHeader).find("a:nth-child(1) span").text()
        matchData.awayTeam.shortName=$(teamStatsHeader).find("a:nth-child(2) span").text()
        matchData.teamStats=[]
        $(teamStatsBlock).find("div.LOSQp ").each(async(i,elem)=>{
            let stats={}
            stats.name=$(elem).find("span.OkRBU ").text()
            if(i === 0){ 
                stats.homeTeamStat=$(elem).find(".mLASH span.bLeWt:first-of-type").text()
                stats.awayTeamStat=$(elem).find(".mLASH span.bLeWt:last-of-type").text()
            }else{
                stats.homeTeamStat=$(elem).find(".UGvDX:nth-child(2) span.bLeWt").text()
                stats.awayTeamStat=$(elem).find(".UGvDX:nth-child(3) span.bLeWt").text()
            }
            
            
         
            matchData.teamStats.push(stats)
        })
    
        let rightSideContainer=$(mainContainer).find(".PageLayout__RightAside")
        let standingTableBlock=$(rightSideContainer).find("section.TeamStandings")
        matchData.currentCompet={}
        if(standingTableBlock.length > 0){
            matchData.currentCompet.name=$(standingTableBlock).find("header h3").text()
            matchData.currentCompet.clubsList=[]
            $(standingTableBlock).find(".Card__Content table tbody tr").each(async (i, elem3) => {
                let CompetTeam={}
                let teamHref=$(elem3).find("td:nth-child(1) a").attr("href").split("/")
                CompetTeam.name=$(elem3).find("td:nth-child(1) a").text()
                CompetTeam.id=teamHref[teamHref.length - 2]
                CompetTeam.slug=teamHref[teamHref.length - 1]
                CompetTeam.GP=$(elem3).find("td:nth-child(2)").text()
                CompetTeam.W=$(elem3).find("td:nth-child(3)").text()
                CompetTeam.D=$(elem3).find("td:nth-child(4)").text()
                CompetTeam.L=$(elem3).find("td:nth-child(5)").text()
                CompetTeam.GD=$(elem3).find("td:nth-child(6)").text()
                CompetTeam.P=$(elem3).find("td:nth-child(7)").text()
                matchData.currentCompet.clubsList.push(CompetTeam)
            })
        }
        let lineUpData=await getMatchLineUpData(gameId,"summary")
        if(lineUpData.status !== 200){
            return lineUpData
        }
        matchData.lineUps=lineUpData.data
        return {
            status:200,            
            matchData
        };
    }catch(error){
        return {
            status:400,            
            error:error
        };
    }
   
}
async function getLiveMatchData(gameId,gameSlug,container,$){
    try{
        let matchData={}
        matchData.status="Live"

        let header=$(container).find(".Gamestrip ")
        matchData.competName=$(header).find(".ScoreCell__GameNote ").text()
        let teamsContainer=$(header).find(".Gamestrip__Competitors ")

        matchData.homeTeam={}
        let homeTeamContainer=$(teamsContainer).find(".Gamestrip__Team:first-of-type")
        let homeTeamColorBlock=$(homeTeamContainer).find(".LogoEnhanced").attr("style").split(":")
        let homeTeamColorBlock2=$(homeTeamContainer).find(".SkewedLine--1").attr("style").split(":")
        let homeTeamColorBlock3=$(homeTeamContainer).find(".SkewedLine--2").attr("style").split(":")
        matchData.homeTeam.color1=homeTeamColorBlock[1]
        matchData.homeTeam.color2=homeTeamColorBlock2[1]
        matchData.homeTeam.color3=homeTeamColorBlock3[1]
        let homeTeamInfo=$(homeTeamContainer).find(".Gamestrip__Info ")
        let homeTeamAddress=$(homeTeamInfo).find(".Gamestrip__InfoWrapper a")
        if(homeTeamAddress.length > 0){
            let teamHref=$(homeTeamAddress).attr("href").split("/")
            matchData.homeTeam.id=teamHref[teamHref.length - 2]
            matchData.homeTeam.slug=teamHref[teamHref.length - 1]
            matchData.homeTeam.name=$(homeTeamAddress).text()
        }else{
            matchData.homeTeam.id=null
            matchData.homeTeam.slug=null
            matchData.homeTeam.name=$(homeTeamInfo).find(".Gamestrip__InfoWrapper").text()
        }
        let homeTeamRecord=$(homeTeamInfo).find(".Gamestrip__Record ").text()
        matchData.homeTeam.record=homeTeamRecord
        $(homeTeamContainer).find('.Gamestrip__Score svg ').remove();
        matchData.homeTeam.score=$(homeTeamContainer).find(".Gamestrip__Score:not(svg) ").text()

        matchData.awayTeam={}
        let awayTeamContainer=$(teamsContainer).find(".Gamestrip__Team:last-of-type")
        let awayTeamColorBlock=$(awayTeamContainer).find(".LogoEnhanced").attr("style").split(":")
        let awayTeamColoBlock2=$(awayTeamContainer).find(".SkewedLine--1").attr("style").split(":")
        let awayTeamColoBlock3=$(awayTeamContainer).find(".SkewedLine--2").attr("style").split(":")
        matchData.awayTeam.color1=awayTeamColorBlock[1]
        matchData.awayTeam.color2=awayTeamColoBlock2[1]
        matchData.awayTeam.color3=awayTeamColoBlock3[1]
        
        let awayTeamInfo=$(awayTeamContainer).find(".Gamestrip__Info ")
        let awayteamAddress=$(awayTeamInfo).find(".Gamestrip__InfoWrapper a")
        if(awayteamAddress.length > 0){
            let teamHref=$(awayteamAddress).attr("href").split("/")
            matchData.awayTeam.id=teamHref[teamHref.length - 2]
            matchData.awayTeam.slug=teamHref[teamHref.length - 1]
            matchData.awayTeam.name=$(awayteamAddress).text()
        }else{
            matchData.awayTeam.id=null
            matchData.awayTeam.slug=null
            matchData.awayTeam.name=$(awayTeamInfo).find(".Gamestrip__InfoWrapper").text()
        }
        let awayTeamRecord=$(awayTeamInfo).find(".Gamestrip__Record ").text()
        matchData.awayTeam.record=awayTeamRecord
        $(awayTeamContainer).find('.Gamestrip__Score svg ').remove();
        matchData.awayTeam.score=$(awayTeamContainer).find(".Gamestrip__Score:not(svg) ").text()

        let dateAndTimeBlock=$(teamsContainer).find(".Gamestrip__Overview__Wrapper .Gamestrip__Overview ")
        matchData.date=$(dateAndTimeBlock).find(".ScoreCell__ScoreDate ").text()
    
        let eventContainer=$(container).find(".SoccerPerformers  ")
        matchData.homeTeam.events={
            goals:[],
            redCards:[]
        }
        let homeTeamEventContainer=$(eventContainer).find(".SoccerPerformers__Competitor--left")
        $(homeTeamEventContainer).find(".SoccerPerformers__Competitor__Info").each(async(i,elem)=>{
            
            let hasGoals=$(elem).find("svg.SoccerPerformers__GoalIcon ")
            if(hasGoals.length > 0){
                $(elem).find("ul li").each(async(i2,elem2)=>{
                    let playerName=$(elem2).find(".Soccer__PlayerName").text().trim()
                    let goalTime=$(elem2).find(".GoalScore__Time").text().trim()
                    matchData.homeTeam.events.goals.push({playerName,goalTime})
                })
            }
            let hasRCs=$(elem).find("svg.SoccerPerformers__RedCardIcon  ")
            if(hasRCs.length > 0){
                $(elem).find("ul li").each(async(i2,elem2)=>{
                    let playerName=$(elem2).find(".Soccer__PlayerName").text().trim()
                    let rcTime=$(elem2).find(".GoalScore__Time").text().trim()
                    matchData.homeTeam.events.redCards.push({playerName,rcTime})
                })
            }
        })
        matchData.awayTeam.events={
            goals:[],
            redCards:[]
        }
        let awayTeamEventContainer=$(eventContainer).find(".SoccerPerformers__Competitor--right")
        $(awayTeamEventContainer).find(".SoccerPerformers__Competitor__Info").each(async(i,elem)=>{
            let hasGoals=$(elem).find("svg.SoccerPerformers__GoalIcon")
            if(hasGoals.length > 0){
                $(elem).find("ul li").each(async(i2,elem2)=>{
                    let playerName=$(elem2).find(".Soccer__PlayerName").text().trim()
                    let goalTime=$(elem2).find(".GoalScore__Time").text().trim()
                    matchData.awayTeam.events.goals.push({playerName,goalTime})
                })
            }
            let hasRCs=$(elem).find("svg.SoccerPerformers__RedCardIcon")
            if(hasRCs.length > 0){
                $(elem).find("ul li").each(async(i2,elem2)=>{
                    let playerName=$(elem2).find(".Soccer__PlayerName").text().trim()
                    let rcTime=$(elem2).find(".GoalScore__Time").text().trim()
                    matchData.awayTeam.events.redCards.push({playerName,rcTime})
                })
            }
        })

        matchData.navItems=[]
        let barBlock=$(container).find("nav.Nav__Secondary .Nav__Secondary__Menu")
        $(barBlock).find("li").each(async(index,li)=>{
            if(index === 0 ){
                let text=$(li).find("a").text()
                let slug="summary"
                matchData.navItems.push({text,slug})
            }else{
                let link=$(li).find("a")
                let href=$(link).attr("href").split("/")
                let text=$(link).text()
                let slug=href[2]
                matchData.navItems.push({text,slug})
            }
        })

        let mainContainer=$(container).find(".PageLayout  ")

        let leftSideContainer=$(mainContainer).find(".PageLayout__LeftAside")


        matchData.locationInfo={}
        let gameInformationBlock=$(leftSideContainer).find(".GameInfo .ContentList__Item")
        matchData.locationInfo.stadium=$(gameInformationBlock).find(".ContentList__Item:nth-child(1) .GameInfo__Location").text()
        let originalTimeAndDate=$(gameInformationBlock).find(".ContentList__Item:nth-child(1) .GameInfo__Meta span:first-of-type").text().split(",")

        let localTime=getLocalTime(originalTimeAndDate[0])
        originalTimeAndDate[0]=localTime
        matchData.time=localTime
        matchData.locationInfo.timeAndDate=originalTimeAndDate.join(",")
        matchData.locationInfo.city=$(gameInformationBlock).find(".ContentList__Item:nth-child(2) .Location__Text").text()

        let centerContainer=$(mainContainer).find(".PageLayout__Main")
        matchData.gameStory={}
        let GameStory=$(centerContainer).find("section.GameStory") 

        if(GameStory.length > 0){
            let previewContent=$(GameStory).find(".Card__Content:last-of-type")
            matchData.gameStory.title=$(previewContent).find("h2").text() 
            matchData.gameStory.content=$(previewContent).find(".contentItem__subhead:nth-child(2)").text() 
            matchData.gameStory.dateAndTime=$(previewContent).find(".contentItem__subhead:nth-child(3)").text() 
        }
        matchData.timeLine=[]
        let Timeline=$(centerContainer).find("section.Timeline .Wrapper .Timeline__Content") 
        let barLengthContainer=$(Timeline).find(".Timeline__Content__Match__Progress__ProgressBarWrapper").attr("style").split(":")[1]
        matchData.timeLineLength=barLengthContainer.slice(5,barLengthContainer.length - 1)
        let firsttimeContainer=matchData.timeLineLength.split("% +")[0].trim()
        let secondTimeContainer=parseInt(firsttimeContainer)
        matchData.matchTime=(parseInt(secondTimeContainer) * 90) / 100
        $(Timeline).find("ul li").each(async(i,elem)=>{
            let matchEvents={
                time:"",
                events:{
                    homeTeam:[],
                    awayTeam:[],
                },style:{
                    left:""
                }
            }
            let event={
                type:"",
            }
            let team="";
            if(i != 0 && i!=  $(Timeline).find("ul li").length - 1){
                if($(elem).find("svg").length > 0){
                    let svgType=$(elem).find("svg use").attr("href")
                    if(svgType === "#icon__soccer__penalty_shot"){
                        if($(elem).find("svg.IconSoccer--PenaltyMissed").length > 0){
                            event.type="Missed Penalty"
                        }else{
                            event.type="Goal"
                        }
                    }else if(svgType === "#icon__soccer__substitution"){
                        event.type="Subs"
                    }else if(svgType === "#icon__soccer__card"){
                        if($(elem).find("svg.IconSoccer--YellowCard").length > 0){
                            event.type="Yellow Card"
                        }else{
                            event.type="Red Card"
                        }
                    }
                    let teamType=$(elem).find(".Timeline__Content__Match__Progress__Events__Event__Details--homeTeam")
                    if(teamType.length > 0){
                        team="homeTeam"
                    }else{
                        team="awayTeam"
                    }
                }else{         
                    event.type="Half Time"
                }

                matchEvents.time=$(elem).find(".Timeline__Content__Match__Progress__Events__Event__Time").text()
                
            }else{
                if(i == 0){
                    event.type="Start Time"
                    matchEvents.time="KO"
                }else{
                    event.type="End Time"
                    matchEvents.time="FT"
                }
            }
        
            let styleBLock=$(elem).attr("style").split(";")
            if(styleBLock.length == 2){
                matchEvents.style.left=styleBLock[0].split(":")[1]
            }else{
                matchEvents.style.left=styleBLock[0].split(":")[1]
            }

        
            let existEventIndex = matchData.timeLine.findIndex((ele) => ele.time === matchEvents.time);
            if(existEventIndex !== -1){
                if(team === "homeTeam"){
                    matchData.timeLine[existEventIndex].events.homeTeam.push(event)
                }else{
                    matchData.timeLine[existEventIndex].events.awayTeam.push(event)
                }
            }else{
                if(team === "homeTeam"){
                    matchEvents.events.homeTeam.push(event)
                }else{
                    matchEvents.events.awayTeam.push(event)
                }
                matchData.timeLine.push(matchEvents)
            }
        })
        let gameCommentary=$(centerContainer).find("section.MatchCommentary .Wrapper table") 
        matchData.gameCommentary=[]
        $(gameCommentary).find("tbody tr").each(async(i,elem)=>{
            let contentContainer=$(elem).find(".MatchCommentary__Comment")
            let comment={
                time:"",
                type:"",
                content:"",
                event:""
            }
            comment.time=$(contentContainer).find(".MatchCommentary__Comment__Timestamp").text()
            comment.content=$(contentContainer).find(".MatchCommentary__Comment__GameDetails").text()
            if($(contentContainer).find("svg").length > 0){
                comment.type="keyEvent"
                let svgType=$(contentContainer).find("svg use").attr("href")
                if(svgType === "#icon__soccer__penalty_shot"){                   
                    comment.event="Goal"
                }else if(svgType === "#icon__soccer__substitution"){
                    comment.event="Subs"
                }else if(svgType === "#icon__soccer__card"){
                    if($(elem).find("svg.MatchCommentary__Comment__PlayIcon__Icon--YellowCard").length > 0){
                        comment.event="Yellow Card"
                    }else{
                        comment.event="Red Card"
                    }
                }else if(svgType ==="#icon__soccer__foul"){
                    comment.event="Foul"
                }else if(svgType ==="#icon__soccer__time_possession"){
                    comment.event="Time"
                }else if(svgType ==="#icon__soccer__missed_penalty" || svgType === "#icon__soccer__shot"){
                    comment.event="Missed Chance"
                }else if(svgType ==="#icon__soccer__corner_kick"){
                    comment.event="Corner Kick"
                }else if(svgType ==="#icon__soccer__save"){
                    comment.event="Keeper Save"
                }else if(svgType ==="#icon__soccer__off_sides"){
                    comment.event="Offside"
                }
            }else{
                comment.type="normalComment"
            }
            matchData.gameCommentary.push(comment)
        })
        let teamStatsBlock=$(centerContainer).find(".theme-light  section")
        let teamStatsHeader=$(teamStatsBlock).find("div.Kiog:not(.LOSQp)")
        matchData.homeTeam.shortName=$(teamStatsHeader).find("a:nth-child(1) span").text()
        matchData.awayTeam.shortName=$(teamStatsHeader).find("a:nth-child(2) span").text()
        matchData.teamStats=[]
        $(teamStatsBlock).find("div.LOSQp ").each(async(i,elem)=>{
            let stats={}
            stats.name=$(elem).find("span.OkRBU ").text()
            if(i === 0){ 
                stats.homeTeamStat=$(elem).find(".mLASH span.bLeWt:first-of-type").text()
                stats.awayTeamStat=$(elem).find(".mLASH span.bLeWt:last-of-type").text()
            }else{
                stats.homeTeamStat=$(elem).find(".UGvDX:nth-child(2) span.bLeWt").text()
                stats.awayTeamStat=$(elem).find(".UGvDX:nth-child(3) span.bLeWt").text()
            }
            
            
        
            matchData.teamStats.push(stats)
        })

        let rightSideContainer=$(mainContainer).find(".PageLayout__RightAside")
        let standingTableBlock=$(rightSideContainer).find("section.TeamStandings")
        matchData.currentCompet={}
        if(standingTableBlock.length > 0){
            matchData.currentCompet.name=$(standingTableBlock).find("header h3").text()
            matchData.currentCompet.clubsList=[]
            $(standingTableBlock).find(".Card__Content table tbody tr").each(async (i, elem3) => {
                let CompetTeam={}
                let teamHref=$(elem3).find("td:nth-child(1) a").attr("href").split("/")
                CompetTeam.name=$(elem3).find("td:nth-child(1) a").text()
                CompetTeam.id=teamHref[teamHref.length - 2]
                CompetTeam.slug=teamHref[teamHref.length - 1]
                CompetTeam.GP=$(elem3).find("td:nth-child(2)").text()
                CompetTeam.W=$(elem3).find("td:nth-child(3)").text()
                CompetTeam.D=$(elem3).find("td:nth-child(4)").text()
                CompetTeam.L=$(elem3).find("td:nth-child(5)").text()
                CompetTeam.GD=$(elem3).find("td:nth-child(6)").text()
                CompetTeam.P=$(elem3).find("td:nth-child(7)").text()
                matchData.currentCompet.clubsList.push(CompetTeam)
            })
        }
    
        let lineUpData=await getMatchLineUpData(gameId,"summary")
        if(lineUpData.status !== 200){
            return lineUpData
        }
        matchData.lineUps=lineUpData.data
        return {
            status:200,            
            matchData
        };
        
    }catch(error){
        return {
            status:400,            
            error:error
        };
    }
    
}
async function getMatchReport(gameId,gameSlug){
    try{
        const {data} = await axios.get(`https://www.espn.com/soccer/report/_/gameId/${gameId}`,{timeout: 10000000});
        let matchData={}
        matchData.metaData={
            authors:[],
            timeStamps:""
        }

        const $ = cheerio.load(data);
        let container=$('main#fittPageContainer .pageContent');
    
        matchData.status="Finished"

        let header=$(container).find(".Gamestrip ")
        matchData.competName=$(header).find(".ScoreCell__GameNote ").text()
        let teamsContainer=$(header).find(".Gamestrip__Competitors ")

        matchData.homeTeam={}
        let homeTeamContainer=$(teamsContainer).find(".Gamestrip__Team:first-of-type")
        let homeTeamColorBlock=$(homeTeamContainer).find(".LogoEnhanced").attr("style").split(":")
        let homeTeamColorBlock2=$(homeTeamContainer).find(".SkewedLine--1").attr("style").split(":")
        let homeTeamColorBlock3=$(homeTeamContainer).find(".SkewedLine--2").attr("style").split(":")
        matchData.homeTeam.color1=homeTeamColorBlock[1]
        matchData.homeTeam.color2=homeTeamColorBlock2[1]
        matchData.homeTeam.color3=homeTeamColorBlock3[1]
        let homeTeamInfo=$(homeTeamContainer).find(".Gamestrip__Info ")
        let homeTeamAddress=$(homeTeamInfo).find(".Gamestrip__InfoWrapper a")
        if(homeTeamAddress.length > 0){
            let teamHref=$(homeTeamAddress).attr("href").split("/")
            matchData.homeTeam.id=teamHref[teamHref.length - 2]
            matchData.homeTeam.slug=teamHref[teamHref.length - 1]
            matchData.homeTeam.name=$(homeTeamAddress).text()
        }else{
            matchData.homeTeam.id=null
            matchData.homeTeam.slug=null
            matchData.homeTeam.name=$(homeTeamInfo).find(".Gamestrip__InfoWrapper").text()
        }
        let homeTeamRecord=$(homeTeamInfo).find(".Gamestrip__Record ").text()
        matchData.homeTeam.record=homeTeamRecord
        $(homeTeamContainer).find('.Gamestrip__Score svg ').remove();
        matchData.homeTeam.score=$(homeTeamContainer).find(".Gamestrip__Score:not(svg) ").text()

        matchData.awayTeam={}
        let awayTeamContainer=$(teamsContainer).find(".Gamestrip__Team:last-of-type")
        let awayTeamColorBlock=$(awayTeamContainer).find(".LogoEnhanced").attr("style").split(":")
        let awayTeamColoBlock2=$(awayTeamContainer).find(".SkewedLine--1").attr("style").split(":")
        let awayTeamColoBlock3=$(awayTeamContainer).find(".SkewedLine--2").attr("style").split(":")
        matchData.awayTeam.color1=awayTeamColorBlock[1]
        matchData.awayTeam.color2=awayTeamColoBlock2[1]
        matchData.awayTeam.color3=awayTeamColoBlock3[1]
        
        let awayTeamInfo=$(awayTeamContainer).find(".Gamestrip__Info ")
        let awayteamAddress=$(awayTeamInfo).find(".Gamestrip__InfoWrapper a")
        if(awayteamAddress.length > 0){
            let teamHref=$(awayteamAddress).attr("href").split("/")
            matchData.awayTeam.id=teamHref[teamHref.length - 2]
            matchData.awayTeam.slug=teamHref[teamHref.length - 1]
            matchData.awayTeam.name=$(awayteamAddress).text()
        }else{
            matchData.awayTeam.id=null
            matchData.awayTeam.slug=null
            matchData.awayTeam.name=$(awayTeamInfo).find(".Gamestrip__InfoWrapper").text()
        }
        let awayTeamRecord=$(awayTeamInfo).find(".Gamestrip__Record ").text()
        matchData.awayTeam.record=awayTeamRecord
        $(awayTeamContainer).find('.Gamestrip__Score svg ').remove();
        matchData.awayTeam.score=$(awayTeamContainer).find(".Gamestrip__Score:not(svg) ").text()

        let dateAndTimeBlock=$(teamsContainer).find(".Gamestrip__Overview__Wrapper .Gamestrip__Overview ")
        matchData.date=$(dateAndTimeBlock).find(".ScoreCell__ScoreDate ").text()
        
        let eventContainer=$(container).find(".SoccerPerformers  ")
        matchData.homeTeam.events={
            goals:[],
            redCards:[]
        }
        let homeTeamEventContainer=$(eventContainer).find(".SoccerPerformers__Competitor--left")
        $(homeTeamEventContainer).find(".SoccerPerformers__Competitor__Info").each(async(i,elem)=>{
            
            let hasGoals=$(elem).find("svg.SoccerPerformers__GoalIcon ")
            if(hasGoals.length > 0){
                $(elem).find("ul li").each(async(i2,elem2)=>{
                    let playerName=$(elem2).find(".Soccer__PlayerName").text().trim()
                    let goalTime=$(elem2).find(".GoalScore__Time").text().trim()
                    matchData.homeTeam.events.goals.push({playerName,goalTime})
                })
            }
            let hasRCs=$(elem).find("svg.SoccerPerformers__RedCardIcon  ")
            if(hasRCs.length > 0){
                $(elem).find("ul li").each(async(i2,elem2)=>{
                    let playerName=$(elem2).find(".Soccer__PlayerName").text().trim()
                    let rcTime=$(elem2).find(".GoalScore__Time").text().trim()
                    matchData.homeTeam.events.redCards.push({playerName,rcTime})
                })
            }
        })
        matchData.awayTeam.events={
            goals:[],
            redCards:[]
        }
        let awayTeamEventContainer=$(eventContainer).find(".SoccerPerformers__Competitor--right")
        $(awayTeamEventContainer).find(".SoccerPerformers__Competitor__Info").each(async(i,elem)=>{
            let hasGoals=$(elem).find("svg.SoccerPerformers__GoalIcon")
            if(hasGoals.length > 0){
                $(elem).find("ul li").each(async(i2,elem2)=>{
                    let playerName=$(elem2).find(".Soccer__PlayerName").text().trim()
                    let goalTime=$(elem2).find(".GoalScore__Time").text().trim()
                    matchData.awayTeam.events.goals.push({playerName,goalTime})
                })
            }
            let hasRCs=$(elem).find("svg.SoccerPerformers__RedCardIcon")
            if(hasRCs.length > 0){
                $(elem).find("ul li").each(async(i2,elem2)=>{
                    let playerName=$(elem2).find(".Soccer__PlayerName").text().trim()
                    let rcTime=$(elem2).find(".GoalScore__Time").text().trim()
                    matchData.awayTeam.events.redCards.push({playerName,rcTime})
                })
            }
        })


        matchData.navItems=[]
        let barBlock=$(container).find("nav.Nav__Secondary .Nav__Secondary__Menu")
        $(barBlock).find("li").each(async(index,li)=>{
            if(index === 0 ){
                let text=$(li).find("a").text()
                let slug="summary"
                matchData.navItems.push({text,slug})
            }else{
                let link=$(li).find("a")
                let href=$(link).attr("href").split("/")
                let text=$(link).text()
                let slug=href[2]
                matchData.navItems.push({text,slug})
            }
        })



        
        let mainContainer=$(container).find(".PageLayout  ")
        
        let centerContainer=$(mainContainer).find(".PageLayout__Main section.Card")
        matchData.title=$(centerContainer).find("header h1").text()
        let metaDataBlock=$(centerContainer).find(".Story__Byline ")

        $(metaDataBlock).find("section.Byline span.Byline__AuthorContainer span.Byline__Author ").each(async(i,elem)=>{
            matchData.metaData.authors.push($(elem).text())
        })

        matchData.metaData.timeStamps=$(metaDataBlock).find("section.Byline .Byline__TimestampWrapper .Byline__Meta").text()

        let textBody=$(centerContainer).find(".Story__Body")
        let textArray=[]
        textBody.children().each(async(i,elem)=>{
            let element={}
            element.tagName=$(elem).prop('tagName').toLocaleLowerCase()
            element.textArray=[]
            if(element.tagName !== "section"  && element.tagName !== "aside"){
                if(element.tagName === "ul"){
                    $(elem).find("li").each(async(i,elem2)=>{
                        element.textArray.push($(elem2).text())
                    })
                }else{
                    element.text=$(elem).text()
                }
            }       
            textArray.push(element)
        })
        let imgTester=textBody.children().find("img")
        if(imgTester.length > 0){
            matchData.imgUrl=$(imgTester).attr("src")
        }
        let rightSideContainer=$(mainContainer).find(".PageLayout__RightAside")
        matchData.locationInfo={}
        let gameInformationBlock=$(rightSideContainer).find(".GameInfo .ContentList__Item")
        matchData.locationInfo.stadium=$(gameInformationBlock).find(".ContentList__Item:nth-child(1) .GameInfo__Location").text()
        let originalTimeAndDate=$(gameInformationBlock).find(".ContentList__Item:nth-child(1) .GameInfo__Meta span:first-of-type").text().split(",")

        let localTime=getLocalTime(originalTimeAndDate[0])
        originalTimeAndDate[0]=localTime
        matchData.time=localTime
        matchData.locationInfo.timeAndDate=originalTimeAndDate.join(",")
        matchData.locationInfo.city=$(gameInformationBlock).find(".ContentList__Item:nth-child(2) .Location__Text").text()

        let standingTableBlock=$(rightSideContainer).find("section.TeamStandings")
        matchData.currentCompet={}
        if(standingTableBlock.length > 0){
            matchData.currentCompet.name=$(standingTableBlock).find("header h3").text()
            matchData.currentCompet.clubsList=[]
            $(standingTableBlock).find(".Card__Content table tbody tr").each(async (i, elem3) => {
                let CompetTeam={}
                let teamHref=$(elem3).find("td:nth-child(1) a").attr("href").split("/")
                CompetTeam.name=$(elem3).find("td:nth-child(1) a").text()
                CompetTeam.id=teamHref[teamHref.length - 2]
                CompetTeam.slug=teamHref[teamHref.length - 1]
                CompetTeam.GP=$(elem3).find("td:nth-child(2)").text()
                CompetTeam.W=$(elem3).find("td:nth-child(3)").text()
                CompetTeam.D=$(elem3).find("td:nth-child(4)").text()
                CompetTeam.L=$(elem3).find("td:nth-child(5)").text()
                CompetTeam.GD=$(elem3).find("td:nth-child(6)").text()
                CompetTeam.P=$(elem3).find("td:nth-child(7)").text()
                matchData.currentCompet.clubsList.push(CompetTeam)
            })
        }
        matchData.allContent=textArray
    
        return {
            status:200,
            matchData
        };
        
    } catch(error){
     
        return {
            status:400,            
            error:error
        };
    }

    
}
async function getMatchInfo(gameId,gameSlug){

    let bigData;
    try{
        const {data} = await axios.get(`https://www.espn.com/soccer/match/_/gameId/${gameId}`,{timeout: 10000000});
        bigData=data
    }catch(error){
        return {
            status:400,            
            error:error
        };
    }
    const $ = cheerio.load(bigData);
    let container=$('main#fittPageContainer .pageContent');
    let barBlock=$(container).find("nav.Nav__Secondary .Nav__Secondary__Menu")
    let preMatchLinup=false;
    let isCommAvailable=false;
   
    let text=$(barBlock).find("li:nth-child(1) a")
    let allLi=text.text()
    if(allLi.includes("Line-Ups")){
        preMatchLinup=true
    }
    if(allLi.includes("Commentary")){
        isCommAvailable=true
    }

    let matchData={}

    if(!isCommAvailable){
        let preMatchData=await getPreMatchData(container,$)
        if(preMatchData.matchData){
            matchData=preMatchData.matchData
        }else{
            matchData=preMatchData
        }
        if(matchData.status === 400){
            return matchData
        }
        if(preMatchLinup){
            matchData.isLinupsAvai=true 
        }else{
            matchData.isLinupsAvai=false 
        }
    }else{
        let text=$(barBlock).find("li:nth-child(1) a")
        let allLi=text.text()
        if(allLi.includes("Gamecast")){
            let liveData=await getLiveMatchData(gameId,gameSlug,container,$)
            if(liveData.matchData){
                matchData=liveData.matchData
            }else{
                matchData=liveData
            }
        //    matchData = liveData.matchData
           if(liveData.status === 400){
               return matchData
           }
        }else{  
            let postData=await getPostMatchData(gameId,gameSlug,container,$)
            if(postData.matchData){
                matchData=postData.matchData
            }else{
                matchData=postData
            }
        //    matchData = postData.matchData
           if(postData.status === 400){
               return matchData
           }
        }
        matchData.isLinupsAvai=true 
    }
     
    return {
        status:200,
        matchData
    };
}
async function getMatchPreview(gameId,gameSlug){
    let bigData;
    try{
        const {data} = await axios.get(`https://www.espn.com/soccer/preview/_/gameId/${gameId}`,{timeout: 10000000});
        bigData=data
        
        let matchData={}
        matchData.metaData={
            authors:[],
            timeStamps:""
        }

        const $ = cheerio.load(bigData);
        let container=$('main#fittPageContainer .pageContent');
    
        matchData.status="Not Started"

        let header=$(container).find(".Gamestrip ")
        matchData.competName=$(header).find(".ScoreCell__GameNote ").text()
        let teamsContainer=$(header).find(".Gamestrip__Competitors ")

        matchData.homeTeam={}
        let homeTeamContainer=$(teamsContainer).find(".Gamestrip__Team:first-of-type")
        let homeTeamColorBlock=$(homeTeamContainer).find(".LogoEnhanced").attr("style").split(":")
        let homeTeamColorBlock2=$(homeTeamContainer).find(".SkewedLine--1").attr("style").split(":")
        let homeTeamColorBlock3=$(homeTeamContainer).find(".SkewedLine--2").attr("style").split(":")
        matchData.homeTeam.color1=homeTeamColorBlock[1]
        matchData.homeTeam.color2=homeTeamColorBlock2[1]
        matchData.homeTeam.color3=homeTeamColorBlock3[1]
        let homeTeamInfo=$(homeTeamContainer).find(".Gamestrip__Info ")
        let homeTeamAddress=$(homeTeamInfo).find(".Gamestrip__InfoWrapper a")
        if(homeTeamAddress.length > 0){
            let teamHref=$(homeTeamAddress).attr("href").split("/")
            matchData.homeTeam.id=teamHref[teamHref.length - 2]
            matchData.homeTeam.slug=teamHref[teamHref.length - 1]
            matchData.homeTeam.name=$(homeTeamAddress).text()
        }else{
            matchData.homeTeam.id=null
            matchData.homeTeam.slug=null
            matchData.homeTeam.name=$(homeTeamInfo).find(".Gamestrip__InfoWrapper").text()
        }
        let homeTeamRecord=$(homeTeamInfo).find(".Gamestrip__Record ").text()
        matchData.homeTeam.record=homeTeamRecord

        matchData.awayTeam={}
        let awayTeamContainer=$(teamsContainer).find(".Gamestrip__Team:last-of-type")
        let awayTeamColorBlock=$(awayTeamContainer).find(".LogoEnhanced").attr("style").split(":")
        let awayTeamColoBlock2=$(awayTeamContainer).find(".SkewedLine--1").attr("style").split(":")
        let awayTeamColoBlock3=$(awayTeamContainer).find(".SkewedLine--2").attr("style").split(":")
        matchData.awayTeam.color1=awayTeamColorBlock[1]
        matchData.awayTeam.color2=awayTeamColoBlock2[1]
        matchData.awayTeam.color3=awayTeamColoBlock3[1]
        let awayTeamInfo=$(awayTeamContainer).find(".Gamestrip__Info ")
        let awayteamAddress=$(awayTeamInfo).find(".Gamestrip__InfoWrapper a")
        if(awayteamAddress.length > 0){
            let teamHref=$(awayteamAddress).attr("href").split("/")
            matchData.awayTeam.id=teamHref[teamHref.length - 2]
            matchData.awayTeam.slug=teamHref[teamHref.length - 1]
            matchData.awayTeam.name=$(awayteamAddress).text()
        }else{
            matchData.awayTeam.id=null
            matchData.awayTeam.slug=null
            matchData.awayTeam.name=$(awayTeamInfo).find(".Gamestrip__InfoWrapper").text()
        }
        let awayTeamRecord=$(awayTeamInfo).find(".Gamestrip__Record ").text()
        matchData.awayTeam.record=awayTeamRecord

        let dateAndTimeBlock=$(teamsContainer).find(".Gamestrip__Overview__Wrapper .Gamestrip__Overview ")
        matchData.date=$(dateAndTimeBlock).find(".ScoreCell__ScoreDate ").text()


        matchData.navItems=[]
        let barBlock=$(container).find("nav.Nav__Secondary .Nav__Secondary__Menu")
        $(barBlock).find("li").each(async(index,li)=>{
            if(index === 0 ){
                let text=$(li).find("a").text()
                let slug="summary"
                matchData.navItems.push({text,slug})
            }else{
                let link=$(li).find("a")
                let href=$(link).attr("href").split("/")
                let text=$(link).text()
                let slug=href[2]
                matchData.navItems.push({text,slug})
            }
        })



        
        let mainContainer=$(container).find(".PageLayout  ")
        
        let centerContainer=$(mainContainer).find(".PageLayout__Main section.Card")
        matchData.title=$(centerContainer).find("header h1").text()
        let metaDataBlock=$(centerContainer).find(".Story__Byline ")

        $(metaDataBlock).find("section.Byline span.Byline__AuthorContainer span.Byline__Author ").each(async(i,elem)=>{
            matchData.metaData.authors.push($(elem).text())
        })

        matchData.metaData.timeStamps=$(metaDataBlock).find("section.Byline .Byline__TimestampWrapper .Byline__Meta").text()

        // let textBody=$(centerContainer).find(".Story__Body > div:first-of-type")
        let textBody=$(centerContainer).find(".Story__Body")
        let textArray=[]
        textBody.children().each(async(i,elem)=>{
            let element={}
            element.tagName=$(elem).prop('tagName').toLocaleLowerCase()
            element.textArray=[]
            if(element.tagName === "ul"){
                $(elem).find("li").each(async(i,elem2)=>{
                    element.textArray.push($(elem2).text())
                })
            }else{
                element.text=$(elem).text()
            }

            
            textArray.push(element)
        })

        let rightSideContainer=$(mainContainer).find(".PageLayout__RightAside")
        matchData.locationInfo={}
        let gameInformationBlock=$(rightSideContainer).find(".GameInfo .ContentList__Item")
        matchData.locationInfo.stadium=$(gameInformationBlock).find(".ContentList__Item:nth-child(1) .GameInfo__Location").text()
        let originalTimeAndDate=$(gameInformationBlock).find(".ContentList__Item:nth-child(1) .GameInfo__Meta span:first-of-type").text().split(",")

        let localTime=getLocalTime(originalTimeAndDate[0])
        originalTimeAndDate[0]=localTime
        matchData.time=localTime
        matchData.locationInfo.timeAndDate=originalTimeAndDate.join(",")
        matchData.locationInfo.city=$(gameInformationBlock).find(".ContentList__Item:nth-child(2) .Location__Text").text()

        let standingTableBlock=$(rightSideContainer).find("section.TeamStandings")
        matchData.currentCompet={}
        if(standingTableBlock.length > 0){
            matchData.currentCompet.name=$(standingTableBlock).find("header h3").text()
            matchData.currentCompet.clubsList=[]
            $(standingTableBlock).find(".Card__Content table tbody tr").each(async (i, elem3) => {
                let CompetTeam={}
                let teamHref=$(elem3).find("td:nth-child(1) a").attr("href").split("/")
                CompetTeam.name=$(elem3).find("td:nth-child(1) a").text()
                CompetTeam.id=teamHref[teamHref.length - 2]
                CompetTeam.slug=teamHref[teamHref.length - 1]
                CompetTeam.GP=$(elem3).find("td:nth-child(2)").text()
                CompetTeam.W=$(elem3).find("td:nth-child(3)").text()
                CompetTeam.D=$(elem3).find("td:nth-child(4)").text()
                CompetTeam.L=$(elem3).find("td:nth-child(5)").text()
                CompetTeam.GD=$(elem3).find("td:nth-child(6)").text()
                CompetTeam.P=$(elem3).find("td:nth-child(7)").text()
                matchData.currentCompet.clubsList.push(CompetTeam)
            })
        }
        matchData.allContent=textArray

        return {
            status:200,
            matchData
        };

    }catch(error){
        return {
            status:400,            
            error:error
        };
    }

}

async function getMatchStatsData(gameId){
    let bigData;
    let type;
    try{
        const {data} = await axios.get(`https://www.espn.com/soccer/matchstats/_/gameId/${gameId}`,{timeout: 10000000});
        bigData=data
        const $ = cheerio.load(bigData);
        let container=$('main#fittPageContainer .pageContent');

        let barBlock=$(container).find("nav.Nav__Secondary .Nav__Secondary__Menu")
        let preMatchLinup=false;
        let isCommAvailable=false;

        let text=$(barBlock).find("li:nth-child(1) a")
        let allLi=text.text()
        if(allLi.includes("Line-Ups")){
                preMatchLinup=true
        }
        if(allLi.includes("Commentary")){
                isCommAvailable=true
        }
        let matchData={}

        if(!isCommAvailable){
        type="PreMatch"
            if(preMatchLinup){
                matchData.isLinupsAvai=true 
            }else{
                matchData.isLinupsAvai=false 
            }
        }else{
            let text=$(barBlock).find("li:nth-child(1) a")
            let allLi=text.text()
            if(allLi.includes("Gamecast")){
                type="Live"
            }else{
                type="PostMatch"
            }
            matchData.isLinupsAvai=true 
        }

        if(type==="PreMatch"){
            const $ = cheerio.load(bigData);
            let container=$('main#fittPageContainer .pageContent');
        
            matchData.status="Not Started"
        
            let header=$(container).find(".Gamestrip ")
            matchData.competName=$(header).find(".ScoreCell__GameNote ").text()
            let teamsContainer=$(header).find(".Gamestrip__Competitors ")
        
            matchData.homeTeam={}
            let homeTeamContainer=$(teamsContainer).find(".Gamestrip__Team:first-of-type")
            let homeTeamColorBlock=$(homeTeamContainer).find(".LogoEnhanced").attr("style").split(":")
            let homeTeamColorBlock2=$(homeTeamContainer).find(".SkewedLine--1").attr("style").split(":")
            let homeTeamColorBlock3=$(homeTeamContainer).find(".SkewedLine--2").attr("style").split(":")
            matchData.homeTeam.color1=homeTeamColorBlock[1]
            matchData.homeTeam.color2=homeTeamColorBlock2[1]
            matchData.homeTeam.color3=homeTeamColorBlock3[1]
            let homeTeamInfo=$(homeTeamContainer).find(".Gamestrip__Info ")
            let homeTeamAddress=$(homeTeamInfo).find(".Gamestrip__InfoWrapper a")
            if(homeTeamAddress.length > 0){
                let teamHref=$(homeTeamAddress).attr("href").split("/")
                matchData.homeTeam.id=teamHref[teamHref.length - 2]
                matchData.homeTeam.slug=teamHref[teamHref.length - 1]
                matchData.homeTeam.name=$(homeTeamAddress).text()
            }else{
                matchData.homeTeam.id=null
                matchData.homeTeam.slug=null
                matchData.homeTeam.name=$(homeTeamInfo).find(".Gamestrip__InfoWrapper").text()
            }
            let homeTeamRecord=$(homeTeamInfo).find(".Gamestrip__Record ").text()
            matchData.homeTeam.record=homeTeamRecord
        
            matchData.awayTeam={}
            let awayTeamContainer=$(teamsContainer).find(".Gamestrip__Team:last-of-type")
            let awayTeamColorBlock=$(awayTeamContainer).find(".LogoEnhanced").attr("style").split(":")
            let awayTeamColoBlock2=$(awayTeamContainer).find(".SkewedLine--1").attr("style").split(":")
            let awayTeamColoBlock3=$(awayTeamContainer).find(".SkewedLine--2").attr("style").split(":")
            matchData.awayTeam.color1=awayTeamColorBlock[1]
            matchData.awayTeam.color2=awayTeamColoBlock2[1]
            matchData.awayTeam.color3=awayTeamColoBlock3[1]
            let awayTeamInfo=$(awayTeamContainer).find(".Gamestrip__Info ")
            let awayteamAddress=$(awayTeamInfo).find(".Gamestrip__InfoWrapper a")
            if(awayteamAddress.length > 0){
                let teamHref=$(awayteamAddress).attr("href").split("/")
                matchData.awayTeam.id=teamHref[teamHref.length - 2]
                matchData.awayTeam.slug=teamHref[teamHref.length - 1]
                matchData.awayTeam.name=$(awayteamAddress).text()
            }else{
                matchData.awayTeam.id=null
                matchData.awayTeam.slug=null
                matchData.awayTeam.name=$(awayTeamInfo).find(".Gamestrip__InfoWrapper").text()
            }
            let awayTeamRecord=$(awayTeamInfo).find(".Gamestrip__Record ").text()
            matchData.awayTeam.record=awayTeamRecord
        
            let dateAndTimeBlock=$(teamsContainer).find(".Gamestrip__Overview__Wrapper .Gamestrip__Overview ")
            matchData.date=$(dateAndTimeBlock).find(".ScoreCell__ScoreDate ").text()
    
        
            matchData.navItems=[]
            let barBlock=$(container).find("nav.Nav__Secondary .Nav__Secondary__Menu")
            $(barBlock).find("li").each(async(index,li)=>{
                if(index === 0 ){
                    let text=$(li).find("a").text()
                    let slug="summary"
                    matchData.navItems.push({text,slug})
                }else{
                    let link=$(li).find("a")
                    let href=$(link).attr("href").split("/")
                    let text=$(link).text()
                    let slug=href[2]
                    matchData.navItems.push({text,slug})
                }
            })
        
        
        
            
            let mainContainer=$(container).find(".PageLayout  ")
        
            let leftSideContainer=$(mainContainer).find(".PageLayout__LeftAside")
            
        
            let centerContainer=$(mainContainer).find(".PageLayout__Main")

            let teamStatsBlock=$(centerContainer).find(".theme-light  section")
            let teamStatsHeader=$(teamStatsBlock).find("div.Kiog:not(.LOSQp)")
            matchData.homeTeam.shortName=$(teamStatsHeader).find("a:nth-child(1) span").text()
            matchData.awayTeam.shortName=$(teamStatsHeader).find("a:nth-child(2) span").text()
            matchData.teamStats=[]
            $(teamStatsBlock).find("div.LOSQp ").each(async(i,elem)=>{
                let stats={}
                stats.name=$(elem).find("span.OkRBU ").text()
                stats.homeTeamStat=$(elem).find(".UGvDX:nth-child(2) span.bLeWt").text()
                stats.awayTeamStat=$(elem).find(".UGvDX:nth-child(3) span.bLeWt").text()
                matchData.teamStats.push(stats)
            })

            matchData.lastMatches={
                homeTeamMatches:[],
                awayTeamMatches:[]
            }
            let lastMatchesBlock=$(centerContainer).find(".match_form--table--wrapper:nth-child(1)") 
            $(lastMatchesBlock).find(".MatchFormTable").each(async(i,elem)=>{
                $(elem).find(".Table__Scroller .Table__TBODY tr").each(async (i2,elem)=>{
                    let match={}
                    match.homeTeam={}
                    match.awayTeam={}
                    match.status=$(elem).find("td:nth-child(1)").text()
                    let homeTeamBlock=$(elem).find("td:nth-child(2) a")
            
                    if(homeTeamBlock.length > 0){
                        match.homeTeam.name=homeTeamBlock.text()
                    let homeTeamHref=homeTeamBlock.attr("href").split("/")
                    match.homeTeam.id=homeTeamHref[homeTeamHref.length - 2]
                    match.homeTeam.slug=homeTeamHref[homeTeamHref.length - 1]
                    }else{
                        match.homeTeam.name=$(elem).find("td:nth-child(2)").text()
                        match.homeTeam.id=null
                        match.homeTeam.slug=null
                    }
        
        
                    let awayTeamBlock=$(elem).find("td:nth-child(6) a")
            
                    if(awayTeamBlock.length > 0){
                        match.awayTeam.name=awayTeamBlock.text()
                        let awayTeamHref=awayTeamBlock.attr("href").split("/")
                        match.awayTeam.id=awayTeamHref[awayTeamHref.length - 2]
                        match.awayTeam.slug=awayTeamHref[awayTeamHref.length - 1]
                    }else{
                        match.awayTeam.name=$(elem).find("td:nth-child(6)").text()
                        match.awayTeam.id=null
                        match.awayTeam.slug=null
                    }
        
                    let matchLink=$(elem).find("td:nth-child(4) a").attr("href").split("/")
                    match.id=matchLink[matchLink.length - 2]
                    match.slug=matchLink[matchLink.length - 1]
                    match.score=$(elem).find("td:nth-child(4) a").text()
                    match.date=$(elem).find("td:nth-child(7)").text()
                    match.compet=$(elem).find("td:nth-child(8)").text()
                    if(i === 0){
                        matchData.lastMatches.homeTeamMatches.push(match)
                    }else if(i === 1){
                        matchData.lastMatches.awayTeamMatches.push(match)
                    }
                })
            })

            let lastFiveHeadToHeadBlock=$(centerContainer).find(".match_form--table--wrapper:nth-child(3) section.MatchFormTable .Card__Content") 
            matchData.lastFiveHeadToHead=[]
            if(lastFiveHeadToHeadBlock.length > 0){
                $(lastFiveHeadToHeadBlock).find(".Table__Scroller .Table__TBODY tr").each(async (i,elem)=>{
                    let match={}
                    match.homeTeam={}
                    match.awayTeam={}
                    let homeTeamBlock=$(elem).find("td:nth-child(1) a")
            
                    if(homeTeamBlock.length > 0){
                        match.homeTeam.name=homeTeamBlock.text()
                    let homeTeamHref=homeTeamBlock.attr("href").split("/")
                    match.homeTeam.id=homeTeamHref[homeTeamHref.length - 2]
                    match.homeTeam.slug=homeTeamHref[homeTeamHref.length - 1]
                    }else{
                        match.homeTeam.name=$(elem).find("td:nth-child(1)").text()
                        match.homeTeam.id=null
                        match.homeTeam.slug=null
                    }
        
        
                    let awayTeamBlock=$(elem).find("td:nth-child(5) a")
            
                    if(awayTeamBlock.length > 0){
                        match.awayTeam.name=awayTeamBlock.text()
                        let awayTeamHref=awayTeamBlock.attr("href").split("/")
                        match.awayTeam.id=awayTeamHref[awayTeamHref.length - 2]
                        match.awayTeam.slug=awayTeamHref[awayTeamHref.length - 1]
                    }else{
                        match.awayTeam.name=$(elem).find("td:nth-child(5)").text()
                        match.awayTeam.id=null
                        match.awayTeam.slug=null
                    }
        
                    let matchLink=$(elem).find("td:nth-child(3) a").attr("href").split("/")
                    match.id=matchLink[matchLink.length - 2]
                    match.slug=matchLink[matchLink.length - 1]
                    match.score=$(elem).find("td:nth-child(3) a").text()
                    match.date=$(elem).find("td:nth-child(6)").text()
                    match.compet=$(elem).find("td:nth-child(7)").text()
                    matchData.lastFiveHeadToHead.push(match)
                })
            }
            let rightSideContainer=$(mainContainer).find(".PageLayout__RightAside")
            matchData.locationInfo={}
            let gameInformationBlock=$(rightSideContainer).find(".GameInfo .ContentList__Item")
            matchData.locationInfo.stadium=$(gameInformationBlock).find(".ContentList__Item:nth-child(1) .GameInfo__Location").text()
            let originalTimeAndDate=$(gameInformationBlock).find(".ContentList__Item:nth-child(1) .GameInfo__Meta span:first-of-type").text().split(",")

            let localTime=getLocalTime(originalTimeAndDate[0])
            originalTimeAndDate[0]=localTime
            matchData.time=localTime
            matchData.locationInfo.timeAndDate=originalTimeAndDate.join(",")
            matchData.locationInfo.city=$(gameInformationBlock).find(".ContentList__Item:nth-child(2) .Location__Text").text()
        
            let standingTableBlock=$(rightSideContainer).find("section.TeamStandings")
            matchData.currentCompet={}
            if(standingTableBlock.length > 0){
                matchData.currentCompet.name=$(standingTableBlock).find("header h3").text()
                matchData.currentCompet.clubsList=[]
                $(standingTableBlock).find(".Card__Content table tbody tr").each(async (i, elem3) => {
                    let CompetTeam={}
                    let teamHref=$(elem3).find("td:nth-child(1) a").attr("href").split("/")
                    CompetTeam.name=$(elem3).find("td:nth-child(1) a").text()
                    CompetTeam.id=teamHref[teamHref.length - 2]
                    CompetTeam.slug=teamHref[teamHref.length - 1]
                    CompetTeam.GP=$(elem3).find("td:nth-child(2)").text()
                    CompetTeam.W=$(elem3).find("td:nth-child(3)").text()
                    CompetTeam.D=$(elem3).find("td:nth-child(4)").text()
                    CompetTeam.L=$(elem3).find("td:nth-child(5)").text()
                    CompetTeam.GD=$(elem3).find("td:nth-child(6)").text()
                    CompetTeam.P=$(elem3).find("td:nth-child(7)").text()
                    matchData.currentCompet.clubsList.push(CompetTeam)
                })
            }
        }
        if(type==="PostMatch" || type==="Live"){
            const $ = cheerio.load(bigData);
            let container=$('main#fittPageContainer .pageContent');
        
            matchData.status=type
        
            let header=$(container).find(".Gamestrip ")
            matchData.competName=$(header).find(".ScoreCell__GameNote ").text()
            let teamsContainer=$(header).find(".Gamestrip__Competitors ")
        
            matchData.homeTeam={}
            let homeTeamContainer=$(teamsContainer).find(".Gamestrip__Team:first-of-type")
            let homeTeamColorBlock=$(homeTeamContainer).find(".LogoEnhanced").attr("style").split(":")
            let homeTeamColorBlock2=$(homeTeamContainer).find(".SkewedLine--1").attr("style").split(":")
            let homeTeamColorBlock3=$(homeTeamContainer).find(".SkewedLine--2").attr("style").split(":")
            matchData.homeTeam.color1=homeTeamColorBlock[1]
            matchData.homeTeam.color2=homeTeamColorBlock2[1]
            matchData.homeTeam.color3=homeTeamColorBlock3[1]
            let homeTeamInfo=$(homeTeamContainer).find(".Gamestrip__Info ")
            let homeTeamAddress=$(homeTeamInfo).find(".Gamestrip__InfoWrapper a")
            if(homeTeamAddress.length > 0){
                let teamHref=$(homeTeamAddress).attr("href").split("/")
                matchData.homeTeam.id=teamHref[teamHref.length - 2]
                matchData.homeTeam.slug=teamHref[teamHref.length - 1]
                matchData.homeTeam.name=$(homeTeamAddress).text()
            }else{
                matchData.homeTeam.id=null
                matchData.homeTeam.slug=null
                matchData.homeTeam.name=$(homeTeamInfo).find(".Gamestrip__InfoWrapper").text()
            }
            let homeTeamRecord=$(homeTeamInfo).find(".Gamestrip__Record ").text()
            matchData.homeTeam.record=homeTeamRecord
            $(homeTeamContainer).find('.Gamestrip__Score svg ').remove();
            matchData.homeTeam.score=$(homeTeamContainer).find(".Gamestrip__Score:not(svg) ").text()
        
            matchData.awayTeam={}
            let awayTeamContainer=$(teamsContainer).find(".Gamestrip__Team:last-of-type")
            let awayTeamColorBlock=$(awayTeamContainer).find(".LogoEnhanced").attr("style").split(":")
            let awayTeamColoBlock2=$(awayTeamContainer).find(".SkewedLine--1").attr("style").split(":")
            let awayTeamColoBlock3=$(awayTeamContainer).find(".SkewedLine--2").attr("style").split(":")
            matchData.awayTeam.color1=awayTeamColorBlock[1]
            matchData.awayTeam.color2=awayTeamColoBlock2[1]
            matchData.awayTeam.color3=awayTeamColoBlock3[1]
            
            let awayTeamInfo=$(awayTeamContainer).find(".Gamestrip__Info ")
            let awayteamAddress=$(awayTeamInfo).find(".Gamestrip__InfoWrapper a")
            if(awayteamAddress.length > 0){
                let teamHref=$(awayteamAddress).attr("href").split("/")
                matchData.awayTeam.id=teamHref[teamHref.length - 2]
                matchData.awayTeam.slug=teamHref[teamHref.length - 1]
                matchData.awayTeam.name=$(awayteamAddress).text()
            }else{
                matchData.awayTeam.id=null
                matchData.awayTeam.slug=null
                matchData.awayTeam.name=$(awayTeamInfo).find(".Gamestrip__InfoWrapper").text()
            }
            let awayTeamRecord=$(awayTeamInfo).find(".Gamestrip__Record ").text()
            matchData.awayTeam.record=awayTeamRecord
            $(awayTeamContainer).find('.Gamestrip__Score svg ').remove();
            matchData.awayTeam.score=$(awayTeamContainer).find(".Gamestrip__Score:not(svg) ").text()
        
            let dateAndTimeBlock=$(teamsContainer).find(".Gamestrip__Overview__Wrapper .Gamestrip__Overview ")
            matchData.date=$(dateAndTimeBlock).find(".ScoreCell__ScoreDate ").text()
            
        let eventContainer=$(container).find(".SoccerPerformers  ")
        matchData.homeTeam.events={
            goals:[],
            redCards:[]
        }
        let homeTeamEventContainer=$(eventContainer).find(".SoccerPerformers__Competitor--left")
        $(homeTeamEventContainer).find(".SoccerPerformers__Competitor__Info").each(async(i,elem)=>{
            
            let hasGoals=$(elem).find("svg.SoccerPerformers__GoalIcon ")
            if(hasGoals.length > 0){
                $(elem).find("ul li").each(async(i2,elem2)=>{
                    let playerName=$(elem2).find(".Soccer__PlayerName").text().trim()
                    let goalTime=$(elem2).find(".GoalScore__Time").text().trim()
                    matchData.homeTeam.events.goals.push({playerName,goalTime})
                })
            }
            let hasRCs=$(elem).find("svg.SoccerPerformers__RedCardIcon  ")
            if(hasRCs.length > 0){
                $(elem).find("ul li").each(async(i2,elem2)=>{
                    let playerName=$(elem2).find(".Soccer__PlayerName").text().trim()
                    let rcTime=$(elem2).find(".GoalScore__Time").text().trim()
                    matchData.homeTeam.events.redCards.push({playerName,rcTime})
                })
            }
        })
        matchData.awayTeam.events={
            goals:[],
            redCards:[]
        }
        let awayTeamEventContainer=$(eventContainer).find(".SoccerPerformers__Competitor--right")
        $(awayTeamEventContainer).find(".SoccerPerformers__Competitor__Info").each(async(i,elem)=>{
            let hasGoals=$(elem).find("svg.SoccerPerformers__GoalIcon")
            if(hasGoals.length > 0){
                $(elem).find("ul li").each(async(i2,elem2)=>{
                    let playerName=$(elem2).find(".Soccer__PlayerName").text().trim()
                    let goalTime=$(elem2).find(".GoalScore__Time").text().trim()
                    matchData.awayTeam.events.goals.push({playerName,goalTime})
                })
            }
            let hasRCs=$(elem).find("svg.SoccerPerformers__RedCardIcon")
            if(hasRCs.length > 0){
                $(elem).find("ul li").each(async(i2,elem2)=>{
                    let playerName=$(elem2).find(".Soccer__PlayerName").text().trim()
                    let rcTime=$(elem2).find(".GoalScore__Time").text().trim()
                    matchData.awayTeam.events.redCards.push({playerName,rcTime})
                })
            }
        })
        
            matchData.navItems=[]
            let barBlock=$(container).find("nav.Nav__Secondary .Nav__Secondary__Menu")
            $(barBlock).find("li").each(async(index,li)=>{
                if(index === 0 ){
                    let text=$(li).find("a").text()
                    let slug="summary"
                    matchData.navItems.push({text,slug})
                }else{
                    let link=$(li).find("a")
                    let href=$(link).attr("href").split("/")
                    let text=$(link).text()
                    let slug=href[2]
                    matchData.navItems.push({text,slug})
                }
            })
        
        
            
            let mainContainer=$(container).find(".PageLayout  ")
        
            let leftSideContainer=$(mainContainer).find(".PageLayout__LeftAside")
            
        
            let centerContainer=$(mainContainer).find(".PageLayout__Main")

            let teamStatsBlock=$(centerContainer).find(".theme-light  section")
            let teamStatsHeader=$(teamStatsBlock).find("div.Kiog:not(.LOSQp)")
            matchData.homeTeam.shortName=$(teamStatsHeader).find("a:nth-child(1) span").text()
            matchData.awayTeam.shortName=$(teamStatsHeader).find("a:nth-child(2) span").text()
            matchData.teamStats=[]
            $(teamStatsBlock).find("div.LOSQp ").each(async(i,elem)=>{
                let stats={}
                stats.name=$(elem).find("span.OkRBU ").text()
                if(i === 0){ 
                    stats.homeTeamStat=$(elem).find(".mLASH span.bLeWt:first-of-type").text()
                    stats.awayTeamStat=$(elem).find(".mLASH span.bLeWt:last-of-type").text()
                }else{
                    stats.homeTeamStat=$(elem).find(".UGvDX:nth-child(2) span.bLeWt").text()
                    stats.awayTeamStat=$(elem).find(".UGvDX:nth-child(3) span.bLeWt").text()
                }
                
                
            
                matchData.teamStats.push(stats)
            })

            matchData.lastMatches={
                homeTeamMatches:[],
                awayTeamMatches:[]
            }
            let lastMatchesBlock=$(centerContainer).find(".match_form--table--wrapper:nth-child(2)") 
            $(lastMatchesBlock).find(".MatchFormTable").each(async(i,elem)=>{
                $(elem).find(".Table__Scroller .Table__TBODY tr").each(async (i2,elem)=>{
                    let match={}
                    match.homeTeam={}
                    match.awayTeam={}
                    match.status=$(elem).find("td:nth-child(1)").text()
                    let homeTeamBlock=$(elem).find("td:nth-child(2) a")
            
                    if(homeTeamBlock.length > 0){
                        match.homeTeam.name=homeTeamBlock.text()
                    let homeTeamHref=homeTeamBlock.attr("href").split("/")
                    match.homeTeam.id=homeTeamHref[homeTeamHref.length - 2]
                    match.homeTeam.slug=homeTeamHref[homeTeamHref.length - 1]
                    }else{
                        match.homeTeam.name=$(elem).find("td:nth-child(2)").text()
                        match.homeTeam.id=null
                        match.homeTeam.slug=null
                    }
        
        
                    let awayTeamBlock=$(elem).find("td:nth-child(6) a")
            
                    if(awayTeamBlock.length > 0){
                        match.awayTeam.name=awayTeamBlock.text()
                        let awayTeamHref=awayTeamBlock.attr("href").split("/")
                        match.awayTeam.id=awayTeamHref[awayTeamHref.length - 2]
                        match.awayTeam.slug=awayTeamHref[awayTeamHref.length - 1]
                    }else{
                        match.awayTeam.name=$(elem).find("td:nth-child(6)").text()
                        match.awayTeam.id=null
                        match.awayTeam.slug=null
                    }
        
                    let matchLink=$(elem).find("td:nth-child(4) a").attr("href").split("/")
                    match.id=matchLink[matchLink.length - 2]
                    match.slug=matchLink[matchLink.length - 1]
                    match.score=$(elem).find("td:nth-child(4) a").text()
                    match.date=$(elem).find("td:nth-child(7)").text()
                    match.compet=$(elem).find("td:nth-child(8)").text()
                
                    if(i === 0){
                        matchData.lastMatches.homeTeamMatches.push(match)
                    }else if(i === 1){
                        matchData.lastMatches.awayTeamMatches.push(match)
                    }
                })
            })

            let lastFiveHeadToHeadBlock=$(centerContainer).find(".match_form--table--wrapper:nth-child(3) section.MatchFormTable .Card__Content") 
            matchData.lastFiveHeadToHead=[]
            if(lastFiveHeadToHeadBlock.length > 0){
                $(lastFiveHeadToHeadBlock).find(".Table__Scroller .Table__TBODY tr").each(async (i,elem)=>{
                    let match={}
                    match.homeTeam={}
                    match.awayTeam={}
                    let homeTeamBlock=$(elem).find("td:nth-child(1) a")
            
                    if(homeTeamBlock.length > 0){
                        match.homeTeam.name=homeTeamBlock.text()
                    let homeTeamHref=homeTeamBlock.attr("href").split("/")
                    match.homeTeam.id=homeTeamHref[homeTeamHref.length - 2]
                    match.homeTeam.slug=homeTeamHref[homeTeamHref.length - 1]
                    }else{
                        match.homeTeam.name=$(elem).find("td:nth-child(1)").text()
                        match.homeTeam.id=null
                        match.homeTeam.slug=null
                    }
        
        
                    let awayTeamBlock=$(elem).find("td:nth-child(5) a")
            
                    if(awayTeamBlock.length > 0){
                        match.awayTeam.name=awayTeamBlock.text()
                        let awayTeamHref=awayTeamBlock.attr("href").split("/")
                        match.awayTeam.id=awayTeamHref[awayTeamHref.length - 2]
                        match.awayTeam.slug=awayTeamHref[awayTeamHref.length - 1]
                    }else{
                        match.awayTeam.name=$(elem).find("td:nth-child(5)").text()
                        match.awayTeam.id=null
                        match.awayTeam.slug=null
                    }
        
                    let matchLink=$(elem).find("td:nth-child(3) a").attr("href").split("/")
                    match.id=matchLink[matchLink.length - 2]
                    match.slug=matchLink[matchLink.length - 1]
                    match.score=$(elem).find("td:nth-child(3) a").text()
                    match.date=$(elem).find("td:nth-child(6)").text()
                    match.compet=$(elem).find("td:nth-child(7)").text()
                    matchData.lastFiveHeadToHead.push(match)
                })
            }
            let rightSideContainer=$(mainContainer).find(".PageLayout__RightAside")
            matchData.locationInfo={}
            let gameInformationBlock=$(rightSideContainer).find(".GameInfo .ContentList__Item")
            matchData.locationInfo.stadium=$(gameInformationBlock).find(".ContentList__Item:nth-child(1) .GameInfo__Location").text()
            let originalTimeAndDate=$(gameInformationBlock).find(".ContentList__Item:nth-child(1) .GameInfo__Meta span:first-of-type").text().split(",")

            let localTime=getLocalTime(originalTimeAndDate[0])
            originalTimeAndDate[0]=localTime
            matchData.time=localTime
            matchData.locationInfo.timeAndDate=originalTimeAndDate.join(",")
            matchData.locationInfo.city=$(gameInformationBlock).find(".ContentList__Item:nth-child(2) .Location__Text").text()
        
            let standingTableBlock=$(rightSideContainer).find("section.TeamStandings")
            matchData.currentCompet={}
            if(standingTableBlock.length > 0){
                matchData.currentCompet.name=$(standingTableBlock).find("header h3").text()
                matchData.currentCompet.clubsList=[]
                $(standingTableBlock).find(".Card__Content table tbody tr").each(async (i, elem3) => {
                    let CompetTeam={}
                    let teamHref=$(elem3).find("td:nth-child(1) a").attr("href").split("/")
                    CompetTeam.name=$(elem3).find("td:nth-child(1) a").text()
                    CompetTeam.id=teamHref[teamHref.length - 2]
                    CompetTeam.slug=teamHref[teamHref.length - 1]
                    CompetTeam.GP=$(elem3).find("td:nth-child(2)").text()
                    CompetTeam.W=$(elem3).find("td:nth-child(3)").text()
                    CompetTeam.D=$(elem3).find("td:nth-child(4)").text()
                    CompetTeam.L=$(elem3).find("td:nth-child(5)").text()
                    CompetTeam.GD=$(elem3).find("td:nth-child(6)").text()
                    CompetTeam.P=$(elem3).find("td:nth-child(7)").text()
                    matchData.currentCompet.clubsList.push(CompetTeam)
                })
            }
        }

        return {
            status:200,
            matchData
        };
    }catch(error){
        return {
            status:400,            
            error:error
        };
    }
    
}
async function getMatchLineUpData(gameId,type=null){
    let bigData;
    try{
        const {data} = await axios.get(`https://www.espn.com/soccer/lineups/_/gameId/${gameId}`,{timeout: 10000000});
        bigData=data
        let matchData={}
   
        const $ = cheerio.load(bigData);
        let container=$('main#fittPageContainer .pageContent');
        let barBlock=$(container).find("nav.Nav__Secondary .Nav__Secondary__Menu")
        let navLength=$(barBlock).find("li").length
        let preMatchLinup=false;
        let isCommAvailable=false;
    
        let text=$(barBlock).find("li:nth-child(1) a")
        let allLi=text.text()
        if(allLi.includes("Line-Ups")){
                preMatchLinup=true
        }
        if(allLi.includes("Commentary")){
                isCommAvailable=true
        }
        if(!isCommAvailable){

            if(preMatchLinup){
                matchData.isLinupsAvai=true 
            }else{
                matchData.isLinupsAvai=false 
            }
             matchData.status="Not Started"
        }else{
            let text=$(barBlock).find("li:nth-child(1) a")
            let allLi=text.text()
            if(allLi.includes("Gamecast")){
                matchData.status="Live"
            }else{
                matchData.status="Finished"
            }
            matchData.isLinupsAvai=true 
        }

        let header=$(container).find(".Gamestrip ")
        matchData.competName=$(header).find(".ScoreCell__GameNote ").text()
        let teamsContainer=$(header).find(".Gamestrip__Competitors ")
    
        matchData.homeTeam={}
        let homeTeamContainer=$(teamsContainer).find(".Gamestrip__Team:first-of-type")
        let homeTeamColorBlock=$(homeTeamContainer).find(".LogoEnhanced").attr("style").split(":")
        let homeTeamColorBlock2=$(homeTeamContainer).find(".SkewedLine--1").attr("style").split(":")
        let homeTeamColorBlock3=$(homeTeamContainer).find(".SkewedLine--2").attr("style").split(":")
        matchData.homeTeam.color1=homeTeamColorBlock[1]
        matchData.homeTeam.color2=homeTeamColorBlock2[1]
        matchData.homeTeam.color3=homeTeamColorBlock3[1]
        let homeTeamInfo=$(homeTeamContainer).find(".Gamestrip__Info ")
        let homeTeamAddress=$(homeTeamInfo).find(".Gamestrip__InfoWrapper a")
        if(homeTeamAddress.length > 0){
            let teamHref=$(homeTeamAddress).attr("href").split("/")
            matchData.homeTeam.id=teamHref[teamHref.length - 2]
            matchData.homeTeam.slug=teamHref[teamHref.length - 1]
            matchData.homeTeam.name=$(homeTeamAddress).text()
        }else{
            matchData.homeTeam.id=null
            matchData.homeTeam.slug=null
            matchData.homeTeam.name=$(homeTeamInfo).find(".Gamestrip__InfoWrapper").text()
        }
        let homeTeamRecord=$(homeTeamInfo).find(".Gamestrip__Record ").text()
        matchData.homeTeam.record=homeTeamRecord
        $(homeTeamContainer).find('.Gamestrip__Score svg ').remove();
        matchData.homeTeam.score=$(homeTeamContainer).find(".Gamestrip__Score:not(svg) ").text()
        matchData.awayTeam={}
        let awayTeamContainer=$(teamsContainer).find(".Gamestrip__Team:last-of-type")
        let awayTeamColorBlock=$(awayTeamContainer).find(".LogoEnhanced").attr("style").split(":")
        let awayTeamColoBlock2=$(awayTeamContainer).find(".SkewedLine--1").attr("style").split(":")
        let awayTeamColoBlock3=$(awayTeamContainer).find(".SkewedLine--2").attr("style").split(":")
        matchData.awayTeam.color1=awayTeamColorBlock[1]
        matchData.awayTeam.color2=awayTeamColoBlock2[1]
        matchData.awayTeam.color3=awayTeamColoBlock3[1]
        let awayTeamInfo=$(awayTeamContainer).find(".Gamestrip__Info ")
        let awayteamAddress=$(awayTeamInfo).find(".Gamestrip__InfoWrapper a")
        if(awayteamAddress.length > 0){
            let teamHref=$(awayteamAddress).attr("href").split("/")
            matchData.awayTeam.id=teamHref[teamHref.length - 2]
            matchData.awayTeam.slug=teamHref[teamHref.length - 1]
            matchData.awayTeam.name=$(awayteamAddress).text()
        }else{
            matchData.awayTeam.id=null
            matchData.awayTeam.slug=null
            matchData.awayTeam.name=$(awayTeamInfo).find(".Gamestrip__InfoWrapper").text()
        }
        let awayTeamRecord=$(awayTeamInfo).find(".Gamestrip__Record ").text()
        matchData.awayTeam.record=awayTeamRecord
        $(awayTeamContainer).find('.Gamestrip__Score svg ').remove();
        matchData.awayTeam.score=$(awayTeamContainer).find(".Gamestrip__Score:not(svg) ").text()
        let dateAndTimeBlock=$(teamsContainer).find(".Gamestrip__Overview__Wrapper .Gamestrip__Overview ")
        matchData.date=$(dateAndTimeBlock).find(".ScoreCell__ScoreDate ").text()
        
        if(matchData.status!=="Not Started"){
            let eventContainer=$(container).find(".SoccerPerformers  ")
            matchData.homeTeam.events={
            goals:[],
            redCards:[]
            }
            let homeTeamEventContainer=$(eventContainer).find(".SoccerPerformers__Competitor--left")
            $(homeTeamEventContainer).find(".SoccerPerformers__Competitor__Info").each(async(i,elem)=>{
            
            let hasGoals=$(elem).find("svg.SoccerPerformers__GoalIcon ")
            if(hasGoals.length > 0){
                $(elem).find("ul li").each(async(i2,elem2)=>{
                    let playerName=$(elem2).find(".Soccer__PlayerName").text().trim()
                    let goalTime=$(elem2).find(".GoalScore__Time").text().trim()
                    matchData.homeTeam.events.goals.push({playerName,goalTime})
                })
            }
            let hasRCs=$(elem).find("svg.SoccerPerformers__RedCardIcon  ")
            if(hasRCs.length > 0){
                $(elem).find("ul li").each(async(i2,elem2)=>{
                    let playerName=$(elem2).find(".Soccer__PlayerName").text().trim()
                    let rcTime=$(elem2).find(".GoalScore__Time").text().trim()
                    matchData.homeTeam.events.redCards.push({playerName,rcTime})
                })
            }
            })
            matchData.awayTeam.events={
            goals:[],
            redCards:[]
            }
            let awayTeamEventContainer=$(eventContainer).find(".SoccerPerformers__Competitor--right")
            $(awayTeamEventContainer).find(".SoccerPerformers__Competitor__Info").each(async(i,elem)=>{
            let hasGoals=$(elem).find("svg.SoccerPerformers__GoalIcon")
            if(hasGoals.length > 0){
                $(elem).find("ul li").each(async(i2,elem2)=>{
                    let playerName=$(elem2).find(".Soccer__PlayerName").text().trim()
                    let goalTime=$(elem2).find(".GoalScore__Time").text().trim()
                    matchData.awayTeam.events.goals.push({playerName,goalTime})
                })
            }
            let hasRCs=$(elem).find("svg.SoccerPerformers__RedCardIcon")
            if(hasRCs.length > 0){
                $(elem).find("ul li").each(async(i2,elem2)=>{
                    let playerName=$(elem2).find(".Soccer__PlayerName").text().trim()
                    let rcTime=$(elem2).find(".GoalScore__Time").text().trim()
                    matchData.awayTeam.events.redCards.push({playerName,rcTime})
                })
            }
            })
        }
    
        matchData.navItems=[]
        $(barBlock).find("li").each(async(index,li)=>{
            if(index === 0 ){
                let text=$(li).find("a").text()
                let slug="summary"
                matchData.navItems.push({text,slug})
            }else{
                let link=$(li).find("a")
                let href=$(link).attr("href").split("/")
                let text=$(link).text()
                let slug=href[2]
                matchData.navItems.push({text,slug})
            }
        })
    
        matchData.lineUps={
            homeTeamLineUp:{

            },
            awayTeamLineUp:{

            },
        }
    
        
        let mainContainer=$(container).find(".PageLayout  ")
   
        let centerContainer=$(mainContainer).find(".PageLayout__Main .LineUps__BothTeams")

        $(centerContainer).find("section.Card").each(async(i,elem)=>{
            let lineUp={}
            lineUp.formation=$(elem).find("span.LineUps__TabsHeader__Title").text()
            lineUp.tacticalFormation=[]
            lineUp.players={
                onPitch:[],
                substitutes:[],
            }
            $(elem).find(".TacticalFormation ul li").each(async(i2,elem2)=>{
                let player={}
                player.name=$(elem2).find(".TacticalFormation__Field__Player__Name").text()
                player.number=$(elem2).find(".headshot-jerseyV2__player-number").text()
                player.jersyColor=$(elem2).find("svg path:first-of-type").attr("fill")
                let positionBlock=$(elem2).attr("style").split(":")
                player.position=positionBlock[1]
                player.isSubstitute=false
                let subsBlock=$(elem2).find("svg.TacticalFormation__Field__Player__SubstitutionIcon ")
                if(subsBlock.length > 0){
                    player.isSubstitute=true
                }
                lineUp.tacticalFormation.push(player)
            })
            $(elem).find(".LineUps__PlayersTable table tbody tr").each(async(i3,elem3)=>{
                let block=$(elem3).find("td")
                let player={}
                player.number=$(block).find(".SoccerLineUpPlayer:first-of-type .SoccerLineUpPlayer__Header__Number").text()
                let playerLink=$(block).find(".SoccerLineUpPlayer:first-of-type .SoccerLineUpPlayer__Header__Name")
                if(playerLink.length > 0){
                    let playerHref=$(playerLink).attr("href").split("/")
                    player.id=playerHref[playerHref.length - 2]
                    player.slug=playerHref[playerHref.length - 1]
                    player.name=$(playerLink).text()
                }else{
                    player.id=null
                    player.slug=null
                    player.name=$(block).find(".SoccerLineUpPlayer:first-of-type").text()
                }
                player.scored=false
                let scoredBlock=$(block).find(".SoccerLineUpPlayer:first-of-type svg.SoccerLineUpPlayer__Header__GoalIcon  ")
                if(scoredBlock.length > 0){
                    player.scored=true
                    player.nbGoal=scoredBlock.length
                    player.goalTime=[]
                    $(scoredBlock).each(async(i2,ele5)=>{
                        let goalNum=i2+1
                        let goalTimeBlock=$(ele5).attr("aria-label").split(" ")
                        let goalTime=goalTimeBlock[goalTimeBlock.length - 1]
                        player.goalTime.push({goalNum,goalTime})
                    })
                }
                player.hasYC=false
                let yellowCardBlock=$(block).find(".SoccerLineUpPlayer:first-of-type svg.SoccerLineUpPlayer__Header__YellowCardIcon   ")
                if(yellowCardBlock.length > 0){
                    player.hasYC=true
                    player.yc=[]
                    $(yellowCardBlock).each(async(i2,ele5)=>{
                        let ycNumb=i2+1
                        let ycTimeBlock=$(ele5).attr("aria-label").split(" ")
                        let ycTime=ycTimeBlock[ycTimeBlock.length - 1]
                        player.yc.push({ycNumb,ycTime})
                    })
                    
                }
                player.hasRC=false
                let redCardBlock=$(block).find(".SoccerLineUpPlayer:first-of-type svg.SoccerLineUpPlayer__Header__RedCardIcon  ")
                if(redCardBlock.length > 0){
                    player.hasRC=true
                    player.rc=[]
                    $(redCardBlock).each(async(i2,ele5)=>{
                        let rcNumb=i2+1
                        let rcTimeBlock=$(ele5).attr("aria-label").split(" ")
                        let rcTime=rcTimeBlock[rcTimeBlock.length - 1]
                        player.rc.push({rcNumb,rcTime})
                    })
                    
                }
                player.isSubstitute=false
                let subsBlock=$(block).find("svg.SoccerLineUpPlayer__Header__SubstitutionIcon  ")
                if(subsBlock.length > 0){
                    player.isSubstitute=true
                    let subedPlayer={}
                    subedPlayer.number=$(block).find(".SoccerLineUpPlayer:last-of-type .SoccerLineUpPlayer__Header__Number").text()
                    let subedplayerLink=$(block).find(".SoccerLineUpPlayer:last-of-type .SoccerLineUpPlayer__Header__Name")
                    if(subedplayerLink.length > 0){
                        let playerHref=$(subedplayerLink).attr("href").split("/")
                        subedPlayer.id=playerHref[playerHref.length - 2]
                        subedPlayer.slug=playerHref[playerHref.length - 1]
                        subedPlayer.name=$(subedplayerLink).text()                 
                    }else{
                        subedPlayer.id=null
                        subedPlayer.slug=null
                        subedPlayer.name=$(block).find(".SoccerLineUpPlayer:last-of-type").text()
                    }
                    subedPlayer.scored=false
                    let scoredBlock=$(block).find(".SoccerLineUpPlayer:last-of-type svg.SoccerLineUpPlayer__Header__GoalIcon  ")
                    if(scoredBlock.length > 0){
                        subedPlayer.scored=true
                        subedPlayer.nbGoal=scoredBlock.length
                        subedPlayer.goalTime=[]
                        $(scoredBlock).each(async(i2,ele5)=>{
                            let goalNum=i2+1
                            let goalTimeBlock=$(ele5).attr("aria-label").split(" ")
                            let goalTime=goalTimeBlock[goalTimeBlock.length - 1]
                            subedPlayer.goalTime.push({goalNum,goalTime})
                        })
                    }
                    subedPlayer.hasYC=false
                    let yellowCardBlock2=$(block).find(".SoccerLineUpPlayer:last-of-type svg.SoccerLineUpPlayer__Header__YellowCardIcon   ")
                    if(yellowCardBlock2.length > 0){
                        subedPlayer.hasYC=true
                        subedPlayer.yc=[]
                        $(yellowCardBlock2).each(async(i2,ele5)=>{
                            let ycNumb=i2+1
                            let ycTimeBlock=$(ele5).attr("aria-label").split(" ")
                            let ycTime=ycTimeBlock[ycTimeBlock.length - 1]
                            subedPlayer.yc.push({ycNumb,ycTime})
                        })
                    }
                    subedPlayer.hasRC=false
                    let redCardBlock2=$(block).find(".SoccerLineUpPlayer:last-of-type svg.SoccerLineUpPlayer__Header__RedCardIcon  ")
                    if(redCardBlock2.length > 0){
                        subedPlayer.hasRC=true
                        subedPlayer.rc=[]
                        $(redCardBlock2).each(async(i2,ele5)=>{
                            let rcNumb=i2+1
                            let rcTimeBlock=$(ele5).attr("aria-label").split(" ")
                            let rcTime=rcTimeBlock[rcTimeBlock.length - 1]
                            subedPlayer.rc.push({rcNumb,rcTime})
                        })
                        
                    }
                    let subedTime=$(subsBlock).attr("aria-label").split(" ")
                    subedPlayer.time=subedTime[subedTime.length - 1]
                    player.subedWith=subedPlayer
                }
                lineUp.players.onPitch.push(player)
            })
            $(elem).find(".LineUps__SubstitutesTable table tbody tr").each(async(i3,elem3)=>{
                let block=$(elem3).find("td")
                let player={}
                player.number=$(block).find(".SoccerLineUpPlayer__Header__Number").text()
                let playerLink=$(block).find(".SoccerLineUpPlayer__Header__Name")
                if(playerLink.length > 0){
                    let playerHref=$(playerLink).attr("href").split("/")
                    player.id=playerHref[playerHref.length - 2]
                    player.slug=playerHref[playerHref.length - 1]
                    player.name=$(playerLink).text()
                }else{
                    player.id=null
                    player.slug=null
                    player.name=$(block).text()
                }
                lineUp.players.substitutes.push(player)
            })
            if(i === 0){
                matchData.lineUps.homeTeamLineUp=lineUp
            }else{
                matchData.lineUps.awayTeamLineUp=lineUp
            }
            let rightSideContainer=$(mainContainer).find(".PageLayout__RightAside")
        matchData.locationInfo={}
        let gameInformationBlock=$(rightSideContainer).find(".GameInfo .ContentList__Item")
        matchData.locationInfo.stadium=$(gameInformationBlock).find(".ContentList__Item:nth-child(1) .GameInfo__Location").text()
        let originalTimeAndDate=$(gameInformationBlock).find(".ContentList__Item:nth-child(1) .GameInfo__Meta span:first-of-type").text().split(",")

        let localTime=getLocalTime(originalTimeAndDate[0])
        originalTimeAndDate[0]=localTime
        matchData.time=localTime
        matchData.locationInfo.timeAndDate=originalTimeAndDate.join(",")
        matchData.locationInfo.city=$(gameInformationBlock).find(".ContentList__Item:nth-child(2) .Location__Text").text()
    
        let standingTableBlock=$(rightSideContainer).find("section.TeamStandings")
        matchData.currentCompet={}
        if(standingTableBlock.length > 0){
            matchData.currentCompet.name=$(standingTableBlock).find("header h3").text()
            matchData.currentCompet.clubsList=[]
            $(standingTableBlock).find(".Card__Content table tbody tr").each(async (i, elem3) => {
                let CompetTeam={}
                let teamHref=$(elem3).find("td:nth-child(1) a").attr("href").split("/")
                CompetTeam.name=$(elem3).find("td:nth-child(1) a").text()
                CompetTeam.id=teamHref[teamHref.length - 2]
                CompetTeam.slug=teamHref[teamHref.length - 1]
                CompetTeam.GP=$(elem3).find("td:nth-child(2)").text()
                CompetTeam.W=$(elem3).find("td:nth-child(3)").text()
                CompetTeam.D=$(elem3).find("td:nth-child(4)").text()
                CompetTeam.L=$(elem3).find("td:nth-child(5)").text()
                CompetTeam.GD=$(elem3).find("td:nth-child(6)").text()
                CompetTeam.P=$(elem3).find("td:nth-child(7)").text()
                matchData.currentCompet.clubsList.push(CompetTeam)
            })
        }
        })
    if(type === null){
        return {
            status:200,
            matchData
        }
    }else{
        let lineUps=matchData.lineUps
        return {
            status:200,
            data:lineUps
        }
    }
    }catch(error){
        return {
            status:400,            
            error:error
        };
    }


}
async function getMatchCommentary(gameId,gameSlug){
    let bigData;
    try{
        const {data} = await axios.get(`https://www.espn.com/soccer/commentary/_/gameId/${gameId}`,{timeout: 10000000});
        bigData=data
        let matchData={}

        const $ = cheerio.load(bigData);
        let container=$('main#fittPageContainer .pageContent');
    
        let barBlock=$(container).find("nav.Nav__Secondary .Nav__Secondary__Menu")
        let isCommAvailable=false;
    
        let text=$(barBlock).find("li:nth-child(1) a")
        let allLi=text.text()
    
        if(allLi.includes("Commentary")){
            isCommAvailable=true
        }
    
        if(isCommAvailable){
            if(allLi.includes("Gamecast")){
                matchData.status="Live"
            }else{
                matchData.status="Finished"
            }
            matchData.isLinupsAvai=true 
         }
    
        let header=$(container).find(".Gamestrip ")
        matchData.competName=$(header).find(".ScoreCell__GameNote ").text()
        let teamsContainer=$(header).find(".Gamestrip__Competitors ")
    
        matchData.homeTeam={}
        let homeTeamContainer=$(teamsContainer).find(".Gamestrip__Team:first-of-type")
        let homeTeamColorBlock=$(homeTeamContainer).find(".LogoEnhanced").attr("style").split(":")
        let homeTeamColorBlock2=$(homeTeamContainer).find(".SkewedLine--1").attr("style").split(":")
        let homeTeamColorBlock3=$(homeTeamContainer).find(".SkewedLine--2").attr("style").split(":")
        matchData.homeTeam.color1=homeTeamColorBlock[1]
        matchData.homeTeam.color2=homeTeamColorBlock2[1]
        matchData.homeTeam.color3=homeTeamColorBlock3[1]
        let homeTeamInfo=$(homeTeamContainer).find(".Gamestrip__Info ")
        let homeTeamAddress=$(homeTeamInfo).find(".Gamestrip__InfoWrapper a")
        if(homeTeamAddress.length > 0){
            let teamHref=$(homeTeamAddress).attr("href").split("/")
            matchData.homeTeam.id=teamHref[teamHref.length - 2]
            matchData.homeTeam.slug=teamHref[teamHref.length - 1]
            matchData.homeTeam.name=$(homeTeamAddress).text()
        }else{
            matchData.homeTeam.id=null
            matchData.homeTeam.slug=null
            matchData.homeTeam.name=$(homeTeamInfo).find(".Gamestrip__InfoWrapper").text()
        }
        let homeTeamRecord=$(homeTeamInfo).find(".Gamestrip__Record ").text()
        matchData.homeTeam.record=homeTeamRecord
        $(homeTeamContainer).find('.Gamestrip__Score svg ').remove();
        matchData.homeTeam.score=$(homeTeamContainer).find(".Gamestrip__Score:not(svg) ").text()
    
        matchData.awayTeam={}
        let awayTeamContainer=$(teamsContainer).find(".Gamestrip__Team:last-of-type")
        let awayTeamColorBlock=$(awayTeamContainer).find(".LogoEnhanced").attr("style").split(":")
        let awayTeamColoBlock2=$(awayTeamContainer).find(".SkewedLine--1").attr("style").split(":")
        let awayTeamColoBlock3=$(awayTeamContainer).find(".SkewedLine--2").attr("style").split(":")
        matchData.awayTeam.color1=awayTeamColorBlock[1]
        matchData.awayTeam.color2=awayTeamColoBlock2[1]
        matchData.awayTeam.color3=awayTeamColoBlock3[1]
        
        let awayTeamInfo=$(awayTeamContainer).find(".Gamestrip__Info ")
        let awayteamAddress=$(awayTeamInfo).find(".Gamestrip__InfoWrapper a")
        if(awayteamAddress.length > 0){
            let teamHref=$(awayteamAddress).attr("href").split("/")
            matchData.awayTeam.id=teamHref[teamHref.length - 2]
            matchData.awayTeam.slug=teamHref[teamHref.length - 1]
            matchData.awayTeam.name=$(awayteamAddress).text()
        }else{
            matchData.awayTeam.id=null
            matchData.awayTeam.slug=null
            matchData.awayTeam.name=$(awayTeamInfo).find(".Gamestrip__InfoWrapper").text()
        }
        let awayTeamRecord=$(awayTeamInfo).find(".Gamestrip__Record ").text()
        matchData.awayTeam.record=awayTeamRecord
        $(awayTeamContainer).find('.Gamestrip__Score svg ').remove();
        matchData.awayTeam.score=$(awayTeamContainer).find(".Gamestrip__Score:not(svg) ").text()
    
        let dateAndTimeBlock=$(teamsContainer).find(".Gamestrip__Overview__Wrapper .Gamestrip__Overview ")
        matchData.date=$(dateAndTimeBlock).find(".ScoreCell__ScoreDate ").text()
    
        let eventContainer=$(container).find(".SoccerPerformers  ")
        matchData.homeTeam.events={
            goals:[],
            redCards:[]
        }
        let homeTeamEventContainer=$(eventContainer).find(".SoccerPerformers__Competitor--left")
        $(homeTeamEventContainer).find(".SoccerPerformers__Competitor__Info").each(async(i,elem)=>{
            
            let hasGoals=$(elem).find("svg.SoccerPerformers__GoalIcon ")
            if(hasGoals.length > 0){
                $(elem).find("ul li").each(async(i2,elem2)=>{
                    let playerName=$(elem2).find(".Soccer__PlayerName").text().trim()
                    let goalTime=$(elem2).find(".GoalScore__Time").text().trim()
                    matchData.homeTeam.events.goals.push({playerName,goalTime})
                })
            }
            let hasRCs=$(elem).find("svg.SoccerPerformers__RedCardIcon  ")
            if(hasRCs.length > 0){
                $(elem).find("ul li").each(async(i2,elem2)=>{
                    let playerName=$(elem2).find(".Soccer__PlayerName").text().trim()
                    let rcTime=$(elem2).find(".GoalScore__Time").text().trim()
                    matchData.homeTeam.events.redCards.push({playerName,rcTime})
                })
            }
        })
        matchData.awayTeam.events={
            goals:[],
            redCards:[]
        }
        let awayTeamEventContainer=$(eventContainer).find(".SoccerPerformers__Competitor--right")
        $(awayTeamEventContainer).find(".SoccerPerformers__Competitor__Info").each(async(i,elem)=>{
            let hasGoals=$(elem).find("svg.SoccerPerformers__GoalIcon")
            if(hasGoals.length > 0){
                $(elem).find("ul li").each(async(i2,elem2)=>{
                    let playerName=$(elem2).find(".Soccer__PlayerName").text().trim()
                    let goalTime=$(elem2).find(".GoalScore__Time").text().trim()
                    matchData.awayTeam.events.goals.push({playerName,goalTime})
                })
            }
            let hasRCs=$(elem).find("svg.SoccerPerformers__RedCardIcon")
            if(hasRCs.length > 0){
                $(elem).find("ul li").each(async(i2,elem2)=>{
                    let playerName=$(elem2).find(".Soccer__PlayerName").text().trim()
                    let rcTime=$(elem2).find(".GoalScore__Time").text().trim()
                    matchData.awayTeam.events.redCards.push({playerName,rcTime})
                })
            }
        })
    
    
    
        matchData.navItems=[]
        barBlock=$(container).find("nav.Nav__Secondary .Nav__Secondary__Menu")
        $(barBlock).find("li").each(async(index,li)=>{
            if(index === 0 ){
                let text=$(li).find("a").text()
                let slug="summary"
                matchData.navItems.push({text,slug})
            }else{
                let link=$(li).find("a")
                let href=$(link).attr("href").split("/")
                let text=$(link).text()
                let slug=href[2]
                matchData.navItems.push({text,slug})
            }
        })
    
        let mainContainer=$(container).find(".PageLayout  ")
    
        let leftSideContainer=$(mainContainer).find(".PageLayout__LeftAside")
    
    
        matchData.locationInfo={}
        let gameInformationBlock=$(leftSideContainer).find(".GameInfo .ContentList__Item")
        matchData.locationInfo.stadium=$(gameInformationBlock).find(".ContentList__Item:nth-child(1) .GameInfo__Location").text()
        let originalTimeAndDate=$(gameInformationBlock).find(".ContentList__Item:nth-child(1) .GameInfo__Meta span:first-of-type").text().split(",")
    
        let localTime=getLocalTime(originalTimeAndDate[0])
        originalTimeAndDate[0]=localTime
        matchData.time=localTime
        matchData.locationInfo.timeAndDate=originalTimeAndDate.join(",")
        matchData.locationInfo.city=$(gameInformationBlock).find(".ContentList__Item:nth-child(2) .Location__Text").text()
    
        let centerContainer=$(mainContainer).find(".PageLayout__Main")
        matchData.gameStory={}
        let GameStory=$(centerContainer).find("section.GameStory") 
    
        if(GameStory.length > 0){
            let previewContent=$(GameStory).find(".Card__Content:last-of-type")
            matchData.gameStory.title=$(previewContent).find("h2").text() 
            matchData.gameStory.content=$(previewContent).find(".contentItem__subhead:nth-child(2)").text() 
            matchData.gameStory.dateAndTime=$(previewContent).find(".contentItem__subhead:nth-child(3)").text() 
        }
        matchData.timeLine=[]
        let Timeline=$(centerContainer).find("section.Timeline .Wrapper .Timeline__Content") 
        $(Timeline).find("ul li").each(async(i,elem)=>{
            let event={
                type:"",
                time:"",
                forTeam:"",
                style:{
                    margin:"",
                    left:""
                }
            }
            
            if(i != 0 && i!=  $(Timeline).find("ul li").length - 1){
                if($(elem).find("svg").length > 0){
                    let svgType=$(elem).find("svg use").attr("href")
                    if(svgType === "#icon__soccer__penalty_shot"){
                        if($(elem).find("svg.IconSoccer--PenaltyMissed").length > 0){
                            event.type="Missed Penalty"
                        }else{
                            event.type="Goal"
                        }
                    }else if(svgType === "#icon__soccer__substitution"){
                        event.type="Subs"
                    }else if(svgType === "#icon__soccer__card"){
                        if($(elem).find("svg.IconSoccer--YellowCard").length > 0){
                            event.type="Yellow Card"
                        }else{
                            event.type="Red Card"
                        }
                    }
                    let teamType=$(elem).find(".Timeline__Content__Match__Progress__Events__Event__Details--homeTeam")
                    if(teamType.length > 0){
                        event.forTeam="homeTeam"
                    }else{
                        event.forTeam="awayTeam"
                    }
                }else{            
                    event.type="Half Time"
                }
                event.time=$(elem).find(".Timeline__Content__Match__Progress__Events__Event__Time").text()
                
            }else{
                if(i == 0){
                    event.type="Start Time"
                }else{
                    event.type="End Time"
                }
            }
          
            let styleBLock=$(elem).attr("style").split(";")
            if(styleBLock.length == 2){
                event.style.left=styleBLock[0].split(":")[1]
                event.style.margin=styleBLock[1].split(":")[1]
            }else{
                event.style.left=styleBLock[0].split(":")[1]
            }
            matchData.timeLine.push(event)
        })
        let gameCommentary=$(centerContainer).find("section.MatchCommentary .Wrapper table") 
        matchData.gameCommentary=[]
        matchData.keyEvents=[]
        $(gameCommentary).find("tbody tr").each(async(i,elem)=>{
            let contentContainer=$(elem).find(".MatchCommentary__Comment")
            let comment={
                time:"",
                type:"",
                content:"",
                event:""
            }
            comment.time=$(contentContainer).find(".MatchCommentary__Comment__Timestamp").text()
            comment.content=$(contentContainer).find(".MatchCommentary__Comment__GameDetails").text()
            if($(contentContainer).find("svg").length > 0){
                comment.type="keyEvent"
                let svgType=$(contentContainer).find("svg use").attr("href")
                if(svgType === "#icon__soccer__penalty_shot"){                   
                    comment.event="Goal"
                }else if(svgType === "#icon__soccer__substitution"){
                    comment.event="Subs"
                }else if(svgType === "#icon__soccer__card"){
                    if($(elem).find("svg.MatchCommentary__Comment__PlayIcon__Icon--YellowCard").length > 0){
                        comment.event="Yellow Card"
                    }else{
                        comment.event="Red Card"
                    }
                }else if(svgType ==="#icon__soccer__foul"){
                    comment.event="Foul"
                }else if(svgType ==="##icon__soccer__time_possession"){
                    comment.event="Time"
                }else if(svgType ==="#icon__soccer__missed_penalty" || svgType === "#icon__soccer__shot"){
                    comment.event="Missed Chance"
                }else if(svgType ==="#icon__soccer__corner_kick"){
                    comment.event="Corner Kick"
                }else if(svgType ==="#icon__soccer__save"){
                    comment.event="Keeper Save"
                }else if(svgType ==="#icon__soccer__off_sides"){
                    comment.event="Offside"
                }
            }else{
                comment.type="normalComment"
            }
            let keyEventsWanted=["Time","Red Card","Yellow Card","Goal","Subs"]
            if(comment.event === "Time"){
    
            }
            if(comment.type==="keyEvent"){ 
              
                let isExist=keyEventsWanted.findIndex(ele=>ele === comment.event)
                if(isExist != -1){
                    matchData.keyEvents.push(comment)
                }
            }
            matchData.gameCommentary.push(comment)
        })
    
        let rightSideContainer=$(mainContainer).find(".PageLayout__RightAside")
        let standingTableBlock=$(rightSideContainer).find("section.TeamStandings")
        matchData.currentCompet={}
        if(standingTableBlock.length > 0){
            matchData.currentCompet.name=$(standingTableBlock).find("header h3").text()
            matchData.currentCompet.clubsList=[]
            $(standingTableBlock).find(".Card__Content table tbody tr").each(async (i, elem3) => {
                let CompetTeam={}
                let teamHref=$(elem3).find("td:nth-child(1) a").attr("href").split("/")
                CompetTeam.name=$(elem3).find("td:nth-child(1) a").text()
                CompetTeam.id=teamHref[teamHref.length - 2]
                CompetTeam.slug=teamHref[teamHref.length - 1]
                CompetTeam.GP=$(elem3).find("td:nth-child(2)").text()
                CompetTeam.W=$(elem3).find("td:nth-child(3)").text()
                CompetTeam.D=$(elem3).find("td:nth-child(4)").text()
                CompetTeam.L=$(elem3).find("td:nth-child(5)").text()
                CompetTeam.GD=$(elem3).find("td:nth-child(6)").text()
                CompetTeam.P=$(elem3).find("td:nth-child(7)").text()
                matchData.currentCompet.clubsList.push(CompetTeam)
            })
        }
        matchData.lineUps=await getMatchLineUpData(gameId,"commentary")
        if(matchData.lineUps.status !== 200){
            return matchData.lineUps
        }
        matchData.lineUps=matchData.lineUps.data
        return {
            status:200,            
            matchData
        };
    }catch(error){
        return {
            status:400,            
            error:error
        };
    }

}

router.get("/_/gameId/:gameId/:gameSlug",async(req,res)=>{
    let {gameId,gameSlug}=req.params
    let gameData=await getMatchInfo(gameId,gameSlug)
    if(gameData.status !== 200){
        res.status(400).json({message:"Error While Getting The Data"})
    }else{       
        let wantedData=gameData.matchData
        wantedData.id=gameId
        wantedData.slug=gameSlug
        res.json(wantedData)
    }

})
router.get("/_/gameId/:gameId/:gameSlug/preview",async(req,res)=>{
    let {gameId,gameSlug}=req.params
    let gameData=await getMatchPreview(gameId,gameSlug)
    if(gameData.status !== 200){
        res.status(400).json({message:"Error While Getting The Data"})
    }else{
        let wantedData=gameData.matchData
        wantedData.id=gameId
        wantedData.slug=gameSlug
        res.json(wantedData)
    }
})
router.get("/_/gameId/:gameId/:gameSlug/MatchStats",async(req,res)=>{
    let {gameId,gameSlug}=req.params
    let gameData=await getMatchStatsData(gameId)
    if(gameData.status !== 200){
        res.status(400).json({message:"Error While Getting The Data"})
    }else{
        let wantedData=gameData.matchData
        wantedData.id=gameId
        wantedData.slug=gameSlug
        res.json(wantedData)
    }
})
router.get("/_/gameId/:gameId/:gameSlug/LineUp",async(req,res)=>{
    let {gameId,gameSlug}=req.params
    let { type } = req.query;
    let gameData=await getMatchLineUpData(gameId,type)
    if(gameData.status !== 200){
        res.status(400).json({message:"Error While Getting The Data"})
    }else{
        let wantedData=gameData.matchData
        wantedData.id=gameId
        wantedData.slug=gameSlug
        res.json(wantedData)
    }
})
router.get("/_/gameId/:gameId/:gameSlug/Report",async(req,res)=>{
    let {gameId,gameSlug}=req.params
    let gameData=await getMatchReport(gameId)
    if(gameData.status !== 200){
        res.status(400).json({message:"Error While Getting The Data"})
    }else{
        let wantedData=gameData.matchData
        wantedData.id=gameId
        wantedData.slug=gameSlug
        res.json(wantedData)
    }
})
router.get("/_/gameId/:gameId/:gameSlug/Commentary",async(req,res)=>{
    let {gameId,gameSlug}=req.params
    let gameData=await getMatchCommentary(gameId)
    if(gameData.status !== 200){
        res.status(400).json({message:"Error While Getting The Data"})
    }else{
        let wantedData=gameData.matchData
        wantedData.id=gameId
        wantedData.slug=gameSlug
        res.json(wantedData)
    }
})

module.exports=router