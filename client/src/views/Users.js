import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ButtonAppBar from '../components/ButtonAppBar';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await axios.get('http://localhost:8000/users');
      setUsers(Object.values(response.data));
    }
    fetchUsers();
  }, [users]);

  return (
    <>
      <ButtonAppBar />
      <section className='users'>
        {users.map(user => (
          <ul key={user._id} className='users-item'>
            <li>
              <label>{user.email}</label>
              {/* <button type='button' onClick={() => deleteTodo(user._id)}>
                Delete
              </button> */}
            </li>
          </ul>
        ))}
      </section>
    </>
  );
};

export default Users;
