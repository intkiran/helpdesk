import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Auth from "./container/Auth";
import Home from "./container/Dashboard";
class App extends Component {
  constructor(props) {
    super(props);
    if (props.isAuthenticated) {
      props.isLoggedIn();
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
      routes = (
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      );
    }
    return (
      <div className="App">
        <div className="header">&copy; HelpDesk Company</div>
        <div className="main">{routes}</div>
        <footer>
          <div className="footer">&copy; HelpDesk Software</div>
        </footer>
      </div>
    );
  }
}

export default App;
