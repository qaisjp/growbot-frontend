import endpoints from "../endpoints";

export default async function (token) {
    const response = await fetch(endpoints.photos, {
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
