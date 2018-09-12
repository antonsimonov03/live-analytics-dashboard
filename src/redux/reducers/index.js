import { combineReducers } from "redux";
import { temperature, airPressure, humidity } from "../DataReducer/reducers";

export const reducers = combineReducers({ temperature, airPressure, humidity });
