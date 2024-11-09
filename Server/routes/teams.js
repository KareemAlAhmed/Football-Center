
const axios = require('axios');
const fs = require('fs');
const nationalTeams=require("../webScrappingESPN/tournsAndTeams/nationalTeams.json")
let express=require("express")
let router=express.Router()
const cheerio = require('cheerio');
const espnUrl = `https://www.espn.com`;


async function getTeamInfo(id){
    try{
      const {data} = await axios.get(`https://www.espn.com/soccer/team/_/id/${id}`,{timeout: 10000000});
      const $ = cheerio.load(data);
      let container=$('#fittPageContainer');
      let team={}
      let headerContainer=$(container).find(".ClubhouseHeader__Main_Aside")
      team.name=$(headerContainer).find("h1").text().trim()
      team.record=$(headerContainer).find("ul li:first-of-type").text()
      team.positionInLeague=$(headerContainer).find("ul li:last-of-type").text()

      let centerContainer=$(container).find(".is-clubhouse")
      let teamSchedule=[]
      $(centerContainer).find(".layout__column--1 .Schedule__Group a").each(async (i, elem) => {
          let match={}
          let homeTeam={}
          let awayTeam={}
          match.comptName=$(elem).find(".Schedule__League-Name p:first-of-type").text()
          let homeTeamBlock=$(elem).find(".Schedule__Competitor__Result:first-of-type")
          homeTeam.name=$(homeTeamBlock).find(".Schedule__Team").text()
          let awayTeamBlock=$(elem).find(".Schedule__Competitor__Result:last-of-type")
          awayTeam.name=$(awayTeamBlock).find(".Schedule__Team").text()
          let timeBlock=$(elem).find(".Schedule__Meta .Schedule__Meta__Score ")
          if(timeBlock.length > 0){
              match.status=timeBlock.text() 
              match.date="" 
              match.time=""
              homeTeam.score=$(homeTeamBlock).find(".Schedule__Competitor__Score").text()
              awayTeam.score=$(awayTeamBlock).find(".Schedule__Competitor__Score").text()

          }else{
              match.date=$(elem).find(".Schedule__Meta .Schedule__Meta__Time:first-of-type").text() 
              match.time=$(elem).find(".Schedule__Meta .Schedule__Meta__Time:last-of-type").text() 
              match.status="Not Started"
              homeTeam.score=""
              awayTeam.score=""
          }
          match.homeTeam=homeTeam
          match.awayTeam=awayTeam
          teamSchedule.push(match)

      })
      team.schedule=teamSchedule

      let allNews = [];

      // Process articles asynchronously
      const processArticles = async () => {
        // Collect all promises
        const promises = $(centerContainer).find(".layout__column--2 article").map(async (i, elem) => {
          let news = {};
        
          // Set default image URL
          news.titleImageUrl = `https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/${id}.png&scale=crop&cquality=40&location=origin&w=80&h=80`;
        
          // Get basic news information
          news.for = team.name;
        
          let linkAddress = $(elem).find(".ResponsiveWrapper a:first-of-type");
        
          if (linkAddress.length > 0) {
            news.linkAddress = espnUrl + linkAddress.attr("href");
            let articleHref=linkAddress.attr("href").split("/")
            if(articleHref[2] === "story"){
                news.type=articleHref[2]
            }
            if(articleHref[2] === "report"){
                news.type=articleHref[2]
            }
            news.id=articleHref[articleHref.length - 2]
            news.slug=articleHref[articleHref.length - 1]
            news.articleTitle = $(linkAddress).find(".contentItem__contentWrapper .contentItem__title").text();
            news.articleContent = $(linkAddress).find(".contentItem__contentWrapper .contentItem__subhead").text();
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
          if (news.linkAddress !== "No Url") {
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
    
      // Other code here, e.g., updating team.news or further processing
      team.news = allNews.filter(ele=>ele != null);
      team.league={}
      $(centerContainer).find(".layout__column--3 .TeamStandings").each(async (i, elem2) => {
          team.league.standingName=$(elem2).find(".Card__Header__Title").text()
          team.league.standingList=[]
          $(elem2).find(".Table__Scroller tbody tr").each(async (i, elem3) => {
              let LeagueTeam={}
              let teamHref=$(elem3).find("td:nth-child(1) a").attr("href").split("/")
              LeagueTeam.name=$(elem3).find("td:nth-child(1) a").text()
              LeagueTeam.id=teamHref[teamHref.length - 2]
              LeagueTeam.slug=teamHref[teamHref.length - 1]
              LeagueTeam.GP=$(elem3).find("td:nth-child(2) span").text()
              LeagueTeam.W=$(elem3).find("td:nth-child(3) span").text()
              LeagueTeam.D=$(elem3).find("td:nth-child(4) span").text()
              LeagueTeam.L=$(elem3).find("td:nth-child(5) span").text()
              LeagueTeam.GD=$(elem3).find("td:nth-child(6) span").text()
              LeagueTeam.P=$(elem3).find("td:nth-child(7) span").text()
              team.league.standingList.push(LeagueTeam)
          })
      })


      $(centerContainer).find(".layout__column--3 .Card__TeamStats").each(async (i, elem4) => {
          team.league.name=$(elem4).find(".Card__Header__Subtitle").text()
          let contentBlock=$(elem4).find(".Card__Content")
          team.summaryStat=[]
          $(contentBlock).find(".TeamStat__Item").each(async (i, elem5) => {
              let stat={}
              stat.name=$(elem5).find(".flex:first-of-type div:nth-child(1)").text()
              if(i == 0){
                stat.name="Goal Difference"
              }
              stat.number=$(elem5).find(".flex:first-of-type div:nth-child(2)").text()
              stat.postion=$(elem5).find(".flex:first-of-type div:nth-child(3)").text()
              team.summaryStat.push(stat)
          })
      })
      return {
        status:200,
        data:team
      };
    }catch(error){
      return {
        status:400,
        error:error
      }
    }

    
}
async  function getTeamFixture(id,league=null){
  try{
    let bigData;
    if(league==null){
      const {data} = await axios.get(`https://www.espn.com/soccer/team/fixtures/_/id/${id}`,{timeout: 10000000});
      bigData=data
    }else{
      const {data} = await axios.get(`https://www.espn.com/soccer/team/fixtures/_/id/${id}/league/${league}`,{timeout: 10000000});
      bigData=data
    }
    const $ = cheerio.load(bigData);
    let container=$('#fittPageContainer');
    let team={}
    let headerContainer=$(container).find(".ClubhouseHeader__Main_Aside")
    team.name=$(headerContainer).find("h1").text().trim()
    team.positionInLeague=$(headerContainer).find("ul li:last-of-type").text()
  
    let centerContainer=$(container).find(".layout__column--1")
    team.leagues=[]
    $(centerContainer).find(".dropdown__select--competitions select:first-of-type option").each(async (i, elem) => {
        let league={}
        league.name=$(elem).text()
        league.slug=$(elem).attr("value")
        team.leagues.push(league)
    })
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
          match.time=timeBlock.text() 
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
async function getTeamResults(id,league=null,season=null){
  try{
    let bigData;
  if(league==null){
    const {data} = await axios.get(`https://www.espn.com/soccer/team/results/_/id/${id}`,{timeout: 10000000});
    bigData=data
  }else if(league !=null && season == null){
    const {data} = await axios.get(`https://www.espn.com/soccer/team/results/_/id/${id}/league/${league}`,{timeout: 10000000});
    bigData=data
  }else{
    const {data} = await axios.get(`https://www.espn.com/soccer/team/results/_/id/${id}/league/${league}/season/${season}`,{timeout: 10000000});
    bigData=data
  }

  const $ = cheerio.load(bigData);
  let container=$('#fittPageContainer');
  let team={}
  let headerContainer=$(container).find(".ClubhouseHeader__Main_Aside")
  team.name=$(headerContainer).find("h1").text().trim()
  team.positionInLeague=$(headerContainer).find("ul li:first-of-type").text()

  let centerContainer=$(container).find(".layout__column--1")
  team.leagues=[]
  $(centerContainer).find(".dropdown__select--competitions select:first-of-type option").each(async (i, elem) => {
      let league={}
      league.name=$(elem).text()
      league.slug=$(elem).attr("value")
      team.leagues.push(league)
  })

  team.seasons=[]
  $(centerContainer).find(".dropdown__select--seasons select:first-of-type option").each(async (i, elem) => {
      let season={}
      season.name=$(elem).text()
      season.slug=$(elem).attr("value")
      team.seasons.push(season)
  })

  team.results=[]
  let test= $(centerContainer).find(".Table__results:first-of-type")
  if(test.length > 0){
    $(centerContainer).find(".Table__results").each(async (i, elem2) => {
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
        match.score=$(elem3).find(".Table__TD:nth-child(3) span:first-of-type").text()
        let gameNote=$(elem3).find(".Table__TD:nth-child(3) span:last-of-type")
        if(gameNote.length > 0){
          match.gameNote=gameNote.text()
        }else{
          match.gameNote=""
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
        match.time=timeBlock.text() 
        let gameHref=timeBlock.attr("href").split("/")
        match.gameId=gameHref[gameHref.length - 2]
        match.gameSlug=gameHref[gameHref.length - 1]
        match.competetion=$(elem3).find(".Table__TD:nth-child(6)").text()
        match.homeTeam=homeTeam
        match.awayTeam=awayTeam
        matchesWrapper.listOfMatches.push(match)
      })
      team.results.push(matchesWrapper)
      
  })
    return {
      status:200,
      data:team
    }
  }else{
    team.error="No Scores"
    return {
      status:200,
      data:team
    }
  }
  }catch(error){
    return {
      status:400,
      error:error
    }
  }
  
}
async function getTeamSquads(id,league=null,season=null){
  try{
    let bigData;
    if(league==null){
      const {data} = await axios.get(`https://www.espn.com/soccer/team/squad/_/id/${id}`,{timeout: 10000000});
      bigData=data
    }else if(league !=null && season == null){
      const {data} = await axios.get(`https://www.espn.com/soccer/team/squad/_/id/${id}/league/${league}`,{timeout: 10000000});
      bigData=data
    }else{
      const {data} = await axios.get(`https://www.espn.com/soccer/team/squad/_/id/${id}/league/${league}/season/${season}`,{timeout: 10000000});
      bigData=data
    }


    const $ = cheerio.load(bigData);
    let container=$('#fittPageContainer');
    let team={}
    let headerContainer=$(container).find(".ClubhouseHeader__Main_Aside")
    team.name=$(headerContainer).find("h1").text().trim()
    team.positionInLeague=$(headerContainer).find("ul li:last-of-type").text()

    let centerContainer=$(container).find(".layout__column--1")
    team.leagues=[]

    $(centerContainer).find(".Roster__Heading .inline-flex.mt2-mt3.mr2:nth-child(2) .dropdown.dropdown--md:first-of-type select:not(.absolute) option").each(async (i, elem) => {
        let league={}
        league.name=$(elem).text()
        league.slug=$(elem).attr("value")
        team.leagues.push(league)
    })

    team.seasons=[]
    $(centerContainer).find(".Roster__Heading .inline-flex.mt2-mt3.mr2:nth-child(3) .dropdown.dropdown--md:first-of-type select:not(.absolute) option").each(async (i, elem) => {
        let season={}
        season.name=$(elem).text()
        season.slug=$(elem).attr("value")
        team.seasons.push(season)
    })

    team.squads=[]
      $(centerContainer).find(".Roster__MixedTable").each(async (i, elem2) => {
        let squadSection={}
        squadSection.name=$(elem2).find(".Table__Title").text()
        squadSection.listOfPlayer=[]
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

          squadSection.listOfPlayer.push(player)
        })
        team.squads.push(squadSection)
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
async function getTeamStatScoring(id,league=null,season=null){
  try{
    let bigData;
    if(league==null){
      const {data} = await axios.get(`https://www.espn.com/soccer/team/stats/_/id/${id}`,{timeout: 10000000});
      bigData=data
    }else if(league !=null && season == null){
      const {data} = await axios.get(`https://www.espn.com/soccer/team/stats/_/id/${id}/league/${league}`,{timeout: 10000000});
      bigData=data
    }else{
      const {data} = await axios.get(`https://www.espn.com/soccer/team/stats/_/id/${id}/league/${league}/season/${season}`,{timeout: 10000000});
      bigData=data
    }

    const $ = cheerio.load(bigData);
    let container=$('#fittPageContainer');
    let team={}
    let headerContainer=$(container).find(".ClubhouseHeader__Main_Aside")
    team.name=$(headerContainer).find("h1").text().trim()
    team.positionInLeague=$(headerContainer).find("ul li:last-of-type").text()

    let centerContainer=$(container).find(".layout__column--1")
    team.leagues=[]
    $(centerContainer).find(".dropdown__select--competitions select:first-of-type option").each(async (i, elem) => {
        let league={}
        league.name=$(elem).text()
        league.slug=$(elem).attr("value")
        team.leagues.push(league)
    })

    team.seasons=[]
    $(centerContainer).find(".dropdown__select--seasons select:first-of-type option").each(async (i, elem) => {
        let season={}
        season.name=$(elem).text()
        season.slug=$(elem).attr("value")
        team.seasons.push(season)
    })

    team.TopScorers=[]
    team.TopAssists=[]
    let test=$(centerContainer).find(" div.statistics__table:nth-child(1)  section.statistics__table:first-of-type")
    if(test.length > 0){
        $(centerContainer).find(" div.statistics__table:nth-child(1)  section.statistics__table:first-of-type").each(async (i, elem2) => {
          $(elem2).find(".Table__Scroller .Table__TBODY tr").each(async (i, elem3) => {
            let player={}
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
            player.P=$(elem3).find(".Table__TD:nth-child(3)").text()
            player.G=$(elem3).find(".Table__TD:nth-child(4)").text()
            team.TopScorers.push(player)
          })
      })

      
      $(centerContainer).find("div.statistics__table:nth-child(2) section.statistics__table:last-of-type").each(async (i, elem4) => {
        $(elem4).find(".Table__Scroller .Table__TBODY tr").each(async (i, elem5) => {
          let player={}
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
          player.P=$(elem5).find(".Table__TD:nth-child(3)").text()
          player.A=$(elem5).find(".Table__TD:nth-child(4)").text()
          team.TopAssists.push(player)
        })
      })
    }
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
async function getTeamStatDiscpline(id,league,season=null){
  try{
    let bigData;
    if(season == null){
      const {data} = await axios.get(`https://www.espn.com/soccer/team/stats/_/id/${id}/league/${league}/view/discipline`,{timeout: 10000000});
      bigData=data
    }else{
      const {data} = await axios.get(`https://www.espn.com/soccer/team/stats/_/id/${id}/league/${league}/season/${season}/view/discipline`,{timeout: 10000000});
      bigData=data
    }

    const $ = cheerio.load(bigData);
    let container=$('#fittPageContainer');
    let team={}
    let headerContainer=$(container).find(".ClubhouseHeader__Main_Aside")
    team.name=$(headerContainer).find("h1").text().trim()
    team.positionInLeague=$(headerContainer).find("ul li:last-of-type").text()

    let centerContainer=$(container).find(".layout__column--1")
    team.leagues=[]
    $(centerContainer).find(".dropdown__select--competitions select:first-of-type option").each(async (i, elem) => {
        let league={}
        league.name=$(elem).text()
        league.slug=$(elem).attr("value")
        team.leagues.push(league)
    })

    team.seasons=[]
    $(centerContainer).find(".dropdown__select--seasons select:first-of-type option").each(async (i, elem) => {
        let season={}
        season.name=$(elem).text()
        season.slug=$(elem).attr("value")
        team.seasons.push(season)
    })

    team.listOfDiscpline=[]
    let test=$(centerContainer).find("section.statistics__table")
    if(test.length > 0){
        $(centerContainer).find("section.statistics__table").each(async (i, elem2) => {
          $(elem2).find(".Table__Scroller .Table__TBODY tr").each(async (i, elem3) => {
            let player={}
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
            player.P=$(elem3).find(".Table__TD:nth-child(3)").text()
            player.YC=$(elem3).find(".Table__TD:nth-child(4)").text()
            player.RC=$(elem3).find(".Table__TD:nth-child(5)").text()
            player.PTS=$(elem3).find(".Table__TD:nth-child(6)").text()
            team.listOfDiscpline.push(player)
          })
      })

    }

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
async function getTeamStatPerformance(id,league,season=null){
  try{
    let bigData;
    if(season == null){
      const {data} = await axios.get(`https://www.espn.com/soccer/team/stats/_/id/${id}/league/${league}/view/performance`,{timeout: 10000000});
      bigData=data
    }else{
      const {data} = await axios.get(`https://www.espn.com/soccer/team/stats/_/id/${id}/league/${league}/season/${season}/view/performance`,{timeout: 10000000});
      bigData=data
    }

    const $ = cheerio.load(bigData);
    let container=$('#fittPageContainer');
    let team={}
    let headerContainer=$(container).find(".ClubhouseHeader__Main_Aside")
    team.name=$(headerContainer).find("h1").text().trim()
    team.positionInLeague=$(headerContainer).find("ul li:last-of-type").text()

    let centerContainer=$(container).find(".layout__column--1")
    team.leagues=[]
    $(centerContainer).find(".dropdown__select--competitions select:first-of-type option").each(async (i, elem) => {
        let league={}
        league.name=$(elem).text()
        league.slug=$(elem).attr("value")
        team.leagues.push(league)
    })

    team.seasons=[]
    $(centerContainer).find(".dropdown__select--seasons select:first-of-type option").each(async (i, elem) => {
        let season={}
        season.name=$(elem).text()
        season.slug=$(elem).attr("value")
        team.seasons.push(season)
    })

    team.listOfMatchPerformance=[]
    team.listOfStreaks=[]
    team.listOfAttendance=[]
    let test=$(centerContainer).find("section.statistics__table")
    if(test.length > 0){
        $(centerContainer).find("section.statistics__table:nth-child(1)").each(async (i, elem2) => {
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
              let homeTeamHref=homeTeamBlock.attr("href").split("/")
              homeTeam.id=homeTeamHref[homeTeamHref.length - 2]
              homeTeam.slug=homeTeamHref[homeTeamHref.length - 1]
            }else{
              homeTeam.name=$(elem3).find(".Table__TD:nth-child(3) .team-match span:first-child .hide-mobile").text()
              homeTeam.id=null
              homeTeam.slug=null
            }
            match.score=$(elem3).find(".Table__TD:nth-child(3) .team-match span.score").text()

            let awayTeamBlock=$(elem3).find(".Table__TD:nth-child(3) .team-match span:last-child .hide-mobile a")
            if(awayTeamBlock.length > 0){
              awayTeam.name=awayTeamBlock.text()
              let awayTeamHref=awayTeamBlock.attr("href").split("/")
              awayTeam.id=awayTeamHref[awayTeamHref.length - 2]
              awayTeam.slug=awayTeamHref[awayTeamHref.length - 1]
            }else{
              awayTeam.name=$(elem3).find(".Table__TD:nth-child(3) .team-match span:last-child .hide-mobile").text()
              awayTeam.id=null
              awayTeam.slug=null
            }
            match.homeTeam=homeTeam
            match.awayTeam=awayTeam
            team.listOfMatchPerformance.push(match)
          })
        })

      $(centerContainer).find("section.statistics__table:nth-child(2)").each(async (i, elem2) => {
        $(elem2).find(".Table__Scroller .Table__TBODY tr").each(async (i, elem3) => {
          let streak={}
          
          streak.name=$(elem3).find(".Table__TD:nth-child(1)").text()
          streak.number=$(elem3).find(".Table__TD:nth-child(2)").text()
          team.listOfStreaks.push(streak)
        })
      })

      $(centerContainer).find("section.statistics__table:nth-child(3)").each(async (i, elem2) => {
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
              let homeTeamHref=homeTeamBlock.attr("href").split("/")
              homeTeam.id=homeTeamHref[homeTeamHref.length - 2]
              homeTeam.slug=homeTeamHref[homeTeamHref.length - 1]
            }else{
              homeTeam.name=$(elem3).find(".Table__TD:nth-child(3) .team-match span:first-child .hide-mobile").text()
              homeTeam.id=null
              homeTeam.slug=null
            }
    
            let awayTeamBlock=$(elem3).find(".Table__TD:nth-child(3) .team-match span:last-child .hide-mobile a")
            if(awayTeamBlock.length > 0){
              awayTeam.name=awayTeamBlock.text()
              let awayTeamHref=awayTeamBlock.attr("href").split("/")
              awayTeam.id=awayTeamHref[awayTeamHref.length - 2]
              awayTeam.slug=awayTeamHref[awayTeamHref.length - 1]
            }else{
              awayTeam.name=$(elem3).find(".Table__TD:nth-child(3) .team-match span:last-child .hide-mobile").text()
              awayTeam.id=null
              awayTeam.slug=null
            }
            attendance.match.homeTeam=homeTeam
            attendance.match.awayTeam=awayTeam
          }
          
          team.listOfAttendance.push(attendance)
        })
      })
    }
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
async function getTeamTransfer(id,season=null){
  try{
    let bigData;
    if(season == null){
      const {data} = await axios.get(`https://www.espn.com/soccer/team/transfers/_/id/${id}`,{timeout: 10000000});
      bigData=data
    }else{
      const {data} = await axios.get(`https://www.espn.com/soccer/team/transfers/_/id/${id}/year/${season}`,{timeout: 10000000});
      bigData=data
    }

    const $ = cheerio.load(bigData);
    let container=$('#fittPageContainer');
    let team={}
    let headerContainer=$(container).find(".ClubhouseHeader__Main_Aside")
    team.name=$(headerContainer).find("h1").text().trim()
    team.positionInLeague=$(headerContainer).find("ul li:last-of-type").text()

    let centerContainer=$(container).find(".layout__column--1")
    team.years=[]
    $(centerContainer).find(".dropdown--md select:first-of-type option").each(async (i, elem) => {
        let year={}
        year.name=$(elem).text()
        year.slug=$(elem).attr("value")
        team.years.push(year)
    })

    team.listOfIncomingPlayer=[]
    team.listOfOutgoingPlayer=[]
    let test=$(centerContainer).find(".TransferColumn:first-of-type")
    if(test.length > 0){
        $(centerContainer).find(".TransferColumn:nth-child(1)").each(async (i, elem2) => {
          $(elem2).find(".Table__Scroller .Table__TBODY tr").each(async (i, elem3) => {
            let transfer={}
            transfer.fromTeam={}
            transfer.player={}

            transfer.date=$(elem3).find(".Table__TD:nth-child(1)").text()
            transfer.fee=$(elem3).find(".Table__TD:nth-child(4)").text()

            let playerUrl=$(elem3).find(".Table__TD:nth-child(2) a")
            if(playerUrl.length > 0){
              transfer.player.name=playerUrl.text()
              let playerHref=playerUrl.attr("href").split("/")
              transfer.player.id=playerHref[playerHref.length - 2]
              transfer.player.slug=playerHref[playerHref.length - 1]
            }else{
              transfer.player.name=$(elem3).find(".Table__TD:nth-child(2)").text()
              transfer.player.id=null
              transfer.player.slug=null
            }
            
            let fromTeamBlock=$(elem3).find(".Table__TD:nth-child(3) a")
    
            if(fromTeamBlock.length > 0){
              transfer.fromTeam.name=$(fromTeamBlock).find(".hide-mobile").text()
              let fromTeamHref=fromTeamBlock.attr("href").split("/")
              transfer.fromTeam.id=fromTeamHref[fromTeamHref.length - 2]
              transfer.fromTeam.slug=fromTeamHref[fromTeamHref.length - 1]
            }else{
              transfer.fromTeam.name=$(elem3).find(".Table__TD:nth-child(3)").text()
              transfer.fromTeam.id=null
              transfer.fromTeam.slug=null
            }
            team.listOfIncomingPlayer.push(transfer)
          })
        })

        $(centerContainer).find(".TransferColumn:nth-child(2)").each(async (i, elem2) => {
          $(elem2).find(".Table__Scroller .Table__TBODY tr").each(async (i, elem3) => {
            let transfer={}
            transfer.ToTeam={}
            transfer.player={}

            transfer.date=$(elem3).find(".Table__TD:nth-child(1)").text()
            transfer.fee=$(elem3).find(".Table__TD:nth-child(4)").text()

            let playerUrl=$(elem3).find(".Table__TD:nth-child(2) a")
            if(playerUrl.length > 0){
              transfer.player.name=playerUrl.text()
              let playerHref=playerUrl.attr("href").split("/")
              transfer.player.id=playerHref[playerHref.length - 2]
              transfer.player.slug=playerHref[playerHref.length - 1]
            }else{
              transfer.player.name=$(elem3).find(".Table__TD:nth-child(2)").text()
              transfer.player.id=null
              transfer.player.slug=null
            }
            
            let toTeamBlock=$(elem3).find(".Table__TD:nth-child(3) a")
    
            if(toTeamBlock.length > 0){
              transfer.ToTeam.name=$(toTeamBlock).find(".hide-mobile").text()
              let toTeamHref=toTeamBlock.attr("href").split("/")
              transfer.ToTeam.id=toTeamHref[toTeamHref.length - 2]
              transfer.ToTeam.slug=toTeamHref[toTeamHref.length - 1]
            }else{
              transfer.ToTeam.name=$(elem3).find(".Table__TD:nth-child(3) .hide-mobile").text()
              transfer.ToTeam.id=null
              transfer.ToTeam.slug=null
            }
            team.listOfOutgoingPlayer.push(transfer)
          })
        })
    }

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


router.get("/team/_/id/:teamId",async(req,res)=>{
  let {teamId}=req.params
    let teamData=await getTeamInfo(teamId)
    if(teamData.status != 200){
      res.status(400).json({error:"Error While Extracting The Data"})
    }else{
      teamData.data.id=teamId
      res.json(teamData.data)
    }
    
})
router.get("/team/_/id/:teamId/fixture/league/:leagueSlug",async(req,res)=>{
  let {teamId,leagueSlug}=req.params
  let teamData;
  if(leagueSlug === "any"){
    teamData=await getTeamFixture(teamId)
  }else{
    teamData=await getTeamFixture(teamId,leagueSlug)
  }
  if(teamData.status != 200){
    res.status(400).json({error:"Error While Extracting The Data"})
  }else{
    teamData.data.id=teamId
    res.json(teamData.data)
  }
})
router.get("/team/_/id/:teamId/results/league/:leagueSlug/season/:seasonId",async(req,res)=>{
  let {teamId,leagueSlug,seasonId}=req.params
  if(leagueSlug === "any" &&  seasonId ==="any"){
    teamData=await getTeamResults(teamId)
  }else if(leagueSlug !== "any" &&  seasonId ==="any"){
    teamData=await getTeamResults(teamId,leagueSlug)
  }else{
    teamData=await getTeamResults(teamId,leagueSlug,seasonId)
  }
  if(teamData.status != 200){
    res.status(400).json({error:"Error While Extracting The Data"})
  }else{
    teamData.data.id=teamId
    res.json(teamData.data)
  }
})
router.get("/team/_/id/:teamId/squads/league/:leagueSlug/season/:seasonId",async(req,res)=>{
  let {teamId,leagueSlug,seasonId}=req.params
  if(leagueSlug === "any" &&  seasonId ==="any"){
    teamData=await getTeamSquads(teamId)
  }else if(leagueSlug !== "any" &&  seasonId ==="any"){
    teamData=await getTeamSquads(teamId,leagueSlug)
  }else{
    teamData=await getTeamSquads(teamId,leagueSlug,seasonId)
  }
  if(teamData.status != 200){
    res.status(400).json({error:"Error While Extracting The Data"})
  }else{
    teamData.data.id=teamId
    res.json(teamData.data)
  }
})
router.get("/team/_/id/:teamId/stats/scoring/league/:leagueSlug/season/:seasonId",async(req,res)=>{
  let {teamId,leagueSlug,seasonId}=req.params
  let teamData;
  if(leagueSlug === "any" &&  seasonId ==="any"){
    teamData=await getTeamStatScoring(teamId)
  }else if(leagueSlug !== "any" &&  seasonId ==="any"){
    teamData=await getTeamStatScoring(teamId,leagueSlug)
  }else{
    teamData=await getTeamStatScoring(teamId,leagueSlug,seasonId)
  }
  if(teamData.status != 200){
    res.status(400).json({error:"Error While Extracting The Data"})
  }else{
    teamData.data.id=teamId
    res.json(teamData.data)
  }
})
router.get("/team/_/id/:teamId/stats/discpline/league/:leagueSlug/season/:seasonId",async(req,res)=>{
  let {teamId,leagueSlug,seasonId}=req.params
  let teamData;
  if(seasonId === "any"){
    teamData=await getTeamStatDiscpline(teamId,leagueSlug)
  }else{
    teamData=await getTeamStatDiscpline(teamId,leagueSlug,seasonId)
  }
  if(teamData.status != 200){
    res.status(400).json({error:"Error While Extracting The Data"})
  }else{
    teamData.data.id=teamId
    res.json(teamData.data)
  }
})
router.get("/team/_/id/:teamId/stats/performance/league/:leagueSlug/season/:seasonId",async(req,res)=>{
  let {teamId,leagueSlug,seasonId}=req.params
  let teamData;
  if(seasonId === "any"){
    teamData=await getTeamStatPerformance(teamId,leagueSlug)
  }else{
    teamData=await getTeamStatPerformance(teamId,leagueSlug,seasonId)
  }
  if(teamData.status != 200){
    res.status(400).json({error:"Error While Extracting The Data"})
  }else{
    teamData.data.id=teamId
    res.json(teamData.data)
  }
})
router.get("/team/_/id/:teamId/transfers/season/:seasonId",async(req,res)=>{
  let {teamId,seasonId}=req.params
  let teamData;
  if(seasonId === "any"){
    teamData=await getTeamTransfer(teamId)
  }else{
    teamData=await getTeamTransfer(teamId,seasonId)
  }
  if(teamData.status != 200){
    res.status(400).json({error:"Error While Extracting The Data"})
  }else{
    teamData.data.id=teamId
    res.json(teamData.data)
  }
})
router.get("/getNationalTeams",async(req,res)=>{

  let teamsData=nationalTeams
  res.json(teamsData)
})
module.exports =router

