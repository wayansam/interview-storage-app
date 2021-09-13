import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { authUser } from "./../actions";

import LandingPageForm from "./Form/LandingPageForm";
import NewForm from "./Form/NewForm";
import ConfirmForm from "./Form/ConfirmForm";
import ResultForm from "./Form/ResultForm";

class Homepage extends Component {
  state = {
    activePage: "Landing",
  };

  changePage = (name) => {
    this.setState({ activePage: name });
  };

  componentDidMount() {}

  render() {
    const { activePage } = this.state;
    const { login } = this.props;
    return login && login !== "" ? (
      <React.Fragment>
        <p>Welcome to This App</p>
        {activePage === "Landing" && (
          <LandingPageForm changePage={(name) => this.changePage(name)} />
        )}
        {activePage === "Add" && (
          <NewForm changePage={(name) => this.changePage(name)} />
        )}
        {activePage === "Confirm" && (
          <ConfirmForm changePage={(name) => this.changePage(name)} />
        )}
        {activePage === "Result" && (
          <ResultForm changePage={(name) => this.changePage(name)} />
        )}
      </React.Fragment>
    ) : (
      <Redirect to={{ pathname: "/login" }} />
    );
  }
}

function mapStateToProps({ login }) {
  return { login };
}

export default connect(mapStateToProps, { authUser })(Homepage);
