import userReducer from "./user/userReducer.js";
import { combineReducers, createStore } from "redux";
import { applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

// import logger from 'redux-logger';

// import { composeWithDevTools } from '@redux-devtools/extension';

const rootReducer=combineReducers({
    users:userReducer
})

const store=createStore(rootReducer, applyMiddleware(thunk));
export default store;