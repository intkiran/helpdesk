import React, { Component } from "react";
import "./App.css";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Auth from "./container/Auth";
import Home from "./container/Dashboard";
import Header from "./container/Header";
import Footer from "./components/Footer";
import UserListContainer from "./container/User/UserListContainer";

import * as actions from "./store/actions";
import { connect } from "react-redux";
import Main from "./components/Main";
import UserContainer from "./container/User/UserContainer";
import Logout from "./container/Auth/Logout";
import TicketListContainer from "./container/Ticket/TicketListContainer";
import TicketContainer from "./container/Ticket/TicketContainer";
import TicketDetails from "./container/Ticket/TicketDetails";

class App extends Component {
  render() {
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
          <Route path="/tickets/details/:ticket" component={TicketDetails} />

          <Route exact path="/ticket" component={TicketContainer} />
          <Route exact path="/ticket/:id" component={TicketDetails} />
          <Route exact path="/logout" component={Logout} />

          <Route path="/home" component={Home} />
        </Switch>
      );
    }

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
    dispatch(actions.setAuthenticationFromCache())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
