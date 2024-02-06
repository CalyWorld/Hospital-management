import mongoose, { Schema, Model } from "mongoose";
import { IImage } from "./admin";
export interface IPatient {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  image: IImage;
  gender: string;
  country: string;
  age: number;
  createdAT: Date;
}

const patientSchema = new Schema<IPatient>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  image: {
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true },
  },
  gender: { type: String, required: true },
  country: { type: String, required: true },
  age: { type: Number, required: true },
  createdAT: { type: Date, required: true },
});

export const Patient: Model<IPatient> = mongoose.model(
  "Patient",
  patientSchema,
);
