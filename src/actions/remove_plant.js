import {signalRemovePlant} from "../plant_mutators";

export default function (plant) {
    return dispatch => {
        dispatch(signalRemovePlant(plant));
    };
}
