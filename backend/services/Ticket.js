const Ticket = require("../models/Ticket");
const apiError = require("../controllers/apiError");
const mongoose = require("mongoose");

const getTicket = async id => {
  let existingTicket = null;
  const ticket = await Ticket.findById(id, function(err, ticket) {
    if (err) throw new apiError("unable to find ticket.", 500);
    existingTicket = ticket;
  });
  return existingTicket;
};

const getAllTickets = async () => {
  return Ticket.find({}).exec();
};

const addTicket = async ticket => {
  let newTicket = new Ticket({
    fullName: ticket.fullName,
    email: ticket.email,
    category: ticket.category,
    priority: ticket.priority,
    status: ticket.status,
    subject: ticket.subject,
    message: ticket.message,
    CrtdOn: ticket.CrtdOn,
    tid: new mongoose.mongo.ObjectId(),
    ModOn: ticket.ModOn
  });
  let addedTicket = await newTicket.save();
  return addedTicket;
};

const updateTicket = async ticket => {
  let newTicket = new Ticket({
    fullName: ticket.fullName,
    email: ticket.email,
    category: ticket.category,
    priority: ticket.priority,
    status: ticket.status,
    subject: ticket.subject,
    tid: ticket.tid,
    message: ticket.message,
    CrtdOn: ticket.CrtdOn,
    ModOn: ticket.ModOn
  });
  let finalTicket = null;
  Ticket.updateOne({ _id: ticket._id }, { $set: ticket }, function(
    err,
    newUpdatedTicket
  ) {
    if (err) {
      throw new apiError("unable to updated ticket.", 500);
    }
    finalTicket = newUpdatedTicket;
  });
  return finalTicket;
};

const deleteTicket = async id => {
  let deleteTicket = null;
  await Ticket.findByIdAndDelete(id, (err, ticket) => {
    if (err) throw new apiError("unable to delete ticket.", 500);
    deleteTicket = ticket;
  });
  return deleteTicket;
};

module.exports = {
  getTicket,
  getAllTickets,
  addTicket,
  updateTicket,
  deleteTicket
};
