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

module.exports = {
  createTodo
};
