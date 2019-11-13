import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { withRouter } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

class Header extends Component {
  constructor(props, context) {
    super(props, context);
    this.logout = this.logout.bind(this);
  }

  logout = event => {
    this.props.logout();
  };
  componentDidMount() {}
  logout(event) {
    event.preventDefault();
    this.props.actions.logout();
    this.props.history.push("/auth");
  }

  render() {
    const currentUser = this.props.currentUser ? this.props.currentUser : null;
    let link;
    let role = null;
    if (currentUser) role = currentUser.roles;

    const userLinks = (
      <>
        <Nav className="mr-auto">
          <Nav.Link href="/users">Users</Nav.Link>
          <Nav.Link href="/tickets">Tickets</Nav.Link>
        </Nav>
        <Nav className="nav navbar-nav navbar-right">
          <Nav.Link href="/logout">Logout</Nav.Link>
          <Nav.Link href="/myaccount">Myaccount</Nav.Link>
        </Nav>
      </>
    );
    const adminLinks = (
      <>
        <Nav className="mr-auto">
          <Nav.Link href="users">Users</Nav.Link>
          <Nav.Link href="tickets">Tickets</Nav.Link>
        </Nav>
        <Nav className="nav navbar-nav navbar-right">
          <Nav.Link href="logout">Logout</Nav.Link>
          <Nav.Link href="myaccount">Myaccount</Nav.Link>
        </Nav>
      </>
    );
    const guestLinks = (
      <Nav className="nav navbar-nav navbar-right">
        <Nav.Link href="auth">Login</Nav.Link>
        <Nav.Link href="sighup">Signup</Nav.Link>
      </Nav>
    );

    if (!this.props.isAuthenticated) {
      link = guestLinks;
    } else if (role === "admin") {
      link = adminLinks;
    } else if (role === "standard") {
      link = userLinks;
    }

    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Heldesk</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">{link}</Navbar.Collapse>
      </Navbar>
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
    isAuthenticated: state.auth.token !== null,
    currentUser: state.auth.user,
    auth: state.auth
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
