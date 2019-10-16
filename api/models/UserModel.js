const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname: 'string',
    lastname: 'string',
    email: 'string',
    password: 'string'
})

const User = mongoose.model('User', UserSchema);

module.exports = {
    User
}