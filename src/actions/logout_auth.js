import {setLoginError, setLoginPending, setLoginSuccess, setLoginToken } from "../auth-mutators";
import { callLogoutApi } from "../auth-backend";

export default function(email) {
    return dispatch => {
        callLogoutApi(email, error => {
            if(!error) {
                dispatch(setLoginSuccess(false))
                dispatch(setLoginPending(false))
                dispatch(setLoginError(null))
                dispatch(setLoginToken(null))
            }
        })
    }
}