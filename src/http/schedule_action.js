import endpoints from "../endpoints";

export default async function(token, summary, recurrences, actions) {
  const scheduleRequest = {
    summary,
    recurrences,
    actions
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
