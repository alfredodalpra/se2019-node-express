/*
 * app.js
 * Main entry point of the forms project
 * This script shows how to create a server
 * that can handle request from web forms
 */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Loading utils to inspect the content of js objects
const util = require('util');

const port = 3000;

app.use('/', express.static('public'));

// Mount body-parser middleware, and instruct it to
// process form url-encoded data
// For further references, check body-parser docs at
// http://expressjs.com/en/resources/middleware/body-parser.html#bodyparserurlencodedoptions
app.use(bodyParser.urlencoded({ extended: true }));

let people = [
  { name: 'Mario Ferrari', email: 'fake@news.it' },
  { name: 'Carlo Smith', email: 'youreach@menot.it' },
  { name: 'Fabio Ferrari', email: 'email@email.com' }
];

// Exercise #1
function registerSubscriber(subscriber) {
  // put your code here
}

// Exercise #2
function searchPeople(filter) {
  // replece this function with your code
  return people;
}

/**
 * Tiny helper to render (output an HTML string) the given list of users.
 *
 * @param {Object[]} users
 * @return {String}
 */
function renderUserList(users) {
  let view = 'These are the items found! <br/><br />';

  for (let u of users) {
    view += `${u.name} - ${u.email} <br />`;
  }
  return view;
}

// Handling GET requests to /search
app.get('/search', function(req, res) {
  // we log the request headers
  console.log('req.headers');
  console.log(util.inspect(req.headers, { showHidden: false, depth: null }));

  // we log the request URL
  console.log('req.url');
  console.log(util.inspect(req.url, { showHidden: false, depth: null }));

  // we log the parsed query parameters
  console.log('req.query');
  console.log(util.inspect(req.query, { showHidden: false, depth: null }));

  const usersFound = searchPeople(req.query);

  res.status(200).send(renderUserList(usersFound));
});

// Handling POST requests to /subscribe
app.post('/subscribe', function(req, res) {
  // we log the request headers
  console.log('req.headers');
  console.log(util.inspect(req.headers, { showHidden: false, depth: null }));

  // we log the request body parsed automatically by body-parser
  console.log('req.body');
  console.log(util.inspect(req.body, { showHidden: false, depth: null }));

  registerSubscriber(req.body);

  res.status(201).send('You are now subscribed!');
});

app.listen(port, function() {
  console.log('Server running on port ', port);
});
