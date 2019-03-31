import endpoints from "../endpoints";

export default async function register(email, password, forename, surname) {
    const request = {email, password, forename, surname};

    return await fetch(endpoints.auth_register, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    });
}
