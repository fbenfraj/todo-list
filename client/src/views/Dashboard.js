import React, { useState, useEffect } from "react";
import ButtonAppBar from "../components/ButtonAppBar";
import axios from "axios";

const Dashboard = () => {
  const [todo, setTodo] = useState("");
  const [todosList, setTodosList] = useState([]);

  useEffect(() => {
    async function fetchTodos() {
      const response = await axios.get("http://localhost:8000/todos");
      if (response.status === 200) {
        setTodosList(Object.values(response.data));
      }
    }
    fetchTodos();
  }, [todosList]);

  const Todos = () => {
    return todosList.map((value, index) => (
      <ul key={index}>
        <li>
          <label value={value.text} />
          <button>Delete</button>
        </li>
      </ul>
    ));
  };

  async function addTodo(e) {
    e.preventDefault();
    await axios.post("http://localhost:8000/todos", {
      user: "me",
      text: todo
    });
    setTodo("");
  }

  return (
    <div>
      <ButtonAppBar />
      <div>
        <form onSubmit={e => addTodo(e)} style={{ display: "flex", margin: 8 }}>
          <input
            type="text"
            id="standard-full-width"
            label="New TODO"
            placeholder="Add a new TODO here! :)"
            helperText="<3"
            value={todo}
            onChange={e => {
              setTodo(e.target.value);
            }}
            style={{ flexGrow: 1 }}
          />
          <button type="submit" style={{ margin: 15 }}>
            ADD
          </button>
        </form>
      </div>
      <div>
        <div>
          <Todos />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
