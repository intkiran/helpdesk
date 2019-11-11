import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import { Redirect } from "react-router-dom";
import TicketForm from "../../components/TicketForm";

class TicketContainer extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
  }

  render() {
    if (this.props.saved) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        {this.props.loading && (
          <p className="text-center alert alert-info">Loading ...</p>
        )}

        <TicketForm ticket={this.props.ticket} onSave={this.save} />
      </div>
    );
  }

  save(ticket) {
    if (!this.props.match.params.id) {
      this.props.saveTicket(ticket);
    } else {
      this.props.updateTicket(ticket);
    }
  }

  componentDidMount = () => {
    if (this.props.match.params.id) {
      this.props.getTicketById(this.props.match.params.id);
    }
  };

  componentWillUnmount = () => {
    //this.props.newUser();
  };
}

const mapDispatchToProps = dispatch => ({
  saveTicket: ticket => dispatch(actions.createTicket(ticket)),
  updateTicket: ticket => dispatch(actions.updateTicket(ticket)),
  newTicket: () => dispatch(actions.newTicket()),
  getTicketById: id => dispatch(actions.fetchTicket(id))
});

const mapStateToProps = state => {
  const res = {
    loading: state.tickets.loading,
    saved: state.tickets.saved,
    error: state.tickets.error,
    ticket: state.tickets.newInsertedTicketss,
    loggedUser: state.auth.user
  };
  console.log("kiran book container", res);
  return res;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketContainer);
