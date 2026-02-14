"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const adminController_1 = require("../controllers/adminController");
const adminService_1 = require("../services/adminService");
const doctorService_1 = require("../services/doctorService");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const appointmentService_1 = require("../services/appointmentService");
const medicationService_1 = require("../services/medicationService");
const patientService_1 = require("../services/patientService");
const recordService_1 = require("../services/recordService");
const treatmentService_1 = require("../services/treatmentService");
const router = express_1.default.Router();
const adminService = new adminService_1.AdminService();
const doctorService = new doctorService_1.DoctorService();
const patientService = new patientService_1.PatientService();
const appointmentService = new appointmentService_1.AppointmentService();
const medicationService = new medicationService_1.MedicationService();
const recordService = new recordService_1.RecordService();
const treatmentService = new treatmentService_1.TreatmentService();
const adminController = new adminController_1.AdminController(adminService, doctorService, patientService, treatmentService, medicationService, recordService, appointmentService);
// Admin Routes
router.get("/api/admin", passport_1.default.authenticate("jwt", { session: false }), (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { return adminController.getAdmin(req, res); })));
// Doctor Routes
router.get("/api/admin/doctor", passport_1.default.authenticate("jwt", { session: false }), (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { return adminController.getAllDoctors(req, res); })));
router.get("/api/admin/doctor/appointments/:doctorId", passport_1.default.authenticate("jwt", { session: false }), (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { return adminController.getDoctorAppointments(req, res); })));
router.post("/api/admin/appointment", passport_1.default.authenticate("jwt", { session: false }), (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { return adminController.createAppointment(req, res); })));
router.get("/api/admin/doctor/treatments/:doctorId", passport_1.default.authenticate("jwt", { session: false }), (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { return adminController.getDoctorTreatments(req, res); })));
router.get("/api/admin/doctor/:doctorId", passport_1.default.authenticate("jwt", { session: false }), (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { return adminController.getDoctorDetails(req, res); })));
router.patch("/api/admin/doctor/:doctorId", passport_1.default.authenticate("jwt", { session: false }), (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { return adminController.updateDoctorDetails(req, res); })));
router.delete("/api/admin/doctor/:doctorId/delete", passport_1.default.authenticate("jwt", { session: false }), (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { return adminController.getDeleteDoctor(req, res); })));
// Patient Routes
router.get("/api/admin/patient", passport_1.default.authenticate("jwt", { session: false }), (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { return adminController.getAllPatients(req, res); })));
router.get("/api/admin/patient/appointments/:patientId", passport_1.default.authenticate("jwt", { session: false }), (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { return adminController.getPatientAppointments(req, res); })));
router.get("/api/admin/patient/records/:patientId", passport_1.default.authenticate("jwt", { session: false }), (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { return adminController.getPatientRecords(req, res); })));
router.get("/api/admin/patient/medications/:medicationId", passport_1.default.authenticate("jwt", { session: false }), (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { return adminController.getPatientMedications(req, res); })));
router.get("/api/admin/patient/:patientId", passport_1.default.authenticate("jwt", { session: false }), (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { return adminController.getPatientDetails(req, res); })));
router.patch("/api/admin/patient/:patientId", passport_1.default.authenticate("jwt", { session: false }), (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { return adminController.updatePatientDetails(req, res); })));
router.delete("/api/admin/patient/:patientId/delete", passport_1.default.authenticate("jwt", { session: false }), (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { return adminController.deletePatient(req, res); })));
router.get("/api/admin/patients/appointments/:date", passport_1.default.authenticate("jwt", { session: false }), (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { return adminController.getPatientAppointmentsByDate(req, res); })));
// General Routes
router.get("/api/admin/totalFees", passport_1.default.authenticate("jwt", { session: false }), (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { return adminController.getTotalFees(req, res); })));
module.exports = router;
