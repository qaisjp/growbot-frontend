import { ADD_PLANT, REMOVE_PLANT, RENAME_PLANT } from "./plant-constants";

export function signalAddPlant(plant) {
  return {
    type: ADD_PLANT,
    plant
  };
}

export function signalRemovePlant(plant) {
  return {
    type: REMOVE_PLANT,
    plant
  };
}

export function signalRenamePlant(plant, name) {
  return {
    type: RENAME_PLANT,
    plant,
    name
  };
}
