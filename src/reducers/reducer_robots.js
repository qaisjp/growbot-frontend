import {
  ADD_ROBOT,
  REMOVE_ROBOT,
  SELECT_ROBOT,
  RENAME_ROBOT
} from "../robot-constants";

export default function(
  state = {
    robots: [],
    selectedRobot: {
      id: -1
    }
  },
  action
) {
  const { robots } = state;
  let robot = null;
  let idx = -1;
  let robotArray = null;

  switch (action.type) {
    case ADD_ROBOT:
      robot = action.robot;
      robotArray = robots.slice();
      robotArray.push(robot);
      return Object.assign({}, state, {
        robots: robotArray
      });
    case REMOVE_ROBOT:
      robot = action.robot;
      idx = robots.map(x => x.id).indexOf(robot.id);
      robotArray = robots.slice();
      delete robotArray[idx];
      return Object.assign({}, state, {
        robots: robotArray
      });
    case SELECT_ROBOT:
      return Object.assign({}, state, {
        selectedRobot: action.robot
      });
    case RENAME_ROBOT:
      robot = action.robot;
      idx = robots.map(x => x.id).indexOf(robot.id);
      robotArray = robots.slice();
      robotArray[idx].title = action.name;
      return Object.assign({}, state, {
        robots: robotArray
      });
    default:
      return state;
  }
}
