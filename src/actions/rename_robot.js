import {signalRenameRobot} from "../robot_mutators";

export default function (robot, name) {
    return dispatch => {
        dispatch(signalRenameRobot(robot, name));
    };
}
