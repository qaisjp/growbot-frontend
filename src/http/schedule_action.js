import endpoints from "../endpoints";

export default async function(token, recurrences, actions) {
  const scheduleRequest = {
    recurrences, actions
  };

  console.log(scheduleRequest);

  return await fetch(endpoints.events, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify(scheduleRequest)
  });
}