const { loginUser } = require('../handlers/LoginHandler');

module.exports = app => {
    app.post('/login', loginUser);
}