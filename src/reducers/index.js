import { combineReducers } from "redux";
import AuthReducer from "./reducer_auth";
import DrawerReducer from "./reducer_drawer";
import RobotsReducer from './reducer_robots';

const rootReducer = combineReducers({
  auth: AuthReducer,
  drawer: DrawerReducer,
  robotState: RobotsReducer
});

export default rootReducer;
