import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { eraseCookie } from '../utils/cookies';
import '../styles/ButtonAppBar.scss';

export default function ButtonAppBar() {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [toUsers, setToUsers] = useState(false);

  const logout = () => {
    eraseCookie('JWT');
    setIsLoggedOut(true);
  };

  const goToUsers = () => {
    setToUsers(true);
  }

  return (
    <>
      <Route
        exact
        path='/dashboard'
        render={() => (isLoggedOut ? <Redirect to='/' /> : null)}
      />
      {toUsers ? <Redirect to='/users' /> : null }
      <nav>
        <h1>TODO LIST</h1>
        <div>
          <button type='button' onClick={goToUsers}>Users</button>
          <button onClick={logout}>Logout</button>
        </div>
      </nav>
    </>
  );
}
