import mongoose, { Schema, Model, Types } from "mongoose";
import { IImage } from "./superAdmin";

export interface IPatient {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  image: IImage;
  gender: string;
  country: string;
  address?: string;
  phoneBook?: number;
  age: number;
  createdAt: Date;
  hospital: Types.ObjectId; // Reference to Hospital
  doctor?: Types.ObjectId[]; // References to Doctors
  __v?: number;
  _id?: string;
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
  address: { type: String },
  phoneBook: { type: Number },
  age: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  hospital: { type: Schema.Types.ObjectId, ref: "Hospital", required: true }, // Reference to Hospital
  doctor: [{ type: Schema.Types.ObjectId, ref: "Doctor" }], // References to Doctors
});

export const Patient: Model<IPatient> = mongoose.model(
  "Patient",
  patientSchema,
);
