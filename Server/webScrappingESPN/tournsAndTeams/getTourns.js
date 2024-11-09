const axios = require('axios');
const https = require('https');
const fs = require('fs');
const cheerio = require('cheerio'); 
// const res = require('express/lib/response');
// const req = require('express/lib/request');

// const team1 = require('./Africa/teams1.json');
// const team2 = require('./South America/teams2.json');
// const team3 = require('./South America/teams3.json');
const path = require('path');
const url = `https://www.espn.com`;
const allTeams=require("./allTeams.json")
const interCompet=require("./testy.json")
const interCompet2=require("./testy2.json")

function mergeAllLeagues(){
    let allLeaguesTeams=[...euTeams,...interTeams,...africaTeams,...northATeams,...southATeams,...asiaTeams]
    fs.writeFileSync("./allLeaguesTeams.json", JSON.stringify(allLeaguesTeams), "utf8");

}
const allLeaguesTeams=require("./allLeaguesTeams.json")
function haveCommonElement(arr1, arr2) {
    const set = new Set(arr1);
    return arr2.some(item => set.has(item));
}
function test(){
    let leaguesnew=[]
    let newComp=allTeams.map(ele=>{
        if(haveCommonElement(ele.leagues,interCompet)){
            leaguesnew.push(ele)
        }
    })
    fs.writeFileSync("./testy2.json", JSON.stringify(leaguesnew), "utf8");
}
function sortarray(){
   let arrayOb= interCompet2.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });
    fs.writeFileSync("./nationalTeams.json", JSON.stringify(arrayOb), "utf8");

}
sortarray()