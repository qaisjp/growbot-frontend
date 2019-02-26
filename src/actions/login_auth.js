import { setLoginError, setLoginPending, setLoginSuccess, setLoginToken } from "../auth-mutators";
import { callLoginApi } from '../auth-backend'

export default function(email, password) {
    return dispatch => {
        dispatch(setLoginPending(true));
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(null));
        dispatch(setLoginToken(null));

        callLoginApi(email, password, attribute => {
            dispatch(setLoginPending(false));

            let error = attribute.startsWith("Error");
            console.log(error)

            if (!error) {
                dispatch(setLoginToken(attribute));
                dispatch(setLoginSuccess(true));
            } else {
                dispatch(setLoginError(attribute));
            }
        });
    }
}