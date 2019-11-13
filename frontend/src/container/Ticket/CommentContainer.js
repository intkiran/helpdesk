import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import CommentForm from "../../components/Ticket/CommentForm";
import CommentList from "../../components/Ticket/CommentList";

class CommentContainer extends Component {
  constructor(props) {
    super(props);
  }
  handleCommentSubmit(comment) {
    var newComments = this.props.comments.concat([comment]);
    this.props.updateTicket(newComments);
  }
  componentDidMount() {
    /*   debugger;
    if (this.props.match.params.id) {
      this.props.getTicketById(this.props.match.params.id);
    } */
  }
  render() {
    return (
      <>
        <div sm={12} className="comment-box">
          {/*   <CommentForm
            data={this.props.comments}
            onCommentSubmit={this.handleCommentSubmit}
          /> */}
          <CommentList data={this.props.comments} />
        </div>
      </>
    );
  }
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
    ticket: state.tickets.newInsertedTickets,
    comments: state.tickets.newInsertedTickets.comments,

    loggedUser: state.auth.user
  };
  console.log("kiran book container", res);
  return res;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentContainer);
