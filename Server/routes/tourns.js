let express=require("express")
let router=express.Router()
let teams=require("../webScrappingESPN/tournsAndTeams/allTeams.json")
let competetionsByCat=require("../webScrappingESPN/tournsAndTeams/allComptetions.json")
let competetions=require("../webScrappingESPN/tournsAndTeams/allComptetion.json")
const axios = require('axios');
const cheerio = require('cheerio'); 
const url = `https://www.espn.com`;
const allLeaguesTeams=require("../webScrappingESPN/tournsAndTeams/allLeaguesTeams.json")
const getLocalTime=(oldTime)=>{
    try{
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
    }catch(err){
        return "9:00 PM"
    }
   
}

async function getSchedule(date) {
    try{
        const { data } = await axios.get(url+"/soccer/schedule/_/date/"+date,{timeout: 10000000});
        const $ = cheerio.load(data);
        let container=$('.event-schedule__season').next('div').first();
        let allMatches=[]
        $(container).find(".ScheduleTables--soccer").each(async (i, elem) => {
            const  leagueName=$(elem).find(".Table__Title").text().trim()
            let matches=[]
            let match={}
            let AwayTeam={}
            let HomeTeam={}
            $(elem).find("table tbody tr").each(async (i2, elem2) => {
                let AwayTeamBlock=$(elem2).find("td:nth-child(1) .Table__Team.away a:last-of-type")
                let Awayhref=AwayTeamBlock.attr("href")
                if(Awayhref){
                    Awayhref=Awayhref.split("/")
                    AwayTeam.TeamName=AwayTeamBlock.text()
                    AwayTeam.slug=Awayhref[Awayhref.length - 1]
                    AwayTeam.id=Awayhref[Awayhref.length - 2]
                }else{
                    let AwayTeamName=$(elem2).find("td:nth-child(1) .Table__Team.away span:last-of-type").text()
                    AwayTeam.TeamName=AwayTeamName
                    AwayTeam.slug=null
                    AwayTeam.id=null
                }
                let HomeTeamBlock=$(elem2).find("td:nth-child(2) .Table__Team a:last-of-type")
                let Homehref=HomeTeamBlock.attr("href")
                if(Homehref){
                    Homehref=Homehref.split("/")
                    HomeTeam.TeamName=HomeTeamBlock.text()
                    HomeTeam.slug=Homehref[Homehref.length - 1]
                    HomeTeam.id=Homehref[Homehref.length - 2]
                }else{
                    let HomeTeamName=$(elem2).find("td:nth-child(1) .Table__Team span:last-of-type").text()
                    HomeTeam.TeamName=HomeTeamName
                    HomeTeam.slug=null
                    HomeTeam.id=null
                }
                let TimeBlock=$(elem2).find("td:nth-child(3) a")
                let time;
                
                time=TimeBlock.text()
                
                let scores;
                if(time === "FT"){
                    scores=$(elem2).find("td:nth-child(2) a:has(~ .Table__Team)").text()
                    scores=scores.split("&nbsp;").join("")
                }else{
                    scores=" v "
                }
                if(time===""){
                    let TimeBlock2=$(elem2).find("td:nth-child(3)")            
                    time=TimeBlock2.text()
                    if(time === "FT"){
                        scores=$(elem2).find("td:nth-child(2) span:first-of-type").text()
                        scores=scores.split("&nbsp;").join("")
                    }else{
                        scores=" v "
                    }
                }
                if(time !== "FT" && time !== "LIVE" && time !=="Postponed" && time !=="Canceled" && time !=="TBD"){	
                    let listOftime=time.split(":")
                    if(parseInt(listOftime[0]) <= 5){
                        let newTimeRep=listOftime[1].split(" ")
                        listOftime[1]=newTimeRep.join(" ")
                        let diff= 5 - parseInt(listOftime[0])
                        let newTime=12 - diff
                        listOftime[0]=newTime
                        time=listOftime.join(":")
                    }else{
                        try{
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
                        }catch(err){
                            time="9:00 PM"
                        }
                        
                    }
                }
                
                let LocationBlock=$(elem2).find("td:nth-child(5) div").text()
                match.HomeTeam=HomeTeam
                match.AwayTeam=AwayTeam
                match.time=time
                if(TimeBlock.length > 0){
                    let matchLink=TimeBlock.attr("href").split("/")
                    if(time== "LIVE"){
                        match.id=matchLink[matchLink.length - 1]
                        let homeTeamSlug=HomeTeam.TeamName.split(" ").join("-").toLowerCase()
                        let awayTeamNSlug=AwayTeam.TeamName.split(" ").join("-").toLowerCase()
                        match.slug=homeTeamSlug +"-"+awayTeamNSlug
                    }else{
                        match.id=matchLink[matchLink.length - 2]
                        match.slug=matchLink[matchLink.length - 1]
                    }
    
                }else{
                    match.id=null
                    match.slug=null
                }
                match.location=LocationBlock
                match.scores=scores
                matches.push(match)
                match={}
                HomeTeam={}
                AwayTeam={}
            })
            allMatches.push({league:leagueName,matches:matches})
            matches=[]
        })
        fs.writeFileSync( "./news.json", JSON.stringify(allMatches) )
        return {
            status:200,
            data:allMatches
        }
    }catch(error){
        return {
            status:400,
            error:error
        }
    }
}
async function getSpecificCompetSchedule(date,competSlug) {
    try{
        const { data } = await axios.get(url+"/soccer/schedule/_/date/"+date+ "/league/"+competSlug,{timeout: 10000000});
        const $ = cheerio.load(data);  // new addition
        let container=$('.event-schedule__season').next('div').first();
        let allMatches=[]  
        let competName=$("section.Card:first-of-type").find(" .Card__Content:first-of-type .mb2 h1").text().split("Schedule")
        $(container).find(".ScheduleTables--soccer").each(async (i, elem) => {
            const  date=$(elem).find(".Table__Title").text().trim()
            let matches=[]
            let match={}
            let AwayTeam={}
            let HomeTeam={}
            $(elem).find("table tbody tr").each(async (i, elem2) => {
                let AwayTeamBlock=$(elem2).find("td:nth-child(1) .Table__Team.away a:last-of-type")
                let Awayhref=AwayTeamBlock.attr("href")
                if(Awayhref){
                    Awayhref=Awayhref.split("/")
                    AwayTeam.TeamName=AwayTeamBlock.text()
                    AwayTeam.slug=Awayhref[Awayhref.length - 1]
                    AwayTeam.id=Awayhref[Awayhref.length - 2]
                }else{
                    let AwayTeamName=$(elem2).find("td:nth-child(1) .Table__Team.away span:last-of-type").text()
                    AwayTeam.TeamName=AwayTeamName
                    AwayTeam.slug=null
                    AwayTeam.id=null
                }

                let HomeTeamBlock=$(elem2).find("td:nth-child(2) .Table__Team a:last-of-type")
                let Homehref=HomeTeamBlock.attr("href")
                if(Homehref){
                    Homehref=Homehref.split("/")
                    HomeTeam.TeamName=HomeTeamBlock.text()
                    HomeTeam.slug=Homehref[Homehref.length - 1]
                    HomeTeam.id=Homehref[Homehref.length - 2]
                }else{
                    let HomeTeamName=$(elem2).find("td:nth-child(1) .Table__Team span:last-of-type").text()
                    HomeTeam.TeamName=HomeTeamName
                    HomeTeam.slug=null
                    HomeTeam.id=null
                }
                let TimeBlock=$(elem2).find("td:nth-child(3) a")
                let time;
                let matchLink=url+TimeBlock.attr("href")
                if(TimeBlock.attr("href").length > 0){
                    let matchUrl=TimeBlock.attr("href").split("/")
                    match.id=matchUrl[matchUrl.length - 2]
                    match.slug=matchUrl[matchUrl.length - 1]
                }else{
                    match.id=null
                    match.slug=null
                }
                time=TimeBlock.text()
                
                let scores;
                if(time === "FT"){
                    scores=$(elem2).find("td:nth-child(2) a:has(~ .Table__Team)").text()
                    scores=scores.split("&nbsp;").join("")
                }else{
                    scores=" v "
                }
                if(time===""){
                    let TimeBlock2=$(elem2).find("td:nth-child(3)")            
                    time=TimeBlock2.text()
                    if(time === "FT"){
                        scores=$(elem2).find("td:nth-child(2) span:first-of-type").text()
                        scores=scores.split("&nbsp;").join("")
                    }else{
                        scores=" v "
                    }
                }
                if(time !== "FT" && time !== "LIVE" && time !=="Postponed" && time !=="Canceled"){
                    let listOftime=time.split(":")
                    if(parseInt(listOftime[0]) <= 5){
                        let newTimeRep=listOftime[1].split(" ")
                        // if(newTimeRep[1] === "PM"){
                        //     newTimeRep[1] ="AM"
                        // }else{
                        //     newTimeRep[1] ="PM"
                        // }
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
                }
               
                let LocationBlock=$(elem2).find("td:nth-child(5) div").text()
                match.HomeTeam=HomeTeam
                match.AwayTeam=AwayTeam
                match.time=time
                match.location=LocationBlock
                match.scores=scores
                matches.push(match)
                match={}
                HomeTeam={}
                AwayTeam={}
            })
            allMatches.push({date:date,matches:matches})
            matches=[]
        })
        $(container).find("section.EmptyTable").each(async (i, elem) => {
            const date=$(elem).find(".Table__Title").text().trim()
            let matches=[]
    
            allMatches.push({date:date,matches:matches})
        })
        const dateObjects = allMatches.map(cat =>{
            cat.fullDate=new Date(cat.date)
            return cat;
        });    
        const sortedDates = dateObjects.sort((a, b) => a.fullDate.getTime() - b.fullDate.getTime());
        let finalData={comptName:competName[0].trim(),allMatches:sortedDates}
        return {
            status:200,
            data:finalData
        }
    }catch(error){
        return {
            status:400,
            error:error
        }
    }
	
}
async function getScores(date,competSlug=null) {
    try{
        let bigData
        if(competSlug != null){
            const { data } = await axios.get(url+"/soccer/scoreboard/_/date/"+date+"/league/"+competSlug,{timeout: 10000000});
            bigData=data
        }else{
            const { data } = await axios.get(url+"/soccer/scoreboard/_/date/"+date,{timeout: 10000000});
            bigData=data
        }
    
        const $ = cheerio.load(bigData);  // new addition
        let container=$('.PageLayout__Main:first-of-type').first();
        let allScores=[]
        let competName;
        $(container).find(".Card.Scoreboard__Header").each(async (i, elem) => {
            let titleBlock=$(elem).find("h1:first-of-type").text().split("Scores")
            competName=titleBlock[0].trim()
        })
        $(container).find(".Card.gameModules").each(async (i, elem) => {
            let leagueName;
            let leagueSlug;
            if($(elem).find("header:first-of-type a").length > 0){
                leagueName=$(elem).find("header:first-of-type a h3").text().trim()
                let leagueHref=$(elem).find("header:first-of-type a").attr("href")
                leagueHref=leagueHref.split("/")
                leagueSlug=leagueHref[leagueHref.length - 1]
            }else{
                leagueSlug=competSlug
                leagueName=$(elem).find("header:first-of-type h3").text().trim()
            }
            
            let nextDiv=$(elem).find("div:first-of-type")
    
            let allMatches=[]
            $(nextDiv).find(".Scoreboard").each(async (i, elem2) => {
    
                
                let firstTeam={}
                let secondTeam={}
                let status;
                let match={}
    
                let time=$(elem2).find(".ScoreboardScoreCell__Overview .ScoreboardScoreCell__Time")
                if (time.hasClass('clr-negative')){
                    status="LIVE"
                }else if(time.hasClass('clr-gray-01')){
                    status="FT"
                }else{
                    status="NOT STARTED"
                }
    
                let location={}
                let locationBlock=$(elem2).find(".ScoreboardEventInfo")
                location.stadium=$(locationBlock).find(".LocationDetail__Item:first-of-type").text()
                location.city=$(locationBlock).find(".LocationDetail__Item:last-of-type").text()
    
                let performedBlock=$(elem2).find(".SoccerPerformers")
                let firstTeamPerf=$(performedBlock).find(".SoccerPerformers__Competitor:first-of-type .SoccerPerformers__Competitor__Info__GoalsList li")
                let firstTeamPerfList=[]
                firstTeamPerf.each(async (i, elem4) => {
                    let player={}
                    let playerBlock=$(elem4).find("a")
                    if(playerBlock.length > 0){
                        let playerHref=$(playerBlock).attr("href").split("/")
                        player.id=playerHref[playerHref.length - 2]
                        player.slug=playerHref[playerHref.length - 1]
                        player.name=$(playerBlock).text()
                    }
                    let scoreTime=$(elem4).find(".GoalScore__Time").text()
                    player.scoreTime=scoreTime
                    firstTeamPerfList.push(player)
                })
    
                firstTeam.playersScored=firstTeamPerfList
                firstTeam.name=$(elem2).find(".ScoreboardScoreCell__Competitors li:first-of-type .ScoreCell__Team  .ScoreCell__TeamName ").text()
                firstTeam.score=$(elem2).find(".ScoreboardScoreCell__Competitors li:first-of-type .ScoreCell__Score").text()
                let firstTeamHref=$(elem2).find(".ScoreboardScoreCell__Competitors li:first-of-type .ScoreCell__Team  a ").attr("href")
                if(firstTeamHref != null){
                    firstTeamHref=firstTeamHref.split("/")
                    firstTeam.slug=firstTeamHref[firstTeamHref.length - 1]
                    firstTeam.id=firstTeamHref[firstTeamHref.length - 2]
                }
                firstTeam.record=$(elem2).find(".ScoreboardScoreCell__Competitors li:first-of-type .ScoreCell__Team .ScoreboardScoreCell__RecordContainer").text()
                
                let secondTeamPerf=$(performedBlock).find(".SoccerPerformers__Competitor:last-of-type .SoccerPerformers__Competitor__Info__GoalsList li")
                let secondPerfList=[]
                secondTeamPerf.each(async (i, elem4) => {
                    let player={}
                    let playerBlock=$(elem4).find("a")
                    if(playerBlock.length > 0){
                        let playerHref=$(playerBlock).attr("href").split("/")
                        player.id=playerHref[playerHref.length - 2]
                        player.slug=playerHref[playerHref.length - 1]
                        player.name=$(playerBlock).text()
                    }
                    let scoreTime=$(elem4).find(".GoalScore__Time").text()
                    player.scoreTime=scoreTime
                    secondPerfList.push(player)
                })
                secondTeam.playersScored=secondPerfList
                secondTeam.name=$(elem2).find(".ScoreboardScoreCell__Competitors li:last-of-type .ScoreCell__Team  .ScoreCell__TeamName ").text()
                secondTeam.score=$(elem2).find(".ScoreboardScoreCell__Competitors li:last-of-type .ScoreCell__Score").text()
                let SecondTeamHref=$(elem2).find(".ScoreboardScoreCell__Competitors li:last-of-type .ScoreCell__Team  a ").attr("href")
                if(SecondTeamHref !=null){
                    SecondTeamHref=SecondTeamHref.split("/")
                    secondTeam.slug=SecondTeamHref[SecondTeamHref.length - 1]
                    secondTeam.id=SecondTeamHref[SecondTeamHref.length - 2]
                }
                secondTeam.record=$(elem2).find(".ScoreboardScoreCell__Competitors li:last-of-type .ScoreCell__Team .ScoreboardScoreCell__RecordContainer").text()
                if($(elem2).find(".Scoreboard__Callouts a").length > 0){
                    let gameLink=$(elem2).find(".Scoreboard__Callouts a:first-of-type").attr("href").split("/")
                    match.id=gameLink[gameLink.length - 2]
                    match.slug=gameLink[gameLink.length - 1]
                }
                
                match.HomeTeam=firstTeam
                match.AwayTeam=secondTeam
                match.status=status
                match.location=location
                allMatches.push(match)
            })
            if(competSlug != null){
    
                allScores.push({competName,leagueSlug,allMatches})
            }else{
                allScores.push({leagueName,leagueSlug,allMatches})
            }
        })
    
        return {
            status:200,
            data:allScores
        }  
    }catch(error){
        return {
            status:400,
            error:error
        }
    }
}
async function getCompetetionInfo(leagueSlug,leagueId){
    try{
        const {data} = await axios.get(`https://www.espn.com/soccer/league/_/name/${leagueSlug}`,{timeout: 10000000});
        const $ = cheerio.load(data);
        let compt={}
        compt.id=leagueId
        compt.slug=leagueSlug
        compt.name=$("ul.first-group li:first-of-type span.link-text").text().trim()

        let newsContainer=$('section#news-feed #news-feed-content');
        compt.allNews=[]
        $(newsContainer).find("article").each(async (i, elem) => {
            let article={}
            let textBlock=$(elem).find(".text-container")
            article.title=$(textBlock).find("h1").text()
            if($(textBlock).find("h1").length > 0){
                article.quickContent=$(textBlock).find("p").text()
                let articleHref=$(textBlock).find("h1 a").attr("href").split("/")
                if(articleHref[2] === "story"){
                    article.type=articleHref[2]
                }
                if(articleHref[2] === "report"){
                    article.type=articleHref[2]
                }
                article.title=$(textBlock).find("h1 a").text()
                article.id=articleHref[articleHref.length - 2]
                article.slug=articleHref[articleHref.length - 1]
                article.timeStamps=$(textBlock).find(".news-feed_item-meta .timestamp").text()
                article.author=$(textBlock).find(".news-feed_item-meta .author").text()
                article.imageUrl=$(elem).find("figure picture img").attr("data-default-src")
                compt.allNews.push(article)
            }
        })
        compt.standing={}
        compt.standing.name=$("article.sub-module.standings").find("header h1").text()
        compt.standing.clubsList=[]
        $("article.sub-module.standings").find("table tbody tr").each(async (i, elem3) => {
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
            compt.standing.clubsList.push(CompetTeam)
        })
        return {
            status:200,
            data:compt
        };
    }catch(error){
        return {
            status:400,
            error:error
        }
    }
    
}
async function getCompetetionStanding(competSlug,competSeason=null){
    try{
        let bigdata;
        if(competSeason==null){
            const {data} = await axios.get(`https://www.espn.com/soccer/standings/_/league/${competSlug}`,{timeout: 10000000});
            bigdata=data
        }else{
            const {data} = await axios.get(`https://www.espn.com/soccer/standings/_/league/${competSlug}/season/${competSeason}`,{timeout: 10000000});
            bigdata=data     
        }
        const $ = cheerio.load(bigdata);  // new addition
        let compt={}
        compt.slug=competSlug
        let container=$('.pageContent .page-container');
        compt.standingName=$(container).find("h1.headline").text()
        compt.seasons=[]
        $(container).find(".dropdown:last-of-type select:first-of-type option").each(async (i, elem) => {
            let slug=$(elem).attr("value")
            let fullSeason=$(elem).text()
            compt.seasons.push({slug,fullSeason})
        })
        let standingContainer=$(container).find(".standings__table")
        compt.name=$(standingContainer).find(".Table__Title").text()
        compt.season=$(standingContainer).find("table.Table:first-of-type th:not(.tar) span").text()
        compt.standingList=[]
        $(standingContainer).find("table.Table--fixed .Table__TBODY tr").each(async (i, elem) => {
            let compet={}
            compet.position=$(elem).find(".compet-position").text()
            let teamBlock=$(elem).find(".hide-mobile a")

            if(teamBlock.length > 0){
                let teamHref=$(teamBlock).attr("href").split("/")
                compet.slug=teamHref[teamHref.length - 1]
                compet.id=teamHref[teamHref.length - 2]
                compet.name=$(teamBlock).text()
                let shortTeamName=$(elem).find(".show-mobile a")
                compet.shortName=$(shortTeamName).text()
            }else{
                compet.name=$(elem).find(".hide-mobile").text()
                compet.shortName=$(elem).find(".show-mobile").text()
                compet.slug=null
                compet.id=null
            }

            compt.standingList.push(compet)
        })
        $(standingContainer).find(".Table__Scroller table tbody tr").each(async (i, elem3) => {
            compt.standingList[i].GP=$(elem3).find("td:nth-child(1)").text()
            compt.standingList[i].W=$(elem3).find("td:nth-child(2)").text()
            compt.standingList[i].D=$(elem3).find("td:nth-child(3)").text()
            compt.standingList[i].L=$(elem3).find("td:nth-child(4)").text()
            compt.standingList[i].F=$(elem3).find("td:nth-child(5)").text()
            compt.standingList[i].A=$(elem3).find("td:nth-child(6)").text()
            compt.standingList[i].GD=$(elem3).find("td:nth-child(7)").text()
            compt.standingList[i].P=$(elem3).find("td:nth-child(8)").text()
        })
        compt.positionInfo=[]
        let postionInfoContainer=$(container).find("section.Card .bb")
        $(postionInfoContainer).find("p").each(async (i, elem3) => {
            compt.positionInfo.push($(elem3).text())
        })
        return {
            status:200,
            data:compt
        };
    }catch(error){
        return {
            status:400,
            error:error
        }
    }
}
async function getCompetetionStatScoring(competSlug,season=null){
 try{
    let bigData;
    if(season != null){
      const {data} = await axios.get(`https://www.espn.com/soccer/stats/_/league/${competSlug}/season/${season}`,{timeout: 10000000});
      bigData=data
    }else{
      const {data} = await axios.get(`https://www.espn.com/soccer/stats/_/league/${competSlug}`,{timeout: 10000000});
      bigData=data
    }
  
    const $ = cheerio.load(bigData);  // new addition
    let container=$('#fittPageContainer .layout__column--1 .Card');
    let compet={}
    let headerContainer=$(container).find("h1:first-of-type").text().split("Scoring")
    compet.name=headerContainer[0].trim()
    compet.seasons=[]
    $(container).find(".dropdown__select--seasons select:first-of-type option").each(async (i, elem) => {
        let season={}
        season.name=$(elem).text()
        season.slug=$(elem).attr("value")
        compet.seasons.push(season)
    })
    compet.TopScorers=[]
    compet.TopAssists=[]
    let test=$(container).find(" div.statistics__table:nth-child(1)  section.statistics__table:first-of-type")
    if(test.length > 0){
        $(container).find(" div.statistics__table:nth-child(1)  section.statistics__table:first-of-type").each(async (i, elem2) => {
          $(elem2).find(".Table__Scroller .Table__TBODY tr").each(async (i, elem3) => {
            let player={}
            let team={}
            player.rank=i + 1
            let playerUrl=$(elem3).find(".Table__TD:nth-child(2) a")
            if(playerUrl.length > 0){
              player.name=playerUrl.text()
              let playerHref=playerUrl.attr("href").split("/")
              player.id=playerHref[playerHref.length - 2]
              player.slug=playerHref[playerHref.length - 1]
            }else{
              player.name=$(elem3).find(".Table__TD:nth-child(2)").text()
              player.id=null
              player.slug=null
            }
            let teamUrl=$(elem3).find(".Table__TD:nth-child(3) a")
            if(teamUrl.length > 0){
                team.name=teamUrl.text()
                let teamHref=teamUrl.attr("href").split("/")
                team.id=teamHref[teamHref.length - 2]
                team.slug=teamHref[teamHref.length - 1]
              }else{
                team.name=$(elem3).find(".Table__TD:nth-child(3)").text()
                team.id=null
                team.slug=null
            }
            player.P=$(elem3).find(".Table__TD:nth-child(4)").text()
            player.G=$(elem3).find(".Table__TD:nth-child(5)").text()
            player.team=team
            compet.TopScorers.push(player)
          })
      })
  
      
      $(container).find("div.statistics__table:nth-child(2) section.statistics__table:last-of-type").each(async (i, elem4) => {
        $(elem4).find(".Table__Scroller .Table__TBODY tr").each(async (i, elem5) => {
          let player={}
          let team={}
          player.rank=i + 1
          let playerUrl=$(elem5).find(".Table__TD:nth-child(2) a")
          if(playerUrl.length > 0){
            player.name=playerUrl.text()
            let playerHref=playerUrl.attr("href").split("/")
            player.id=playerHref[playerHref.length - 2]
            player.slug=playerHref[playerHref.length - 1]
          }else{
            player.name=$(elem5).find(".Table__TD:nth-child(1)").text()
            player.id=null
            player.slug=null
          }
          let teamUrl=$(elem5).find(".Table__TD:nth-child(3) a")
            if(teamUrl.length > 0){
                team.name=teamUrl.text()
                let teamHref=teamUrl.attr("href").split("/")
                team.id=teamHref[teamHref.length - 2]
                team.slug=teamHref[teamHref.length - 1]
              }else{
                team.name=$(elem5).find(".Table__TD:nth-child(3)").text()
                team.id=null
                team.slug=null
            }
          player.P=$(elem5).find(".Table__TD:nth-child(4)").text()
          player.A=$(elem5).find(".Table__TD:nth-child(5)").text()
          player.team=team
          compet.TopAssists.push(player)
        })
      })
    }
    compet.slug=competSlug
    return {
        status:200,
        data:compet
    }
 }catch(error){
    return {
        status:400,
        error:error
    }
}
}
async function getCompetetionStatDiscpline(competSlug,season=null){
    try{
        let bigData;
        if(season != null){
          const {data} = await axios.get(`https://www.espn.com/soccer/stats/_/league/${competSlug}/season/${season}/view/discipline`,{timeout: 10000000});
          bigData=data
        }else{
          const {data} = await axios.get(`https://www.espn.com/soccer/stats/_/league/${competSlug}/view/discipline`,{timeout: 10000000});
          bigData=data
        }
        const $ = cheerio.load(bigData);
        let container=$('#fittPageContainer .layout__column--1 .Card');
        let compet={}
        let headerContainer=$(container).find("h1:first-of-type").text().split("Discipline")
        compet.name=headerContainer[0].trim()
        compet.seasons=[]
        $(container).find(".dropdown__select--seasons select:first-of-type option").each(async (i, elem) => {
            let season={}
            season.name=$(elem).text()
            season.slug=$(elem).attr("value")
            compet.seasons.push(season)
        })
        compet.listOfTeams=[]
        let test=$(container).find("section.statistics__table:first-of-type ")
    
        if(test.length > 0){
            $(test).find(".Table__Scroller .Table__TBODY tr").each(async (i, elem3) => {
                let team={}
                team.rank=i + 1
    
                let teamUrl=$(elem3).find(".Table__TD:nth-child(2) a")
                if(teamUrl.length > 0){
                    team.name=teamUrl.text()
                    let teamHref=teamUrl.attr("href").split("/")
                    team.id=teamHref[teamHref.length - 2]
                    team.slug=teamHref[teamHref.length - 1]
                  }else{
                    team.name=$(elem3).find(".Table__TD:nth-child(3)").text()
                    team.id=null
                    team.slug=null
                }
                team.P=$(elem3).find(".Table__TD:nth-child(3)").text()
                team.YC=$(elem3).find(".Table__TD:nth-child(4)").text()
                team.RC=$(elem3).find(".Table__TD:nth-child(5)").text()
                team.PTS=$(elem3).find(".Table__TD:nth-child(6)").text()
                compet.listOfTeams.push(team)
    
          })
        }
        compet.slug=competSlug
        return {
            status:200,
            data:compet
        }
    }catch(error){
        return {
            status:400,
            error:error
        }
    }
}
async function getCompetetionStatPerformance(competSlug,season=null){
    try{
        let bigData;
        if(season == null){
        const {data} = await axios.get(`https://www.espn.com/soccer/stats/_/league/${competSlug}/view/performance`,{timeout: 10000000});
        bigData=data
        }else{
        const {data} = await axios.get(`https://www.espn.com/soccer/stats/_/league/${competSlug}/season/${season}/view/performance`,{timeout: 10000000});
        bigData=data
        
        }
        const $ = cheerio.load(bigData);
        let container=$('#fittPageContainer .layout__column--1 .Card');
        let compet={}
        let headerContainer=$(container).find("h1:first-of-type").text().split("Performance ")
        compet.name=headerContainer[0].trim()
        compet.seasons=[]
        $(container).find(".dropdown__select--seasons select:first-of-type option").each(async (i, elem) => {
            let season={}
            season.name=$(elem).text()
            season.slug=$(elem).attr("value")
            compet.seasons.push(season)
        })
        compet.listOfMatchPerformance=[]
        compet.listOfStreaks=[]
        compet.listOfAttendance=[]
        let test=$(container).find("section.statistics__table")

        if(test.length > 0){
            $(container).find("section.statistics__table:nth-child(1)").each(async (i, elem2) => {
            $(elem2).find(".Table__Scroller .Table__TBODY tr").each(async (i, elem3) => {
                let match={}
                let homeTeam={}
                let awayTeam={}
                match.date=$(elem3).find(".Table__TD:nth-child(4)").text()
                match.category=$(elem3).find(".Table__TD:nth-child(1)").text()
                match.goals=$(elem3).find(".Table__TD:nth-child(2)").text()
                
                let homeTeamBlock=$(elem3).find(".Table__TD:nth-child(3) .team-match span:first-child .hide-mobile a")
        
                if(homeTeamBlock.length > 0){
                    homeTeam.name=homeTeamBlock.text()
                    homeTeam.shortName=$(elem3).find(".Table__TD:nth-child(3) .team-match span:first-child .show-mobile a").text()
                    let homeTeamHref=homeTeamBlock.attr("href").split("/")

                    homeTeam.id=homeTeamHref[homeTeamHref.length - 2]
                    homeTeam.slug=homeTeamHref[homeTeamHref.length - 1]
                }else{
                    homeTeam.name=$(elem3).find(".Table__TD:nth-child(3) .team-match span:first-child .hide-mobile").text()
                    homeTeam.shortName=$(elem3).find(".Table__TD:nth-child(3) .team-match span:first-child .show-mobile ").text()
                    homeTeam.id=null
                    homeTeam.slug=null
                }
                match.score=$(elem3).find(".Table__TD:nth-child(3) .team-match span.score").text()
    
                let awayTeamBlock=$(elem3).find(".Table__TD:nth-child(3) .team-match span:last-child .hide-mobile a")
                if(awayTeamBlock.length > 0){
                    awayTeam.name=awayTeamBlock.text()
                    awayTeam.shortName=$(elem3).find(".Table__TD:nth-child(3) .team-match span:last-child .show-mobile a").text()
                    let awayTeamHref=awayTeamBlock.attr("href").split("/")
                    awayTeam.id=awayTeamHref[awayTeamHref.length - 2]
                    awayTeam.slug=awayTeamHref[awayTeamHref.length - 1]
                }else{
                    awayTeam.name=$(elem3).find(".Table__TD:nth-child(3) .team-match span:last-child .hide-mobile").text()
                    awayTeam.shortName=$(elem3).find(".Table__TD:nth-child(3) .team-match span:last-child .show-mobile").text()
                    awayTeam.id=null
                    awayTeam.slug=null
                }
                match.homeTeam=homeTeam
                match.awayTeam=awayTeam
                compet.listOfMatchPerformance.push(match)
            })
            })
    
        $(container).find("section.statistics__table:nth-child(2)").each(async (i, elem2) => {
            $(elem2).find(".Table__Scroller .Table__TBODY tr").each(async (i, elem3) => {
            let streak={}
            
            streak.name=$(elem3).find(".Table__TD:nth-child(1)").text()
            streak.teamName=$(elem3).find(".Table__TD:nth-child(2)").text()
            streak.number=$(elem3).find(".Table__TD:nth-child(3)").text()
            compet.listOfStreaks.push(streak)
            })
        })
    
        $(container).find("section.statistics__table:nth-child(3)").each(async (i, elem2) => {
            $(elem2).find(".Table__Scroller .Table__TBODY tr").each(async (i, elem3) => {
            let attendance={}
            let homeTeam={}
            let awayTeam={}
            attendance.match={}
            attendance.category=$(elem3).find(".Table__TD:nth-child(1)").text()
            attendance.ATT=$(elem3).find(".Table__TD:nth-child(2)").text()
            attendance.date=$(elem3).find(".Table__TD:nth-child(4)").text()
    
            attendance.match.score=$(elem3).find(".Table__TD:nth-child(3) .team-match span.score").text()
            if(attendance.match.score !== " - "){
                let homeTeamBlock=$(elem3).find(".Table__TD:nth-child(3) .team-match span:first-child .hide-mobile a")
    
                if(homeTeamBlock.length > 0){
                    homeTeam.name=homeTeamBlock.text()
                    homeTeam.shortName=$(elem3).find(".Table__TD:nth-child(3) .team-match span:first-child .show-mobile a").text()
                    let homeTeamHref=homeTeamBlock.attr("href").split("/")
                    homeTeam.id=homeTeamHref[homeTeamHref.length - 2]
                    homeTeam.slug=homeTeamHref[homeTeamHref.length - 1]
                }else{
                    homeTeam.name=$(elem3).find(".Table__TD:nth-child(3) .team-match span:first-child .hide-mobile").text()
                    homeTeam.shortName=$(elem3).find(".Table__TD:nth-child(3) .team-match span:first-child .show-mobile").text()
                    homeTeam.id=null
                    homeTeam.slug=null
                }
        
                let awayTeamBlock=$(elem3).find(".Table__TD:nth-child(3) .team-match span:last-child .hide-mobile a")
                if(awayTeamBlock.length > 0){
                    awayTeam.name=awayTeamBlock.text()
                    awayTeam.shortName=$(elem3).find(".Table__TD:nth-child(3) .team-match span:last-child .show-mobile a").text()
                    let awayTeamHref=awayTeamBlock.attr("href").split("/")
                    awayTeam.id=awayTeamHref[awayTeamHref.length - 2]
                    awayTeam.slug=awayTeamHref[awayTeamHref.length - 1]
                }else{
                    awayTeam.name=$(elem3).find(".Table__TD:nth-child(3) .team-match span:last-child .hide-mobile").text()
                    awayTeam.shortName=$(elem3).find(".Table__TD:nth-child(3) .team-match span:last-child .show-mobile").text()
                    awayTeam.id=null
                    awayTeam.slug=null
                }
                attendance.match.homeTeam=homeTeam
                attendance.match.awayTeam=awayTeam
            }
            
            compet.listOfAttendance.push(attendance)
            })
        })
        }
        return {
            status:200,
            data:compet
        }
    }catch(error){
        return {
            status:400,
            error:error
        }
    }
}

router.get("/getAllTeams",(req,res)=>{
    res.json(teams)
})
router.get("/getCompetetionByCat",(req,res)=>{
    res.json({competetionsByCat,competetions})
})
router.get("/getCompetetion",(req,res)=>{
    let {name}=req.query
    res.json(competetions.find(ele=>ele.leagueName===name))
})
router.get("/getAllCompetetions",(req,res)=>{
    res.json(competetions)
})
router.get("/scoreboard/_date/:date/league/:leagueSlug",async(req,res)=>{
    let {date,leagueSlug}=req.params

    if(leagueSlug === "any"){
       let  scores=await getScores(date)
       if(scores.status != 200){
        res.status(400).json({error:"Error While Extracting Data"})
       }else{
        res.json(scores.data)
       }

    }else{
       let  scores=await getScores(date,leagueSlug)
       if(scores.status != 200){
        res.status(400).json({error:"Error While Extracting Data"})
       }else{
        res.json(scores.data)
       }
    }
})
router.get("/schedule/_date/:date/league/:leagueSlug",async(req,res)=>{
    let {date,leagueSlug}=req.params

    if(leagueSlug === "any"){
       let schedule=await getSchedule(date)
       if(schedule.status != 200){
        res.status(400).json({error:"Error While Extracting Data"})
       }else{
        res.json(schedule.data)
       }

    }else{
       let schedule=await getSpecificCompetSchedule(date,leagueSlug)
       if(schedule.status != 200){
        res.status(400).json({error:"Error While Extracting Data"})
       }else{
        res.json(schedule.data)
       }
    }
})
router.get("/getLeagueTeams/:leagueSlug",async(req,res)=>{
    let {leagueSlug}=req.params
    let league=allLeaguesTeams.find(ele=>ele.leagueSlug === leagueSlug)
    res.json(league)
})
router.get("/_/name/:leagueSlug/id/:leagueId",async(req,res)=>{
  let {leagueSlug,leagueId}=req.params
  let teamData=await getCompetetionInfo(leagueSlug,leagueId)
  if(teamData.status != 200){
    res.status(400).json({error:"Error While Extracting Data"})
   }else{
    res.json(teamData.data)
   }
})
router.get("/_/name/:leagueSlug/standing/season/:seasonId",async(req,res)=>{
    let {leagueSlug,seasonId}=req.params
    if(seasonId === "any"){
        let teamData=await getCompetetionStanding(leagueSlug)
        if(teamData.status != 200){
            res.status(400).json({error:"Error While Extracting Data"})
           }else{
            res.json(teamData.data)
           }
    }else{
        let teamData=await getCompetetionStanding(leagueSlug,seasonId)
        if(teamData.status != 200){
            res.status(400).json({error:"Error While Extracting Data"})
        }else{
            res.json(teamData.data)
        }
    }    
})
router.get("/_/name/:competSlug/stats/scoring/season/:seasonId",async(req,res)=>{
    let {competSlug,seasonId}=req.params
    if(seasonId === "any"){
        let teamData=await getCompetetionStatScoring(competSlug)
        if(teamData.status != 200){
            res.status(400).json({error:"Error While Extracting Data"})
        }else{
            res.json(teamData.data)
        }
    }else{
        let teamData=await getCompetetionStatScoring(competSlug,seasonId)
        if(teamData.status != 200){
            res.status(400).json({error:"Error While Extracting Data"})
        }else{
            res.json(teamData.data)
        }
    }    
})
router.get("/_/name/:competSlug/stats/discpline/season/:seasonId",async(req,res)=>{
    let {competSlug,seasonId}=req.params
    if(seasonId === "any"){
        let teamData=await getCompetetionStatDiscpline(competSlug)
        if(teamData.status != 200){
            res.status(400).json({error:"Error While Extracting Data"})
        }else{
            res.json(teamData.data)
        }
    }else{
        let teamData=await getCompetetionStatDiscpline(competSlug,seasonId)
        if(teamData.status != 200){
            res.status(400).json({error:"Error While Extracting Data"})
        }else{
            res.json(teamData.data)
        }
    }    
})
router.get("/_/name/:competSlug/stats/performance/season/:seasonId",async(req,res)=>{
    let {competSlug,seasonId}=req.params
    if(seasonId === "any"){
        let teamData=await getCompetetionStatPerformance(competSlug)
        if(teamData.status != 200){
            res.status(400).json({error:"Error While Extracting Data"})
        }else{
            res.json(teamData.data)
        }
    }else{
        let teamData=await getCompetetionStatPerformance(competSlug,seasonId)
        if(teamData.status != 200){
            res.status(400).json({error:"Error While Extracting Data"})
        }else{
            res.json(teamData.data)
        }
    }    
})
module.exports = {
    tournsRouter:router,
    getLocalTime,
};