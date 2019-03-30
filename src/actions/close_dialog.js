import { setLoginError } from "../auth_mutators";

export default function() {
  return dispatch => {
    dispatch(setLoginError(null));
  };
}
