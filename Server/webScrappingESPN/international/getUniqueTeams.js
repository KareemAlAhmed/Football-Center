const ligaTeams=require("./fullTeams.json")
const fs=require("fs")
function filterUniqueTeamsWithLeagueIds(teams) {
    return teams.reduce((acc, team) => {
      const existingTeam = acc.find(t => t.id=== team.id);
      let womenLeagues=["FIFA Women's World Cup","FIFA Women's World Cup Qualifying - UEFA",
        "FIFA Under-17 Women's World Cup","SheBelieves Cup","UEFA Women's European Championship",
        "Copa América Femenina","Women's Olympic Soccer Tournament","Women's International Friendly"
      ]
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