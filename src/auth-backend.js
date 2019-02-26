import endpoints from "./endpoints";

export async function callLoginApi (email, password, callback) {
    let loginRequest = {
        email,
        password
    }
    let response = await fetch(endpoints.login, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginRequest)
    });
    if (response.status === 200) {
        response.json().then(body => {
            console.log(body)
            callback(body.token);
        })
    } else {
        response.text().then(msg => {
            callback("Error: " + msg)
        })
    }
}

export function callLogoutApi(email, callback) {
    setTimeout(() => {
        return callback(null)
    }, 1000)
}