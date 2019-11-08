import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Auth from "./container/Auth";
import Home from "./container/Dashboard";
import Header from "./container/Header";
import Footer from "./components/footer";

import * as actions from "./store/actions";
import { connect } from "react-redux";

class App extends Component {
  constructor(props) {
    super(props);
    if (props.isAuthenticated) {
      props.isLoggedIn();
    }
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.location !== prevProps.location &&
      this.props.isAuthenticated
    ) {
      this.props.isLoggedIn();
    }
  }
  render() {
    let routes = (
      <Switch>
        <Redirect exact from={"/"} to={"/auth"} />
        <Route path="/auth" component={Auth} />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      console.log("kiran routes authenticated", this.props);

      routes = (
        <Switch>
          <Route path="/auth" exact component={Home} />
          <Redirect to="/" />
        </Switch>
      );
    }
    console.log("kiran routes", routes);
    return (
      <div className="container">
        <Header></Header>
        <div className="main">{routes}</div>
        <Footer></Footer>
      </div>
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
