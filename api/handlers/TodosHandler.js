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

const updateTodo = (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, req.body, (err, todo) => {
    if (err) return res.status(500).send(err);
    const response = {
      message: 'Todo successfully updated',
      todo: req.body
    };
    console.log('Todo updated', req.body);
    return res.status(200).send(response);
  });
};

const deleteTodo = (req, res) => {
  Todo.findByIdAndRemove(req.params.id, (err, todo) => {
    if (err) return res.status(500).send(err);
    const response = {
      message: 'Todo successfully deleted',
      id: req.params.id
    };
    console.log('Todo deleted', req.params.id);
    return res.status(200).send(response);
  });
};

module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
};
