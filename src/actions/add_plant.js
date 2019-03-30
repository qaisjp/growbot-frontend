import { signalAddPlant } from "../plant_mutators";

export default function(plant) {
  return dispatch => {
    dispatch(signalAddPlant(plant));
  };
}
