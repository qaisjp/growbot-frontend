import { ADD_ROBOT, REMOVE_ROBOT } from "../robot-constants";

export default function(state = {
    robots: []
}, action) {
    let robots = {state}

    switch(action.type) {
        case ADD_ROBOT:
            robots.push(action.robot)
            return robots
        case REMOVE_ROBOT:
            robots.remove(action.robot)
            return robots
        default:
            return state
    }
}