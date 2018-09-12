import { temperature } from "../../redux/DataReducer/reducers";
import { TEMPERATURE_ACTION } from "../../redux/DataReducer/types";

describe("Temperature Reducer", () => {
  it("should return the initial state", () => {
    expect(temperature(undefined, {})).toEqual([]);
  });
  it("should handle TEMPERATURE_ACTION", () => {
    expect(
      temperature([123, 456], { type: TEMPERATURE_ACTION, payload: "N/A" })
    ).toEqual(["N/A", 123, 456]);
  });
});
