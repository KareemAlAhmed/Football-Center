export const baseUrl="http://localhost:5000/"
export const ballImg="https://a.espncdn.com/combiner/i?img=%2Fredesign%2Fassets%2Fimg%2Ficons%2FESPN-icon-soccer.png&w=80&h=80&scale=crop&cquality=40&location=origin"

export function getTeamImage(id){
    return `https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/${id}.png`
}
export function getCompetImage(id){
    return `https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/${id}.png`
}
