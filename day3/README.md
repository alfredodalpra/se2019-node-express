# APIs

In this part of the tutorial, we focus on using Express to develop a backend server exposing an API.

## Warming up

Let's dedicate the first 20 minutes of the class to revisit or practice the exercises that we've seen so far :)

- [Day1 exercises](../day1/exercises/README.md)
- [Day2 exercises](../day2/exercises/README.md)

## Express

Web framework for Node.js.
_Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications._ (Source: https://expressjs.com/). We will focus on Express version 4.

### Hello World!

The following snippet shows our hello world example using the `http` module:

```javascript
const http = require('http');
const port = 3000;

function requestHandler(request, response) {
  response.end('Hello World!');
}

let server = http.createServer(requestHandler);
server.listen(port, function() {
  console.log(`Server started, listening on port ${port}.`);
});
```

Now, let's rewrite our node server using express:

```javascript
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
```

There are a few interesting concepts that we can highlight in this trivial example:

- we can listen to specific http verbs (`app.get`)
- we can specify specific routes (`/`)

The above help us focus on the services that we want to implement, without worriying about
the logic for handling the request (e.g., checking manually that the request method is GET, and that the request url is '/'). Check the [API reference](http://expressjs.com/en/4x/api.html) to learn more about the properties and methods of the [Request](http://expressjs.com/en/4x/api.html#req) and [Response](http://expressjs.com/en/4x/api.html#res) objects.

### Serving static files

If we are asked to implement a way to serve static files, one alternative would be to:

- Check the request URL
- Look for the file in the local file system
- Check the type / format, and set the headers manually

This requires quite some work, fortunately express provides some standard way of managing common features like this one. Look at the example `mid-static`.

```javascript
const express = require('express');
const app = express();

const port = 3000;

// we mount the built-in static middleware
app.use('/', express.static('public'));

// Handling GET requests
app.get('/hello', function(req, res) {
  res.send('Hello World!');
});

app.listen(port, function() {
  console.log('Server running on port ', port);
});
```

What the above does is to mount the built-in `static` middleware, which facilitates the task of servicing static assets.

Run the script and then open [http://localhost:3000](http://localhost:3000) in your browser. What happens when you request the following?:

- [http://localhost:3000/hello](http://localhost:3000/hello)
- [http://localhost:3000/index.html](http://localhost:3000/index.html)
- [http://localhost:3000/image1.jpg](http://localhost:3000/image1.jpg)

You can decide where path in which the static files will be access, by simply specifying the root as first parameter in `app.use`:

```javascript
app.use('/static', express.static('public'));
```

### Express middleware

But what are middlewares?, and how do they work?. [Middleware](http://expressjs.com/en/guide/using-middleware.html) are functions that execute on each request to the server. A middleware is a function with the following signature:

```javascript
function (request, response, next) {
  // middleware code
}
```

From Express' documentation:

> Express is a routing and middleware web framework that has minimal functionality of its own: An Express application is essentially a series of middleware function calls.
> Middleware functions can perform the following tasks:
>
> - Execute any code.
> - Make changes to the request and the response objects.
> - End the request-response cycle.
> - Call the next middleware function in the stack.

So, as mentioned above, we can have any number of middleware functions, and each will execute in the order they were mounted with `app.use()`.

In the following example, we modified the hello world example and include a simple stack of middelware functions.

```javascript
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
```

To visualize what's going on, let's look at the following informative figure by [hannahhoward](https://github.com/hannahhoward):

[![](https://camo.githubusercontent.com/af25dcefb2d951a9925adfc0c2c11f9684e19c1e/687474703a2f2f61647269616e6d656a69612e636f6d2f696d616765732f657870726573732d6d6964646c6577617265732e706e67)](https://gist.github.com/hannahhoward/fe639ca2f6e95eaf0ede34a218e948f9)

### Handling requests from a browser

Serving requests to web forms can be done easily by extending our previous example in the following way (source code in [exercises/forms](./exercises/forms/)):

```javascript
const express = require('express');
const app = express();

// Loading utils to inspect the content of js objects
const util = require('util');

const port = 3000;

app.use('/', express.static('public'));

// Handling GET requests to /search
app.get('/search', function(req, res) {
  // we log the request headers
  console.log(util.inspect(req.headers, { showHidden: false, depth: null }));

  // we log the request URL
  console.log(util.inspect(req.url, { showHidden: false, depth: null }));

  // we log the parsed query parameters
  console.log(util.inspect(req.query, { showHidden: false, depth: null }));

  res.status(200).send('These are the items found!');
});

// Handling POST requests to /subscribe
app.post('/subscribe', function(req, res) {
  // we log the request headers
  console.log(util.inspect(req.headers, { showHidden: false, depth: null }));

  // TODO: how can we access the request data that the browser is sending us?

  res.status(201).send('You are now subscribed!');
});

app.listen(port, function() {
  console.log('Server running on port ', port);
});
```

Run the script of this skeleton. You can run it by issuing the following:

```
$ cd day3/exercises/forms
$ npm install
$ npm start
```

In the code you can see that we are listening to two different routes `subscribe` and `search`. Both rely on different HTTP verbs (post and get), and are built to serve the needs of two different types of requests. Let's open the example clients:

- http://localhost:3000/search.html
- http://localhost:3000/subscribe.html

Play with the above forms, submit some example requests and analyse what arrives to the server. Some points to discuss:

1. What do you think is the reason behind using GET / POST ?
2. How can we access the request data that the browser is sending us?

On the first point, there is nice an extensive discussion in [[1]](https://www.w3schools.com/tags/ref_httpmethods.asp), [[2]](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview). Apart from some obvious practical reasons, we'll discuss some more fundamental ones when we cover REST APIs on [day4](../day4/README.md).

On the second point, an alternative would be to process the request body by concatenating chunks from the stream (remember when we did this in the first day?) but that is not necessary, because the [body-parser](http://expressjs.com/en/resources/middleware/body-parser.html) middleware provides this funcionality already.

**Parsing request body content**

First, we install the library

```shell
npm install --save body-parser
```

and then add the following code to our forms app.js

```javascript
// Load the module
const bodyParser = require('body-parser');

// Mount body-parser middleware, and instruct it to
// process form url-encoded data
app.use(bodyParser.urlencoded({ extended: true }));
```

After doing this, we should be able to access the form data by directy using `req.body`

```javascript
console.log(req.body);
```

Notice that in this case we were parsing form data, but depending on the type of data
you want your service to handle, you'll need a different type of parsing. This post provides
a nice overview:

https://www.quora.com/What-exactly-does-body-parser-do-with-express-js-and-why-do-I-need-it

- bodyParser.raw(): Doesn't actually parse the body, but just exposes the buffered up contents from before in a Buffer on req.body.
- bodyParser.text(): Reads the buffer as plain text and exposes the resulting string on req.body.
- bodyParser.urlencoded(): Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST) and exposes the resulting object (containing the keys and values) on req.body. For comparison; in PHP all of this is automatically done and exposed in \$\_POST.
- bodyParser.json(): Parses the text as JSON and exposes the resulting object on req.body.

**What about HTTP status codes?**
You can read the following blog post, which summarizes nicely what each stands for and when to use them:
https://www.digitalocean.com/community/tutorials/how-to-troubleshoot-common-http-error-codes

- 1xx: Informational
- 2xx: Success
- 3xx: Redirection
- 4xx: Client Error
- 5xx: Server Error

### Exercises

1. Finish implementing the subcription service (function registerSubscriber), using the array of people as "database"
2. Finish implementing the search functionality (function searchPeople), looking for subscribers in the people array.

### Challenge

Create the Zlatan service, replicating the functionality of the Chuck Norris Internet Database, and using Google Spreadsheet as your database. Tip: You can use the link a downloaded CSV file (File -> Download as -> Comma Separated Values) and transform it to JSON.

## References and further reading

- https://ourcodeworld.com/articles/read/261/how-to-create-an-http-server-with-express-in-node-js
