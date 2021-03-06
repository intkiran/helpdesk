const TicketService = require("../services/Ticket");
const getTicket = async id => {
  const response = await TicketService.getTicket(id);
  return response;
};

const getAllTickets = async () => {
  const response = await TicketService.getAllTickets();

  return response;
};
const addTicket = async ticket => {
  const addedTicket = await TicketService.addTicket(ticket);
  return addedTicket;
};
const updateTicket = async ticket => {
  const updatedTicket = await TicketService.updateTicket(ticket);
  const response = await TicketService.getTicket(ticket._id);
  return response;
};
const deleteTicket = async id => {
  const deTicket = await TicketService.deleteTicket(id);
  return deTicket;
};
module.exports = {
  getTicket,
  getAllTickets,
  addTicket,
  updateTicket,
  deleteTicket
};
