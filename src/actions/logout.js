import {
  setLoginError,
  setLoginPending,
  setLoginSuccess,
  setLoginToken
} from "../auth_mutators";

export default function() {
  return dispatch => {
    localStorage.removeItem("loginToken");
    dispatch(setLoginSuccess(false));
    dispatch(setLoginPending(false));
    dispatch(setLoginError(null));
    dispatch(setLoginToken(null));
  };
}
