import endpoints from "../endpoints";

export default async function(token, id) {
  return await fetch(endpoints.plants + "/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token
    }
  });
}
