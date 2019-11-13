import React, { Component } from "react";
import TicketList from "./../../components/Ticket/TicketList";
import { connect } from "react-redux";
import * as actions from "./../../store/actions/index";
class TicketListContainer extends Component {
  
  constructor(props) {
    super(props);
    this.deleteTicket = this.deleteTicket.bind(this);
    this.props.listTickets();
  }

  showNewAccountScreen() {
    this.setState({});
  }

  render() {
    const result = this.props.loading ? (
      <p className="text-center alert alert-info">Loading Tickets...</p>
    ) : (
      <>
        <TicketList tickets={this.props.tickets} onDelete={this.deleteTicket} />
      </>
    );
    return <div className="tickets">{result}</div>;
  }

  deleteTicket(id) {
    if (window.confirm("Are you sure you want to delete this Ticket?")) {
      this.props.deleteTicket(id);
    }
  }
}

const mapStateToProps = state => {
  return {
    tickets: state.tickets.tickets,
    loading: state.tickets.loading,
    error: state.tickets.error
  };
};

const mapDispatchToProps = dispatch => {
  const dd = {
    listTickets: () => dispatch(actions.fetchTickets()),
    deleteTicket: id => dispatch(actions.deleteTicket(id))
  };
  return dd;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketListContainer);
