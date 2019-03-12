import { ADD_ROBOT, REMOVE_ROBOT, SELECT_ROBOT, RENAME_ROBOT } from "../robot-constants";

export default function(state = {
  robots: [],
  selectedRobot: {
    id: -1
  }
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
    case SELECT_ROBOT:
      return Object.assign({}, state, {
        selectedRobot: action.robot
      });
    case RENAME_ROBOT:
      let i = -1;
      for(i = 0; i < robots.length; i++) {
        const robot = robots[i];
        if(robot.id === action.robot.id) {
          break;
        }
      }
      console.log(i);
      let robotArray = robots.slice();
      console.log(robotArray[i]);
      robotArray[i].title = action.name;
      return Object.assign({}, state, {
        robots: robotArray
      });
    default:
      return state
  }
}