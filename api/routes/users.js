const { createUser, getUsers } = require('../handlers/UsersHandler');

module.exports = app => {
    app.post('/users', createUser);
    app.get('/users', getUsers);
}
  