import express, { Request, Response } from "express";
import passport from "passport";
import { AdminController } from "../controllers/adminController";
import { AdminService } from "../services/adminService";
import { DoctorService } from "../services/doctorService";
import asyncHandler from "express-async-handler";
import { AppointmentService } from "../services/appointmentService";
import { MedicationService } from "../services/medicationService";
import { PatientService } from "../services/patientService";
import { RecordService } from "../services/recordService";
import { TreatmentService } from "../services/treatmentService";

const router = express.Router();
const adminService = new AdminService();
const doctorService = new DoctorService();
const patientService = new PatientService();
const appointmentService = new AppointmentService();
const medicationService = new MedicationService();
const recordService = new RecordService();
const treatmentService = new TreatmentService();
const adminController = new AdminController(
  adminService,
  doctorService,
  patientService,
  treatmentService,
  medicationService,
  recordService,
  appointmentService,
);

// Admin Routes
router.get(
  "/api/admin",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req: Request, res: Response) =>
    adminController.getAdmin(req, res),
  ),
);

// Doctor Routes
router.get(
  "/api/admin/doctor",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req: Request, res: Response) =>
    adminController.getAllDoctors(req, res),
  ),
);
router.get(
  "/api/admin/doctor/appointments/:doctorId",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req: Request, res: Response) =>
    adminController.getDoctorAppointments(req, res),
  ),
);
router.post(
  "/api/admin/appointment",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req: Request, res: Response) =>
    adminController.createAppointment(req, res),
  ),
);
router.get(
  "/api/admin/doctor/treatments/:doctorId",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req: Request, res: Response) =>
    adminController.getDoctorTreatments(req, res),
  ),
);
router.get(
  "/api/admin/doctor/:doctorId",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req: Request, res: Response) =>
    adminController.getDoctorDetails(req, res),
  ),
);
router.patch(
  "/api/admin/doctor/:doctorId",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req: Request, res: Response) =>
    adminController.updateDoctorDetails(req, res),
  ),
);
router.delete(
  "/api/admin/doctor/:doctorId/delete",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req: Request, res: Response) =>
    adminController.getDeleteDoctor(req, res),
  ),
);

// Patient Routes
router.get(
  "/api/admin/patient",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req: Request, res: Response) =>
    adminController.getAllPatients(req, res),
  ),
);
router.get(
  "/api/admin/patient/appointments/:patientId",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req: Request, res: Response) =>
    adminController.getPatientAppointments(req, res),
  ),
);
router.get(
  "/api/admin/patient/records/:patientId",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req: Request, res: Response) =>
    adminController.getPatientRecords(req, res),
  ),
);
router.get(
  "/api/admin/patient/medications/:medicationId",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req: Request, res: Response) =>
    adminController.getPatientMedications(req, res),
  ),
);
router.get(
  "/api/admin/patient/:patientId",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req: Request, res: Response) =>
    adminController.getPatientDetails(req, res),
  ),
);
router.patch(
  "/api/admin/patient/:patientId",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req: Request, res: Response) =>
    adminController.updatePatientDetails(req, res),
  ),
);
router.delete(
  "/api/admin/patient/:patientId/delete",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req: Request, res: Response) =>
    adminController.deletePatient(req, res),
  ),
);
router.get(
  "/api/admin/patients/appointments/:date",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req: Request, res: Response) =>
    adminController.getPatientAppointmentsByDate(req, res),
  ),
);
// General Routes
router.get(
  "/api/admin/totalFees",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req: Request, res: Response) =>
    adminController.getTotalFees(req, res),
  ),
);

module.exports = router;
