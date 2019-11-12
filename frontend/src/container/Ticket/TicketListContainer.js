import React, { Component } from "react";
import TicketList from "./../../components/TicketList";
import { connect } from "react-redux";
import * as actions from "./../../store/actions/index";
import FilterForm from "./../../components/Filter";
class TicketListContainer extends Component {
  constructor(props) {
    super(props);
    console.log("Kiran List ticket Container component");
    this.deleteTicket = this.deleteTicket.bind(this);

    this.props.listTickets();
  }
  showNewAccountScreen() {
    this.setState({});
  }

  render() {
    console.log("Kiran List ticket Container component");
    console.log("kiran  ticket list", this.props.tickets);
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
    console.log("  renuka delete ticket id  list container ", id);

    if (window.confirm("Are you sure you want to delete this Ticket?")) {
      this.props.deleteTicket(id);
    }
  }
}

const mapStateToProps = state => {
  const stateList = {
    tickets: state.tickets.tickets,
    loading: state.tickets.loading,
    error: state.tickets.error
  };
  console.log("  Kiran Ticket list container ", stateList);

  return stateList;
};
const mapDispatchToProps = dispatch => {
  const dd = {
    listTickets: () => dispatch(actions.fetchTickets()),
    deleteTicket: id => dispatch(actions.deleteTicket(id))
  };
  console.log("renuka ticketlistcontainer ", dd);
  return dd;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketListContainer);
