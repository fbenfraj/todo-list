const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname: 'string',
    lastname: 'string',
    email: 'string',
    password: 'string',
    isAdmin: Boolean
})

const User = mongoose.model('User', UserSchema);

module.exports = {
    User
}