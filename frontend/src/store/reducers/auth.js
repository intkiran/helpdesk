import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  userId: null,
  error: null,
  loading: false
};

const authStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true
  };
};

const setAuthFromCache = (state, action) => {
  let idToken = localStorage.getItem("token");
  let userObj = localStorage.getItem("user");
  return {
    ...state,
    token: idToken,
    user: userObj,
    error: null,
    loading: false
  };
};

const authSuccess = (state, action) => {
  localStorage.setItem("token", action.idToken);
  localStorage.setItem("user", action.user);
  return {
    ...state,
    token: action.idToken,
    user: action.user,
    error: null,
    loading: false
  };
};

const authFail = (state, action) => {
  console.log("auth reducer fail", state, action);
  localStorage.removeItem("token");
  return { ...state, error: action.error.message, loading: false, token: null };
};

const authLogout = state => {
  localStorage.removeItem("token");
  return { ...state, token: null, user: null };
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_AUTHENTICATION_FROM_CACHE:
      return setAuthFromCache(state, action);
    default:
      return state;
  }
};

export default reducer;
