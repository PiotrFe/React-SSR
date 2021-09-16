import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

export default (ChildComponent) => {
  class requireAuth extends Component {
    render() {
      switch (this.props.auth) {
        case false:
          return <Redirect to="/" />;
        case null:
          return <div>Loading...</div>;
        default:
          return <ChildComponent {...this.props} />;
      }
    }
  }

  function mapStateToProps({ auth }) {
    return { auth };
  }

  return connect(mapStateToProps)(requireAuth); // using connect since we need to get a piece of state (auth)
};
