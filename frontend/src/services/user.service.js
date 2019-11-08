import { axiosInstance as axios } from "./axiosInstance";
import { api } from "./api";

export const UserService = {
  login,
  logout,
  getAll
};

async function login(payload) {
  /*  return axios
    .post("/api/users/login", payload)
    .then(user => {
      // login successful
      return user;
    })
    .catch(err => {
      return err;
    }); */

  try {
    const response = await axios.post("/api/users/login", payload);
    console.log("user service login success", response);
    return response;
  } catch (error) {
    console.log("user service login error", error.response);
    throw error.response.data.error;
  }
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function getAll() {
  /*  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`/users`, requestOptions).then(handleResponse); */
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        //location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
