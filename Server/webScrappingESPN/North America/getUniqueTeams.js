const axios = require('axios');
const https = require('https');
const fs = require('fs');
const cheerio = require('cheerio'); 
const res = require('express/lib/response');
const req = require('express/lib/request');

const path = require('path');
const url = `https://www.espn.com`;

const ligaTeams=require("./fullTeams.json")


function filterUniqueTeamsWithLeagueIds(teams) {
    return teams.reduce((acc, team) => {
      const existingTeam = acc.find(t => t.id=== team.id);
        let womenLeagues=["NWSL","NWSL Challenge Cup","NCAA Women's Soccer","Concacaf W Championship"]
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
