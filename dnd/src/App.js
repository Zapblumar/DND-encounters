import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Profile from './components/profile';
import Dashboard from './components/dashboard';
import Login from './components/login'
import Signup from './components/signup';
import NotFound from './components/notFound';
import Home from './components/home';
import Chat from './components/chat';

function App() {

  //JSX
  return (


    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/chat" component={Chat} />
        <Route path="" component={NotFound} />

      </Switch>

    </Router>
  );
}

export default App;


