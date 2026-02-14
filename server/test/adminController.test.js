const assert = require('node:assert/strict');
const { AdminController } = require('../controllers/adminController.ts');

function createRes() {
  return {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.body = data;
      return this;
    },
    send(data) {
      this.body = data;
      return this;
    },
  };
}

function createController(overrides = {}) {
  const adminService = {
    getAdmin: async () => ({ username: 'admin' }),
    ...(overrides.adminService || {}),
  };

  const doctorService = {
    getAllDoctors: async () => [{ _id: 'd1' }],
    getDoctorDetails: async (id) => ({ _id: id }),
    getDeleteDoctor: async () => ({ _id: 'd1' }),
    ...(overrides.doctorService || {}),
  };

  const patientService = {
    getAllPatients: async () => [{ _id: 'p1' }],
    getPatientDetails: async (id) => ({ _id: id }),
    deletePatient: async () => ({ _id: 'p1' }),
    ...(overrides.patientService || {}),
  };

  const treatmentService = {
    getDoctorTreatments: async () => [{ _id: 't1' }],
    getTotalFees: async () => ({ total: 100 }),
    ...(overrides.treatmentService || {}),
  };

  const medicationService = {
    getPatientMedications: async () => [{ _id: 'm1' }],
    ...(overrides.medicationService || {}),
  };

  const recordService = {
    getPatientRecords: async () => [{ _id: 'r1' }],
    ...(overrides.recordService || {}),
  };

  const appointmentService = {
    getDoctorAppointments: async () => [{ _id: 'a1' }],
    getPatientAppointments: async () => [{ _id: 'a2' }],
    getPatientAppointmentsByDate: async () => [{ _id: 'a3' }],
    ...(overrides.appointmentService || {}),
  };

  return new AdminController(
    adminService,
    doctorService,
    patientService,
    treatmentService,
    medicationService,
    recordService,
    appointmentService,
  );
}

describe('AdminController', () => {
  it('returns admin when authenticated', async () => {
    const controller = createController();
    const req = { isAuthenticated: () => true };
    const res = createRes();

    await controller.getAdmin(req, res);

    assert.equal(res.statusCode, 200);
    assert.deepEqual(res.body, { username: 'admin' });
  });

  it('returns unauthorized for unauthenticated admin', async () => {
    const controller = createController();
    const req = { isAuthenticated: () => false };
    const res = createRes();

    await controller.getAdmin(req, res);

    assert.equal(res.statusCode, 401);
    assert.equal(res.body, 'Unauthorized');
  });

  it('handles doctor endpoints', async () => {
    const controller = createController();

    let req = { params: { doctorId: 'doc-1' } };
    let res = createRes();
    await controller.getDoctorDetails(req, res);
    assert.equal(res.statusCode, 200);
    assert.deepEqual(res.body, { _id: 'doc-1' });

    req = { params: { doctorId: 'doc-1' } };
    res = createRes();
    await controller.getDoctorAppointments(req, res);
    assert.deepEqual(res.body, [{ _id: 'a1' }]);

    req = { params: { doctorId: 'doc-1' } };
    res = createRes();
    await controller.getDoctorTreatments(req, res);
    assert.deepEqual(res.body, [{ _id: 't1' }]);

    req = { params: { doctorId: 'doc-1' } };
    res = createRes();
    await controller.getDeleteDoctor(req, res);
    assert.equal(res.statusCode, 200);
    assert.deepEqual(res.body, { message: 'Doctor deleted' });
  });

  it('handles patient endpoints', async () => {
    const controller = createController();

    let req = { params: { patientId: 'pat-1' } };
    let res = createRes();
    await controller.getPatientDetails(req, res);
    assert.deepEqual(res.body, { _id: 'pat-1' });

    req = { params: { patientId: 'pat-1' } };
    res = createRes();
    await controller.getPatientAppointments(req, res);
    assert.deepEqual(res.body, [{ _id: 'a2' }]);

    req = { params: { patientId: 'pat-1' } };
    res = createRes();
    await controller.getPatientRecords(req, res);
    assert.deepEqual(res.body, [{ _id: 'r1' }]);

    req = { params: { medicationId: 'med-1' } };
    res = createRes();
    await controller.getPatientMedications(req, res);
    assert.deepEqual(res.body, [{ _id: 'm1' }]);

    req = { params: { date: '2026-02-13' } };
    res = createRes();
    await controller.getPatientAppointmentsByDate(req, res);
    assert.deepEqual(res.body, [{ _id: 'a3' }]);
  });

  it('returns 404 when delete doctor/patient target is missing', async () => {
    const controller = createController({
      doctorService: {
        getDeleteDoctor: async () => null,
      },
      patientService: {
        deletePatient: async () => null,
      },
    });

    let req = { params: { doctorId: 'doc-404' } };
    let res = createRes();
    await controller.getDeleteDoctor(req, res);
    assert.equal(res.statusCode, 404);
    assert.deepEqual(res.body, { message: 'Doctor not found' });

    req = { params: { patientId: 'pat-404' } };
    res = createRes();
    await controller.deletePatient(req, res);
    assert.equal(res.statusCode, 404);
    assert.deepEqual(res.body, { message: 'Patient not found' });
  });

  it('returns collection and total endpoints', async () => {
    const controller = createController();

    let req = {};
    let res = createRes();
    await controller.getAllDoctors(req, res);
    assert.deepEqual(res.body, [{ _id: 'd1' }]);

    req = {};
    res = createRes();
    await controller.getAllPatients(req, res);
    assert.deepEqual(res.body, [{ _id: 'p1' }]);

    req = {};
    res = createRes();
    await controller.getTotalFees(req, res);
    assert.deepEqual(res.body, { total: 100 });
  });
});
