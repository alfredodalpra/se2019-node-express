# Testing with Jest

This part of the tutorial focuses on introducing [Jest](https://jestjs.io/) for testing our applications.

The following theoretical sections come from [The art of software testing](https://www.amazon.com/Art-Software-Testing-Glenford-Myers/dp/1118031962).

## What is software testing?

> Testing is the process of executing a program with the intent of finding errors.

## Test strategies

- Black-box Testing
  > One important testing strategy is black-box testing (also known as data-driven or input/output-driven testing). To use this method, view the program as a black box. Your goal is to be completely unconcerned about the internal behavior and structure of the program. Instead concentrate on finding circumstances in which the program does not behave according to its specifications.

* White-box Testing
  > Another testing strategy, white-box (or logic-driven) testing, permits you to examine the internal structure of the program. This strategy derives test data from an examination of the program’s logic (and often, unfortunately, at the neglect of the specification).

## Types of tests

- Unit test
- Integration test
- End-to-end test
- and much more :)

In this tutorial, we will focus on writing unit and integration tests using Jest.

## Jest

[Jest](https://jestjs.io/en/) is a javascript testing framework, it works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more.

## Installing Jest

It is straightforward to install jest, just issue the following:

```
npm install --save-dev jest
```

## Writing unit tests with Jest

For Jest, it does not matter whether your test is a unit test or an integration test.

> Unit testing is a software testing method by which individual units of source code, sets of one or more computer program modules together with associated control data, usage procedures, and operating procedures, are tested to determine whether they are fit for use.
> source: [Wikipedia](https://en.wikipedia.org/wiki/Unit_testing).

Let's assume we have the following we want to test the function `add` in the `users.js` module.

```javascript
let users = [];

module.exports = {
  add
};

function add(user) {
  if (!user.name) {
    throw new Error('name is required');
  }

  if (!user.email) {
    throw new Error('email is required');
  }
  const newUser = {
    id: users.length + 1,
    name: user.name,
    email: user.email
  };
  users.push(newUser);
  return newUser;
}
```

So, the following code tests the `add` function from the users module.

```javascript
const users = require('./users');

test('user.add should store the user in the database', () => {
  let user = {
    name: 'Mario',
    email: 'mario@example.com'
  };

  let userCreated = users.add(user);
  expect(userCreated.id).toBeDefined();
  expect(userCreated.name).toBe(user.name);
  expect(userCreated.email).toBe(user.email);
});
```

By convention, we write such code in the file `users.spec.js`. To run the test you could do:

```
npm test
```

This command uses the `test script` defined in the `package.json` file.

### Description of a test

We define a test using the `test` function, which has the following signature:

```javascript
test('description of the test', function() {
  // the definition of your test.
});
```

### Matchers

Jest offer us [matchers](https://jestjs.io/docs/en/using-matchers) to test values in many different ways. Essentially, when we test, we `expect` values to `match` something. So the matchers in our example are `toBeDefined`, `toBe`. Please head over the [Matchers](https://jestjs.io/docs/en/using-matchers) documentation for further reference.

In the following test, we check for proper Exception handling.

```javascript
test('user.add should throw if name is missing', () => {
  let user = {
    email: 'mario@example.com'
  };

  expect(() => {
    users.add(user);
  }).toThrow('name is required');
});
```

[As mentioned in Jest's documentation](https://jestjs.io/docs/en/expect#tothrowerror): _You must wrap the code in a function, otherwise the error will not be caught and the assertion will fail_.

## Testing Asynchronous Code

We can test asynchronous code by using `callbacks`, `promises` or `async/await`. The following examples were extracted from [Jest's documentation](https://jestjs.io/docs/en/asynchronous).

### Callbacks

```javascript
test('the data is peanut butter', done => {
  function callback(data) {
    expect(data).toBe('peanut butter');
    done();
  }

  fetchData(callback);
});
```

Here, we use the `done` callback. You should call `done` to let Jest know that your async code has finished.

### Promises

```javascript
test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});
```

In the example above, we assume `fetchData` now returns a Promise, which Jest supports out of the box.

We use `promise.catch` when we expect our promise to fail:

```javascript
test('the fetch fails with an error', () => {
  expect.assertions(1);
  return fetchData().catch(e => expect(e).toMatch('error'));
});
```

The [expect.assertions](https://jestjs.io/docs/en/expect#expectassertionsnumber) line we use to control how many "checks" (e.g., assertions) we perform. We generally use `expect.assertions` when we test async code.

### Async/Await

To use the async/await syntax we need to put the `async` keyword in front of our function that defines our test.

```javascript
test('the data is peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});
```

We can use try/catch for testing error handling.

```javascript
test('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch('error');
  }
});
```

## Integration tests with Jest

As we mentioned previously, Jest does not concern about unit or integration tests. Here, we describe how we could write tests for modules that depend on other modules.

Let's assume we want to test the following `POST /users` service:

```javascript
app.post('/users', async (req, res) => {
  let newUser = users.add(req.body);
  res.status(200);
  res.json(newUser);
});
```

As you may notice, the service relies on the `users.add` function. The following is a simple test for this service (defined in `app.spec.js`).

```javascript
const request = require('supertest');
const app = require('./app');

test('POST /users should store a new user and return 200', async () => {
  const payload = {
    name: 'Mario',
    email: 'm@gmail.com'
  };

  const response = await request(app)
    .post('/users')
    .send(payload);

  expect(response.status).toBe(200);
  expect(response.header['content-type']).toMatch(/json/);
  expect(response.body.id).toBeDefined();
  expect(response.body.name).toBe(payload.name);
  expect(response.body.email).toBe(payload.email);
});
```

We import an instance of our API (`app`), and we use the [supertest](https://github.com/visionmedia/supertest) library to make the HTTP calls to our API. This can also be done by using the `node-fetch` library (or other HTTP clients) and making sure our API is running before starting our tests.

## Further readings

* Mock functions: https://jestjs.io/docs/en/mock-functions
* Setup and Teardown: https://jestjs.io/docs/en/setup-teardown
* Configuring Jest: https://jestjs.io/docs/en/configuration


## Exercise

You can start adding tests to your project as an exercise :)