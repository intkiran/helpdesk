const controllerHandler = require("../controllers");

const {
  getUser,
  getAllUsers,
  addUser,
  updateUser,
  deleteUser
} = require("../controllers/User");
const express = require("express");

const router = express.Router();
router.get(
  "/read/:id",
  controllerHandler(getUser, (req, res, next) => [req.params.id])
);
router.get("/", controllerHandler(getAllUsers, (req, res, next) => []));
router.post(
  "/create",
  controllerHandler(addUser, (req, res, next) => [req.body])
);
router.post(
  "/update",
  controllerHandler(updateUser, (req, res, next) => [req.body])
);
router.delete(
  "/delete/:id",
  controllerHandler(deleteUser, (req, res, next) => [req.params.id])
);

module.exports = router;
