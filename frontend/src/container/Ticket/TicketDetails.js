import React, { Component } from "react";
import { history } from "./../../utils/history";
import { connect } from "react-redux";
import * as actions from "./../../store/actions/index";
import TicketDetailsForm from "./../../components/Ticket/TicketDetailsForm";
import "./styles.scss";

class TicketDetails extends Component {
  constructor(props) {
    super(props);
    this.onUpdateTicket = this.onUpdateTicket.bind(this);
    this.onCommentUpdate = this.onCommentUpdate.bind(this);
  }

  closeTicket = () => {
    history.goBack();
  };

  onUpdateTicket(ticket) {
    this.props.updateTicket(ticket);
  }

  onCommentUpdate(ticket) {
    debugger;
    this.props.updateTicket(ticket);
  }

  render() {
    return (
      <div>
        {this.props.loading && (
          <p className="text-center alert alert-info">Loading ...</p>
        )}
        <TicketDetailsForm
          role={this.props.role}
          user={this.props.user}
          ticket={this.props.ticket}
          onCommentUpdate={this.onCommentUpdate}
          onUpdateTicket={this.onUpdateTicket}
        />
      </div>
    );
  }

  componentDidMount = () => {
    if (this.props.match.params.id) {
      this.props.getTicketById(this.props.match.params.id);
    }
  };
}

const mapStateToProps = state => {
  return {
    ticket: state.tickets.newInsertedTickets,
    loading: state.tickets.loading,
    error: state.tickets.error,
    role: state.auth.user.roles,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  const dd = {
    updateTicket: data => dispatch(actions.updateTicket(data)),
    updateComment: data => dispatch(actions.updateTicket(data)),
    saveTicket: ticket => dispatch(actions.createTicket(ticket)),
    newTicket: () => dispatch(actions.newTicket()),
    getTicketById: id => dispatch(actions.fetchTicket(id))
  };
  return dd;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketDetails);
