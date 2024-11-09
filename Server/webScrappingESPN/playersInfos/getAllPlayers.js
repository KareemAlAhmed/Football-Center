const axios = require("axios");
const fs = require("fs");
const cheerio = require('cheerio');  // new addition

// Function to process squad data
async function getTeamSquads(bigData){
    const $ = cheerio.load(bigData);
    let container = $('#fittPageContainer');
    let team = {};
    let headerContainer = $(container).find(".ClubhouseHeader__Main_Aside");
    team.teamName = $(headerContainer).find("h1").text().trim();
  
    let centerContainer = $(container).find(".layout__column--1");
    team.squads = [];
    
    // Loop through the squads
    $(centerContainer).find(".Roster__MixedTable").each((i, elem2) => {
        let squadSection = {};
        $(elem2).find(".Table__Scroller .Table__TBODY tr").each((i, elem3) => {
            let player = {};
            let playerUrl = $(elem3).find(".Table__TD:nth-child(1) a");
            if(playerUrl.length > 0){
                player.name = playerUrl.text();
                let playerHref = playerUrl.attr("href").split("/");
                player.id = playerHref[playerHref.length - 2];
                player.slug = playerHref[playerHref.length - 1];
                player.number = $(elem3).find(".Table__TD:nth-child(1) span").text();
            } else {
                player.name = $(elem3).find(".Table__TD:nth-child(1)").text();
                player.number = $(elem3).find(".Table__TD:nth-child(1) span").text();
                player.id = null;
                player.slug = null;
            }
            team.squads.push(player);
        });
    });

    return team;
}

(async () => {
    const allComptetions = await import('../webScrappingESPN/tournsAndTeams/allLeaguesTeams.json', {
        assert: { type: 'json' }
    });
    const allLocalLeagues = await import('../webScrappingESPN/tournsAndTeams/leaguesTeams/allLocalLeagues.json', {
        assert: { type: 'json' }
    });


    // Dynamically import 'p-limit'
    const pLimit = (await import('p-limit')).default;
    let mainArray = allComptetions.default;  // Outer array, e.g., all competitions
    let localLeagues = allLocalLeagues.default;  // Outer array, e.g., all competitions

    // Define concurrency limit for both outer and inner loops
    const limitOuter = pLimit(3);  // Limiting concurrency for outer loop
    const limitInner = pLimit(5);  // Limiting concurrency for inner loop

    async function getPlayers() {
        let allPlayers = [];

        // Outer loop: Loop through the main array (all competitions)
        const outerPromises = mainArray.map((competition, compIndex) => {
            if(localLeagues.includes(competition.leagueName)){
                return limitOuter(async () => {
                    console.log(`Processing competition: ${competition.leagueName}`);
    
                    // Inner loop: Loop through teams inside each competition
                    const innerPromises = competition.teams.map((team, teamIndex) => {
                        return limitInner(async () => {
                            try {
                                const { data } = await axios.get(`https://www.espn.com/soccer/team/squad/_/id/${team.id}/${team.slug}`, {
                                    timeout: 10000000
                                });
                                let teamData = await getTeamSquads(data);
                                allPlayers.push({
                                    competition: competition.name,  // Optional: Track which competition the team belongs to
                                    team: teamData
                                });
                                // Write to file after each request
                                fs.writeFileSync("./news2.json", JSON.stringify(allPlayers, null, 2), "utf8");
                            } catch (err) {
                                console.log(`Error with team ${team.name} in competition ${competition.name}:`, err);
                            }
                        });
                    });
    
                    // Wait for all inner promises (teams in each competition) to resolve
                    await Promise.all(innerPromises);
                });
            }
           
        });

        // Wait for all outer promises (competitions) to resolve
        await Promise.all(outerPromises);
        console.log("All players data has been fetched and saved!");
    }

    // Execute the function
    getPlayers();
})();





// (async () => {
//     const allComptetions = await import('../webScrappingESPN/tournsAndTeams/allLeaguesTeams.json', {
//         assert: { type: 'json' }
//     });
//     const allLocalLeagues = await import('../webScrappingESPN/tournsAndTeams/leaguesTeams/allLocalLeagues.json', {
//         assert: { type: 'json' }
//     });


//     // Dynamically import 'p-limit'
//     const pLimit = (await import('p-limit')).default;
//     let mainArray = allComptetions.default;  // Outer array, e.g., all competitions
//     let localLeagues = allLocalLeagues.default;  // Outer array, e.g., all competitions

//     // Define concurrency limit for both outer and inner loops
//     const limitOuter = pLimit(3);  // Limiting concurrency for outer loop
//     const limitInner = pLimit(5);  // Limiting concurrency for inner loop

//     async function getPlayers() {
//         let allPlayers = [];

//         // Outer loop: Loop through the main array (all competitions)
//         const outerPromises = mainArray.map((competition, compIndex) => {
//             return limitOuter(async () => {
//                 console.log(`Processing competition: ${competition.leagueName}`);

//                 // Inner loop: Loop through teams inside each competition
//                 const innerPromises = competition.teams.map((team, teamIndex) => {
//                     return limitInner(async () => {
//                         try {
//                             const { data } = await axios.get(`https://www.espn.com/soccer/team/squad/_/id/${team.id}/${team.slug}`, {
//                                 timeout: 10000000
//                             });
//                             let teamData = await getTeamSquads(data);
//                             allPlayers.push({
//                                 competition: competition.name,  // Optional: Track which competition the team belongs to
//                                 team: teamData
//                             });
//                             // Write to file after each request
//                             fs.writeFileSync("./news2.json", JSON.stringify(allPlayers, null, 2), "utf8");
//                         } catch (err) {
//                             console.log(`Error with team ${team.name} in competition ${competition.name}:`, err);
//                         }
//                     });
//                 });

//                 // Wait for all inner promises (teams in each competition) to resolve
//                 await Promise.all(innerPromises);
//             });
//         });

//         // Wait for all outer promises (competitions) to resolve
//         await Promise.all(outerPromises);
//         console.log("All players data has been fetched and saved!");
//     }

//     // Execute the function
//     getPlayers();
// })();