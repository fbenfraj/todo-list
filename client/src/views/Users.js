import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import ButtonAppBar from '../components/ButtonAppBar';
import checkAuth from '../utils/auth';

const Users = () => {
  const [isLogged, setIsLogged] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    checkAuth() ? setIsLogged(true) : setIsLogged(false);
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      const response = await axios.get('http://localhost:8000/users');
      setUsers(Object.values(response.data));
    }
    fetchUsers();
  }, [users]);

  const deleteUser = async id => {
    await axios.delete('http://localhost:8000/users/' + id);
  };

  return (
    <>
      {isLogged ? <Redirect to='/users' /> : <Redirect to='/' />}
      <ButtonAppBar />
      <section className='users'>
        {users.map(user => (
          <ul key={user._id} className='users-item'>
            <li>
              <label>{user.email}</label>
              <button type='button' onClick={() => deleteUser(user._id)}>
                Delete
              </button>
            </li>
          </ul>
        ))}
      </section>
    </>
  );
};

export default Users;
