import endpoints from "../endpoints";

export default async function(token, query) {
  const queryString = query ? "?" + query : "";

  const response = await fetch(endpoints.logs + queryString, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    }
  });
  const body = await response.text();

  if (response.status === 200) {
    return JSON.parse(body);
  }

  return new Error(body);
}
