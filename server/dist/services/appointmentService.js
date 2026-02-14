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
exports.AppointmentService = void 0;
const appointments_1 = require("../models/appointments");
const doctor_1 = require("../models/doctor");
const patient_1 = require("../models/patient");
class AppointmentService {
    createAppointment(_a) {
        return __awaiter(this, arguments, void 0, function* ({ title, doctorId, patientId, startDate, endDate, }) {
            const [doctor, patient] = yield Promise.all([
                doctor_1.Doctor.findById(doctorId).exec(),
                patient_1.Patient.findById(patientId).exec(),
            ]);
            if (!doctor) {
                throw new Error("Doctor not found");
            }
            if (!patient) {
                throw new Error("Patient not found");
            }
            const start = new Date(startDate);
            const end = new Date(endDate);
            if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
                throw new Error("Invalid appointment date");
            }
            if (end <= start) {
                throw new Error("Appointment end date must be after start date");
            }
            const createdAppointment = yield appointments_1.Appointment.create({
                title,
                doctor: doctorId,
                patient: patientId,
                startDate: start,
                endDate: end,
                status: "Scheduled",
            });
            return yield appointments_1.Appointment.findById(createdAppointment._id)
                .populate("doctor patient")
                .exec();
        });
    }
    getDoctorAppointments(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield appointments_1.Appointment.find({ doctor: id }).populate("patient").exec();
        });
    }
    getPatientAppointments(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield appointments_1.Appointment.find({ patient: id }).populate("doctor").exec();
        });
    }
    getPatientAppointmentsByDate(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const startOfDay = new Date(date);
            startOfDay.setUTCHours(0, 0, 0, 0);
            const endOfDay = new Date(date);
            endOfDay.setUTCHours(23, 59, 59, 999);
            return yield appointments_1.Appointment.find({
                startDate: {
                    $gte: startOfDay.toISOString(),
                },
                endDate: {
                    $lte: endOfDay.toISOString(),
                },
            })
                .populate("doctor patient")
                .exec();
        });
    }
}
exports.AppointmentService = AppointmentService;
