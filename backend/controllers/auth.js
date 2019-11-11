const UserService = require("../services/User");

const loginUser = async req => {
  const response = await UserService.loginUser(req);

  return response;
};
const logoutUser = async (req, res) => {
  delete req.headers["x-access-token"];

  return res.status(200).json({
    message: "User has been successfully logged out"
  });
};

module.exports = { loginUser, logoutUser };
