var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TicketSchema = new Schema({
  category: String,
  priority: { type: String, default: "low" },
  title: String,
  content: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdDate: { type: Date, default: Date.now },
  resolved: String,
  resolutionNotes: String,

  status: { type: String, default: "open" },

  lastupdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Ticket", TicketSchema);
