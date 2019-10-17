const { User } = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      const foundUser = await User.findOne({ email: email });
      if (!foundUser) {
        res.status(404).send({ message: 'User not found.' });
      } else {
        const userPassword = foundUser.password;
        bcrypt.compare(password, userPassword).then(result => {
          console.log(userPassword, password);
          if (result) {
            // const token = jwt.sign({ email }, config["secret"], {
            //     expiresIn: '24h'
            // })
            // res.status(200).send(token);
            console.log('ok');
          } else {
            // res.status(401).json({ message: 'Incorrect password' });
            console.log(result);
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
