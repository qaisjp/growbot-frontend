import endpoints from "../endpoints";

export default async function(token, serialKey, title) {
  const addRobotRequest = {
    robot_id: serialKey,
    title: title
  };

  return await fetch(endpoints.robots_register, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify(addRobotRequest)
  });
}
