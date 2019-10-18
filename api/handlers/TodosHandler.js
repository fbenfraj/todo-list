const { Todo } = require('../models/TodosModel');

const createTodo = async (req, res) => {
  const newTodo = {
    user: req.body.user,
    text: req.body.text,
    done: false
  };
  Todo.create(newTodo);
  console.log('New todo created', newTodo);
  return res.send({
    createdTodo: newTodo
  });
};

const getTodos = (req, res) => {
  Todo.find({}, function(err, todos) {
    var todosMap = {};
    todos.forEach(function(todo) {
      todosMap[todo._id] = todo;
    });
    res.send(todosMap);
  });
};

module.exports = {
  createTodo,
  getTodos
};
