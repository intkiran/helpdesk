import * as actionTypes from "../actions/actionTypes";

const initialState = {
  users: [],
  error: null,
  loading: false
};
const startUpdate = state => {
  return {
    ...state,
    loading: false,
    success: false,
    users: [],
    error: null
  };
};
const fetchUsersStart = (state, action) => {
  return {
    ...state,
    error: null,
    users: [],
    loading: true,
    success: false
  };
};

const fetchUsersSuccess = (state, action) => {
  console.log("Kiran user reducer success", state, action);

  return {
    ...state,
    error: null,
    loading: false,
    success: true,
    users: action.data
  };
};

const fetchUsersFail = (state, action) => {
  return { ...state, error: action.error.message, loading: false };
};
const newUserStart = (state, action) => {
  return {
    ...state,
    user: {
      username: "",
      password: "",
      role: ""
    },
    error: null,
    loading: true,
    success: false
  };
};

const newUserSuccess = (state, action) => {
  return {
    ...state,
    user: {
      username: "",
      password: "",
      role: ""
    },
    error: null,
    loading: false,
    success: true
  };
};

const newUserFail = (state, action) => {
  return {
    ...state,
    user: {
      username: "",
      password: "",
      role: ""
    },
    error: action.error,
    loading: false,
    success: false
  };
};
const createUserStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false,
    success: false
  };
};

const createUserSuccess = (state, action) => {
  let users = [...state.users];
  users.unshift(action.data);
  let newInsertedUses = [...state.newInsertedUses];
  newInsertedUses.push(action.data);

  return {
    ...state,
    users: users,
    loading: false,
    success: true,
    newInsertedUses: newInsertedUses
  };
};

const createUserFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  };
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USERS_START:
      return fetchUsersStart(state, action);
    case actionTypes.FETCH_USERS_SUCCESS:
      return fetchUsersSuccess(state, action);
    case actionTypes.FETCH_USERS_FAIL:
      return fetchUsersFail(state, action);
    case actionTypes.CREATE_USER_START:
      return createUserStart(state, action);
    case actionTypes.CREATE_USER_SUCCESS:
      return createUserSuccess(state, action);
    case actionTypes.CREATE_USER_FAIL:
      return createUserFail(state, action);
    case actionTypes.NEW_USER_START:
      return newUserStart(state, action);
    case actionTypes.NEW_USER_SUCCESS:
      return newUserSuccess(state, action);
    case actionTypes.NEW_USER_FAIL:
      return newUserFail(state, action);
    default:
      return state;
  }
};

export default reducer;
