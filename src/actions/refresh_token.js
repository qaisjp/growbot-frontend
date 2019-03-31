import {setLoginError, setLoginPending, setLoginSuccess, setLoginToken} from "../auth_mutators";
import refreshToken from "../http/refresh_token";

export default function (token) {
    return dispatch => {
        dispatch(setLoginPending(true));

        refreshToken(token).then(result => {
            dispatch(setLoginPending(false));

            const error = result.startsWith("Error");

            if (!error) {
                localStorage.setItem("loginToken", result);
                dispatch(setLoginToken(result));
                dispatch(setLoginSuccess(true));
            } else {
                localStorage.removeItem("loginToken");
                dispatch(setLoginError(result));
            }
        });
    };
}
