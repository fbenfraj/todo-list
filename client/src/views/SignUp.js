import React, { useState } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import '../styles/SignUp.scss';

export default function SignUp() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [toLogin, setToLogin] = useState(false);

  const createUser = async (firstname, lastname, email, password) => {
    const response = await axios.post('http://localhost:8000/users', {
      firstname,
      lastname,
      email,
      password,
      isAdmin
    });
    if (response.status === 200) {
      setToLogin(true);
    }
  };

  return (
    <div>
      <Route
        exact
        path='/register'
        render={() => (toLogin ? <Redirect to='/' /> : null)}
      />
      <main className='register'>
        <h1 className='register-title'>Nouveau compte</h1>
        <form
          className='register-form'
          onSubmit={e => {
            e.preventDefault();
            createUser(firstname, lastname, email, password);
          }}
        >
          <div>
            <input
              type='text'
              autoComplete='fname'
              name='firstName'
              id='firstName'
              label='First Name'
              autoFocus
              placeholder='Nom'
              onChange={e => {
                setFirstname(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type='text'
              id='lastName'
              label='Last Name'
              name='lastName'
              autoComplete='lname'
              placeholder='Prénom'
              onChange={e => {
                setLastname(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type='text'
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              placeholder='Email'
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
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
          </div>
          <div>
            <input
              type='radio'
              id='classic'
              name='role'
              onChange={e => {
                e.target.checked ? setIsAdmin(false) : setIsAdmin(true);
              }}
              defaultChecked
            />
            <label htmlFor='classic'>Classique</label>
            <input
              type='radio'
              id='admin'
              name='role'
              onChange={e => {
                e.target.checked ? setIsAdmin(true) : setIsAdmin(false);
              }}
            />
            <label htmlFor='admin'>Admin</label>
          </div>
          <button type='submit'>Créer</button>
          <div>
            <div>
              <Link to='/' variant='body2'>
                Vous avez déjà un compte?
              </Link>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
