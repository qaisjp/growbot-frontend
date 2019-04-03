import endpoints from "../endpoints";

export default async function (token, summary, recurrences, actions, ephemeral) {
    const scheduleRequest = {
        summary,
        recurrences,
        actions,
        ephemeral,
    };

    return await fetch(endpoints.events, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify(scheduleRequest)
    });
}
