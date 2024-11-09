
const axios = require('axios');
const fs = require('fs');

let express=require("express")
let router=express.Router()
const cheerio = require('cheerio');  // new addition

const espnUrl = `https://www.espn.com`;
const allTeams=require("../webScrappingESPN/tournsAndTeams/allLeaguesTeams.json");
const allCompet=require("../webScrappingESPN/tournsAndTeams/allComptetion.json")
const allPlayers=require("../webScrappingESPN/playersInfos/allPlayers.json");
function getLocalTime(oldTime){
    if(oldTime !== "TBD"){
        let time=oldTime
    let listOftime=time.split(":")
    if(parseInt(listOftime[0]) <= 5){
        let newTimeRep=listOftime[1].split(" ")
        listOftime[1]=newTimeRep.join(" ")
        let diff= 5 - parseInt(listOftime[0])
        let newTime=12 - diff
        listOftime[0]=newTime
        time=listOftime.join(":")
    }else{
        let newTimeRep=listOftime[1].split(" ")
        if(parseInt(listOftime[0]) !== 12){
                if(newTimeRep[1] === "PM"){
                    newTimeRep[1] ="AM"
                }else{
                    newTimeRep[1] ="PM"
                }
        }
        listOftime[1]=newTimeRep.join(" ")
        listOftime[0]=parseInt(listOftime[0]) - 5
        time=listOftime.join(":")
    }
    return time
    }
    
}
async  function getTeamFixture(id){
    try{
        const {data} = await axios.get(`https://www.espn.com/soccer/team/fixtures/_/id/${id}`,{timeout: 10000000});
        const $ = cheerio.load(data);  // new addition
        let container=$('#fittPageContainer');
        let team={}

        let centerContainer=$(container).find(".layout__column--1")
        team.fixtureMatches=[]
        $(centerContainer).find(".Table__fixtures").each(async (i, elem2) => {
            let matchesWrapper={}
            matchesWrapper.month=$(elem2).find(".Table__Title").text()
            matchesWrapper.listOfMatches=[]
            $(elem2).find(".Table__Scroller .Table__TBODY tr").each(async (i, elem3) => {
            let match={}
            let homeTeam={}
            let awayTeam={}
            match.date=$(elem3).find(".Table__TD:nth-child(1)").text()
            let homeTeamBlock=$(elem3).find(".Table__TD:nth-child(2) a")
    
            if(homeTeamBlock.length > 0){
                homeTeam.name=homeTeamBlock.text()
                let homeTeamHref=homeTeamBlock.attr("href").split("/")
                homeTeam.id=homeTeamHref[homeTeamHref.length - 2]
                homeTeam.slug=homeTeamHref[homeTeamHref.length - 1]
            }else{
                homeTeam.name=$(elem3).find(".Table__TD:nth-child(2)").text()
                homeTeam.id=null
                homeTeam.slug=null
            }
    
            let awayTeamBlock=$(elem3).find(".Table__TD:nth-child(4) a")
            if(awayTeamBlock.length > 0){
                awayTeam.name=awayTeamBlock.text()
                let awayTeamHref=awayTeamBlock.attr("href").split("/")
                awayTeam.id=awayTeamHref[awayTeamHref.length - 2]
                awayTeam.slug=awayTeamHref[awayTeamHref.length - 1]
            }else{
                awayTeam.name=$(elem3).find(".Table__TD:nth-child(4)").text()
                awayTeam.id=null
                awayTeam.slug=null
            }
    
            let timeBlock=$(elem3).find(".Table__TD:nth-child(5) a")
            match.time=getLocalTime(timeBlock.text())
            let gameHref=timeBlock.attr("href").split("/")
            match.gameId=gameHref[gameHref.length - 2]
            match.gameSlug=gameHref[gameHref.length - 1]
            match.competetion=$(elem3).find(".Table__TD:nth-child(6)").text()
            match.homeTeam=homeTeam
            match.awayTeam=awayTeam
            matchesWrapper.listOfMatches.push(match)
            })
            team.fixtureMatches.push(matchesWrapper)
        })
        return {
            status:200,
            data:team
        }
    }catch(error){
        return {
            status:400,
            error:error
        }
    }
}
async function getPlayerInfo(playerId,playerSlug){
    try{
        const {data} = await axios.get(`https://www.espn.com/soccer/player/_/id/${playerId}/${playerSlug}`,{timeout: 10000000});

        const $ = cheerio.load(data);
        let container=$('.pageContent');
        let player={}
        player.team={}
        let headerContainer=$(container).find(".PlayerHeader")
        let quickInfoContainer=$(headerContainer).find(".PlayerHeader__Main_Aside")

        player.firstName=$(quickInfoContainer).find("h1 span:first-of-type").text()
        player.lastName=$(quickInfoContainer).find("h1 span:last-of-type").text()

        let teamInfoContainer=$(headerContainer).find(".PlayerHeader__Team ul")
        if($(teamInfoContainer).find("li:first-of-type a").length > 0){
            let teamBlock=$(teamInfoContainer).find("li:first-of-type a")
            let teamHref=$(teamBlock).attr("href").split("/")
            player.team.name=teamBlock.text()
            player.team.id=teamHref[teamHref.length - 2]
            player.team.slug=teamHref[teamHref.length - 1]
        }else{
            let teamBlock=$(teamInfoContainer).find("li:first-of-type ")
            player.team.name=teamBlock.text()
            player.team.id=null
            player.team.slug=null
        }
        player.number=$(teamInfoContainer).find("li:nth-child(2)").text()
        player.position=$(teamInfoContainer).find("li:nth-child(3)").text()

        let moreInfoContainer=$(headerContainer).find(".PlayerHeader__Bio .PlayerHeader__Bio_List")
        let heightWeightBlock=$(moreInfoContainer).find("li:nth-child(1) div:last-of-type div").text().split(",")
        // player.weight=heightWeightBlock[1].trim()
        player.weight=heightWeightBlock[1]
        player.height=heightWeightBlock[0]
        // player.height=heightWeightBlock[0].trim()
        player.birthday=$(moreInfoContainer).find("li:nth-child(2) div:last-of-type div").text()
        player.nationality=$(moreInfoContainer).find("li:nth-child(3) div:last-of-type div").text()
        
        player.currentStats={}
        let currentStatContainer=$(headerContainer).find(".PlayerHeader__Right ")
        player.currentStats.name=$(currentStatContainer).find("h2").text()
        player.currentStats.startAndSubs=$(currentStatContainer).find(".StatBlock__Content li:nth-child(1) .StatBlockInner__Value").text()
        player.currentStats.goals=$(currentStatContainer).find(".StatBlock__Content li:nth-child(2) .StatBlockInner__Value").text()
        player.currentStats.assists=$(currentStatContainer).find(".StatBlock__Content li:nth-child(3) .StatBlockInner__Value").text()
        player.currentStats.shoots=$(currentStatContainer).find(".StatBlock__Content li:nth-child(4) .StatBlockInner__Value").text()
        
        
        player.currentLeague={}
        player.currentLeague.teams=[]
        player.team.switchPlayers=[]
        let mainContainer=$(container).find(".page-container")
        let leftSideContainer=$(mainContainer).find(".PageLayout__LeftAside")
        let switchPlayerBlock=$(leftSideContainer).find("section.SwitchPlayer .Card__Content")

        $(switchPlayerBlock).find(".dropdown:first-of-type select option").each(async (i, elem) => {
            let teamName=$(elem).text()
            let teamId=$(elem).attr("value")
            player.currentLeague.teams.push({id:teamId,name:teamName})
        })

        $(switchPlayerBlock).find("ul li").each(async (i, elem) => {
            let playerBlock=$(elem).find(".SwitchPlayer__athlete_info ")
            let playerName=$(playerBlock).find("div").text()
            let playerNumber=$(playerBlock).find("span").text()
            player.team.switchPlayers.push({name:playerName,number:playerNumber})
        })
        let currentLeagueBlock=$(leftSideContainer).find("section.QuickLinks:last-of-type .Card__Header h3").text().split('Quick Links')
        player.currentLeague.shortName=currentLeagueBlock[0].trim()
        let leagueQuickInfo=$(leftSideContainer).find("section.QuickLinks:last-of-type .Card__Content .ContentList__Item:first-of-type a")
        if(leagueQuickInfo.length > 0){
            let leagueHref=$(leagueQuickInfo).attr("href").split("/")
            player.currentLeague.slug=leagueHref[leagueHref.length - 1]
        }else{
            player.currentLeague.slug=null
        }
        
        let currentLeagueData=allCompet.find(ele=>ele.slug===player.currentLeague.slug)
        player.currentLeague.id=currentLeagueData.id
        let currentLeaguedata=allTeams.find(ele=>ele.leagueSlug===player.currentLeague.slug)
        player.currentLeague.fullName=currentLeaguedata.leagueName
        let centerContainer=$(mainContainer).find(".PageLayout__Main")

        let nextGameBlock=$(centerContainer).find("section.NextGame .Gamestrip ") 
        let allGamesObject=await getTeamFixture(player.team.id,player.currentLeague.slug)
        if(allGamesObject.status != 200){
            return {
                status:400,
                error:"Error While Extracting The Data"
            }
        }
        let allGames=allGamesObject.data

        player.team.nextGame=allGames.fixtureMatches[0].listOfMatches[0]
        player.team.nextGame.leagueSeason=$(nextGameBlock).find(".ScoreCell__GameNote").text()

        player.allTeams=[]
        player.allCompetions=[]
        let playerStatBlock=$(centerContainer).find("section.PlayerStats .Wrapper ") 
        let teamAndCompetBlock=$(playerStatBlock).find(".PlayerStats__filters") 
        let teamsBlock=$(teamAndCompetBlock).find("span span ").prev("div")
        $(teamsBlock).find(".dropdown:first-of-type select option").each(async (i, elem) => {
            let id=$(elem).attr("value")
            let name=$(elem).text()
            player.allTeams.push({id,name})
        })
        $(teamAndCompetBlock).find("span span .dropdown:last-of-type select option").each(async (i, elem) => {
            let id=$(elem).attr("value")
            let name=$(elem).text()
            player.allCompetions.push({id,name})
        })

        player.stats={}
        player.stats.leagueName=$(playerStatBlock).find(".PlayerStats__subtitle").text()
        player.stats.allInfo=[]

        $(playerStatBlock).find("table.Table--fixed-left tbody tr").each(async (i, elem) => {   
            player.stats.allInfo.push({name:$(elem).find("td:first-of-type").text()})
        })
        $(playerStatBlock).find(".Table__ScrollerWrapper table tbody tr").each(async (i, elem) => {   

            player.stats.allInfo[i].STRT=$(elem).find("td:nth-child(1)").text()
            player.stats.allInfo[i].FC=$(elem).find("td:nth-child(2)").text()
            player.stats.allInfo[i].FA=$(elem).find("td:nth-child(3)").text()
            player.stats.allInfo[i].YC=$(elem).find("td:nth-child(4)").text()
            player.stats.allInfo[i].RC=$(elem).find("td:nth-child(5)").text()
            player.stats.allInfo[i].G=$(elem).find("td:nth-child(6)").text()
            player.stats.allInfo[i].A=$(elem).find("td:nth-child(7)").text()
            player.stats.allInfo[i].SH=$(elem).find("td:nth-child(8)").text()
            player.stats.allInfo[i].ST=$(elem).find("td:nth-child(9)").text()
            player.stats.allInfo[i].OF=$(elem).find("td:nth-child(10)").text() 
        }) 
        player.lastMatches=[]
        let lastMatches=$(centerContainer).find("section.gamelogWidget .Wrapper ") 
        $(lastMatches).find("table tbody tr").each(async (i, elem) => {
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
                match.homeTeam.name=$(elem).find(".Table__TD:nth-child(1)").text()
                match.homeTeam.id=null
                match.homeTeam.slug=null
            }

            let awayTeamBlock=$(elem).find("td:nth-child(3) a")  
            if(awayTeamBlock.length > 0){
                match.awayTeam.name=awayTeamBlock.text()
                let awayTeamHref=awayTeamBlock.attr("href").split("/")
                match.awayTeam.id=awayTeamHref[awayTeamHref.length - 2]
                match.awayTeam.slug=awayTeamHref[awayTeamHref.length - 1]
            }else{
                match.awayTeam.name=$(elem).find("td:nth-child(3) a").text()
                match.awayTeam.id=null
                match.awayTeam.slug=null
            }

            match.date=$(elem).find("td:nth-child(2)").text()
            match.homeOrAway=$(elem).find("td:nth-child(3) .TeamLink__Logo").prev("span").text()
            match.compet=$(elem).find("td:nth-child(4)").text()
            let matchBlock=$(elem).find("td:nth-child(5) a")
            let matchHref=$(matchBlock).attr("href").split("/")
            match.id=matchHref[matchHref.length - 2]
            match.slug=matchHref[matchHref.length - 1] 
            match.status=$(matchBlock).find(".ResultCell").text()
            match.score=$(matchBlock).find("span").text()
            match.currentPlayer={}
            match.currentPlayer.APP=$(elem).find("td:nth-child(6)").text()
            match.currentPlayer.G=$(elem).find("td:nth-child(7)").text()
            match.currentPlayer.A=$(elem).find("td:nth-child(8)").text()
            match.currentPlayer.SH=$(elem).find("td:nth-child(9)").text()
            match.currentPlayer.ST=$(elem).find("td:nth-child(10)").text()
            match.currentPlayer.FC=$(elem).find("td:nth-child(11)").text()
            match.currentPlayer.FA=$(elem).find("td:nth-child(12)").text()
            match.currentPlayer.OF=$(elem).find("td:nth-child(13)").text()
            match.currentPlayer.YC=$(elem).find("td:nth-child(14)").text()
            match.currentPlayer.RC=$(elem).find("td:nth-child(15)").text()
            player.lastMatches.push(match)
        })
        let allNews = [];
        let newsContainer=$(centerContainer).find("section.LatestNews  .Wrapper ") 
        // Process articles asynchronously
        const processArticles = async () => {
        // Collect all promises
        const promises = $(newsContainer).find("ul li").map(async (i, elem) => {
            let news = {};

            let linkAddress=$(elem).find("a.contentItem__content ")

        
            if (linkAddress.length > 0) {
            news.linkAddress = espnUrl + linkAddress.attr("href");
            let linkAddrssArray=linkAddress.attr("href").split("/")
            news.id=linkAddrssArray[linkAddrssArray.length - 2]
            news.slug=linkAddrssArray[linkAddrssArray.length - 1]
            news.articleTitle = $(linkAddress).find(".contentItem__contentWrapper .contentItem__title").text();
            news.timeStamps = $(linkAddress).find(".contentItem__contentWrapper .contentItem__publicationMeta .time-elapsed").text();
            news.author = $(linkAddress).find(".contentItem__contentWrapper .contentItem__publicationMeta .author").text();
            } else {
            news.linkAddress = "No Url";
            news.articleTitle = "N/A"; // Indicate missing title
            news.articleContent = "N/A";  // Indicate missing content
            news.timeStamps = "N/A";       // Indicate missing timestamp
            news.author = "No Author";    // Indicate missing author
            }

        
            // Fetch additional information only if a link is available
            if (news.linkAddress !== "No Url" && i != 0) {
            try {
                const { data } = await axios.get(news.linkAddress, { timeout: 10000 }); // Set reasonable timeout in milliseconds
                const $ = cheerio.load(data);
            
                let imageBlock = $('aside:last-of-type source:first-of-type');
            
                if (imageBlock.length > 0) {
                let imageUrl = $('aside:last-of-type source:first-of-type').attr("data-srcset").split(",");
                news.articleImageUrl = imageUrl[0].split("&w")[0];
                } else {
                news.articleImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLeRqpPmb4YgGGOxG092HSuL_AT39ubcWwnEVB3pPDcL7HwApHitVOYQZJ1ifsJ2XytPM&usqp=CAU"; // Default image
                }
            } catch (error) {
                console.error("Error fetching additional information for news:", news.linkAddress, error);
                news.articleImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLeRqpPmb4YgGGOxG092HSuL_AT39ubcWwnEVB3pPDcL7HwApHitVOYQZJ1ifsJ2XytPM&usqp=CAU"; // Default image
                // Consider retrying the request or notifying the user
            }
            return news;
            } else {
            news.articleImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLeRqpPmb4YgGGOxG092HSuL_AT39ubcWwnEVB3pPDcL7HwApHitVOYQZJ1ifsJ2XytPM&usqp=CAU"; // Default image
            }
        
        }).get(); // Use .get() to get an array of promises
    
        // Wait for all promises to resolve
        allNews = await Promise.all(promises);
        };
    
        // Call the processArticles function
        await processArticles();
    
        player.allNews=allNews.filter(ele=>ele != null)
        let teamSquads=await getTeamPlayers(player.team.id)
        if(teamSquads.status != 200){
            return {
                status:400,
                error:"Error While Extracting Data"
            }
        }
        player.team.squads=teamSquads.data
        return {
            status:200,
            data:player
        };

    }catch(error){
        return {
            status:400,
            error:error
        }
    }
    
}
async function getPlayerCurrentTeamsStats(playerId,teamId=null,competSlug=null,type){
    try{
        if(type === "id" && competSlug !== "any" ){
            let league=allCompet.find(ele=>ele.leagueName==competSlug)
            competSlug = league.slug
        }
        let bigData;
    
            if(teamId==="any" && competSlug ==="any"){
                const {data} = await axios.get(`https://www.espn.com/soccer/player/stats/_/id/${playerId}`,{timeout: 10000000});
                bigData=data
            }else if(teamId !=="any" && competSlug ==="any"){
                let {data} = await axios.get(`https://www.espn.com/soccer/player/stats/_/id/${playerId}/team/${teamId}`,{timeout: 10000000});
                bigData=data
            }else if(teamId !=="any" && competSlug !=="any"){
                let {data} = await axios.get(`https://www.espn.com/soccer/player/stats/_/id/${playerId}/team/${teamId}/type/${competSlug}`,{timeout: 10000000});
                bigData=data
            }
        const $ = cheerio.load(bigData);
        let container=$('.pageContent');
        let player={}
        player.team={}
        let headerContainer=$(container).find(".PlayerHeader")
        let quickInfoContainer=$(headerContainer).find(".PlayerHeader__Main_Aside")
    
        player.firstName=$(quickInfoContainer).find("h1 span:first-of-type").text()
        player.lastName=$(quickInfoContainer).find("h1 span:last-of-type").text()
    
        let teamInfoContainer=$(headerContainer).find(".PlayerHeader__Team ul")
        if($(teamInfoContainer).find("li:first-of-type a").length > 0){
            let teamBlock=$(teamInfoContainer).find("li:first-of-type a")
            let teamHref=$(teamBlock).attr("href").split("/")
            player.team.name=teamBlock.text()
            player.team.id=teamHref[teamHref.length - 2]
            player.team.slug=teamHref[teamHref.length - 1]
        }else{
            let teamBlock=$(teamInfoContainer).find("li:first-of-type ")
            player.team.name=teamBlock.text()
            player.team.id=null
            player.team.slug=null
        }
    
        let mainContainer=$(container).find(".PageLayout__Main section.Card  ")
        let selectBlock=$(mainContainer).find(".StatsTable__Filters ")
    
        player.allTeams=[]
        $(selectBlock).find(".dropdown:nth-child(1) select:first-of-type option").each(async (i, elem) => {
            let team={}
            team.name=$(elem).text()
            team.id=$(elem).attr("value")
            player.allTeams.push(team)
        }) 
    
        player.allCompets=[]
        let test=$(selectBlock).find(".dropdown:nth-child(2) select:first-of-type")
        if(test.length  > 0){
            $(selectBlock).find(".dropdown:nth-child(2) select:first-of-type option").each(async (i, elem) => {
                let compet={}
                compet.name=$(elem).text()
                compet.slug=$(elem).attr("value")
                player.allCompets.push(compet)
            })
        }
    
    
        player.everySeasonStats=[]
        let firstContainer=$(mainContainer).find(".ResponsiveTable:nth-child(2)")
        let positionName=$(firstContainer).find(".Table__Title").text()
        let positionStats=[]
    
        $(firstContainer).find("table.Table--fixed-left .Table__TBODY tr").each(async (i, elem) => {
            let season={}
            season.name=$(elem).find("td:nth-child(1)").text()
            season.team={}
            let teamBlock=$(elem).find("td:nth-child(2) a")
            if(teamBlock.length > 0){
                let teamHref=$(teamBlock).attr("href").split("/")
                season.team.name=teamBlock.text()
                season.team.id=teamHref[teamHref.length - 2]
                season.team.slug=teamHref[teamHref.length - 1]
            }else{
                let teamBlock=$(teamInfoContainer).find("td:nth-child(2)")
                season.team.name=teamBlock.text()
                season.team.id=null
                season.team.slug=null
            }
            positionStats.push(season)
        })
        $(firstContainer).find(".Table__ScrollerWrapper table tbody tr").each(async (i, elem) => {   
            positionStats[i].STRT=$(elem).find("td:nth-child(1)").text()
            positionStats[i].FC=$(elem).find("td:nth-child(2)").text()
            positionStats[i].FA=$(elem).find("td:nth-child(3)").text()
            positionStats[i].YC=$(elem).find("td:nth-child(4)").text()
            positionStats[i].RC=$(elem).find("td:nth-child(5)").text()
            positionStats[i].G=$(elem).find("td:nth-child(6)").text()
            positionStats[i].A=$(elem).find("td:nth-child(7)").text()
            positionStats[i].SH=$(elem).find("td:nth-child(8)").text()
            positionStats[i].ST=$(elem).find("td:nth-child(9)").text()
            positionStats[i].OF=$(elem).find("td:nth-child(10)").text() 
        }) 
        player.everySeasonStats.push({positionName,positionStats})
    
        let stats=player.everySeasonStats[0].positionStats[0]
        stats.CS=null
        stats.SV=null
        stats.GA=null
        let secondContainer=$(mainContainer).find(".ResponsiveTable:nth-child(3)")
        if(secondContainer.length > 0){
            let secondPositionName=$(secondContainer).find(".Table__Title").text()
            let secondPositionStats=[]
    
            $(secondContainer).find("table.Table--fixed-left .Table__TBODY tr").each(async (i, elem) => {
                let season={}
                season.name=$(elem).find("td:nth-child(1)").text()
                season.team={}
                let teamBlock=$(elem).find("td:nth-child(2) a")
                if(teamBlock.length > 0){
                    let teamHref=$(teamBlock).attr("href").split("/")
                    season.team.name=teamBlock.text()
                    season.team.id=teamHref[teamHref.length - 2]
                    season.team.slug=teamHref[teamHref.length - 1]
                }else{
                    let teamBlock=$(teamInfoContainer).find("td:nth-child(2)")
                    season.team.name=teamBlock.text()
                    season.team.id=null
                    season.team.slug=null
                }
                secondPositionStats.push(season)
            })
            $(secondContainer).find(".Table__ScrollerWrapper table tbody tr").each(async (i, elem) => {   
                secondPositionStats[i].CS=$(elem).find("td:nth-child(1)").text()
                secondPositionStats[i].SV=$(elem).find("td:nth-child(2)").text()
                secondPositionStats[i].GA=$(elem).find("td:nth-child(3)").text()
            }) 
            player.everySeasonStats.push({positionName:secondPositionName,secondPositionStats})
            stats.CS=player.everySeasonStats[1].secondPositionStats[0].CS
            stats.SV= player.everySeasonStats[1].secondPositionStats[0].SV
            stats.GA= player.everySeasonStats[1].secondPositionStats[0].GA
        }
        player.everySeasonStats=[]
        player.everySeasonStats.push(stats)
        player.competSlug=competSlug;
        player.teamId=teamId;
        return {
            status:200,
            data:player
        };
    }catch(error){
        return {
            status:400,
            error:error
        }
    }
    
}
async function getPlayerBio(playerId){
    try{
        const {data} = await axios.get(`https://www.espn.com/soccer/player/bio/_/id/${playerId}`,{timeout: 10000000});

        const $ = cheerio.load(data);
        let container=$('.pageContent');
        let player={}
        player.team={}
        let headerContainer=$(container).find(".PlayerHeader")
        let quickInfoContainer=$(headerContainer).find(".PlayerHeader__Main_Aside")

        player.firstName=$(quickInfoContainer).find("h1 span:first-of-type").text()
        player.lastName=$(quickInfoContainer).find("h1 span:last-of-type").text()

        let teamInfoContainer=$(headerContainer).find(".PlayerHeader__Team ul")
        if($(teamInfoContainer).find("li:first-of-type a").length > 0){
            let teamBlock=$(teamInfoContainer).find("li:first-of-type a")
            let teamHref=$(teamBlock).attr("href").split("/")
            player.team.name=teamBlock.text()
            player.team.id=teamHref[teamHref.length - 2]
            player.team.slug=teamHref[teamHref.length - 1]
        }else{
            let teamBlock=$(teamInfoContainer).find("li:first-of-type ")
            player.team.name=teamBlock.text()
            player.team.id=null
            player.team.slug=null
        }
        player.number=$(teamInfoContainer).find("li:nth-child(2)").text()
        player.position=$(teamInfoContainer).find("li:nth-child(3)").text()

        let moreInfoContainer=$(headerContainer).find(".PlayerHeader__Bio .PlayerHeader__Bio_List")
        let heightWeightBlock=$(moreInfoContainer).find("li:nth-child(1) div:last-of-type div").text().split(",")
        player.weight=heightWeightBlock[1]
        player.height=heightWeightBlock[0]
        player.birthday=$(moreInfoContainer).find("li:nth-child(2) div:last-of-type div").text()
        player.nationality=$(moreInfoContainer).find("li:nth-child(3) div:last-of-type div").text()  
        player.currentStats={}
        let currentStatContainer=$(headerContainer).find(".PlayerHeader__Right ")
        player.currentStats.name=$(currentStatContainer).find("h2").text()
        player.currentStats.startAndSubs=$(currentStatContainer).find(".StatBlock__Content li:nth-child(1) .StatBlockInner__Value").text()
        player.currentStats.goals=$(currentStatContainer).find(".StatBlock__Content li:nth-child(2) .StatBlockInner__Value").text()
        player.currentStats.assists=$(currentStatContainer).find(".StatBlock__Content li:nth-child(3) .StatBlockInner__Value").text()
        player.currentStats.shoots=$(currentStatContainer).find(".StatBlock__Content li:nth-child(4) .StatBlockInner__Value").text()
    
        let mainContainer=$(container).find(".PageLayout__Main")
        player.careerHistory=[]
        $(mainContainer).find("section.Career__History .Wrapper .Career__History__Item").each(async (i, elem) => {
            let team={}
            team.name=$(elem).find(".clr-black").text()
            team.seasons=$(elem).find(".clr-gray-05").text()
            let teamHref=$(elem).attr("href").split("/")
            team.id=teamHref[teamHref.length - 2]
            team.slug=teamHref[teamHref.length - 1]
            player.careerHistory.push(team)
        })

        return {
            status:200,
            data:player
        };
    }catch(error){
        return {
            status:400,
            error:error
        }
    }
    
}
async function getPlayerMatches(playerId,teamId=null,competSlug=null,year=null){
    try{
        let bigData;

        if(teamId === "any" && competSlug === "any" && year ==="any"){
            const {data} = await axios.get(`https://www.espn.com/soccer/player/matches/_/id/${playerId}`,{timeout: 10000000});
            bigData=data
        }else if(teamId !=="any"  && competSlug ==="any" && year==="any"){
            let {data} = await axios.get(`https://www.espn.com/soccer/player/matches/_/id/${playerId}/team/${teamId}`,{timeout: 10000000});
            bigData=data
        }else if(teamId !=="any" && competSlug !=="any" && year==="any"){
            let {data} = await axios.get(`https://www.espn.com/soccer/player/matches/_/id/${playerId}/team/${teamId}/type/${competSlug}`,{timeout: 10000000});
            bigData=data
        }else if(teamId !=="any" && competSlug !=="any" && year!=="any"){
            let {data} = await axios.get(`https://www.espn.com/soccer/player/matches/_/id/${playerId}/team/${teamId}/type/${competSlug}/year/${year}`,{timeout: 10000000});
            bigData=data
        }
        const $ = cheerio.load(bigData);
        let container=$('.pageContent');
        let player={}
        player.team={}
        let headerContainer=$(container).find(".PlayerHeader")
        let quickInfoContainer=$(headerContainer).find(".PlayerHeader__Main_Aside")

        player.firstName=$(quickInfoContainer).find("h1 span:first-of-type").text()
        player.lastName=$(quickInfoContainer).find("h1 span:last-of-type").text()

        let teamInfoContainer=$(headerContainer).find(".PlayerHeader__Team ul")
        if($(teamInfoContainer).find("li:first-of-type a").length > 0){
            let teamBlock=$(teamInfoContainer).find("li:first-of-type a")
            let teamHref=$(teamBlock).attr("href").split("/")
            player.team.name=teamBlock.text()
            player.team.id=teamHref[teamHref.length - 2]
            player.team.slug=teamHref[teamHref.length - 1]
        }else{
            let teamBlock=$(teamInfoContainer).find("li:first-of-type ")
            player.team.name=teamBlock.text()
            player.team.id=null
            player.team.slug=null
        }
        player.number=$(teamInfoContainer).find("li:nth-child(2)").text()
        player.position=$(teamInfoContainer).find("li:nth-child(3)").text()

        let moreInfoContainer=$(headerContainer).find(".PlayerHeader__Bio .PlayerHeader__Bio_List")
        let heightWeightBlock=$(moreInfoContainer).find("li:nth-child(1) div:last-of-type div").text().split(",")
        player.weight=heightWeightBlock[1].trim()
        player.height=heightWeightBlock[0].trim()
        player.birthday=$(moreInfoContainer).find("li:nth-child(2) div:last-of-type div").text()
        player.nationality=$(moreInfoContainer).find("li:nth-child(3) div:last-of-type div").text()
        
        player.currentStats={}
        let currentStatContainer=$(headerContainer).find(".PlayerHeader__Right ")
        player.currentStats.name=$(currentStatContainer).find("h2").text()
        player.currentStats.startAndSubs=$(currentStatContainer).find(".StatBlock__Content li:nth-child(1) .StatBlockInner__Value").text()
        player.currentStats.goals=$(currentStatContainer).find(".StatBlock__Content li:nth-child(2) .StatBlockInner__Value").text()
        player.currentStats.assists=$(currentStatContainer).find(".StatBlock__Content li:nth-child(3) .StatBlockInner__Value").text()
        player.currentStats.shoots=$(currentStatContainer).find(".StatBlock__Content li:nth-child(4) .StatBlockInner__Value").text()
    


        let mainContainer=$(container).find(".PageLayout__Main .gamelog ")

        let selectBlock=$(mainContainer).find(".filters")

        player.allSeasons=[]
        $(selectBlock).find(".dropdown:nth-child(1) select:first-of-type option").each(async (i, elem) => {
            let season={}
            season.name=$(elem).text()
            season.slug=$(elem).attr("value")
            player.allSeasons.push(season)
        })

        player.allTeams=[]
        $(selectBlock).find(".dropdown:nth-child(2) select:first-of-type option").each(async (i, elem) => {
            let team={}
            team.name=$(elem).text()
            team.id=$(elem).attr("value")
            player.allTeams.push(team)
        })

        player.allCompets=[]
        $(selectBlock).find(".dropdown:nth-child(3) select:first-of-type option").each(async (i, elem) => {
            let compet={}
            compet.name=$(elem).text()
            compet.slug=$(elem).attr("value")
            player.allCompets.push(compet)
        })


        player.currentCompetMatches=[]
        $(mainContainer).find(".mb4").each(async (i, elem1) => {
            let competStage=$(elem1).prev(".Table__Title").text()
            let stageMatches=[]
            let decrease=0;
            $(elem1).find(".Table__Scroller .Table__TBODY tr").each(async (i2, elem2) => {
                if($(elem2).hasClass("note-row")){
                    let note=$(elem2).find("td").text()
                    stageMatches[(i2 - 1) - decrease].note=note
                    decrease++
                }else{
                    let match={}
                    match.awayTeam={}
                    let awayTeamBlock=$(elem2).find("td:nth-child(2) a")
                    if(awayTeamBlock.length > 0){
                    match.awayTeam.name=awayTeamBlock.text()
                    let awayTeamHref=awayTeamBlock.attr("href").split("/")
                    match.awayTeam.id=awayTeamHref[awayTeamHref.length - 2]
                    match.awayTeam.slug=awayTeamHref[awayTeamHref.length - 1]
                    }else{
                    match.awayTeam.name=$(elem2).find("td:nth-child(2) a").text()
                    match.awayTeam.id=null
                    match.awayTeam.slug=null
                    }

                    match.date=$(elem2).find("td:nth-child(1)").text()
                    match.homeOrAway=$(elem2).find("td:nth-child(2) .TeamLink__Logo").prev("span").text()

                    let matchBlock=$(elem2).find("td:nth-child(3) a")
                    if(matchBlock.length > 0){
                        let matchHref=$(matchBlock).attr("href").split("/")
                        match.id=matchHref[matchHref.length - 2]
                        match.slug=matchHref[matchHref.length - 1]
                    }
                    
                    match.status=$(matchBlock).find(".ResultCell").text()
                    match.score=$(matchBlock).find("span").text()
                    match.currentPlayer={}
                    match.currentPlayer.G=$(elem2).find("td:nth-child(4)").text()
                    match.currentPlayer.A=$(elem2).find("td:nth-child(5)").text()
                    match.currentPlayer.SH=$(elem2).find("td:nth-child(6)").text()
                    match.currentPlayer.ST=$(elem2).find("td:nth-child(7)").text()
                    match.currentPlayer.FC=$(elem2).find("td:nth-child(8)").text()
                    match.currentPlayer.FA=$(elem2).find("td:nth-child(9)").text()
                    match.currentPlayer.OF=$(elem2).find("td:nth-child(10)").text()
                    match.currentPlayer.YC=$(elem2).find("td:nth-child(11)").text()
                    match.currentPlayer.RC=$(elem2).find("td:nth-child(12)").text()
                    match.note=""
                    stageMatches.push(match)
                }
                

            })
            player.currentCompetMatches.push({competStage,stageMatches})
        })
        return {
            status:200,
            data:player
        };
    }catch(error){
        return {
            status:400,
            error:error
        }
    }
    
}
async function getPlayerStats(playerId,teamId=null,competSlug=null){
    try{
        let bigData;

        if(teamId==="any" && competSlug ==="any"){
            const {data} = await axios.get(`https://www.espn.com/soccer/player/stats/_/id/${playerId}`,{timeout: 10000000});
            bigData=data
        }else if(teamId !=="any" && competSlug ==="any"){
            let {data} = await axios.get(`https://www.espn.com/soccer/player/stats/_/id/${playerId}/team/${teamId}`,{timeout: 10000000});
            bigData=data
        }else if(teamId !=="any" && competSlug !=="any"){
            let {data} = await axios.get(`https://www.espn.com/soccer/player/stats/_/id/${playerId}/team/${teamId}/type/${competSlug}`,{timeout: 10000000});
            bigData=data
        }
        const $ = cheerio.load(bigData);
        let container=$('.pageContent');
        let player={}
        player.team={}
        let headerContainer=$(container).find(".PlayerHeader")
        let quickInfoContainer=$(headerContainer).find(".PlayerHeader__Main_Aside")

        player.firstName=$(quickInfoContainer).find("h1 span:first-of-type").text()
        player.lastName=$(quickInfoContainer).find("h1 span:last-of-type").text()

        let teamInfoContainer=$(headerContainer).find(".PlayerHeader__Team ul")
        if($(teamInfoContainer).find("li:first-of-type a").length > 0){
            let teamBlock=$(teamInfoContainer).find("li:first-of-type a")
            let teamHref=$(teamBlock).attr("href").split("/")
            player.team.name=teamBlock.text()
            player.team.id=teamHref[teamHref.length - 2]
            player.team.slug=teamHref[teamHref.length - 1]
        }else{
            let teamBlock=$(teamInfoContainer).find("li:first-of-type ")
            player.team.name=teamBlock.text()
            player.team.id=null
            player.team.slug=null
        }
        player.number=$(teamInfoContainer).find("li:nth-child(2)").text()
        player.position=$(teamInfoContainer).find("li:nth-child(3)").text()

        let moreInfoContainer=$(headerContainer).find(".PlayerHeader__Bio .PlayerHeader__Bio_List")
        let heightWeightBlock=$(moreInfoContainer).find("li:nth-child(1) div:last-of-type div").text().split(",")
        player.weight=heightWeightBlock[1].trim()
        player.height=heightWeightBlock[0].trim()
        player.birthday=$(moreInfoContainer).find("li:nth-child(2) div:last-of-type div").text()
        player.nationality=$(moreInfoContainer).find("li:nth-child(3) div:last-of-type div").text()
        
        player.currentStats={}
        let currentStatContainer=$(headerContainer).find(".PlayerHeader__Right ")
        player.currentStats.name=$(currentStatContainer).find("h2").text()
        player.currentStats.startAndSubs=$(currentStatContainer).find(".StatBlock__Content li:nth-child(1) .StatBlockInner__Value").text()
        player.currentStats.goals=$(currentStatContainer).find(".StatBlock__Content li:nth-child(2) .StatBlockInner__Value").text()
        player.currentStats.assists=$(currentStatContainer).find(".StatBlock__Content li:nth-child(3) .StatBlockInner__Value").text()
        player.currentStats.shoots=$(currentStatContainer).find(".StatBlock__Content li:nth-child(4) .StatBlockInner__Value").text()
    


        let mainContainer=$(container).find(".PageLayout__Main section.Card  ")

        let selectBlock=$(mainContainer).find(".StatsTable__Filters ")

        player.allTeams=[]
        $(selectBlock).find(".dropdown:nth-child(1) select:first-of-type option").each(async (i, elem) => {
            let team={}
            team.name=$(elem).text()
            team.id=$(elem).attr("value")
            player.allTeams.push(team)
        })

        player.allCompets=[]
        let test=$(selectBlock).find(".dropdown:nth-child(2) select:first-of-type")
        if(test.length  > 0){
            $(selectBlock).find(".dropdown:nth-child(2) select:first-of-type option").each(async (i, elem) => {
                let compet={}
                compet.name=$(elem).text()
                compet.slug=$(elem).attr("value")
                player.allCompets.push(compet)
            })
        }


        player.everySeasonStats=[]
        let firstContainer=$(mainContainer).find(".ResponsiveTable:nth-child(2)")
        let positionName=$(firstContainer).find(".Table__Title").text()
        let positionStats=[]

        $(firstContainer).find("table.Table--fixed-left .Table__TBODY tr").each(async (i, elem) => {
            let season={}
            season.name=$(elem).find("td:nth-child(1)").text()
            season.team={}
            let teamBlock=$(elem).find("td:nth-child(2) a")
            if(teamBlock.length > 0){
                let teamHref=$(teamBlock).attr("href").split("/")
                season.team.name=teamBlock.text()
                season.team.id=teamHref[teamHref.length - 2]
                season.team.slug=teamHref[teamHref.length - 1]
            }else{
                let teamBlock=$(teamInfoContainer).find("td:nth-child(2)")
                season.team.name=teamBlock.text()
                season.team.id=null
                season.team.slug=null
            }
            positionStats.push(season)
        })
        $(firstContainer).find(".Table__ScrollerWrapper table tbody tr").each(async (i, elem) => {   
            positionStats[i].STRT=$(elem).find("td:nth-child(1)").text()
            positionStats[i].FC=$(elem).find("td:nth-child(2)").text()
            positionStats[i].FA=$(elem).find("td:nth-child(3)").text()
            positionStats[i].YC=$(elem).find("td:nth-child(4)").text()
            positionStats[i].RC=$(elem).find("td:nth-child(5)").text()
            positionStats[i].G=$(elem).find("td:nth-child(6)").text()
            positionStats[i].A=$(elem).find("td:nth-child(7)").text()
            positionStats[i].SH=$(elem).find("td:nth-child(8)").text()
            positionStats[i].ST=$(elem).find("td:nth-child(9)").text()
            positionStats[i].OF=$(elem).find("td:nth-child(10)").text() 
        }) 
        player.everySeasonStats.push({positionName,positionStats})


        let secondContainer=$(mainContainer).find(".ResponsiveTable:nth-child(3)")
        if(secondContainer.length > 0){
            let secondPositionName=$(secondContainer).find(".Table__Title").text()
            let secondPositionStats=[]

            $(secondContainer).find("table.Table--fixed-left .Table__TBODY tr").each(async (i, elem) => {
                let season={}
                season.name=$(elem).find("td:nth-child(1)").text()
                season.team={}
                let teamBlock=$(elem).find("td:nth-child(2) a")
                if(teamBlock.length > 0){
                    let teamHref=$(teamBlock).attr("href").split("/")
                    season.team.name=teamBlock.text()
                    season.team.id=teamHref[teamHref.length - 2]
                    season.team.slug=teamHref[teamHref.length - 1]
                }else{
                    let teamBlock=$(teamInfoContainer).find("td:nth-child(2)")
                    season.team.name=teamBlock.text()
                    season.team.id=null
                    season.team.slug=null
                }
                secondPositionStats.push(season)
            })
            $(secondContainer).find(".Table__ScrollerWrapper table tbody tr").each(async (i, elem) => {   
                secondPositionStats[i].CS=$(elem).find("td:nth-child(1)").text()
                secondPositionStats[i].SV=$(elem).find("td:nth-child(2)").text()
                secondPositionStats[i].GA=$(elem).find("td:nth-child(3)").text()
            }) 
            player.everySeasonStats.push({positionName:secondPositionName,secondPositionStats})
        }

        return {
            status:200,
            data:player
        };
    }catch(error){
        return {
            status:400,
            error:error
        }
    }
    
}
async function getPlayerNews(playerId){
    try{
        const {data} = await axios.get(`https://www.espn.com/soccer/player/_/id/${playerId}`,{timeout: 10000000});

        const $ = cheerio.load(data);
        let container=$('.pageContent');
        let player={}
        player.team={}
        let headerContainer=$(container).find(".PlayerHeader")
        let quickInfoContainer=$(headerContainer).find(".PlayerHeader__Main_Aside")

        player.firstName=$(quickInfoContainer).find("h1 span:first-of-type").text()
        player.lastName=$(quickInfoContainer).find("h1 span:last-of-type").text()

        let teamInfoContainer=$(headerContainer).find(".PlayerHeader__Team ul")
        if($(teamInfoContainer).find("li:first-of-type a").length > 0){
            let teamBlock=$(teamInfoContainer).find("li:first-of-type a")
            let teamHref=$(teamBlock).attr("href").split("/")
            player.team.name=teamBlock.text()
            player.team.id=teamHref[teamHref.length - 2]
            player.team.slug=teamHref[teamHref.length - 1]
        }else{
            let teamBlock=$(teamInfoContainer).find("li:first-of-type ")
            player.team.name=teamBlock.text()
            player.team.id=null
            player.team.slug=null
        }
        player.number=$(teamInfoContainer).find("li:nth-child(2)").text()
        player.position=$(teamInfoContainer).find("li:nth-child(3)").text()

        let moreInfoContainer=$(headerContainer).find(".PlayerHeader__Bio .PlayerHeader__Bio_List")
        let heightWeightBlock=$(moreInfoContainer).find("li:nth-child(1) div:last-of-type div").text().split(",")
        player.weight=heightWeightBlock[1].trim()
        player.height=heightWeightBlock[0].trim()
        player.birthday=$(moreInfoContainer).find("li:nth-child(2) div:last-of-type div").text()
        player.nationality=$(moreInfoContainer).find("li:nth-child(3) div:last-of-type div").text()
        
        player.currentStats={}
        let currentStatContainer=$(headerContainer).find(".PlayerHeader__Right ")
        player.currentStats.name=$(currentStatContainer).find("h2").text()
        player.currentStats.startAndSubs=$(currentStatContainer).find(".StatBlock__Content li:nth-child(1) .StatBlockInner__Value").text()
        player.currentStats.goals=$(currentStatContainer).find(".StatBlock__Content li:nth-child(2) .StatBlockInner__Value").text()
        player.currentStats.assists=$(currentStatContainer).find(".StatBlock__Content li:nth-child(3) .StatBlockInner__Value").text()
        player.currentStats.shoots=$(currentStatContainer).find(".StatBlock__Content li:nth-child(4) .StatBlockInner__Value").text()
        let mainContainer=$(container).find(".page-container")
        let centerContainer=$(mainContainer).find(".PageLayout__Main")
        let allNews = [];
        let newsContainer=$(centerContainer).find("section.LatestNews  .Wrapper ") 
        // Process articles asynchronously
        const processArticles = async () => {
        // Collect all promises
        const promises = $(newsContainer).find("ul li").map(async (i, elem) => {
            let news = {};

            let linkAddress=$(elem).find("a.contentItem__content ")

        
            if (linkAddress.length > 0) {
            news.linkAddress = espnUrl + linkAddress.attr("href");
            let linkAddrssArray=linkAddress.attr("href").split("/")
            news.id=linkAddrssArray[linkAddrssArray.length - 2]
            news.slug=linkAddrssArray[linkAddrssArray.length - 1]
            news.articleTitle = $(linkAddress).find(".contentItem__contentWrapper .contentItem__title").text();
            news.timeStamps = $(linkAddress).find(".contentItem__contentWrapper .contentItem__publicationMeta .time-elapsed").text();
            news.author = $(linkAddress).find(".contentItem__contentWrapper .contentItem__publicationMeta .author").text();
            } else {
            news.linkAddress = "No Url";
            news.articleTitle = "N/A"; // Indicate missing title
            news.articleContent = "N/A";  // Indicate missing content
            news.timeStamps = "N/A";       // Indicate missing timestamp
            news.author = "No Author";    // Indicate missing author
            }

        
            // Fetch additional information only if a link is available
            if (news.linkAddress !== "No Url" && i != 0) {
            try {
                const { data } = await axios.get(news.linkAddress, { timeout: 10000 }); // Set reasonable timeout in milliseconds
                const $ = cheerio.load(data);
            
                let imageBlock = $('aside:last-of-type source:first-of-type');
            
                if (imageBlock.length > 0) {
                let imageUrl = $('aside:last-of-type source:first-of-type').attr("data-srcset").split(",");
                news.articleImageUrl = imageUrl[0].split("&w")[0];
                } else {
                news.articleImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLeRqpPmb4YgGGOxG092HSuL_AT39ubcWwnEVB3pPDcL7HwApHitVOYQZJ1ifsJ2XytPM&usqp=CAU"; // Default image
                }
            } catch (error) {
                console.error("Error fetching additional information for news:", news.linkAddress, error);
                news.articleImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLeRqpPmb4YgGGOxG092HSuL_AT39ubcWwnEVB3pPDcL7HwApHitVOYQZJ1ifsJ2XytPM&usqp=CAU"; // Default image
                // Consider retrying the request or notifying the user
            }
            return news;
            } else {
            news.articleImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLeRqpPmb4YgGGOxG092HSuL_AT39ubcWwnEVB3pPDcL7HwApHitVOYQZJ1ifsJ2XytPM&usqp=CAU"; // Default image
            }
        
        }).get(); // Use .get() to get an array of promises
    
        // Wait for all promises to resolve
        allNews = await Promise.all(promises);
        };
    
        // Call the processArticles function
        await processArticles();
    
        player.allNews=allNews.filter(ele=>ele != null)
        return {
            status:200,
            data:player
        };
    }catch(error){
        return {
            status:400,
            error:error
        }
    }
    
}
async function getTeamPlayers(id){
    try{
        const {data} = await axios.get(`https://www.espn.com/soccer/team/squad/_/id/${id}`,{timeout: 10000000});
        const $ = cheerio.load(data);  // new addition
        let container=$('#fittPageContainer');
        let team={}

        let centerContainer=$(container).find(".layout__column--1")

        team.squads=[]
        $(centerContainer).find(".Roster__MixedTable").each(async (i, elem2) => {
            $(elem2).find(".Table__Scroller .Table__TBODY tr").each(async (i, elem3) => {
            let player={}
            let playerUrl=$(elem3).find(".Table__TD:nth-child(1) a")
            if(playerUrl.length > 0){
                player.name=playerUrl.text()
                let playerHref=playerUrl.attr("href").split("/")
                player.id=playerHref[playerHref.length - 2]
                player.slug=playerHref[playerHref.length - 1]
                player.number=$(elem3).find(".Table__TD:nth-child(1) span").text()
    
            }else{
                player.name=$(elem3).find(".Table__TD:nth-child(1)").text()
                player.number=$(elem3).find(".Table__TD:nth-child(1) span").text()
    
                player.id=null
                player.slug=null
            }
    
            player.POS=$(elem3).find(".Table__TD:nth-child(2)").text()
            player.AGE=$(elem3).find(".Table__TD:nth-child(3)").text()
            player.HT=$(elem3).find(".Table__TD:nth-child(4)").text()
            player.WT=$(elem3).find(".Table__TD:nth-child(5)").text()
            player.NAT=$(elem3).find(".Table__TD:nth-child(6)").text()
            player.APP=$(elem3).find(".Table__TD:nth-child(7)").text()
            player.SUB=$(elem3).find(".Table__TD:nth-child(8)").text()
            player.SV=$(elem3).find(".Table__TD:nth-child(9)").text()
            player.GA=$(elem3).find(".Table__TD:nth-child(10)").text()
            player.A=$(elem3).find(".Table__TD:nth-child(11)").text()
            player.FC=$(elem3).find(".Table__TD:nth-child(12)").text()
            player.FA=$(elem3).find(".Table__TD:nth-child(13)").text()
            player.YC=$(elem3).find(".Table__TD:nth-child(14)").text()
            player.RC=$(elem3).find(".Table__TD:nth-child(15)").text()
    
            team.squads.push(player)
            })
        })
        let data2=team.squads
        return {
            status:200,
            data:data2
        }
    }catch(error){
        return {
            status:400,
            error:error
        }
    }
    
     
}
async function getPlayerFilteredStats(playerId,teamId=null,competSlug=null){
    try{
        let bigData;

        if(teamId==="any" && competSlug ==="any"){
            const {data} = await axios.get(`https://www.espn.com/soccer/player/stats/_/id/${playerId}`,{timeout: 10000000});
            bigData=data
        }else if(teamId !=="any" && competSlug ==="any"){
            let {data} = await axios.get(`https://www.espn.com/soccer/player/stats/_/id/${playerId}/team/${teamId}`,{timeout: 10000000});
            bigData=data
        }else if(teamId !=="any" && competSlug !=="any"){
            let {data} = await axios.get(`https://www.espn.com/soccer/player/stats/_/id/${playerId}/team/${teamId}/type/${competSlug}`,{timeout: 10000000});
            bigData=data
        }

        const $ = cheerio.load(bigData);
        let container=$('.pageContent');
        let player={}
        
        let mainContainer=$(container).find(".PageLayout__Main section.Card  ")

        let selectBlock=$(mainContainer).find(".StatsTable__Filters ")

        player.allTeams=[]
        $(selectBlock).find(".dropdown:nth-child(1) select:first-of-type option").each(async (i, elem) => {
            let team={}
            team.name=$(elem).text()
            team.id=$(elem).attr("value")
            player.allTeams.push(team)
        })

        player.allCompets=[]
        let test=$(selectBlock).find(".dropdown:nth-child(2) select:first-of-type")
        if(test.length  > 0){
            $(selectBlock).find(".dropdown:nth-child(2) select:first-of-type option").each(async (i, elem) => {
                let compet={}
                compet.name=$(elem).text()
                compet.slug=$(elem).attr("value")
                player.allCompets.push(compet)
            })
        }


        player.everySeasonStats=[]
        let firstContainer=$(mainContainer).find(".ResponsiveTable:nth-child(2)")
        let positionName=$(firstContainer).find(".Table__Title").text()
        let positionStats=[]

        $(firstContainer).find("table.Table--fixed-left .Table__TBODY tr").each(async (i, elem) => {
            let season={}
            season.name=$(elem).find("td:nth-child(1)").text()
            season.team={}
            let teamBlock=$(elem).find("td:nth-child(2) a")
            if(teamBlock.length > 0){
                let teamHref=$(teamBlock).attr("href").split("/")
                season.team.name=teamBlock.text()
                season.team.id=teamHref[teamHref.length - 2]
                season.team.slug=teamHref[teamHref.length - 1]
            }else{
                let teamBlock=$(teamInfoContainer).find("td:nth-child(2)")
                season.team.name=teamBlock.text()
                season.team.id=null
                season.team.slug=null
            }
            positionStats.push(season)
        })
        $(firstContainer).find(".Table__ScrollerWrapper table tbody tr").each(async (i, elem) => {   
            positionStats[i].STRT=$(elem).find("td:nth-child(1)").text()
            positionStats[i].FC=$(elem).find("td:nth-child(2)").text()
            positionStats[i].FA=$(elem).find("td:nth-child(3)").text()
            positionStats[i].YC=$(elem).find("td:nth-child(4)").text()
            positionStats[i].RC=$(elem).find("td:nth-child(5)").text()
            positionStats[i].G=$(elem).find("td:nth-child(6)").text()
            positionStats[i].A=$(elem).find("td:nth-child(7)").text()
            positionStats[i].SH=$(elem).find("td:nth-child(8)").text()
            positionStats[i].ST=$(elem).find("td:nth-child(9)").text()
            positionStats[i].OF=$(elem).find("td:nth-child(10)").text() 
        }) 
        player.everySeasonStats.push({positionName,positionStats})


        let secondContainer=$(mainContainer).find(".ResponsiveTable:nth-child(3)")
        if(secondContainer.length > 0){
            let secondPositionName=$(secondContainer).find(".Table__Title").text()
            let secondPositionStats=[]

            $(secondContainer).find("table.Table--fixed-left .Table__TBODY tr").each(async (i, elem) => {
                let season={}
                season.name=$(elem).find("td:nth-child(1)").text()
                season.team={}
                let teamBlock=$(elem).find("td:nth-child(2) a")
                if(teamBlock.length > 0){
                    let teamHref=$(teamBlock).attr("href").split("/")
                    season.team.name=teamBlock.text()
                    season.team.id=teamHref[teamHref.length - 2]
                    season.team.slug=teamHref[teamHref.length - 1]
                }else{
                    let teamBlock=$(teamInfoContainer).find("td:nth-child(2)")
                    season.team.name=teamBlock.text()
                    season.team.id=null
                    season.team.slug=null
                }
                secondPositionStats.push(season)
            })
            $(secondContainer).find(".Table__ScrollerWrapper table tbody tr").each(async (i, elem) => {   
                secondPositionStats[i].CS=$(elem).find("td:nth-child(1)").text()
                secondPositionStats[i].SV=$(elem).find("td:nth-child(2)").text()
                secondPositionStats[i].GA=$(elem).find("td:nth-child(3)").text()
            }) 
            player.everySeasonStats.push({positionName:secondPositionName,secondPositionStats})
        }

        return {
            status:200,
            data:player
        };
    }catch(error){
        return {
            status:400,
            error:error
        }
    }
    
}
async function getPlayerFilteredMatches(playerId,teamId=null,competSlug=null,year=null){
    try{
        let bigData;

        if(teamId === "any" && competSlug === "any" && year ==="any"){
            const {data} = await axios.get(`https://www.espn.com/soccer/player/matches/_/id/${playerId}`,{timeout: 10000000});
            bigData=data
        }else if(teamId !=="any"  && competSlug ==="any" && year==="any"){
            let {data} = await axios.get(`https://www.espn.com/soccer/player/matches/_/id/${playerId}/team/${teamId}`,{timeout: 10000000});
            bigData=data
        }else if(teamId !=="any" && competSlug !=="any" && year==="any"){
            let {data} = await axios.get(`https://www.espn.com/soccer/player/matches/_/id/${playerId}/team/${teamId}/type/${competSlug}`,{timeout: 10000000});
            bigData=data
        }else if(teamId !=="any" && competSlug !=="any" && year!=="any"){
            let {data} = await axios.get(`https://www.espn.com/soccer/player/matches/_/id/${playerId}/team/${teamId}/type/${competSlug}/year/${year}`,{timeout: 10000000});
            bigData=data
        }
        const $ = cheerio.load(bigData);
        let container=$('.pageContent');
        let player={}
        player.team={}
        let mainContainer=$(container).find(".PageLayout__Main .gamelog ")

        let selectBlock=$(mainContainer).find(".filters")

        player.allSeasons=[]
        $(selectBlock).find(".dropdown:nth-child(1) select:first-of-type option").each(async (i, elem) => {
            let season={}
            season.name=$(elem).text()
            season.slug=$(elem).attr("value")
            player.allSeasons.push(season)
        })

        player.allTeams=[]
        $(selectBlock).find(".dropdown:nth-child(2) select:first-of-type option").each(async (i, elem) => {
            let team={}
            team.name=$(elem).text()
            team.id=$(elem).attr("value")
            player.allTeams.push(team)
        })

        player.allCompets=[]
        $(selectBlock).find(".dropdown:nth-child(3) select:first-of-type option").each(async (i, elem) => {
            let compet={}
            compet.name=$(elem).text()
            compet.slug=$(elem).attr("value")
            player.allCompets.push(compet)
        })


        player.currentCompetMatches=[]
        $(mainContainer).find(".mb4").each(async (i, elem1) => {
            let competStage=$(elem1).prev(".Table__Title").text()
            let stageMatches=[]
            let decrease=0;
            $(elem1).find(".Table__Scroller .Table__TBODY tr").each(async (i2, elem2) => {
                if($(elem2).hasClass("note-row")){
                    let note=$(elem2).find("td").text()
                    stageMatches[(i2 - 1) - decrease].note=note
                    decrease++
                }else{
                    let match={}
                    match.awayTeam={}
                    let awayTeamBlock=$(elem2).find("td:nth-child(2) a")
                    if(awayTeamBlock.length > 0){
                    match.awayTeam.name=awayTeamBlock.text()
                    let awayTeamHref=awayTeamBlock.attr("href").split("/")
                    match.awayTeam.id=awayTeamHref[awayTeamHref.length - 2]
                    match.awayTeam.slug=awayTeamHref[awayTeamHref.length - 1]
                    }else{
                    match.awayTeam.name=$(elem2).find("td:nth-child(2) a").text()
                    match.awayTeam.id=null
                    match.awayTeam.slug=null
                    }

                    match.date=$(elem2).find("td:nth-child(1)").text()
                    match.homeOrAway=$(elem2).find("td:nth-child(2) .TeamLink__Logo").prev("span").text()

                    let matchBlock=$(elem2).find("td:nth-child(3) a")
                    if(matchBlock.length > 0){
                        let matchHref=$(matchBlock).attr("href").split("/")
                        match.id=matchHref[matchHref.length - 2]
                        match.slug=matchHref[matchHref.length - 1]
                    }
                    match.status=$(matchBlock).find(".ResultCell").text()
                    match.score=$(matchBlock).find("span").text()
                    match.currentPlayer={}
                    match.currentPlayer.G=$(elem2).find("td:nth-child(4)").text()
                    match.currentPlayer.A=$(elem2).find("td:nth-child(5)").text()
                    match.currentPlayer.SH=$(elem2).find("td:nth-child(6)").text()
                    match.currentPlayer.ST=$(elem2).find("td:nth-child(7)").text()
                    match.currentPlayer.FC=$(elem2).find("td:nth-child(8)").text()
                    match.currentPlayer.FA=$(elem2).find("td:nth-child(9)").text()
                    match.currentPlayer.OF=$(elem2).find("td:nth-child(10)").text()
                    match.currentPlayer.YC=$(elem2).find("td:nth-child(11)").text()
                    match.currentPlayer.RC=$(elem2).find("td:nth-child(12)").text()
                    match.note=""
                    stageMatches.push(match)
                }
                

            })
            player.currentCompetMatches.push({competStage,stageMatches})
        })


        return {
            status:200,
            data:player
        };
    }catch(error){
        return {
            status:400,
            error:error
        }
    }
    
}

