import endpoints from "../endpoints";

export default async function(token, id, title) {
  const renameRobotRequest = {
    key: "title",
    value: title
  };

  return await fetch(endpoints.robot_settings(id), {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + token
    },
    body: JSON.stringify(renameRobotRequest)
  });
}
