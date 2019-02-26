//given a robot id add it to the database and global robot array

import {signalAddRobot } from "../robot-mutators";

export default function(robot) {
    return dispatch => {
        dispatch(signalAddRobot(robot))
    }
}