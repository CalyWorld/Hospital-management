import express from "express";
import AdminController from "../controllers/adminController";
import asyncHandler from "express-async-handler";

const router = express.Router();
const adminController = AdminController;

// Admin Routes
router.get(
  "/api/admin",
  asyncHandler(adminController.getAdmin.bind(adminController)),
);

// Doctor Routes
router.get(
  "/api/admin/doctor",
  asyncHandler(adminController.getAllDoctors.bind(adminController)),
);
router.get(
  "/api/admin/doctor/appointments/:doctorId",
  asyncHandler(adminController.getDoctorAppointments.bind(adminController)),
);
router.get(
  "/api/admin/doctor/treatments/:doctorId",
  asyncHandler(adminController.getDoctorTreatments.bind(adminController)),
);
router.get(
  "/api/admin/doctor/:doctorId",
  asyncHandler(adminController.getDoctorDetails.bind(adminController)),
);
router.delete(
  "/api/admin/doctor/:doctorId/delete",
  asyncHandler(adminController.deleteDoctor.bind(adminController)),
);

// Patient Routes
router.get(
  "/api/admin/patient",
  asyncHandler(adminController.getAllPatients.bind(adminController)),
);
router.get(
  "/api/admin/patient/appointments/:patientId",
  asyncHandler(adminController.getPatientAppointments.bind(adminController)),
);
router.get(
  "/api/admin/patient/records/:patientId",
  asyncHandler(adminController.getPatientRecords.bind(adminController)),
);
router.get(
  "/api/admin/patient/medications/:medicationId",
  asyncHandler(adminController.getPatientMedications.bind(adminController)),
);
router.get(
  "/api/admin/patient/:patientId",
  asyncHandler(adminController.getPatientDetails.bind(adminController)),
);

// General Routes
router.get(
  "/api/admin/totalFees",
  asyncHandler(adminController.getTotalFees.bind(adminController)),
);
router.get(
  "/api/admin/patients/appointments/:date",
  asyncHandler(
    adminController.getPatientAppointmentsByDate.bind(adminController),
  ),
);

module.exports = router;
