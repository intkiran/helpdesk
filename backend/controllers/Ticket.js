const TicketService = require("../services/Ticket");
const getTicket = async id => {
  console.log("getTicket controller");
  const response = await TicketService.getTicket(id);
  return response;
};

const getAllTickets = async () => {
  const response = await TicketService.getAllTickets();

  return response;
};
const addTicket = async newUser => {
  console.log("newUser ", newUser);
  const user = await TicketService.addTicket(newUser);
  return user;
};
const updateTicket = async user => {
  console.log("newUser ", user);
  const updatedUser = await TicketService.updateTicket(user);
  return updatedUser;
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
