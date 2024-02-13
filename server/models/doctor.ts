import mongoose, { Schema, Model, Date, Types } from "mongoose";
import { IImage } from "./admin";

export interface IDoctor {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  image: IImage;
  gender: string;
  country: string;
  age: number;
  createdAt: Date;
  patient: Types.ObjectId[];
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
  createdAt: { type: Date, required: true },
  patient: [{ type: Schema.Types.ObjectId, ref: "Patient" }],
});

export const Doctor: Model<IDoctor> = mongoose.model("Doctor", doctorSchema);
