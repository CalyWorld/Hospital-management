import { HealthRecords } from "../models/records";

export class RecordService {
  async getPatientRecords(id: string) {
    return await HealthRecords.find({ patient: id })
      .populate("treatments")
      .exec();
  }
}
