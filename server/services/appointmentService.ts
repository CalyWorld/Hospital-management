import { Appointment } from "../models/appointments";
import { Doctor } from "../models/doctor";
import { Patient } from "../models/patient";

interface CreateAppointmentInput {
  title: string;
  doctorId: string;
  patientId: string;
  startDate: string;
  endDate: string;
}

export class AppointmentService {
  async createAppointment({
    title,
    doctorId,
    patientId,
    startDate,
    endDate,
  }: CreateAppointmentInput) {
    const [doctor, patient] = await Promise.all([
      Doctor.findById(doctorId).exec(),
      Patient.findById(patientId).exec(),
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

    const createdAppointment = await Appointment.create({
      title,
      doctor: doctorId,
      patient: patientId,
      startDate: start,
      endDate: end,
      status: "Scheduled",
    });

    return await Appointment.findById(createdAppointment._id)
      .populate("doctor patient")
      .exec();
  }

  async getDoctorAppointments(id: string) {
    return await Appointment.find({ doctor: id }).populate("patient").exec();
  }
  async getPatientAppointments(id: string) {
    return await Appointment.find({ patient: id }).populate("doctor").exec();
  }
  async getPatientAppointmentsByDate(date: string) {
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);

    return await Appointment.find({
      startDate: {
        $gte: startOfDay.toISOString(),
      },
      endDate: {
        $lte: endOfDay.toISOString(),
      },
    })
      .populate("doctor patient")
      .exec();
  }
}
