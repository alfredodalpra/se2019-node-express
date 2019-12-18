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
