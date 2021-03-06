import React, { Component } from "react";
import UserList from "./../../components/User/UserList";
import { connect } from "react-redux";
import * as actions from "./../../store/actions/index";
import FilterForm from "./../../components/Filter";

class UserListContainer extends Component {
  constructor(props) {
    super(props);
    this.deleteUser = this.deleteUser.bind(this);
    this.props.listUsers();
  }

  render() {
    const result = this.props.loading ? (
      <p className="text-center alert alert-info">Loading Users...</p>
    ) : (
      <>
        <FilterForm OnAdd={this.showNewAccountScreen.bind(this)} />
        <UserList users={this.props.users} onDelete={this.deleteUser} />
      </>
    );
    return <div className="users">{result}</div>;
  }

  deleteUser(id) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      this.props.deleteUser(id);
    }
  }
}

const mapStateToProps = state => {
  return {
    users: state.users.users,
    loading: state.users.loading,
    error: state.users.error
  };
};
const mapDispatchToProps = dispatch => {
  const dd = {
    listUsers: () => dispatch(actions.fetchUsers()),
    deleteUser: id => dispatch(actions.deleteUser(id))
  };
  return dd;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListContainer);
