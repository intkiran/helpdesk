import * as actionTypes from "./actionTypes";
import { axiosInstance as axios } from "../../services/axiosInstance";
import { UserService } from "../../services/";

let firstTry = true;
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  window.location.reload();
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const auth = (email, password) => {
  return async dispatch => {
    dispatch(authStart());
    const payload = {
      username: email,
      password: password
    };
    console.log("Actions auth login payload", payload);

    UserService.login(payload)
      .then(response => {
        console.log("Actions auth login success", response);
        dispatch(
          authSuccess(response.headers.authorization, response.data.localId)
        );
      })
      .catch(error => {
        console.log("Actions auth login error", error);

        if (firstTry) {
          firstTry = false;
          dispatch(auth(email, password));
        }
        dispatch(authFail(error));
      });

    /* try {
      const response = await UserService.login(payload);
      console.log("Actions auth login success", response);
    } catch (error) {
      console.log("Actions auth login error", error);
    }*/
    /*  axios
      .post("/api/users/login", authData)
      .then(response => {
        console.log(response);
        dispatch(
          authSuccess(response.headers.authorization, response.data.localId)
        );
      })
      .catch(err => {
        if (firstTry) {
          firstTry = false;
          dispatch(auth(email, password));
        }
        dispatch(authFail(err));
      }); */
  };
};

export const setAuthenticationFromCache = () => {
  return {
    type: actionTypes.SET_AUTHENTICATION_FROM_CACHE
  };
};

export const isLoggedIn = () => {
  return dispatch => {
    axios
      .get("/api/is-loggedin")
      .then(response => {
        console.log(response);
      })
      .catch(() => {
        dispatch(logout());
      });
  };
};
