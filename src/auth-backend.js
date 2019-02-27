import endpoints from "./endpoints";

export async function refreshToken(token) {
    let response = await fetch(endpoints.auth_refresh, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    });

    const body = await response.json();

    if (response.status !== 200) {
        return "Error: " + body.message
    }

    return body.token;
}

export async function callLoginApi (email, password, callback) {
    let loginRequest = {
        email,
        password
    }
    let response = await fetch(endpoints.auth_login, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginRequest)
    });
    if (response.status === 200) {
        response.json().then(body => {
            callback(body.token);
        })
    } else {
        response.text().then(msg => {
            callback("Error: " + msg)
        })
    }
}
