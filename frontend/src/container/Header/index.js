import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Link, NavLink, withRouter } from "react-router-dom";

class Header extends Component {
  logout = event => {
    this.props.logout();
  };

  render() {
    return (
      <div className="header">
        <nav>
          <Link to="/">Home page</Link>
          <Link to="/about">About</Link>
          <Link to="/about">Logout</Link>
        </nav>
        <div onClick={this.logout} title="Logout"></div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  };
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
