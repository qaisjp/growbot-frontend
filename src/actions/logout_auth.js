import {setLoginError, setLoginPending, setLoginSuccess, setLoginToken } from "../auth-mutators";
import { callLogoutApi } from "../auth-backend";

export default function() {
    return dispatch => {
        localStorage.removeItem("loginToken");
        dispatch(setLoginSuccess(false))
        dispatch(setLoginPending(false))
        dispatch(setLoginError(null))
        dispatch(setLoginToken(null))
    }
}