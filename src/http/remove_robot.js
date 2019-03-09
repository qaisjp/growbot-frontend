import endpoints from "../endpoints";

export default async function(token, id) {
    const response = await fetch(endpoints.robot_delete(id), {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + token
        },
    });

    return response;
}