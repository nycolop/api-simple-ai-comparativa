const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('GET /hello', () => {
  it('should return a greeting message when name is provided', async () => {
    const res = await request(app).get('/hello?name=Juan');

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.message, 'Hello, Juan');
  });

  it('should return 400 when name is missing', async () => {
    const res = await request(app).get('/hello');

    assert.strictEqual(res.status, 400);
    assert.ok(res.body.error);
  });
});
