export const baseUrl="http://localhost:5000/"
export const ballImg="https://a.espncdn.com/combiner/i?img=%2Fredesign%2Fassets%2Fimg%2Ficons%2FESPN-icon-soccer.png&w=80&h=80&scale=crop&cquality=40&location=origin"
export const frontBaseUrl="http://localhost:3000"

export function getTeamImage(id){
    return `https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/${id}.png`
}
export function getCompetImage(id){
    return `https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/${id}.png`
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
        return ""
    }
}
