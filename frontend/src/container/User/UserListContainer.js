import React, { Component } from "react";
import UserList from "./../../components/UserList";
import { connect } from "react-redux";
import * as actions from "./../../store/actions/index";
import FilterForm from "./../../components/Filter";
class UserListContainer extends Component {
  constructor(props) {
    super(props);
    console.log("Kiran List Users Container component");
    this.props.listUsers();
  }
  showNewAccountScreen() {
    this.setState({
      ShowNewAccountUI: true,
      ShowAccountList: false,
      ShowFilterUI: false
    });
  }

  render() {
    console.log("kiran  user list", this.props.users);
    const result = this.props.loading ? (
      <p className="text-center alert alert-info">Loading Users...</p>
    ) : (
      <>
        <FilterForm OnAdd={this.showNewAccountScreen.bind(this)} />
        <UserList users={this.props.users} />
      </>
    );
    return <div className="users">{result}</div>;
  }
}
const mapStateToProps = state => {
  const stateList = {
    users: state.users.users,
    loading: state.users.loading,
    error: state.users.error
  };
  console.log(" Kiran User list container ", state);

  return stateList;
};
const mapDispatchToProps = dispatch => {
  return {
    listUsers: () => dispatch(actions.fetchUsers())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListContainer);
