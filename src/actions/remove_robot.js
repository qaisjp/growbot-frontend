import { signalRemoveRobot } from "../robot-mutators";

export default function(robot) {
  return dispatch => {
    dispatch(signalRemoveRobot(robot));
  };
}
