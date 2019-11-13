/*
 * app.js
 * Main entry point of the hello project
 * This script starts a simply hello world server
 */
const express = require('express');
const app = express();

const port = 3000;

app.use((req, resp, next) => {
  console.log('first middleware');
  next();
});

app.use((req, resp, next) => {
  console.log('second middleware');
  next();
});

// Handling GET requests
app.get('/hello', function(req, res) {
  res.send('Hello World!');
});

app.listen(port, function() {
  console.log('Server running on port ', port);
});
