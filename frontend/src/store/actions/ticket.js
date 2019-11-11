import * as actionTypes from "./actionTypes";
import { axiosInstance as axios } from "../../services/axiosInstance";
import toastr from "toastr";

export const fetchTicketsStart = () => {
  return {
    type: actionTypes.FETCH_TICKETS_START
  };
};

export const fetchTicketsSuccess = data => {
  return {
    type: actionTypes.FETCH_TICKETS_SUCCESS,
    data: data
  };
};

export const fetchTicketsFail = error => {
  return {
    type: actionTypes.FETCH_TICKETS_FAIL,
    error: error
  };
};

export const fetchTickets = () => {
  return dispatch => {
    dispatch(fetchTicketsStart());
    axios
      .get("/api/tickets/")
      .then(response => {
        console.log("Kiran Tickets api list call response", response);
        dispatch(fetchTicketsSuccess(response.data));
      })
      .catch(err => {
        dispatch(fetchTicketsFail(err));
      });
  };
};
export const fetchTicketStart = () => {
  return {
    type: actionTypes.FETCH_TICKET_START
  };
};

export const fetchTicketSuccess = data => {
  return {
    type: actionTypes.FETCH_TICKET_SUCCESS,
    data: data
  };
};

export const fetchTicketFail = error => {
  return {
    type: actionTypes.FETCH_TICKET_FAIL,
    error: error
  };
};

export const fetchTicket = id => {
  return dispatch => {
    dispatch(fetchTicketStart(id));
    /*   dispatch(fetchTicketSuccess());
    dispatch(fetchTicketFail()); */

    axios
      .get("/api/ticket/" + id)
      .then(response => {
        console.log("Kiran Tickets api list call response", response);
        dispatch(fetchTicketSuccess(response.data));
      })
      .catch(err => {
        dispatch(fetchTicketFail(err));
      });
  };
};
export const createTicketStart = () => {
  return {
    type: actionTypes.CREATE_TICKET_START
  };
};

export const createTicketSuccess = data => {
  return {
    type: actionTypes.CREATE_TICKET_SUCCESS,
    data: data
  };
};

export const createTicketFail = error => {
  return {
    type: actionTypes.CREATE_TICKET_FAIL,
    error: error
  };
};

export const createTicket = (data, sortBy) => {
  return dispatch => {
    dispatch(createTicketStart());
    axios
      .post("/api/tickets/create", data)
      .then(response => {
        dispatch(createTicketSuccess(response.data));
        toastr.success("Ticket Successfully created");
      })
      .catch(err => {
        dispatch(createTicketFail(err));
      });
  };
};
export const updateTicketStart = () => {
  return {
    type: actionTypes.UPDATE_TICKET_START
  };
};

export const updateTicketSuccess = data => {
  return {
    type: actionTypes.UPDATE_TICKET_SUCCESS,
    data: data
  };
};

export const updateTicketFail = error => {
  return {
    type: actionTypes.UPDATE_TICKET_FAIL,
    error: error
  };
};

export const updateTicket = (data, sortBy) => {
  return dispatch => {
    dispatch(updateTicketStart());
    axios
      .post("/api/tickets/update", data)
      .then(response => {
        dispatch(updateTicketSuccess(response.data));
        toastr.success("Ticket Successfully updated");
      })
      .catch(err => {
        dispatch(updateTicketFail(err));
      });
  };
};
export const deleteTicketStart = () => {
  return {
    type: actionTypes.DELETE_TICKET_START
  };
};

export const deleteTicketSuccess = data => {
  return {
    type: actionTypes.DELETE_TICKET_SUCCESS,
    data: data
  };
};

export const deleteTicketFail = error => {
  return {
    type: actionTypes.DELETE_TICKET_FAIL,
    error: error
  };
};

export const deleteTicket = id => {
  return dispatch => {
    dispatch(deleteTicketStart());
    axios
      .delete("/api/tickets/delete/" + id)
      .then(response => {
        dispatch(deleteTicketSuccess(response.data));
        toastr.success("Ticket Successfully deleted");
      })
      .catch(err => {
        dispatch(deleteTicketFail(err));
      });
  };
};

export const newTicketStart = () => {
  return {
    type: actionTypes.NEW_TICKET_START
  };
};

export const newTicketSuccess = data => {
  return {
    type: actionTypes.NEW_TICKET_SUCCESS,
    data: data
  };
};

export const newTicketFail = error => {
  return {
    type: actionTypes.NEW_TICKET_FAIL,
    error: error
  };
};
export const newTicket = data => {
  return dispatch => {
    dispatch(newTicketStart());
    dispatch(newTicketSuccess("success"));
    dispatch(newTicketFail("error"));
  };
};
