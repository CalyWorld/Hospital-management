import { Appointment } from "../models/appointments";

export class AppointmentService {
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
