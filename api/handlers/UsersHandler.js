const { User } = require('../models/UserModel');
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
  const hashedPassword = await bcrypt
    .genSalt(10)
    .then(salt =>
      bcrypt.hash(req.body.password, salt).then(async hash => {
        return hash;
      })
    )
    .catch(error => console.log('Error create User', error));
  const newUser = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hashedPassword,
    isAdmin: req.body.isAdmin
  };
  User.create(newUser);
  console.log('New user created', newUser);
  return res.send({
    createdUser: newUser
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
