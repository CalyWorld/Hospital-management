import mongoose, { Schema, Model, Types } from "mongoose";
import { IImage } from "./admin";
export interface IPatient {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  image: IImage;
  gender: string;
  country: string;
  address: string;
  phoneBook: number;
  age: number;
  createdAt: Date;
  doctor: Types.ObjectId[];
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
  createdAt: { type: Date, required: true },
  doctor: [{ type: Schema.Types.ObjectId, ref: "Doctor" }],
});

export const Patient: Model<IPatient> = mongoose.model(
  "Patient",
  patientSchema,
);
