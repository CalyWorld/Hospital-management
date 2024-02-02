import mongoose, { Schema, Model } from "mongoose";

export interface IPatient {
  username: string;
  password: string;
}

const patientSchema = new Schema<IPatient>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export const Patient: Model<IPatient> = mongoose.model(
  "Patient",
  patientSchema,
);
