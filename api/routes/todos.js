const { createTodo } = require('../handlers/TodosHandler');

module.exports = app => {
    app.post('/todos', createTodo);
}