import { signalSelectRobot } from "../robot_mutators";

export default function(robot) {
  return dispatch => {
    dispatch(signalSelectRobot(robot));
  };
}
