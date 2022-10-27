import { setUserToken } from "./user";
import * as types from "../action-types";
import { reqLogin } from "@/api/login";
export const login = (username, password) => (dispatch) => {
  return new Promise((resolve, reject) => {
    reqLogin({ username: username.trim(), password: password })
      .then((response) => {
        const token = response.text;
        dispatch(setUserToken(token));
        resolve(response.text);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const logout = () => dispatch => {
  dispatch({
    type: types.USER_RESET_USER,
  });
};
