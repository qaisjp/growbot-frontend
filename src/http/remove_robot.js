import endpoints from "../endpoints";

export default async function (token, id) {
    return await fetch(endpoints.robot_delete(id), {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + token
        }
    });
}
