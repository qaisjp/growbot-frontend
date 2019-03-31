import {setLoginError, setLoginPending, setLoginSuccess, setLoginToken} from "../auth_mutators";
import refreshToken from "../http/refresh_token";
import API from "../API";

export default function (token) {
    return dispatch => {
        dispatch(setLoginPending(true));

        refreshToken(token).then(result => {
            dispatch(setLoginPending(false));

            const error = result.startsWith("Error");

            if (!error) {
                localStorage.setItem("loginToken", result);
                API.authLogin(result);
                dispatch(setLoginToken(result));
                dispatch(setLoginSuccess(true));
            } else {
                localStorage.removeItem("loginToken");
                dispatch(setLoginError(result));
            }
        });
    };
}
