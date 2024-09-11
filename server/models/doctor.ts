import mongoose, { Schema, Model, Types } from "mongoose";
import { IImage } from "./superAdmin";

export interface IDoctor {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  image: IImage;
  gender: string;
  country: string;
  age: number;
  specialization?: string; // Optional field for specialization
  startDate?: Date;
  endDate?: Date;
  startTime?: Date;
  endTime?: Date;
  address?: string;
  phoneBook: number;
  createdAt: Date;
  hospital: Types.ObjectId; // Reference to Hospital
  patients?: Types.ObjectId[]; // References to Patients
  __v?: number;
  _id?: string;
}

const doctorSchema = new Schema<IDoctor>({
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
  specialization: { type: String }, // Optional field for specialization
  startDate: { type: Date },
  endDate: { type: Date },
  startTime: { type: Date },
  endTime: { type: Date },
  address: { type: String },
  phoneBook: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  hospital: { type: Schema.Types.ObjectId, ref: "Hospital", required: true }, // Reference to Hospital
  patients: [{ type: Schema.Types.ObjectId, ref: "Patient" }], // References to Patients
});

export const Doctor: Model<IDoctor> = mongoose.model("Doctor", doctorSchema);
