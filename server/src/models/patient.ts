import mongoose, { Schema, Types, Model } from "mongoose";
import { IRecord } from "./records";
import { IMessage } from "./messages";
import { IAppointment } from "./appointments";
import { IDoctor } from "./doctor";

export interface IPatient {
  username: string;
  password: string;
  healthRecords: IRecord;
  doctor: IDoctor;
  messages: IMessage;
  appointments: IAppointment;
}

const patientSchema = new Schema<IPatient>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  healthRecords: { type: Schema.Types.ObjectId, ref: "Records" },
  doctor: { type: Schema.Types.ObjectId, ref: "Doctor" },
  messages: { type: Schema.Types.ObjectId, ref: "Messages" },
  appointments: { type: Schema.Types.ObjectId, ref: "Appointment" },
});

export const Patient: Model<IPatient> = mongoose.model(
  "Patient",
  patientSchema,
);
