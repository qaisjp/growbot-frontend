import {signalAddRobot} from "../robot_mutators";

export default function (robot) {
    return dispatch => {
        dispatch(signalAddRobot(robot));
    };
}
