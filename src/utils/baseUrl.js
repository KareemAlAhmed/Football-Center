export const baseUrl="http://localhost:5000/"
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
export function getDefaultLogo(){
    return "https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&h=80&w=80&scale=crop" 
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