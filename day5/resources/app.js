const express = require('express');
const bodyParser = require('body-parser');

const users = require('./users');

const app = express();
app.use(bodyParser.json());

app.post('/users', async (req, res) => {
  let newUser = users.add(req.body);
  res.status(200);
  res.json(newUser);
});

module.exports = app;
