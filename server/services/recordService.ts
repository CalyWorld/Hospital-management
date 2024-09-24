import { HealthRecord } from "../models/healthRecords";

export class RecordService {
  async getPatientRecords(id: string) {
    return await HealthRecord.find({ patient: id })
      .populate("treatments")
      .exec();
  }
}
