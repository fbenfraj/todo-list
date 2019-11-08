import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import Dashboard from './views/Dashboard';
import Users from './views/Users';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/'>
            <SignIn />
          </Route>
          <Route exact path='/register'>
            <SignUp />
          </Route>
          <Route exact path='/dashboard'>
            <Dashboard />
          </Route>
          <Route exact path='/users'>
            <Users />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
