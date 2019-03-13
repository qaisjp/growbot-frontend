import { signalRenamePlant } from "../plant-mutators";

export default function(plant, name) {
  return dispatch => {
    dispatch(signalRenamePlant(plant, name));
  };
}
