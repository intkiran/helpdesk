const User = require("../models/User");
const apiError = require("../controllers/apiError");

const getUser = async id => {
  let existingUser = null;
  const user = await User.findById(id, function(err, user) {
    if (err) throw new apiError("unable to find user.", 500);
    console.log("user", user);
    existingUser = user;
  });

  return existingUser;
};

const getAllUsers = async () => {
  return User.find({}).exec();
};
const loginUser = async user => {
  const username = user.username;
  const password = user.password;

  const newUser = await User.findOne({ username });
  if (!newUser || !newUser.authenticate(password)) {
    //this.throwError(401,'Please verify your credentials.')
    const err = new apiError("Please verify your credentials.", 500);

    throw err;
  }

  return { user: newUser.toJSON(), token: newUser.generateToken() }; //user.generateToken();
};
const addUser = async user => {
  console.log("kiran babu", user);
  let newUser = new User({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    password: user.password,
    role: user.role
  });
  let addedUser = await newUser.save();
  return addedUser;
};

const updateUser = async user => {
  console.log("kiran babu", user);
  let newUser = new User({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    role: user.role
  });
  let userr = null;

  User.updateOne({ _id: user._id }, { $set: user }, function(
    err,
    newUpdatedUser
  ) {
    if (err) throw new apiError("unable to updated user.", 500);
    userr = newUpdatedUser;
  });

  return userr;
};
const deleteUser = async id => {
  console.log("kiran babu", id);
  let deleteUser = null;
  await User.findByIdAndDelete(id, (err, user) => {
    if (err) throw new apiError("unable to delete user.", 500);
    console.log("user", user);
    deleteUser = user;
  });

  return deleteUser;
};
module.exports = {
  getUser,
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  loginUser
};
