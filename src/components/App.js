import React, { Component } from 'react';
import { connect } from "react-redux";
import { BrowserRouter, Route } from 'react-router-dom';
import { AppWrapper } from './styledComponents'
import * as actions from './../actions';

import Header from './Header';
import Homepage from './HomePage';
import Loginpage from './LoginPage';
import NewForm from './Form/NewForm';

class App extends Component {
  componentDidMount() {
    this.props.authUser();
  }

  render() {
    return (
      <BrowserRouter>
        <AppWrapper>
          <Header />
          <Route exact path="/" component={Homepage} />
          <Route exact path="/login" component={Loginpage} />
          <Route exact path="/new-item" component={NewForm} />
        </AppWrapper>
      </BrowserRouter>
    );
  }
}

export default  connect(null, actions)(App);
