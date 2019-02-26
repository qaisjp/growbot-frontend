import { setLoginError, setLoginPending, setLoginSuccess, setLoginToken } from "../auth-mutators";
import { callLoginApi } from '../auth-backend'

export default function(email, password) {
    return dispatch => {
        dispatch(setLoginPending(true));
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(null));

        callLoginApi(email, password, attribute => {
            dispatch(setLoginPending(false));

            let error = attribute.startsWith("Error");

            if (!error) {
                localStorage.setItem("loginToken", attribute);
                dispatch(setLoginToken(attribute));
                dispatch(setLoginSuccess(true));
            } else {
                localStorage.removeItem("loginToken");
                dispatch(setLoginError(attribute));
            }
        });
    }
}