import { Medication } from "../models/medication";

export class MedicationService {
  async getPatientMedications(id: string) {
    return await Medication.findById(id).exec();
  }
}
