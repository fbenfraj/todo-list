import React, { useState, useEffect } from 'react';
import ButtonAppBar from '../components/ButtonAppBar';
import axios from 'axios';
import '../styles/Dashboard.scss';

const Dashboard = () => {
  const [todo, setTodo] = useState('');
  const [todosList, setTodosList] = useState([]);

  useEffect(() => {
    async function fetchTodos() {
      const response = await axios.get('http://localhost:8000/todos');
      if (response.status === 200) {
        setTodosList(Object.values(response.data));
      }
    }
    fetchTodos();
  }, [todosList]);

  async function addTodo(e) {
    e.preventDefault();
    await axios.post('http://localhost:8000/todos', {
      user: 'me',
      text: todo
    });
    setTodo('');
  }

  async function deleteTodo(id) {
    await axios.delete('http://localhost:8000/todos/' + id);
  }

  return (
    <>
      <ButtonAppBar />
      <section className='dashboard-form'>
        <form onSubmit={e => addTodo(e)}>
          <input
            type='text'
            id='standard-full-width'
            label='New TODO'
            placeholder='Add a new TODO here! :)'
            value={todo}
            onChange={e => {
              setTodo(e.target.value);
            }}
            style={{ flexGrow: 1 }}
          />
          <button type='submit' style={{ margin: 15 }}>
            ADD
          </button>
        </form>
      </section>
      <section className='todos'>
        {todosList.map(value => (
          <ul key={value._id} className='todos-item'>
            <li>
              <input
                type='checkbox'
                checked={value.done ? true : false}
                onChange={async e => {
                  await axios.put('http://localhost:8000/todos/' + value._id, {
                    user: value.user,
                    text: value.text,
                    done: e.target.checked
                  });
                }}
              />
              <label>{value.text}</label>
              <button type='button' onClick={() => deleteTodo(value._id)}>
                Delete
              </button>
            </li>
          </ul>
        ))}
      </section>
    </>
  );
};

export default Dashboard;
