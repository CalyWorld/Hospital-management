import { Doctor } from "../models/doctor";

export class DoctorService {
  async getAllDoctors() {
    return await Doctor.find().exec();
  }
  async getDoctorDetails(id: string) {
    return await Doctor.findById(id).populate("patients").exec();
  }
  async getDeleteDoctor(id: string) {
    return await Doctor.findByIdAndDelete(id).exec();
  }
}
