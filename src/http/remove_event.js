import endpoints from "../endpoints";

export default async function(token, id) {
  return await fetch(endpoints.events + "/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token
    }
  });
}