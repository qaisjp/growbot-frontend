import { ADD_ROBOT, REMOVE_ROBOT, SELECT_ROBOT, RENAME_ROBOT } from "./robot-constants";

export function signalAddRobot(robot) {
  return {
    type: ADD_ROBOT,
    robot
  }
}

export function signalRemoveRobot(robot) {
  return {
    type: REMOVE_ROBOT,
    robot
  }
}

export function signalSelectRobot(robot) {
  return {
    type: SELECT_ROBOT,
    robot
  }
}

export function signalRenameRobot(robot, name) {
  return {
    type: RENAME_ROBOT,
    robot, name
  }
}