import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { withRouter } from "react-router-dom";
import UserListContainer from "./../User/UserListContainer";
import Header from "./../../container/Header";
class Dashboard extends Component {
  state = {
    uploadedFiles: "kiran",
    error: ""
  };

  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    if (!this.props.loading) {
    }
    this.setState({ uploadedFiles: "kiran" });
  }

  // TODO: remove event listeners
  componentDidMount() {}

  render() {
    let errorMessage = null;
    if (this.state.error.length) {
      errorMessage = <div>{this.state.error}</div>;
    }
    return <div className="header">This is dashboard</div>;
  }
}

const mapStateToProps = state => {
  const props = {
    isAuthenticated: state.auth.token !== null,
    loading: state.auth.loading,
    user: state.auth.user,
    error: state.error
  };
  console.log("kiran dashboard mapstateprops", props);
  return props;
};

const mapDispatchToProps = dispatch => {
  return {};
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Dashboard)
);
