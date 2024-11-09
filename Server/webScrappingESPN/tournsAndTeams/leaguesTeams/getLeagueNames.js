const leagues=require("./africaLeagues.json")
const fs = require("fs");
let leaguesName=[]
leagues.map(ele=>leaguesName.push(ele.leagueName))
fs.writeFileSync("./leagues.json", JSON.stringify(leaguesName), "utf8");
