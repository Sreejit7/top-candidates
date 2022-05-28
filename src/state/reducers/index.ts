import { combineReducers } from "redux";
import { candidatesReducer } from "./candiadateReducer";

const reducers = combineReducers({
  candidates: candidatesReducer
});

export type State = ReturnType<typeof reducers>;

export default reducers;