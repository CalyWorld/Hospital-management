import mongoose, { Schema, Types, Model } from "mongoose";

export interface IAppointment {
  patient: Schema.Types.ObjectId;
  doctor: Schema.Types.ObjectId;
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
