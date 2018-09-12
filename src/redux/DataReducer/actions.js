import {
  TEMPERATURE_ACTION,
  AIR_PRESSURE_ACTION,
  HUMIDITY_ACTION
} from "./types";

export const temperatureChange = temperature => ({
  type: TEMPERATURE_ACTION,
  payload: temperature
});

export const airPressureChange = airPressure => ({
  type: AIR_PRESSURE_ACTION,
  payload: airPressure
});

export const humidityChange = humidity => ({
  type: HUMIDITY_ACTION,
  payload: humidity
});
