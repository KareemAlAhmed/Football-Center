import { GET_MATCH_LINEUP, GET_MATCH_LINEUP_FAILED, GET_MATCH_LINEUP_SUCCESS, GET_MATCH_PREVIEW, GET_MATCH_PREVIEW_FAILED, GET_MATCH_PREVIEW_SUCCESS, GET_MATCH_STATS, GET_MATCH_STATS_FAILED, GET_MATCH_STATS_SUCCESS, GET_PRE_MATCH_SUMMARY, GET_PRE_MATCH_SUMMARY_FAILED, GET_PRE_MATCH_SUMMARY_SUCCESS } from "./matchesActionType";



const initalState={
    loading:false,
    newsError:"",
    currentMatchSummary:sessionStorage.getItem("currentMatchSummary") !=null ? JSON.parse(sessionStorage.getItem("currentMatchSummary")) :{},
    currentMatchStats:sessionStorage.getItem("currentMatchStats") !=null ? JSON.parse(sessionStorage.getItem("currentMatchStats")) :{},
    currentMatchPreview:sessionStorage.getItem("currentMatchPreview") !=null ? JSON.parse(sessionStorage.getItem("currentMatchPreview")) :{},
    currentMatchLineUp:sessionStorage.getItem("currentMatchLineUp") !=null ? JSON.parse(sessionStorage.getItem("currentMatchLineUp")) :{},

}

const matchesReducer=(state=initalState,action)=>{
    switch(action.type){
       
        case GET_PRE_MATCH_SUMMARY:
            return {
                ...state,
                loading:true,
                newsError:""
            }
        case GET_PRE_MATCH_SUMMARY_SUCCESS:
            return {
                ...state,
                loading:false,
                currentMatchSummary:action.payload
            }
        case GET_PRE_MATCH_SUMMARY_FAILED:
            return {
                ...state,
                loading:false,
                currentMatchSummary:{},
                newsError:action.payload,
            }
        case GET_MATCH_STATS:
            return {
                ...state,
                loading:true,
                newsError:""
            }
        case GET_MATCH_STATS_SUCCESS:
            return {
                ...state,
                loading:false,
                currentMatchStats:action.payload
            }
        case GET_MATCH_STATS_FAILED:
            return {
                ...state,
                loading:false,
                currentMatchStats:{},
                newsError:action.payload,
            }
        case GET_MATCH_PREVIEW:
            return {
                ...state,
                loading:true,
                newsError:""
            }
        case GET_MATCH_PREVIEW_SUCCESS:
            return {
                ...state,
                loading:false,
                currentMatchPreview:action.payload
            }
        case GET_MATCH_PREVIEW_FAILED:
            return {
                ...state,
                loading:false,
                currentMatchPreview:{},
                newsError:action.payload,
            }
        case GET_MATCH_LINEUP:
            return {
                ...state,
                loading:true,
                newsError:""
            }
        case GET_MATCH_LINEUP_SUCCESS:
            return {
                ...state,
                loading:false,
                currentMatchLineUp:action.payload
            }
        case GET_MATCH_LINEUP_FAILED:
            return {
                ...state,
                loading:false,
                currentMatchLineUp:{},
                newsError:action.payload,
            }
        
        default: return state
    }
}

export default matchesReducer;