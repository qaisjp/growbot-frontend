import endpoints from "../endpoints";

export default async function(token, id, name) {
  const renameRobotRequest = {
    name
  };

  return await fetch(endpoints.plants + "/" + id, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + token
    },
    body: JSON.stringify(renameRobotRequest)
  });
}
