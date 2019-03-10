import {
  SET_LOGIN_ERROR,
  SET_LOGIN_SUCCESS,
  SET_LOGIN_PENDING,
  SET_LOGIN_TOKEN
} from "../auth-constants";

export default function(
  state = {
    isLoginSuccess: false,
    isLoginPending: false,
    loginError: null,
    loginToken: null
  },
  action
) {
  switch (action.type) {
    case SET_LOGIN_PENDING:
      return Object.assign({}, state, {
        isLoginPending: action.isLoginPending
      });

    case SET_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoginSuccess: action.isLoginSuccess
      });
    case SET_LOGIN_ERROR:
      return Object.assign({}, state, {
        loginError: action.loginError
      });
    case SET_LOGIN_TOKEN:
      return Object.assign({}, state, {
        loginToken: action.loginToken
      });
    default:
      return state;
  }
}
