import * as actionTypes from "../actions/actionTypes";

const initialState = {
  tickets: [],
  error: null,
  loading: false,
  newInsertedTickets: [],
  newDeletedTickets: [],
  newInsertedTickets: {}
};
const startUpdate = state => {
  return {
    ...state,
    loading: false,
    success: false,
    tickets: [],
    error: null
  };
};
const fetchTicketsStart = (state, action) => {
  return {
    ...state,
    error: null,
    tickets: [],
    loading: true,
    success: false
  };
};

const fetchTicketsSuccess = (state, action) => {
  console.log("Kiran ticket reducer success", state, action);

  return {
    ...state,
    error: null,
    loading: false,
    success: true,
    tickets: action.data
  };
};

const fetchTicketFail = (state, action) => {
  return { ...state, error: action.error.message, loading: false };
};

const fetchTicketStart = (state, action) => {
  return {
    ...state,
    ticket: {
      ...state.ticket,
      error: null,
      loading: false,
      success: false
    }
  };
};

const fetchTicketSuccess = (state, action) => {
  return {
    ...state,
    newInsertedTickets: action.data
  };
};

const fetchTicketsFail = (state, action) => {
  return {
    ...state,
    ticket: {
      ...state.ticket,
      error: action.error,
      loading: false,
      id: action.data._id,
      success: false
    }
  };
};
const newTicketStart = (state, action) => {
  return {
    ...state,
    ticket: {
      ticketname: "",
      password: "",
      role: ""
    },
    error: null,
    loading: true,
    success: false
  };
};

const newTicketSuccess = (state, action) => {
  return {
    ...state,
    ticket: {
      ticketname: "",
      password: "",
      role: ""
    },
    error: null,
    loading: false,
    success: true
  };
};

const newTicketFail = (state, action) => {
  return {
    ...state,
    ticket: {
      ticketname: "",
      password: "",
      role: ""
    },
    error: action.error,
    loading: false,
    success: false
  };
};
const createTicketStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false,
    success: false
  };
};

const createTicketSuccess = (state, action) => {
  let tickets = [...state.tickets];
  tickets.unshift(action.data);
  let newInsertedUses = [...state.newInsertedUses];
  newInsertedUses.push(action.data);

  return {
    ...state,
    tickets: tickets,
    loading: false,
    success: true,
    newInsertedTickets: action.data
  };
  /*   let tickets = [...state.tickets];
  tickets.unshift(action.data);
  let newInsertedUses = [...state.newInsertedUses];
  newInsertedUses.push(action.data);

  return {
    ...state,
    tickets: tickets,
    loading: false,
    success: true,
    newInsertedUses: newInsertedUses
  }; */
};

const createTicketFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  };
};
const updateTicketStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false,
    success: false
  };
};

const updateTicketSuccess = (state, action) => {
  let tickets = [...state.tickets];

  for (let key in tickets) {
    if (tickets[key]._id === action.data._id) {
      let update = { ...tickets[key] };
      update = action.data;
      tickets[key] = update;
    }
  }

  return {
    ...state,
    tickets: tickets,
    loading: false,
    success: true,
    newInsertedTickets: action.data
  };
};

const updateTicketFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  };
};

const deleteTicketStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false,
    success: false
  };
};

const deleteTicketSuccess = (state, action) => {
  let tickets = [...state.tickets];
  let deletedTicket = tickets.find(function(ticket) {
    return ticket._id === action.data._id;
  });
  let updatedTickets = tickets.filter(function(ticket) {
    return ticket._id !== action.data._id;
  });
  let newDeletedTickets = [...state.newDeletedTickets];
  newDeletedTickets.push(deletedTicket);
  return {
    ...state,
    tickets: updatedTickets,
    error: null,
    success: true,
    ticket: {
      ...state.ticket,
      updateError: null,
      updateLoading: false,
      _id: action.data._id,
      success: false
    },
    newDeletedTickets: newDeletedTickets
  };
};

const deleteTicketFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  };
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TICKETS_START:
      return fetchTicketsStart(state, action);
    case actionTypes.FETCH_TICKETS_SUCCESS:
      return fetchTicketsSuccess(state, action);
    case actionTypes.FETCH_TICKETS_FAIL:
      return fetchTicketsFail(state, action);
    case actionTypes.CREATE_TICKET_START:
      return createTicketStart(state, action);
    case actionTypes.CREATE_TICKET_SUCCESS:
      return createTicketSuccess(state, action);
    case actionTypes.CREATE_TICKET_FAIL:
      return createTicketFail(state, action);
    case actionTypes.UPDATE_TICKET_START:
      return updateTicketStart(state, action);
    case actionTypes.UPDATE_TICKET_SUCCESS:
      return updateTicketSuccess(state, action);
    case actionTypes.UPDATE_TICKET_FAIL:
      return updateTicketFail(state, action);
    case actionTypes.DELETE_TICKET_START:
      return deleteTicketStart(state, action);
    case actionTypes.DELETE_TICKET_SUCCESS:
      return deleteTicketSuccess(state, action);
    case actionTypes.DELETE_TICKET_FAIL:
      return deleteTicketFail(state, action);
    case actionTypes.NEW_TICKET_START:
      return newTicketStart(state, action);
    case actionTypes.NEW_TICKET_SUCCESS:
      return newTicketSuccess(state, action);
    case actionTypes.NEW_TICKET_FAIL:
      return newTicketFail(state, action);
    case actionTypes.FETCH_TICKET_START:
      return fetchTicketStart(state, action);
    case actionTypes.FETCH_TICKET_SUCCESS:
      return fetchTicketSuccess(state, action);
    case actionTypes.FETCH_TICKET_FAIL:
      return fetchTicketFail(state, action);
    default:
      return state;
  }
};

export default reducer;
