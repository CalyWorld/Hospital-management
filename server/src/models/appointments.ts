import mongoose, { Schema, Model } from "mongoose";
import { IPatient } from "./patient";
import { IDoctor } from "./doctor";

export interface IAppointment {
  patient: IPatient;
  doctor: IDoctor;
  date: Date;
  status: "Scheduled" | "Completed" | "Cancelled";
}

const appointmentSchema = new Schema<IAppointment>({
  patient: { type: Schema.Types.ObjectId, ref: "Patient" },
  doctor: { type: Schema.Types.ObjectId, ref: "Doctor" },
  date: Date,
  status: {
    type: String,
    enum: ["Scheduled", "Completed", "Cancelled"],
    default: "Scheduled",
  },
});

export const Message: Model<IAppointment> = mongoose.model(
  "Appointment",
  appointmentSchema,
);
