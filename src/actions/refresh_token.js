import { setLoginError, setLoginPending, setLoginSuccess, setLoginToken } from "../auth-mutators";
import refreshToken from '../http/refresh_token'

export default function(token) {
    return dispatch => {
        dispatch(setLoginPending(true));

        refreshToken(token).then(result => {
            dispatch(setLoginPending(false));

            console.log("old", token, "new", result)

            let error = result.startsWith("Error");

            if (!error) {
                localStorage.setItem("loginToken", result);
                dispatch(setLoginToken(result));
                dispatch(setLoginSuccess(true));
            } else {
                console.log("refresh_auth error: ", result)
                localStorage.removeItem("loginToken");
                dispatch(setLoginError(result));
            }
        });
    }
}
