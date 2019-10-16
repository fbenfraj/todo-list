const { User } = require('../models/UserModel');

const createUser = (req, res) => {
  User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password
  });
  return res.send({
    createdUser: { email: req.body.email, password: req.body.password }
  });
};

const getUsers = (req, res) => {
  User.find({}, function(err, users) {
    var usersMap = {};
    users.forEach(function(user) {
      usersMap[user._id] = user;
    });
    res.send(usersMap);
  });
};

module.exports = {
  createUser,
  getUsers
};
