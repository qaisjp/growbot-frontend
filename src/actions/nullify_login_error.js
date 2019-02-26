import {setLoginError} from "../auth-mutators";

export default function() {
    return dispatch => {
        dispatch(setLoginError(null))
    }
}