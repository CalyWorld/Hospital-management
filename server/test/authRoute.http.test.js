const express = require('express');
const net = require('node:net');
const request = require('supertest');
const assert = require('node:assert/strict');
const bcrypt = require('bcryptjs');
const { Admin } = require('../models/admin.ts');

process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';
const authRouter = require('../routes/authRoute.ts');

describe('authRoute HTTP', () => {
  let app;
  let originalFindOne;
  let originalCompare;
  let canListen = true;

  before(function (done) {
    const server = net.createServer();
    server.on('error', (error) => {
      if (error && error.code === 'EPERM') {
        canListen = false;
        this.skip();
        done();
        return;
      }
      done(error);
    });
    server.listen(0, '127.0.0.1', () => {
      server.close(() => done());
    });
  });

  beforeEach(() => {
    if (!canListen) {
      return;
    }
    app = express();
    app.use(express.json());
    app.use(authRouter);

    originalFindOne = Admin.findOne;
    originalCompare = bcrypt.compare;
  });

  afterEach(() => {
    Admin.findOne = originalFindOne;
    bcrypt.compare = originalCompare;
  });

  it('returns 401 for unknown admin username', async () => {
    Admin.findOne = async () => null;

    const response = await request(app).post('/api/admin/login').send({
      username: 'missing-user',
      password: 'pw',
    });

    assert.equal(response.status, 401);
    assert.deepEqual(response.body, { message: 'incorrect admin Username' });
  });

  it('returns 401 for wrong password', async () => {
    Admin.findOne = async () => ({
      _id: 'admin-1',
      username: 'admin',
      password: 'hashed',
    });
    bcrypt.compare = async () => false;

    const response = await request(app).post('/api/admin/login').send({
      username: 'admin',
      password: 'wrong',
    });

    assert.equal(response.status, 401);
    assert.deepEqual(response.body, { message: 'incorrect admin password' });
  });

  it('returns token and admin details for valid credentials', async () => {
    Admin.findOne = async () => ({
      _id: 'admin-1',
      username: 'admin',
      password: 'hashed',
    });
    bcrypt.compare = async () => true;

    const response = await request(app).post('/api/admin/login').send({
      username: 'admin',
      password: 'valid-password',
    });

    assert.equal(response.status, 200);
    assert.deepEqual(response.body.admin, { id: 'admin-1', username: 'admin' });
    assert.equal(typeof response.body.token, 'string');
    assert.equal(response.body.token.length > 10, true);
  });
});
