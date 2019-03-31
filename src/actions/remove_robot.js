import {signalRemoveRobot} from "../robot_mutators";

export default function (robot) {
    return dispatch => {
        dispatch(signalRemoveRobot(robot));
    };
}
