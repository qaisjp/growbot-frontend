import { ADD_ROBOT, REMOVE_ROBOT } from "../robot-constants";

const initialRobotsList = [];

export default function(state = {
  robots: initialRobotsList
}, action) {

  const {robots} = state;

  switch(action.type) {
    case ADD_ROBOT:
      return Object.assign({}, state, {
        robots: [...robots, action.robot]
      });
    case REMOVE_ROBOT:
      let newState = Object.assign({}, state);
      delete newState.robots[action.robot.id];
      return newState;
    default:
      return state
  }
}