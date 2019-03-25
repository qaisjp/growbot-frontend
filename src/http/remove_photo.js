import endpoints from "../endpoints";

export default async function(token, id) {
  return await fetch(endpoints.photos + "/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token
    }
  });
}