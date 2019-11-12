const controllerHandler = require("../controllers");

const {
  getTicket,
  getAllTickets,
  addTicket,
  updateTicket,
  deleteTicket
} = require("../controllers/Ticket");
const express = require("express");
console.log("Kiran CONTROL HANDLER", controllerHandler);
console.log("Kiran CONTROL HANDLER1", getTicket);

const router = express.Router();
router.get(
  "/:id",
  controllerHandler(getTicket, (req, res, next) => [req.params.id])
);
router.get("/", controllerHandler(getAllTickets, (req, res, next) => []));
router.post(
  "/create",
  controllerHandler(addTicket, (req, res, next) => [req.body])
);
router.post(
  "/update",
  controllerHandler(updateTicket, (req, res, next) => [req.body])
);
router.delete(
  "/delete/:id",
  controllerHandler(deleteTicket, (req, res, next) => [req.params.id])
);

module.exports = router;
