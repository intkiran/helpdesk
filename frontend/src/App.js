import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Redirect,
  Route,
  Switch,
  BrowserRouter as Router,
  withRouter
} from "react-router-dom";
import Auth from "./container/Auth";
import Home from "./container/Dashboard";
import Header from "./container/Header";
import Footer from "./components/footer";
import UserListContainer from "./container/User/UserListContainer";

import * as actions from "./store/actions";
import { connect } from "react-redux";
import Main from "./components/Main";
import UserContainer from "./container/User/UserContainer";
import Logout from "./container/Auth/Logout";
import TicketListContainer from "./container/Ticket/TicketListContainer";
import TicketContainer from "./container/Ticket/TicketContainer";

class App extends Component {
  constructor(props) {
    super(props);
    /* if (props.isAuthenticated) {
      props.isLoggedIn();
    } */
  }
  componentDidUpdate(prevProps) {
    /*  if (
      this.props.location !== prevProps.location &&
      this.props.isAuthenticated
    ) {
      this.props.isLoggedIn();
    } */
  }
  render() {
    let accessToken = localStorage.getItem("token");
    console.log("kiran accessToken app.js ", accessToken);
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/users" component={UserListContainer} />
          <Route exact path="/user" component={UserContainer} />
          <Route exact path="/user/:id" component={UserContainer} />
          <Route path="/tickets" component={TicketListContainer} />
          <Route exact path="/ticket" component={TicketContainer} />
          <Route exact path="/ticket/:id" component={TicketContainer} />
          <Route exact path="/logout" component={Logout} />

          <Route path="/home" component={Home} />
        </Switch>
      );
    }

    console.log("kiran routes", routes);
    return (
      <>
        <Header />
        <div className="container">
          {routes}
          <Footer />
        </div>
      </>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});
const mapDispatchToProps = dispatch => ({
  checkToken: (token, id) => dispatch(actions.auth(token, id)),
  setAuthenticationFromCache: () =>
    dispatch(actions.setAuthenticationFromCache()),
  isLoggedIn: () => dispatch(actions.isLoggedIn())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
