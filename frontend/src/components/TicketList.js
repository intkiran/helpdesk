import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { PriorityTypes, StatusTypes } from "../utils/constants";
import { Table } from "reactstrap";

const TicketList = ({ tickets, onDelete }) => {
  console.log("Kiran ticketlist ", tickets, onDelete);

  return !tickets.length ? (
    <p className="alert alert-warning text-center">No tickets found.</p>
  ) : (
    <div className="ticket-container">
      <Link to="/ticket" className="btn btn-primary">
        <span className="fa fa-plus" aria-hidden="true"></span>
      </Link>
      <Table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>subject</th>
            <th>status</th>
            <th>priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket._id}>
              <td>{ticket.fullName}</td>
              <td>{ticket.subject}</td>
              <td>{StatusTypes[ticket.status]}</td>
              <td>{PriorityTypes[ticket.priority]}</td>

              <td>
                <Link to={`/ticket/${ticket._id}`} className="btn btn-primary">
                  <span className="fa fa-pencil" aria-hidden="true"></span>
                </Link>
                &nbsp;&nbsp;
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => onDelete(ticket._id)}
                >
                  <span className="fa fa-remove" aria-hidden="true"></span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

TicketList.propTypes = {
  _id: PropTypes.string,
  fullName: PropTypes.string,
  email: PropTypes.string,
  category: PropTypes.string,
  subject: PropTypes.string,
  comments: PropTypes.string,
  message: PropTypes.string,
  onDelete: PropTypes.func
};

export default TicketList;
