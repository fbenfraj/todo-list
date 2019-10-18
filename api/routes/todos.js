const { createTodo, getTodos } = require('../handlers/TodosHandler');

module.exports = app => {
    app.post('/todos', createTodo);
    app.get('/todos', getTodos);
}