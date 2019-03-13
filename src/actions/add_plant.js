import { signalAddPlant } from "../plant-mutators";

export default function(plant) {
  return dispatch => {
    dispatch(signalAddPlant(plant));
  };
}