router.get("/_/id/:playerId/:playerSlug",async(req,res)=>{
    let {playerId,playerSlug}=req.params
    let playerData=await getPlayerInfo(playerId,playerSlug)
    if(playerData.status != 200){
        res.status(400).json({error:"Error While Extracting The Data"})
    }else{
        playerData.data.id=playerId
        res.json(playerData.data)
    }
})
router.get("/bio/_/id/:playerId",async(req,res)=>{
    let {playerId}=req.params
    let playerData=await getPlayerBio(playerId)
    if(playerData.status != 200){
        res.status(400).json({error:"Error While Extracting The Data"})
    }else{
        playerData.data.id=playerId
        res.json(playerData.data)
    }
})
router.get("/matches/_/id/:playerId/team/:teamId/type/:competSlug/year/:year",async(req,res)=>{
    let {playerId,teamId,competSlug,year}=req.params
    let playerData=await getPlayerMatches(playerId,teamId,competSlug,year)
    if(playerData.status != 200){
        res.status(400).json({error:"Error While Extracting The Data"})
    }else{
        playerData.data.id=playerId
        res.json(playerData.data)
    }
})
router.get("/matches/_/id/:playerId/team/:teamId/type/:competSlug/year/:year/filtered",async(req,res)=>{
    let {playerId,teamId,competSlug,year}=req.params
    let playerData=await getPlayerFilteredMatches(playerId,teamId,competSlug,year)
    if(playerData.status != 200){
        res.status(400).json({error:"Error While Extracting The Data"})
    }else{
        playerData.data.id=playerId
        res.json(playerData.data)
    }
})
router.get("/stats/_/id/:playerId/team/:teamId/type/:competSlug",async(req,res)=>{
    let {playerId,teamId,competSlug}=req.params
    let playerData=await getPlayerStats(playerId,teamId,competSlug)
    if(playerData.status != 200){
        res.status(400).json({error:"Error While Extracting The Data"})
    }else{
        playerData.data.id=playerId
        res.json(playerData.data)
    }
})
router.get("/stats/_/id/:playerId/team/:teamId/type/:competSlug/filtered",async(req,res)=>{
    let {playerId,teamId,competSlug}=req.params
    let playerData=await getPlayerFilteredStats(playerId,teamId,competSlug)
    if(playerData.status != 200){
        res.status(400).json({error:"Error While Extracting The Data"})
    }else{
        playerData.data.id=playerId
        res.json(playerData.data)
    }
})
router.get("/news/_/id/:playerId",async(req,res)=>{
    let {playerId}=req.params
    let playerData=await getPlayerNews(playerId)
    if(playerData.status != 200){
        res.status(400).json({error:"Error While Extracting The Data"})
    }else{
        playerData.data.id=playerId
        res.json(playerData.data)
    }
})
router.get("/team/_/id/:teamId/players",async(req,res)=>{
    let {teamId}=req.params
    let playerData=await getTeamPlayers(teamId)
    if(playerData.status != 200){
        res.status(400).json({error:"Error While Extracting The Data"})
    }else{
        res.json(playerData.data)
    }
})
router.get("/_/id/:playerId/currentTeamsStats/team/:teamId/compet/:competSlug/type/:type",async(req,res)=>{
    let {playerId,teamId,competSlug,type}=req.params
    let playerData=await getPlayerCurrentTeamsStats(playerId,teamId,competSlug,type)
    if(playerData.status != 200){
        res.status(400).json({error:"Error While Extracting The Data"})
    }else{
        playerData.data.id=playerId
        res.json(playerData.data)
    }
})
router.get("/getAllPlayers",async(req,res)=>{
    res.json(allPlayers)
})
module.exports=router