const { createUser, getUsers, deleteUser } = require('../handlers/UsersHandler');

module.exports = app => {
    app.post('/users', createUser);
    app.get('/users', getUsers);
    app.delete('/users/:id', deleteUser);
}
  