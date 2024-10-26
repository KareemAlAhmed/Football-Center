// export const baseUrl="http://localhost:5000/"
export const baseUrl="https://football-center-server.onrender.com/"
export const ballImg="https://a.espncdn.com/combiner/i?img=%2Fredesign%2Fassets%2Fimg%2Ficons%2FESPN-icon-soccer.png&w=80&h=80&scale=crop&cquality=40&location=origin"
export const frontBaseUrl="http://localhost:3000"

export function getTeamImage(id){
    return `https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/${id}.png`
}
export function getCompetImage(id){
    return `https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/${id}.png`
}
export function getCompetLink(competId,competSlug){
    return `/competetion/_/id/${competId}/${competSlug}`
}
export function getPlayerLink(playerId,playerSlug){
    return `/player/_/id/${playerId}/${playerSlug}`
}
export function getTeamLink(teamId,teamSlug){
    return `/team/_/id/${teamId}/${teamSlug}`
}
export function getArticleLink(articleId,articleSlug,articleType){
    if(articleType==="story"){
        return `/article/${articleId}/${articleSlug}`
    }else{
        return `/match/_/${articleId}/${articleSlug}/summary`
    }
}
export function getGameLink(gameId,gameSlug){
    return `/match/_/${gameId}/${gameSlug}/summary`  
}
export function getGameStaticsLink(gameId,gameSlug){
    return `/match/_/${gameId}/${gameSlug}/MatchStats`  
}
export function getDefaultLogo(){
    return "https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png" 
}
export function getDefaultTeamOrCompetLogo(){
    return "https://secure.espncdn.com/combiner/i?img=/i/teamlogos/default-team-logo-500.png" 
}
export function getEmptySlutLogo(){
    return "https://image-service.onefootball.com/transform?w=96&dpr=2&image=https://images.onefootball.com/cw/icons/my-interests-empty-dark.svg" 
}
export function getDefaultArticleLogo(){
    return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLeRqpPmb4YgGGOxG092HSuL_AT39ubcWwnEVB3pPDcL7HwApHitVOYQZJ1ifsJ2XytPM&usqp=CAU" 
}
export function getLocalTime(oldTime){
    let time=oldTime
    let listOftime=time.split(":")
    if(parseInt(listOftime[0]) <= 5){
        let newTimeRep=listOftime[1].split(" ")
        listOftime[1]=newTimeRep.join(" ")
        let diff= 5 - parseInt(listOftime[0])
        let newTime=12 - diff
        listOftime[0]=newTime
        time=listOftime.join(":")
    }else{
        let newTimeRep=listOftime[1].split(" ")
        if(parseInt(listOftime[0]) !== 12){
                if(newTimeRep[1] === "PM"){
                    newTimeRep[1] ="AM"
                }else{
                    newTimeRep[1] ="PM"
                }
        }
        listOftime[1]=newTimeRep.join(" ")
        listOftime[0]=parseInt(listOftime[0]) - 5
        time=listOftime.join(":")
    }
    return time
}

export function generateShortName(teamName) {
    // Split the team name into words
    if(teamName){
        const words = teamName.split(' ');

        let shortName = '';
    
        if (words.length === 2) {
            // For two-word names, take the first letter of the first word and the first two letters of the second word
            shortName = words[0].charAt(0).toUpperCase() + words[1].substring(0, 2).toUpperCase();
        } else if (words.length >= 3) {
            // For three or more words, take the first letter of each of the first three words
            shortName = words.slice(0, 3).map(word => word.charAt(0).toUpperCase()).join('');
        } else {
            // For single-word names, take the first three letters
            shortName = words[0].substring(0, 3).toUpperCase();
        }
    
        return shortName;
    }else{
        return teamName
    }

}