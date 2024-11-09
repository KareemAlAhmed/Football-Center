const axios = require('axios');
const https = require('https');
const fs = require('fs');
const cheerio = require('cheerio'); 
const res = require('express/lib/response');
const req = require('express/lib/request');

// const team1 = require('./Africa/teams1.json');
// const team2 = require('./South America/teams2.json');
// const team3 = require('./South America/teams3.json');
// const leaguesInfo=require("./testy.json")
const path = require('path');
const url = `https://www.espn.com`;
// const allLeagues=require("./allComptetions.json")
// const ligaTeams=require("./international/fullTeams.json")
const ligaTeams=require("./fullTeams.json")


function filterUniqueTeamsWithLeagueIds(teams) {
    return teams.reduce((acc, team) => {
      const existingTeam = acc.find(t => t.id=== team.id);
        let womenLeagues=[]
      if (existingTeam) {
        existingTeam.leagues.push(team.leagueName);
        existingTeam.leagueIds.push(team.LegaueID);
      } else {
        
        acc.push({
          id: team.id,
          name:womenLeagues.includes(team.leagueName) ? team.name + " Women" : team.name,
          leagues: [team.leagueName],
          leagueIds: [team.LegaueID],
          logo: team.logo,
        });
      }
  
      return acc;
    }, []);
  }
  
  
  
  const uniqueTeams = filterUniqueTeamsWithLeagueIds(ligaTeams);
  fs.writeFileSync("./uniqueTeams.json", JSON.stringify(uniqueTeams), "utf8");
