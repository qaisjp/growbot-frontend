import { signalRenameRobot } from "../robot-mutators";

export default function(robot, name) {
  return dispatch => {
    dispatch(signalRenameRobot(robot, name));
  };
}
