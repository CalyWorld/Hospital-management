import { Doctor } from "../models/doctor";

interface UpdateDoctorPayload {
  firstName: string;
  lastName: string;
  gender: string;
  country: string;
  age: number;
  address: string;
}

export class DoctorService {
  async getAllDoctors() {
    return await Doctor.find().exec();
  }
  async getDoctorDetails(id: string) {
    return await Doctor.findById(id).populate("patients").exec();
  }
  async updateDoctorDetails(id: string, payload: UpdateDoctorPayload) {
    return await Doctor.findByIdAndUpdate(
      id,
      {
        firstName: payload.firstName,
        lastName: payload.lastName,
        gender: payload.gender,
        country: payload.country,
        age: payload.age,
        address: payload.address,
      },
      { new: true },
    ).exec();
  }
  async getDeleteDoctor(id: string) {
    return await Doctor.findByIdAndDelete(id).exec();
  }
}
