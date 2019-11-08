import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class Dashboard extends Component {
  state = {
    error: ""
  };

  constructor(props) {
    super(props);

    this.setState({ error: "" });
  }

  componentDidUpdate() {
    if (!this.props.loading) {
    }
  }

  // TODO: remove event listeners
  componentDidMount() {}

  render() {
    if (this.props.isAuthenticated) {
      let errorMessage = null;
      if (this.state.error.length) {
        errorMessage = <div>{this.state.error}</div>;
      }
      return <div className="al-container al-dashboard"></div>;
    } else {
      return "";
    }
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.uploadFile.loading,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
