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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
class AdminController {
    constructor(adminService, doctorService, patientService, treatmentService, medicationService, recordService, appointmentService) {
        this.adminService = adminService;
        this.doctorService = doctorService;
        this.patientService = patientService;
        this.treatmentService = treatmentService;
        this.medicationService = medicationService;
        this.recordService = recordService;
        this.appointmentService = appointmentService;
    }
    sendServerError(res, message, error) {
        console.log(error);
        res.status(500).json({ message });
    }
    //get admin method in adminController
    getAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.isAuthenticated()) {
                try {
                    //calls the action which is service and passes its params into the action
                    const adminUser = yield this.adminService.getAdmin(req);
                    res.status(200).json(adminUser);
                }
                catch (err) {
                    console.log(err);
                    res.status(500).send("Error fetching admin");
                }
            }
            else {
                res.status(401).send("Unauthorized");
            }
        });
    }
    //get all doctors method in adminController
    getAllDoctors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //calls the action which is service and passes its params into the action
                const allDoctors = yield this.doctorService.getAllDoctors();
                res.status(200).json(allDoctors);
            }
            catch (err) {
                console.log(err);
                res.status(500).send("Error fetching all doctors");
            }
        });
    }
    //get doctorDetails method in adminController
    getDoctorDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //calls the action which is service and passes its params into the action
                const doctorDetails = yield this.doctorService.getDoctorDetails(req.params.doctorId);
                res.status(200).json(doctorDetails);
            }
            catch (err) {
                console.log(err);
                res.status(500).send("Error fetching all doctors");
            }
        });
    }
    //update doctor details
    updateDoctorDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, lastName, gender, country, age, address } = req.body;
                if (!firstName ||
                    !lastName ||
                    !gender ||
                    !country ||
                    typeof age !== "number" ||
                    !address) {
                    res.status(400).json({ message: "Missing required doctor fields" });
                    return;
                }
                const updatedDoctor = yield this.doctorService.updateDoctorDetails(req.params.doctorId, { firstName, lastName, gender, country, age, address });
                if (!updatedDoctor) {
                    res.status(404).json({ message: "Doctor not found" });
                    return;
                }
                res.status(200).json(updatedDoctor);
            }
            catch (err) {
                this.sendServerError(res, "Error updating doctor details", err);
            }
        });
    }
    //deletes doctor
    getDeleteDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //calls the action which is service and passes its params into the action
                const deletedDoctor = yield this.doctorService.getDeleteDoctor(req.params.doctorId);
                if (!deletedDoctor) {
                    res.status(404).json({ message: "Doctor not found" });
                    return;
                }
                res.status(200).json({ message: "Doctor deleted" });
            }
            catch (err) {
                this.sendServerError(res, "Error deleting specific doctor", err);
            }
        });
    }
    //get doctor appointments
    getDoctorAppointments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //calls the action which is service and passes its params into the action
            try {
                const doctorAppointments = yield this.appointmentService.getDoctorAppointments(req.params.doctorId);
                res.status(200).json(doctorAppointments);
            }
            catch (err) {
                console.log(err);
                res.status(500).send("Error getting doctor appointments");
            }
        });
    }
    //get doctor treatments
    getDoctorTreatments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //calls the action which is service and passes its params into the action
                const doctorTreatments = yield this.treatmentService.getDoctorTreatments(req.params.doctorId);
                res.status(200).json(doctorTreatments);
            }
            catch (err) {
                console.log(err);
                res.status(500).send("Error getting doctor treatments");
            }
        });
    }
    //get all patients
    getAllPatients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //calls the action which is service
                const allPatients = yield this.patientService.getAllPatients();
                res.status(200).json(allPatients);
            }
            catch (err) {
                console.log(err);
                res.status(500).send("Error getting all patients");
            }
        });
    }
    //get patient detail
    getPatientDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //calls the action which is service and passes its params into the action
                const allPatients = yield this.patientService.getPatientDetails(req.params.patientId);
                res.status(200).json(allPatients);
            }
            catch (err) {
                console.log(err);
                res.status(500).send("Error getting all patients");
            }
        });
    }
    //update patient details
    updatePatientDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, lastName, gender, country, age, address, phoneBook } = req.body;
                if (!firstName ||
                    !lastName ||
                    !gender ||
                    !country ||
                    typeof age !== "number" ||
                    !address ||
                    typeof phoneBook !== "number") {
                    res.status(400).json({ message: "Missing required patient fields" });
                    return;
                }
                const updatedPatient = yield this.patientService.updatePatientDetails(req.params.patientId, { firstName, lastName, gender, country, age, address, phoneBook });
                if (!updatedPatient) {
                    res.status(404).json({ message: "Patient not found" });
                    return;
                }
                res.status(200).json(updatedPatient);
            }
            catch (err) {
                this.sendServerError(res, "Error updating patient details", err);
            }
        });
    }
    //delete patient
    deletePatient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedPatient = yield this.patientService.deletePatient(req.params.patientId);
                if (!deletedPatient) {
                    res.status(404).json({ message: "Patient not found" });
                    return;
                }
                res.status(200).json({ message: "Patient deleted" });
            }
            catch (err) {
                this.sendServerError(res, "Error deleting patient", err);
            }
        });
    }
    //get patient medication
    getPatientMedications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //calls the action which is service and passes its params into the action
                const patientMedication = yield this.medicationService.getPatientMedications(req.params.medicationId);
                res.status(200).json(patientMedication);
            }
            catch (err) {
                console.log(err);
                res.status(500).send("Error getting patient medication");
            }
        });
    }
    //get patient records
    getPatientRecords(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //calls the action which is service and passes its params into the action
                const patientRecords = yield this.recordService.getPatientRecords(req.params.patientId);
                res.status(200).json(patientRecords);
            }
            catch (err) {
                console.log(err);
                res.status(500).send("Error getting patient records");
            }
        });
    }
    //get patient appointments
    getPatientAppointments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //calls the action which is service and passes its params into the action
                const patientAppointments = yield this.appointmentService.getPatientAppointments(req.params.patientId);
                res.status(200).json(patientAppointments);
            }
            catch (err) {
                console.log(err);
                res.status(500).send("Error getting patient appointments");
            }
        });
    }
    //get patient appointments by date
    getPatientAppointmentsByDate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //calls the action which is service and passes its params into the action
                const patientAppointmentsByDate = yield this.appointmentService.getPatientAppointmentsByDate(req.params.date);
                res.status(200).json(patientAppointmentsByDate);
            }
            catch (err) {
                console.log(err);
                res.status(500).send("Error getting patient appointments by date");
            }
        });
    }
    //create appointment
    createAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, doctorId, patientId, startDate, endDate } = req.body;
                if (!title || !doctorId || !patientId || !startDate || !endDate) {
                    res.status(400).json({ message: "Missing required appointment fields" });
                    return;
                }
                const appointment = yield this.appointmentService.createAppointment({
                    title,
                    doctorId,
                    patientId,
                    startDate,
                    endDate,
                });
                res.status(201).json(appointment);
            }
            catch (err) {
                const message = err instanceof Error ? err.message : "Error creating appointment";
                const clientErrors = new Set([
                    "Doctor not found",
                    "Patient not found",
                    "Invalid appointment date",
                    "Appointment end date must be after start date",
                ]);
                const statusCode = clientErrors.has(message) ? 400 : 500;
                res.status(statusCode).json({ message });
            }
        });
    }
    //get total fees for dashboard
    getTotalFees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //calls the action which is service
                const totalFees = yield this.treatmentService.getTotalFees();
                res.status(200).json(totalFees);
            }
            catch (err) {
                console.log(err);
                res.status(500).send("Error getting total fees");
            }
        });
    }
}
exports.AdminController = AdminController;
