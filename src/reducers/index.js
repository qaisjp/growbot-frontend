import {combineReducers} from "redux";
import AuthReducer from "./reducer_auth";
import DrawerReducer from "./reducer_drawer";
import RobotsReducer from "./reducer_robots";
import PlantsReducer from "./reducer_plant";

const rootReducer = combineReducers({
    auth: AuthReducer,
    drawer: DrawerReducer,
    robotState: RobotsReducer,
    plantState: PlantsReducer
});

export default rootReducer;
