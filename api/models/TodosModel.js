const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    user: 'string',
    text: 'string',
    done: Boolean
})

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = {
    Todo
}