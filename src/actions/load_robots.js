//given an array of robots, set the global state

import { signalAddRobot } from "../robot-mutators";

export default function(robots) {
    return dispatch => {
        robots.forEach(robot => {
            dispatch(signalAddRobot(robot))
        })
    }
}