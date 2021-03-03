import allReducers from "../modules";
import { combineReducers } from "redux";

const rootReducer = combineReducers(allReducers);

export default rootReducer;
