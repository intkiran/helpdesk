const express = require("express");
const apiError = require("./apiError");

const router = express.Router();

const controllerHandler = (promise, params) => async (req, res, next) => {
  console.log("params ", params);
  // console.log("promise ", promise);

  const boundParams = params ? params(req, res, next) : [];
  try {
    console.log("boundParams ", boundParams);

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
