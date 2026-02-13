import { Patient } from "../models/patient";

interface UpdatePatientPayload {
  firstName: string;
  lastName: string;
  gender: string;
  country: string;
  age: number;
  address: string;
  phoneBook: number;
}

export class PatientService {
  async getAllPatients() {
    return await Patient.find().exec();
  }
  async getPatientDetails(id: string) {
    return await Patient.findById(id).populate("doctor").exec();
  }
  async updatePatientDetails(id: string, payload: UpdatePatientPayload) {
    return await Patient.findByIdAndUpdate(
      id,
      {
        firstName: payload.firstName,
        lastName: payload.lastName,
        gender: payload.gender,
        country: payload.country,
        age: payload.age,
        address: payload.address,
        phoneBook: payload.phoneBook,
      },
      { new: true },
    ).exec();
  }
  async deletePatient(id: string) {
    return await Patient.findByIdAndDelete(id).exec();
  }
}
