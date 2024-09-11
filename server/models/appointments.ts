import mongoose, { Schema, Model, Types } from "mongoose";

export interface IAppointment {
  title: string;
  patient: Types.ObjectId; // Reference to Patient
  doctor: Types.ObjectId; // Reference to Doctor
  startDate: Date;
  endDate: Date;
  status: "Scheduled" | "Completed" | "Cancelled";
  createdAt: Date;
}

const appointmentSchema = new Schema<IAppointment>({
  title: { type: String, required: true },
  patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true }, // Reference to Patient
  doctor: { type: Schema.Types.ObjectId, ref: "Doctor", required: true }, // Reference to Doctor
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Scheduled", "Completed", "Cancelled"],
    default: "Scheduled",
  },
  createdAt: { type: Date, default: Date.now },
});

export const Appointment: Model<IAppointment> = mongoose.model(
  "Appointment",
  appointmentSchema,
);
