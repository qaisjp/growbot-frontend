import {signalRenamePlant} from "../plant_mutators";

export default function (plant, name) {
    return dispatch => {
        dispatch(signalRenamePlant(plant, name));
    };
}
