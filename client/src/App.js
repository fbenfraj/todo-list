import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import Dashboard from './views/Dashboard';

function App() {
  return (
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
        </Switch>
      </Router>
  );
}

export default App;
