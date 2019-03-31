import endpoints from "../endpoints";

export default async function (token, name) {
    const addPlantRequest = {
        name
    };

    return await fetch(endpoints.plants, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify(addPlantRequest)
    });
}
