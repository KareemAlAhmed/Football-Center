const axios = require('axios');
const https = require('https');
const fs = require('fs');
const cheerio = require('cheerio'); 

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
  fs.writeFileSync("./uniqueTeams2.json", JSON.stringify(uniqueTeams), "utf8");
