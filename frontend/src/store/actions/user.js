import * as actionTypes from "./actionTypes";
import { axiosInstance as axios } from "../../services/axiosInstance";

export const fetchUsersStart = () => {
  return {
    type: actionTypes.FETCH_USERS_START
  };
};

export const fetchUsersSuccess = data => {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    data: data
  };
};

export const fetchUsersFail = error => {
  return {
    type: actionTypes.FETCH_USERS_FAIL,
    error: error
  };
};

export const fetchUsers = () => {
  const token = localStorage.getItem("token");
  return dispatch => {
    dispatch(fetchUsersStart());
    axios
      .get("/api/users/")
      .then(response => {
        console.log("Kiran Users api list call response", response);
        dispatch(fetchUsersSuccess(response.data));
      })
      .catch(err => {
        dispatch(fetchUsersFail(err));
      });
  };
};

export const createUserStart = () => {
  return {
    type: actionTypes.CREATE_USER_START
  };
};

export const createUserSuccess = data => {
  return {
    type: actionTypes.CREATE_USER_SUCCESS,
    data: data
  };
};

export const createUserFail = error => {
  return {
    type: actionTypes.CREATE_USER_FAIL,
    error: error
  };
};

export const createUser = (data, sortBy) => {
  return dispatch => {
    dispatch(createUserStart());
    axios
      .post("/api/users/create", data)
      .then(response => {
        dispatch(createUserSuccess(response.data));
      })
      .catch(err => {
        dispatch(createUserFail(err));
      });
  };
};
export const newUserStart = () => {
  return {
    type: actionTypes.NEW_USER_START
  };
};

export const newUserSuccess = data => {
  return {
    type: actionTypes.NEW_USER_SUCCESS,
    data: data
  };
};

export const newUserFail = error => {
  return {
    type: actionTypes.NEW_USER_FAIL,
    error: error
  };
};
export const newUser = data => {
  return dispatch => {
    dispatch(newUserStart());
    dispatch(newUserSuccess("success"));
    dispatch(newUserFail("error"));
  };
};
