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
  let userId = localStorage.getItem("userId");
  return {
    ...state,
    token: idToken,
    userId: userId,
    error: null,
    loading: false
  };
};

const authSuccess = (state, action) => {
  localStorage.setItem("token", action.idToken);
  localStorage.setItem("userId", action.userId);
  return {
    ...state,
    token: action.idToken,
    userId: action.userId,
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
  return { ...state, token: null, userId: null };
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
