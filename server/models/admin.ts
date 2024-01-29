import mongoose, { Schema, Model, Types } from "mongoose";
import { IDoctor } from "./doctor";
import { IPatient } from "./patient";

export interface IAdmin {
  username: string;
  password: string;
  doctors: IDoctor[];
  patients: IPatient[];
}

const adminSchema = new Schema<IAdmin>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  doctors: [{ type: Schema.Types.ObjectId, ref: "Doctor" }],
  patients: [{ type: Schema.Types.ObjectId, ref: "Patient" }],
});

export const Admin: Model<IAdmin> = mongoose.model("Admin", adminSchema);
