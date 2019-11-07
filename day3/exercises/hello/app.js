/*
 * app.js
 * Main entry point of the hello project
 * This script starts a simply hello world server
 */
const express = require('express');
const app = express();

const port = 3000;

// Handling GET requests
app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.listen(port, function() {
  console.log('Server running on port ', port);
});
