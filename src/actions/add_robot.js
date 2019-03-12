import { signalAddRobot } from "../robot-mutators";

export default function(robot) {
  return dispatch => {
    dispatch(signalAddRobot(robot));
  };
}
