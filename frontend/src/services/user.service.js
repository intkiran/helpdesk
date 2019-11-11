import { axiosInstance as axios } from "./axiosInstance";

export const UserService = {
  login,
  logout,
  getAll
};

async function login(payload) {
  try {
    const response = await axios.post("/api/auth/login", payload);
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

function getAll() {}
