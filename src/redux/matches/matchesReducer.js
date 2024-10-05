import { GET_MATCH_COMMENTARY, GET_MATCH_COMMENTARY_FAILED, GET_MATCH_COMMENTARY_SUCCESS, GET_MATCH_LINEUP, GET_MATCH_LINEUP_FAILED, GET_MATCH_LINEUP_SUCCESS, GET_MATCH_PREVIEW, GET_MATCH_PREVIEW_FAILED, GET_MATCH_PREVIEW_SUCCESS, GET_MATCH_REPORT, GET_MATCH_REPORT_FAILED, GET_MATCH_REPORT_SUCCESS, GET_MATCH_STATS, GET_MATCH_STATS_FAILED, GET_MATCH_STATS_SUCCESS, GET_MATCH_TEST, GET_MATCH_TEST_FAILED, GET_MATCH_TEST_SUCCESS, GET_PRE_MATCH_SUMMARY, GET_PRE_MATCH_SUMMARY_FAILED, GET_PRE_MATCH_SUMMARY_SUCCESS } from "./matchesActionType";



const initalState={
    loading:false,
    newsError:"",
    currentMatchSummary:sessionStorage.getItem("currentMatchSummary") !=null ? JSON.parse(sessionStorage.getItem("currentMatchSummary")) :{},
    currentMatchStats:sessionStorage.getItem("currentMatchStats") !=null ? JSON.parse(sessionStorage.getItem("currentMatchStats")) :{},
    currentMatchPreview:sessionStorage.getItem("currentMatchPreview") !=null ? JSON.parse(sessionStorage.getItem("currentMatchPreview")) :{},
    currentMatchLineUp:sessionStorage.getItem("currentMatchLineUp") !=null ? JSON.parse(sessionStorage.getItem("currentMatchLineUp")) :{},
    currentMatchReport:sessionStorage.getItem("currentMatchReport") !=null ? JSON.parse(sessionStorage.getItem("currentMatchReport")) :{},
    currentMatchCommentary:sessionStorage.getItem("currentMatchCommentary") !=null ? JSON.parse(sessionStorage.getItem("currentMatchCommentary")) :{},
    // currentMatchTest:sessionStorage.getItem("currentMatchTest") !=null ? JSON.parse(sessionStorage.getItem("currentMatchTest")) :{},

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
        case GET_MATCH_REPORT:
            return {
                ...state,
                loading:true,
                newsError:""
            }
        case GET_MATCH_REPORT_SUCCESS:
            return {
                ...state,
                loading:false,
                currentMatchReport:action.payload
            }
        case GET_MATCH_REPORT_FAILED:
            return {
                ...state,
                loading:false,
                currentMatchReport:{},
                newsError:action.payload,
            }
        case GET_MATCH_COMMENTARY:
            return {
                ...state,
                loading:true,
                newsError:""
            }
        case GET_MATCH_COMMENTARY_SUCCESS:
            return {
                ...state,
                loading:false,
                currentMatchCommentary:action.payload
            }
        case GET_MATCH_COMMENTARY_FAILED:
            return {
                ...state,
                loading:false,
                currentMatchCommentary:{},
                newsError:action.payload,
            }
        case GET_MATCH_TEST:
            return {
                ...state,
                loading:true,
                newsError:""
            }
        case GET_MATCH_TEST_SUCCESS:
            return {
                ...state,
                loading:false,
                currentMatchSummary:action.payload
            }
        case GET_MATCH_TEST_FAILED:
            return {
                ...state,
                loading:false,
                currentMatchSummary:{},
                newsError:action.payload,
            }
        
        default: return state
    }
}

export default matchesReducer;