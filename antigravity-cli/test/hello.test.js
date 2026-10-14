const request = require('supertest');
const assert = require('assert');
const app = require('../app');

describe('GET /hello', () => {
  describe('Casos válidos', () => {
    it('debe devolver la respuesta JSON esperada cuando se envía name=Juan', async () => {
      const response = await request(app)
        .get('/hello?name=Juan')
        .expect('Content-Type', /json/)
        .expect(200);

      assert.deepStrictEqual(response.body, { message: 'Hello, Juan' });
    });
  });

  describe('Casos inválidos', () => {
    it('debe devolver 400 Bad Request y una respuesta con la propiedad error cuando falta el parámetro name', async () => {
      const response = await request(app)
        .get('/hello')
        .expect('Content-Type', /json/)
        .expect(400);

      assert.ok(response.body.error, 'La respuesta debe contener la propiedad error');
      assert.strictEqual(typeof response.body.error, 'string');
    });
  });
});
