const europeTeams=require("../europe/uniqueTeams.json")
const asiaTeams=require("../Asia/uniqueTeams.json")
const africaTeams=require("../Africa/uniqueTeams.json")
const nationalTeams=require("../international/uniqueTeams.json")
const northAmericaTeams=require("../North America/uniqueTeams.json")
const southAmericaTeams=require("../South America/uniqueTeams.json")
const fs=require("fs")
function getAllTeamsFromFiles(){

    let allTeams=[...europeTeams,...nationalTeams,...northAmericaTeams,...southAmericaTeams,...asiaTeams,...africaTeams]
    fs.writeFileSync("./allTeams.json", JSON.stringify(allTeams), "utf8");
}
getAllTeamsFromFiles()