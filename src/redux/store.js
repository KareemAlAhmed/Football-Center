import userReducer from "./user/userReducer.js";
import { combineReducers, createStore } from "redux";
import { applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

import logger from 'redux-logger';
import tournsReducer from "./tourns/tournsReducer.js";

// import { composeWithDevTools } from '@redux-devtools/extension';

const rootReducer=combineReducers({
    users:userReducer,
    tourns:tournsReducer
})

const store=createStore(rootReducer, applyMiddleware(thunk,logger));
export default store;