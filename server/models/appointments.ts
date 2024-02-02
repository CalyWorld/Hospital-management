import mongoose, { Schema, Model, Types } from "mongoose";

export interface IAppointment {
  patient: Types.ObjectId;
  doctor: Types.ObjectId;
  date: Date;
  status: "Scheduled" | "Completed" | "Cancelled";
}

const appointmentSchema = new Schema<IAppointment>({
  patient: [{ type: Schema.Types.ObjectId, ref: "Patient" }],
  doctor: [{ type: Schema.Types.ObjectId, ref: "Doctor" }],
  date: Date,
  status: {
    type: String,
    enum: ["Scheduled", "Completed", "Cancelled"],
    default: "Scheduled",
  },
});

export const Appointment: Model<IAppointment> = mongoose.model(
  "Appointment",
  appointmentSchema,
);
