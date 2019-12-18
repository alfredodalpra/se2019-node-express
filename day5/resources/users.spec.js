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

test('user.add should throw if name is missing', () => {
  let user = {
    email: 'mario@example.com'
  };
  
  expect(() => {
    users.add(user);
  }).toThrow('name is required');
});
