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
  /*   onSubmit = () => {
    const data = {
      status: formData.status,
      id: _id,
      uid,
      comments
    };
    this.prop.updateTicket(data, this.props.history);
  };

  onCommentUpdate = updateComments => {
    const data = {
      status,
      id: _id,
      uid,
      comments: updateComments
    };
    this.prop.updateComment(data);
  };
  getFormData = (value, field) => {
    setFormData(prevState => ({ ...prevState, [field]: value }));
  }; */
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
        {/*         <CommentContainer update={this.onCommentUpdate} />
         */}
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
  const stateList = {
    ticket: state.tickets.newInsertedTickets,
    loading: state.tickets.loading,
    error: state.tickets.error,
    role: state.auth.user.roles,
    user: state.auth.user
  };
  console.log("  renuka Ticket list container ", stateList);

  return stateList;
};
const mapDispatchToProps = dispatch => {
  const dd = {
    updateTicket: data => dispatch(actions.updateTicket(data)),
    updateComment: data => dispatch(actions.updateTicket(data)),
    saveTicket: ticket => dispatch(actions.createTicket(ticket)),
    newTicket: () => dispatch(actions.newTicket()),
    getTicketById: id => dispatch(actions.fetchTicket(id))
  };
  console.log("renuka ticketlistcontainer ", dd);
  return dd;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketDetails);
