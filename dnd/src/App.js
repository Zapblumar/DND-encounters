import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './App.css';
import Login from './components/Login/index2';
import LogOut from './components/LogOut'
import Signup from './components/Signup/index1';
import NotFound from './components/notFound';
import Home from './components/home';
import Chat from './components/Chat';
import Character from './components/Characters';
import Payment from "./components/Payment";
import Nav from './components/Navbar';
import Footer from './components/Footer';
import Auth from './utils/auth';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = Auth.getToken()
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


function App() {


  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Nav />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/character/:user?" component={Character} />
              <Route exact path="/chat/:id?" component={Chat} />

              <Route component={NotFound} />
            </Switch>
          </div>
          <Footer><Route exact path="/Payment" component={Payment} /></Footer>
        </div>
      </Router>

    </ApolloProvider>
  );

}

export default App;
{/* <div>
 
</div>
  );
} */}