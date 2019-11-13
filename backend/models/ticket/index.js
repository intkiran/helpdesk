// Importing packages that are required for this
// schema
const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

//================================
// Ticketing Schema
//================================
const TicketSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    priority: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    comments: {
      type: Array,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    tid: {
      type: String,
      required: false,
      index: true
    },
    createdDate: {
      type: Date
    },
    modifiedDate: {
      type: Date
    }
  },
  {
    autoIndex: false,
    timestamps: { createdAt: "createdDate", updatedAt: "modifiedDate" }
  }
);

module.exports = mongoose.model("Ticket", TicketSchema);
