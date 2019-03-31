import endpoints from "../endpoints";

export default async function (token, currentPassword, newPassword) {
    const changePasswordRequest = {
        old: currentPassword,
        new: newPassword
    };

    return await fetch(endpoints.auth_chgpass, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify(changePasswordRequest)
    });
}
