export function callLoginApi(email, password, callback) {
    setTimeout(() => {
        if (email === 'raees.aamir@ed.ac.uk' && password === 'ayylmao') {
            return callback(null);
        } else {
            return callback(new Error('Invalid email and password'));
        }
    }, 1000);
}

export function callLogoutApi(email, callback) {
    setTimeout(() => {
        return callback(null)
    }, 1000)
}