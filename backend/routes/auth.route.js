const controllerHandler = require("../controllers");

const { loginUser } = require("../controllers/auth");
const express = require("express");
const router = express.Router();

router.post(
  "/login",
  controllerHandler(loginUser, (req, res, next) => [req.body])
);

module.exports = router;
