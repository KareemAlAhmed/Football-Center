const ligaTeams=require("./fullTeams.json")
const fs =require("fs")
function filterUniqueTeamsWithLeagueIds(teams) {
    return teams.reduce((acc, team) => {
      const existingTeam = acc.find(t => t.id=== team.id);
      let womenLeagues=[ 
        "Spanish Liga F","UEFA Women's Champions League","English Women's Super League",
        "UEFA Women's European Championship",
        "English Women's FA Cup",
        "Spanish Copa de la Reina",
        "Dutch Vrouwen Eredivisie","Dutch KNVB Beker Vrouwen"]
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