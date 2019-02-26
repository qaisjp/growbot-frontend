import { setLoginError, setLoginPending, setLoginSuccess, setLoginToken } from "../auth-mutators";
import { refreshToken } from '../auth-backend'

export default function(token) {
    return dispatch => {
        dispatch(setLoginPending(true));
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(null));
        dispatch(setLoginToken(null));

        refreshToken(token).then(result => {
            dispatch(setLoginPending(false));

            let error = result.startsWith("Error");
            console.log(error)

            if (!error) {
                localStorage.setItem("loginToken", result);
                dispatch(setLoginToken(result));
                dispatch(setLoginSuccess(true));
            } else {
                localStorage.removeItem("loginToken");
                dispatch(setLoginError(result));
            }
        });
    }
}
