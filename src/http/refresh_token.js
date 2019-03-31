import endpoints from "../endpoints";

export default async function (token) {
    const response = await fetch(endpoints.auth_refresh, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }
    });

    const body = await response.json();

    if (response.status !== 200) {
        return "Error: " + body.message;
    }

    return body.token;
}
