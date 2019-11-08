const { User } = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../config');

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      const foundUser = await User.findOne({ email: email });
      if (!foundUser) {
        res.status(404).send({ message: 'User not found.' });
      } else {
        const userPassword = foundUser.password;
        const isAdmin = foundUser.isAdmin;
        bcrypt.compare(password, userPassword).then(result => {
          if (result) {
            const token = jwt.sign({ email, isAdmin }, config['secret'], {
              expiresIn: '24h'
            });
            console.log('User logged in:', foundUser.email);
            res.status(200).send({ token: token });
          } else {
            res.status(401).json({ message: 'Incorrect password' });
          }
        });
      }
    } else throw 'Missing parameters.';
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  loginUser
};
