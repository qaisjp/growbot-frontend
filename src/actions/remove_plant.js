import { signalRemovePlant } from "../plant-mutators";

export default function(plant) {
  return dispatch => {
    signalRemovePlant(plant);
  };
}
