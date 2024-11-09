const allLeagues=require("../allComptetions.json")
async function scrapeSite() {
    let teams2=[]

    allLeagues[4].leagues.map(async(ele)=>{
        try{
            const { data } = await axios.get(ele.leaguesTeamsLink,{timeout:30000});
            const $ = cheerio.load(data);  // new addition       
            let team={}
            $('.layout.is-split .ContentList__Item').each(async (i, elem) => {
                        let teamName=$(elem).find('.pl3 h2').text();
                        console.log(teamName)
                        console.log(ele.leagueName)
                        let teamLink=$(elem).find('a ').attr('href');
                        let teamId;
                        if(teamLink){
                            let id=teamLink.split("/")
                            teamId=id[id.length - 2]
                            team.id=parseInt(teamId)
                        }else{
                            team.id=null
                            teamId=null
                        }                    
                        team.name=teamName
                        team.leagueName=ele.leagueName 
                        team.logo=`https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/${teamId == null ? 'default-team-logo-500' : teamId}.png`
                        team.LegaueID=ele.id
                        teams2.push(team)
                        team={}
            })
            fs.writeFileSync("./teams1.json", JSON.stringify(teams2), "utf8");
            
        }catch(error){
            console.error(`Error fetching data for ${ele.leagueName}:`, error);
  
        }
	return teams2;
})
}
