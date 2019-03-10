import endpoints from "../endpoints";

export default async function(token, direction, robotId) {
  const directionCommand = {
    direction: direction
  };

  return await fetch(endpoints.robot_move(robotId), {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(directionCommand)
  });
}
