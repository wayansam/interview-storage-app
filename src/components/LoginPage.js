import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import { fetchUser } from "./../actions";
import { LoginWrapper, LoginFormWrapper } from "./styledComponents";

class Loginpage extends Component {
  state = {
    Username: "",
    Password: "",
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  render() {
    const { Username, Password } = this.state;
    const { login, statusLoad } = this.props;
    return login && login !== "" ? (
      <Redirect to={{ pathname: "/" }} />
    ) : (
      <LoginWrapper>
        <h3>Welcome to this Apps!</h3>
        <LoginFormWrapper>
          <Form
            loading={statusLoad === "loading"}
            onSubmit={() => this.props.fetchUser(Username, Password)}
          >
            <Form.Input
              label="Username"
              placeholder="Userame"
              name="Username"
              value={Username}
              onChange={this.handleChange}
            />
            <Form.Input
              type="password"
              label="Password"
              placeholder="Password"
              name="Password"
              value={Password}
              onChange={this.handleChange}
            />
            <Button type="submit">Login</Button>
          </Form>
        </LoginFormWrapper>
      </LoginWrapper>
    );
  }
}
function mapStateToProps({ login, statusLoad }) {
  return { login, statusLoad };
}

export default connect(mapStateToProps, { fetchUser })(Loginpage);
