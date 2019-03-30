export default function(id, reduxPlants) {
  const plants = reduxPlants.filter(plant => plant.id === id);
  return plants.length > 0 ? plants.pop().name : "Plant not in database!";
};