const UserService = require("../services/User");
const getUser = async username => {
  console.log("getUser controller");
  const response = await UserService.getUser(username);
  return response;
};

const getAllUsers = async () => {
  const response = await UserService.getAllUsers();

  return response;
};
const addUser = async newUser => {
  console.log("newUser ", newUser);
  const user = await UserService.addUser(newUser);
  return user;
};

module.exports = { getUser, getAllUsers, addUser };
