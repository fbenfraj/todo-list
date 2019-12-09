const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// const config = require('../config');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));

mongoose.connect(
  `mongodb://localhost:27017/todolist-epitech`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  () => {
    console.log(`Connected to MongoDB on port 27017.`);
  }
);

app.get('/ping', (req, res) => {
  res.send("I'm alive! :)");
});

require('./routes/users')(app);
require('./routes/login')(app);
require('./routes/todos')(app);

app.listen(8000, () => {
  console.log(`Listening on port 8000...`);
});
