import * as actions from "../../redux/DataReducer/actions";
import * as types from "../../redux/DataReducer/types";

describe("actions", () => {
  it("should add new Temperature value", () => {
    const temperature = 123;
    const expectedAction = {
      type: types.TEMPERATURE_ACTION,
      payload: temperature
    };
    expect(actions.temperatureChange(temperature)).toEqual(expectedAction);
  });
  it("should add new Air Pressure value", () => {
    const airPressure = 123;
    const expectedAction = {
      type: types.AIR_PRESSURE_ACTION,
      payload: airPressure
    };
    expect(actions.airPressureChange(airPressure)).toEqual(expectedAction);
  });
  it("should add new Humidity value", () => {
    const humidity = 123;
    const expectedAction = {
      type: types.HUMIDITY_ACTION,
      payload: humidity
    };
    expect(actions.humidityChange(humidity)).toEqual(expectedAction);
  });
});
