import {setLoginError, setLoginPending, setLoginSuccess, setLoginToken} from "../auth_mutators";
import callLoginApi from "../http/login";
import API from "../API";

export default function (email, password) {
    return dispatch => {
        dispatch(setLoginPending(true));
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(null));

        callLoginApi(email, password, attribute => {
            dispatch(setLoginPending(false));

            const error = attribute.startsWith("Error");

            if (!error) {
                localStorage.setItem("loginToken", attribute);
                API.auth_login(attribute);
                dispatch(setLoginToken(attribute));
                dispatch(setLoginSuccess(true));
            } else {
                localStorage.removeItem("loginToken");
                dispatch(setLoginError(attribute));
            }
        });
    };
}
