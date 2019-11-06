import React, { useState } from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/SignIn.scss';
import { setCookie } from '../utils/cookies';

export default function SignIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function authenticate(email, password) {
    const response = await axios.post('http://localhost:8000/login', {
      email,
      password
    });
    if (response.status === 200) {
      setCookie('JWT', response.data.token, 7);
      setIsLoggedIn(true);
    }
  }

  return (
    <>
      <Route
        exact
        path='/'
        render={() => (isLoggedIn ? <Redirect to='/dashboard' /> : null)}
      />
      <main className='login'>
        <h1 className='login-title'>Connexion</h1>
        <form
          className='login-form'
          onSubmit={e => {
            e.preventDefault();
            authenticate(email, password);
          }}
        >
          <input
            type='text'
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            placeholder='Email'
            autoFocus
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
          <input
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            placeholder='Mot de passe'
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
          <button type='submit' variant='contained' color='primary'>
            Connexion
          </button>
          <div>
            <div></div>
            <div>
              <Link to='/register' variant='body2'>
                {"Vous n'avez pas de compte?"}
              </Link>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}
