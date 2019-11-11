const UserService = require("../services/User");
const getUser = async id => {
  console.log("getUser controller");
  const response = await UserService.getUser(id);
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
const updateUser = async user => {
  console.log("newUser ", user);
  const updatedUser = await UserService.updateUser(user);
  return updatedUser;
};
const deleteUser = async id => {
  const deuser = await UserService.deleteUser(id);

  return deuser;
};
module.exports = { getUser, getAllUsers, addUser, deleteUser, updateUser };
