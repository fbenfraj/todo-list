const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('../config');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));

mongoose.connect(
  `mongodb://localhost:${config['mongodb-port']}/todolist-epitech`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  () => {
    console.log(`Connected to MongoDB on port ${config['mongodb-port']}.`);
  }
);

app.get('/ping', (req, res) => {
  res.send("I'm alive! :)");
});

require('./routes/users')(app);
require('./routes/login')(app);
require('./routes/todos')(app);

app.listen(config['server-port'], () => {
  console.log(`Listening on port ${config['server-port']}...`);
});
