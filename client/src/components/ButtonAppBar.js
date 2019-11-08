import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { eraseCookie } from '../utils/cookies';
import jwt from 'jsonwebtoken';
import { getCookie } from '../utils/cookies';
import '../styles/ButtonAppBar.scss';

export default function ButtonAppBar() {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [toUsers, setToUsers] = useState(false);
  const [toDashboard, setToDashboard] = useState(false);
  const [user, setUser] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userJwt = getCookie('JWT');
    const content = jwt.decode(userJwt);
    console.log('Administrator mode: ' + content.isAdmin);
    setUser(content.email);
    setIsAdmin(content.isAdmin);
  }, []);

  const logout = () => {
    eraseCookie('JWT');
    setIsLoggedOut(true);
  };

  const goToUsers = () => {
    setToUsers(true);
  };

  const goToDashboard = () => {
    setToDashboard(true);
  };

  return (
    <>
      {isLoggedOut ? <Redirect to='/' /> : null}
      {toUsers ? <Redirect to='/users' /> : null}
      {toDashboard ? <Redirect to='/dashboard' /> : null}
      <nav>
        <h1>TODO LIST</h1>
        <h2>{user}</h2>
        {isAdmin && <strong>Admin</strong>}
        <div>
          {isAdmin && (
            <button type='button' onClick={goToDashboard}>
              Todos
            </button>
          )}
          {isAdmin && (
            <button type='button' onClick={goToUsers}>
              Users
            </button>
          )}
          <button onClick={logout}>Logout</button>
        </div>
      </nav>
    </>
  );
}
