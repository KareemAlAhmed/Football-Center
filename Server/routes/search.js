
const axios = require('axios');
const fs = require('fs');

let express=require("express")
let router=express.Router()
const cheerio = require('cheerio');  // new addition
const text = require('body-parser/lib/types/text');
const oneFurl = `https://onefootball.com`;
const espnUrl = `https://www.espn.com`;

const allCompets=require("../webScrappingESPN/tournsAndTeams/allComptetion.json")
const allTeams=require("../webScrappingESPN/tournsAndTeams/allTeams2.json")
const allPlayers=require("../webScrappingESPN/playersInfos/allPlayers.json")

function searchCompetsByName(searchText) {
  return allCompets.filter(league => league.leagueName.toLowerCase().includes(searchText.toLowerCase()));
}
function checkWordIncluded(word, team) {
  word = word.toLowerCase();
  const nameIncludes = team.name.toLowerCase().includes(word);
  let leagueIncludes=false;
  if(team.localLeague !== ""){
    leagueIncludes = team.localLeague.toLowerCase().includes(word);
  }
  return nameIncludes || leagueIncludes;
}

function searchTeamByName(searchText) {
  let matchTeams=[]
  allTeams.map(team => {
    if(checkWordIncluded(searchText, team)){
      matchTeams.push(team)
    }
  });
  return matchTeams
}
function searchPlayersByName(searchText) {
  return allPlayers.filter(player => player.name.toLowerCase().includes(searchText.toLowerCase()));
}
async function getSearchContent(text){
  let foundedCompets=searchCompetsByName(text)
  let foundedTeams=searchTeamByName(text)
  let foundedPlayers=searchPlayersByName(text)
  let allDataFounds={
    compets:foundedCompets,
    teams:foundedTeams,
    players:foundedPlayers
  }
  return allDataFounds
}
router.get("/_/q/:searchText",async(req,res)=>{
  let {searchText}=req.params
  let searchData=await getSearchContent(searchText)
  res.json(searchData)
})


module.exports =router

