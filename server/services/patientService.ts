import { Patient } from "../models/patient";

export class PatientService {
  async getAllPatients() {
    return await Patient.find().exec();
  }
  async getPatientDetails(id: string) {
    return await Patient.findById(id).populate("doctor").exec();
  }
}
