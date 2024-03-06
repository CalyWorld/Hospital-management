import mongoose, { Schema, Model, Types } from "mongoose";

export interface IAppointment {
  title: string;
  patient: Types.ObjectId;
  doctor: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  status: "Scheduled" | "Completed" | "Cancelled";
}

const appointmentSchema = new Schema<IAppointment>({
  title: { type: String, required: true },
  patient: { type: Schema.Types.ObjectId, ref: "Patient" },
  doctor: { type: Schema.Types.ObjectId, ref: "Doctor" },
  startDate: Date,
  endDate: Date,
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
