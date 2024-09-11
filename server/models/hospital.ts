import mongoose, { Schema, Model, Types } from "mongoose";
import { IImage } from "./superAdmin";

export interface IHospital {
  name: string;
  address: string;
  createdAt: Date;
  doctors?: Types.ObjectId[]; // References to Doctors
  patients?: Types.ObjectId[]; // References to Patients
  image?: IImage; // Image of the Hospital
  __v?: number;
  _id?: string;
}

const hospitalSchema = new Schema<IHospital>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  doctors: [{ type: Schema.Types.ObjectId, ref: "Doctor" }], // References to Doctors
  patients: [{ type: Schema.Types.ObjectId, ref: "Patient" }], // References to Patients
  image: {
    data: { type: Buffer, required: false }, // Optional
    contentType: { type: String, required: false }, // Optional
  },
});

export const Hospital: Model<IHospital> = mongoose.model(
  "Hospital",
  hospitalSchema,
);
