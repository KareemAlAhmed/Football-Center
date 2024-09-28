import userReducer from "./user/userReducer.js";
import { combineReducers, createStore } from "redux";
import { applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

import logger from 'redux-logger';
import tournsReducer from "./tourns/tournsReducer.js";
import newsReducer from "./news/newsReducer.js";
import teamsReducer from "./team/teamsReducer.js";
import playerReducer from "./players/playersReducer.js";
import matchesReducer from "./matches/matchesReducer.js" 
// import { composeWithDevTools } from '@redux-devtools/extension';

const rootReducer=combineReducers({
    users:userReducer,
    tourns:tournsReducer,
    news:newsReducer,
    teams:teamsReducer,
    players:playerReducer,
    matches:matchesReducer,
})

const store=createStore(rootReducer, applyMiddleware(thunk,logger));
export default store;