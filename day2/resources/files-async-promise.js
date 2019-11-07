/*
 * files-async-promise.js
 *
 * Example of asynchronous access to files, using Promises.
 */

// Loading the file system library
const fs = require('fs').promises;

// File name from the common line params
const fileName = process.argv[2];

// Accessing the content of the file asynchnously
let promise = fs.readFile(fileName, 'utf8');

function onSuccess(data) {
  console.log(data);
  console.log('Program ended.');
}

function onError(error) {
  console.error(error);
}

promise.then(onSuccess).catch(onError);
