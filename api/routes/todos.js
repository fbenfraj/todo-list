const {
  createTodo,
  getTodos,
  getTodosByUser,
  updateTodo,
  deleteTodo
} = require('../handlers/TodosHandler');

module.exports = app => {
  app.post('/todos', createTodo);
  app.get('/todos', getTodos);
  app.get('/todos/:user', getTodosByUser);
  app.put('/todos/:id', updateTodo);
  app.delete('/todos/:id', deleteTodo);
};
