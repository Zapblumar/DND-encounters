import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Profile from './conponents/profile';
import Dashboard from './conponents/dashboard';
import Login from './conponents/login'
import Signup from './conponents/signup';
import NotFound from './conponents/notFound';

export default class App extends Component {
  render() {
    //JSX
    return (


      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="" component={NotFound} />

        </Switch>

      </Router>
    );
  }
}

export default App;
