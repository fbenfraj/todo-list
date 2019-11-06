const { createTodo, getTodos, deleteTodo } = require('../handlers/TodosHandler');

module.exports = app => {
    app.post('/todos', createTodo);
    app.get('/todos', getTodos);
    app.delete('/todos/:id', deleteTodo);
}