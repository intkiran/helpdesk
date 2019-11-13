import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./../../store/actions/index";

import { Redirect } from "react-router-dom";
import UserForm from "../../components/User/UserForm";

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
        <UserForm user={this.props.user} onSave={this.save} />
      </div>
    );
  }

  save(user) {
    if (!this.props.match.params.id) {
      this.props.saveUser(user);
    } else {
      this.props.updateUser(user);
    }
  }

  componentDidMount = () => {
    if (this.props.match.params.id) {
      this.props.getUserById(this.props.match.params.id);
    }
  };
}

const mapDispatchToProps = dispatch => ({
  saveUser: user => dispatch(actions.createUser(user)),
  updateUser: user => dispatch(actions.updateUser(user)),
  newUser: () => dispatch(actions.newUser()),
  getUserById: id => dispatch(actions.fetchUser(id))
});

const mapStateToProps = state => {
  const res = {
    loading: state.users.loading,
    saved: state.users.saved,
    error: state.users.error,
    user: state.users.newInsertedUsers,
    loggedUser: state.auth.user
  };
  return res;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainer);
