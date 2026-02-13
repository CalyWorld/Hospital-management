const express = require('express');
const net = require('node:net');
const request = require('supertest');
const assert = require('node:assert/strict');

const passport = require('passport');
const { AppointmentService } = require('../services/appointmentService.ts');
const { DoctorService } = require('../services/doctorService.ts');
const { PatientService } = require('../services/patientService.ts');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  return next();
};

describe('adminRoute HTTP', () => {
  let app;
  let adminRouter;
  let canListen = true;

  const originalAuthenticate = passport.authenticate;
  const originalCreateAppointment = AppointmentService.prototype.createAppointment;
  const originalGetPatientAppointmentsByDate =
    AppointmentService.prototype.getPatientAppointmentsByDate;
  const originalUpdateDoctorDetails = DoctorService.prototype.updateDoctorDetails;
  const originalUpdatePatientDetails = PatientService.prototype.updatePatientDetails;
  const originalDeletePatient = PatientService.prototype.deletePatient;

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

  beforeEach(function () {
    if (!canListen) {
      this.skip();
      return;
    }
    passport.authenticate = () => authMiddleware;

    delete require.cache[require.resolve('../routes/adminRoute.ts')];
    adminRouter = require('../routes/adminRoute.ts');

    app = express();
    app.use(express.json());
    app.use(adminRouter);
  });

  afterEach(() => {
    passport.authenticate = originalAuthenticate;
    AppointmentService.prototype.createAppointment = originalCreateAppointment;
    AppointmentService.prototype.getPatientAppointmentsByDate =
      originalGetPatientAppointmentsByDate;
    DoctorService.prototype.updateDoctorDetails = originalUpdateDoctorDetails;
    PatientService.prototype.updatePatientDetails = originalUpdatePatientDetails;
    PatientService.prototype.deletePatient = originalDeletePatient;
  });

  it('returns 401 for admin routes when missing bearer token', async () => {
    const response = await request(app).post('/api/admin/appointment').send({});

    assert.equal(response.status, 401);
    assert.deepEqual(response.body, { message: 'Unauthorized' });
  });

  it('POST /api/admin/appointment validates payload', async () => {
    const response = await request(app)
      .post('/api/admin/appointment')
      .set('Authorization', 'Bearer test-token')
      .send({ title: 'Checkup' });

    assert.equal(response.status, 400);
    assert.deepEqual(response.body, { message: 'Missing required appointment fields' });
  });

  it('POST /api/admin/appointment creates appointment', async () => {
    AppointmentService.prototype.createAppointment = async () => ({
      _id: 'appt-1',
      title: 'Checkup',
      status: 'Scheduled',
    });

    const response = await request(app)
      .post('/api/admin/appointment')
      .set('Authorization', 'Bearer test-token')
      .send({
        title: 'Checkup',
        doctorId: 'doctor-1',
        patientId: 'patient-1',
        startDate: '2026-02-13T09:00:00.000Z',
        endDate: '2026-02-13T09:30:00.000Z',
      });

    assert.equal(response.status, 201);
    assert.equal(response.body._id, 'appt-1');
    assert.equal(response.body.title, 'Checkup');
  });

  it('POST /api/admin/appointment returns 400 when service throws', async () => {
    AppointmentService.prototype.createAppointment = async () => {
      throw new Error('Doctor not found');
    };

    const response = await request(app)
      .post('/api/admin/appointment')
      .set('Authorization', 'Bearer test-token')
      .send({
        title: 'Checkup',
        doctorId: 'doctor-1',
        patientId: 'patient-1',
        startDate: '2026-02-13T09:00:00.000Z',
        endDate: '2026-02-13T09:30:00.000Z',
      });

    assert.equal(response.status, 400);
    assert.deepEqual(response.body, { message: 'Doctor not found' });
  });

  it('PATCH /api/admin/doctor/:doctorId validates payload', async () => {
    const response = await request(app)
      .patch('/api/admin/doctor/doc-1')
      .set('Authorization', 'Bearer test-token')
      .send({ firstName: 'Ana' });

    assert.equal(response.status, 400);
    assert.deepEqual(response.body, { message: 'Missing required doctor fields' });
  });

  it('PATCH /api/admin/doctor/:doctorId returns 404 when doctor not found', async () => {
    DoctorService.prototype.updateDoctorDetails = async () => null;

    const response = await request(app)
      .patch('/api/admin/doctor/doc-1')
      .set('Authorization', 'Bearer test-token')
      .send({
        firstName: 'Ana',
        lastName: 'Park',
        gender: 'female',
        country: 'US',
        age: 44,
        address: '123 Main',
      });

    assert.equal(response.status, 404);
    assert.deepEqual(response.body, { message: 'Doctor not found' });
  });

  it('PATCH /api/admin/doctor/:doctorId updates doctor', async () => {
    DoctorService.prototype.updateDoctorDetails = async (doctorId, details) => ({
      _id: doctorId,
      ...details,
    });

    const response = await request(app)
      .patch('/api/admin/doctor/doc-1')
      .set('Authorization', 'Bearer test-token')
      .send({
        firstName: 'Ana',
        lastName: 'Park',
        gender: 'female',
        country: 'US',
        age: 44,
        address: '123 Main',
      });

    assert.equal(response.status, 200);
    assert.equal(response.body._id, 'doc-1');
    assert.equal(response.body.firstName, 'Ana');
  });

  it('PATCH /api/admin/patient/:patientId validates payload', async () => {
    const response = await request(app)
      .patch('/api/admin/patient/pat-1')
      .set('Authorization', 'Bearer test-token')
      .send({ firstName: 'John' });

    assert.equal(response.status, 400);
    assert.deepEqual(response.body, { message: 'Missing required patient fields' });
  });

  it('PATCH /api/admin/patient/:patientId returns 404 when patient not found', async () => {
    PatientService.prototype.updatePatientDetails = async () => null;

    const response = await request(app)
      .patch('/api/admin/patient/pat-1')
      .set('Authorization', 'Bearer test-token')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        gender: 'male',
        country: 'US',
        age: 38,
        address: '404 Elm',
        phoneBook: 1234567890,
      });

    assert.equal(response.status, 404);
    assert.deepEqual(response.body, { message: 'Patient not found' });
  });

  it('PATCH /api/admin/patient/:patientId updates patient', async () => {
    PatientService.prototype.updatePatientDetails = async (patientId, details) => ({
      _id: patientId,
      ...details,
    });

    const response = await request(app)
      .patch('/api/admin/patient/pat-1')
      .set('Authorization', 'Bearer test-token')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        gender: 'male',
        country: 'US',
        age: 38,
        address: '404 Elm',
        phoneBook: 1234567890,
      });

    assert.equal(response.status, 200);
    assert.equal(response.body._id, 'pat-1');
    assert.equal(response.body.firstName, 'John');
  });

  it('DELETE /api/admin/patient/:patientId/delete removes patient', async () => {
    let deletedId = null;
    PatientService.prototype.deletePatient = async (patientId) => {
      deletedId = patientId;
    };

    const response = await request(app)
      .delete('/api/admin/patient/pat-1/delete')
      .set('Authorization', 'Bearer test-token');

    assert.equal(response.status, 200);
    assert.equal(deletedId, 'pat-1');
    assert.deepEqual(response.body, { message: 'Patient deleted' });
  });

  it('GET /api/admin/patients/appointments/:date returns appointments', async () => {
    AppointmentService.prototype.getPatientAppointmentsByDate = async (date) => [
      { _id: 'a1', date },
      { _id: 'a2', date },
    ];

    const response = await request(app)
      .get('/api/admin/patients/appointments/2026-02-13')
      .set('Authorization', 'Bearer test-token');

    assert.equal(response.status, 200);
    assert.equal(response.body.length, 2);
    assert.equal(response.body[0]._id, 'a1');
  });

  it('GET /api/admin/patients/appointments/:date returns 500 on failure', async () => {
    AppointmentService.prototype.getPatientAppointmentsByDate = async () => {
      throw new Error('db failure');
    };

    const response = await request(app)
      .get('/api/admin/patients/appointments/2026-02-13')
      .set('Authorization', 'Bearer test-token');

    assert.equal(response.status, 500);
    assert.equal(response.text, 'Error getting patient appointments by date');
  });
});
