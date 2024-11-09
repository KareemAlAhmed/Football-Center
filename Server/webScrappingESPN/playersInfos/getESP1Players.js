let allComptetions=require("../webScrappingESPN/tournsAndTeams/allLeaguesTeams.json")
const axios = require('axios');
const fs = require('fs');

const localLeagues=require("../webScrappingESPN/tournsAndTeams/leaguesTeams/allLocalLeagues.json")
const allLeagues=require("./leagueAndTeams.json")
let teamsAndPlayers=require("./allTeamsPlayers.json")
const cheerio = require('cheerio');  // new addition
const allCompets=require("../webScrappingESPN/tournsAndTeams/allComptetion.json")
const espnUrl = `https://www.espn.com`;

async function getTeamSquads(bigData){

    // let bigData;
    // if(league==null){
    //   const {data} = await axios.get(`https://www.espn.com/soccer/team/squad/_/id/${id}`,{timeout: 10000000});
    //   bigData=data
    // }else if(league !=null && season == null){
    //   const {data} = await axios.get(`https://www.espn.com/soccer/team/squad/_/id/${id}/league/${league}`,{timeout: 10000000});
    //   bigData=data
    // }else{
    //   const {data} = await axios.get(`https://www.espn.com/soccer/team/squad/_/id/${id}/league/${league}/season/${season}`,{timeout: 10000000});
    //   bigData=data
    // }
  
  
    const $ = cheerio.load(bigData);  // new addition
    let container=$('#fittPageContainer');
    let team={}
    let headerContainer=$(container).find(".ClubhouseHeader__Main_Aside")
    team.teamName=$(headerContainer).find("h1").text().trim()
  
    let centerContainer=$(container).find(".layout__column--1")
 
    team.squads=[]
      $(centerContainer).find(".Roster__MixedTable").each(async (i, elem2) => {
        let squadSection={}
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
          team.squads.push(player)
        })
    })
  
      return team
    
    
}

async function getPlayers(){
    let filteredLeagues=[]
    for (let i = 0; i < playerList.length; i++) {
      let teamName=playerList[i].teamName
      for (let j = 0; j < allLeagues.length; j++) {
        let leaguesTeams=allLeagues[j].teams
        let leagueName=allLeagues[j].leagueName
        if(leaguesTeams.includes(teamName)){
          if(localLeagues.includes(leagueName)){
            playerList[i].leagueName=leagueName
            filteredLeagues.push(playerList[i])
            break;
          }
        }
      }
    }

    fs.writeFileSync("./leaguesTest2.json", JSON.stringify(filteredLeagues), "utf8");
}


function fixPlayers(){
    let allPlayers=[]
      teamsAndPlayers.map(ele=>{
        let leagueName=ele.leagueName
        let leagueSlug=ele.leagueSlug
        let leagueId=ele.leagueId
        ele.squads.map(ele2=>{
          ele2.leagueName=leagueName
          ele2.leagueSlug=leagueSlug
          ele2.leagueId=leagueId
          allPlayers.push(ele2)
        })
    })
fs.writeFileSync("./allPlayers.json", JSON.stringify(allPlayers), "utf8");

}
fixPlayers()