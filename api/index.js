const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));

app.get('/ping', (req, res) => {
  res.send("I'm alive! :)");
});

app.listen(8000, () => {
  console.log('Listening on port 8000...');
});
