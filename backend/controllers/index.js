const express = require("express");
const apiError = require("./apiError");

const router = express.Router();

const controllerHandler = (promise, params) => async (req, res, next) => {
  const boundParams = params ? params(req, res, next) : [];
  try {
    const result = await promise(...boundParams);
    console.debug("controllerHandler result ", result);
    return res.json(result);
  } catch (error) {
    console.debug("controllerHandler error", error);
    if (error instanceof apiError) {
      return res.status(error.status).json({ error });
    }
    res.status(500);

    return res.end();
  }
};

module.exports = controllerHandler;
