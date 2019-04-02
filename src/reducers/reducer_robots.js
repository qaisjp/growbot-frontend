import {SET_ROBOTS, ADD_ROBOT, REMOVE_ROBOT, RENAME_ROBOT, SELECT_ROBOT} from "../robot_constants";

export default function (
    state = {
        robots: []
    },
    action
) {
    const {robots} = state;
    let robot = null;
    let idx = -1;
    let robotArray = null;

    switch (action.type) {
        case SET_ROBOTS:
            return Object.assign({}, state, {
                robots: action.robots,
            });
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
