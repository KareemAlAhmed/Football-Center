const axios = require('axios');

const fs = require('fs');
const cheerio = require('cheerio'); 

const url = `https://www.espn.com`;


async function getTourns() {

    const results = [];
	const { data1 } = await axios.get(url+"/soccer/competitions");
    fs.writeFileSync("./index.html", data1, "utf8");
    const data = fs.readFileSync('./index.html',
        { encoding: 'utf8', flag: 'r' });
    
	const $ = cheerio.load(data);  // new addition
    let teams=[]

    $('.layout.is-split').each(async (i, elem) => {
        const categorieName = $(elem).prev().text();
        $(elem).find(".ContentList__Item").each(async(i2,elem2)=>{
            let leagueLogo=$(elem2).find('a img').attr('src');
            let leagueName=$(elem2).find('.pl3 h2').text();
            let leaguesTeamsLink=$(elem2).find('.pl3 .TeamLinks__Links span:nth-child(2) a').attr("href");
            leagueName = leagueName.replace(/\s+/g, ' ').trim();
            let fistPhaseId=leagueLogo.split(".png")
            fistPhaseId=fistPhaseId[0].split("/")
            let id=parseInt(fistPhaseId[fistPhaseId.length - 1])
            teams.push({id,leagueName,leaguesTeamsLink,leagueLogo})
        })
        
        const categ={
            name:categorieName,
            leagues:teams
        }
        results.push(categ)
        teams=[]
    })
    fs.writeFileSync("./allComptetions.json", JSON.stringify(results), "utf8");
	return results;
}
