import { Treatment } from "../models/treatment";

export class TreatmentService {
  async getTotalFees() {
    return await Treatment.find().populate("medication").exec();
  }
  async getDoctorTreatments(id: string) {
    return await Treatment.find({ doctor: id }).populate("doctor").exec();
  }
}
