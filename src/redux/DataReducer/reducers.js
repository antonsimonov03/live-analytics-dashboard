import {
  TEMPERATURE_ACTION,
  AIR_PRESSURE_ACTION,
  HUMIDITY_ACTION
} from "./types";

const initialState = [];

export const temperature = (state = initialState, action = {}) => {
  switch (action.type) {
    case TEMPERATURE_ACTION:
      return [action.payload, ...state];
    default:
      return state;
  }
};
export const airPressure = (state = initialState, action = {}) => {
  switch (action.type) {
    case AIR_PRESSURE_ACTION:
      return [action.payload, ...state];
    default:
      return state;
  }
};
export const humidity = (state = initialState, action = {}) => {
  switch (action.type) {
    case HUMIDITY_ACTION:
      return [action.payload, ...state];
    default:
      return state;
  }
};
