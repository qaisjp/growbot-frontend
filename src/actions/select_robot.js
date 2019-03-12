import {signalSelectRobot} from "../robot-mutators";

export default function(robot) {
  return dispatch => {
    dispatch(signalSelectRobot(robot));
  }
}