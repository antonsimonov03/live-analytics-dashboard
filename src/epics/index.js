import "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { TEMPERATURE_ACTION } from "../redux/DataReducer/types";
import { temperatureChange } from "../redux/DataReducer/actions";

const temperatureEpic = action$ => {
  console.log("object");
  action$.pipe(ofType(TEMPERATURE_ACTION));
};

export default combineEpics(temperatureEpic);
