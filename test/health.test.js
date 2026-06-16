process.env.NODE_ENV = 'development';
process.env.DB_ENGINE = 'sqlite';
process.env.SQLITE_STORAGE = ':memory:';
process.env.JWT_SECRET = 'test-secret-for-testing';

const assert = require('assert');
const app = require('../index');

let server;
let baseUrl;

before((done) => {
  server = app.listen(0, () => {
    const { port } = server.address();
    baseUrl = `http://localhost:${port}`;
    done();
  });
});

after((done) => {
  if (server) server.close(done);
});

describe('GET /health', () => {
  it('should return 200 with status ok', async () => {
    const res = await fetch(`${baseUrl}/health`);
    const body = await res.json();
    assert.strictEqual(res.status, 200);
    assert.strictEqual(body.status, 'ok');
    assert.strictEqual(body.environment, 'development');
  });
});

describe('GET /nonexistent', () => {
  it('should return 404 JSON', async () => {
    const res = await fetch(`${baseUrl}/nonexistent`);
    const body = await res.json();
    assert.strictEqual(res.status, 404);
    assert.strictEqual(body.error, 'Not Found');
    assert.ok(body.message.includes('/nonexistent'));
  });
});
