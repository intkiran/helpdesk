import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./../../store/actions/index";

import { Redirect } from "react-router-dom";
import UserForm from "../../components/UserForm";

class UserContainer extends Component {
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

        {(this.props.user.username || !this.props.match.params.id) && (
          <UserForm user={this.props.user} onSave={this.save} />
        )}
      </div>
    );
  }

  save(user) {
    /*     if (!this.props.match.params.id) {
     */ this.props.saveUser(user);
    /*   } else {
      this.props.updateBookAction(book);
    } */
  }

  componentDidMount = () => {
    if (this.props.match.params.id) {
      this.props.getUserById(this.props.match.params.id);
    }
  };

  componentWillUnmount = () => {
    this.props.newUser();
  };
}

const mapDispatchToProps = dispatch => ({
  saveUser: user => dispatch(actions.createUser(user)),
  updateUser: user => dispatch(actions.createUser(user)),
  newUser: () => dispatch(actions.newUser()),
  getUserById: id => dispatch(actions.createUser(id))
});

const mapStateToProps = state => ({
  loading: state.user.loading,
  saved: state.user.saved,
  error: state.user.error,
  user: state.user.user
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainer);
