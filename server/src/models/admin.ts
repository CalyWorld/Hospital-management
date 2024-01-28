import mongoose, { Schema, Types, Model } from "mongoose";
import { IDoctor } from "./doctor";
import { IPatient } from "./patient";

interface IAdmin {
  name: string;
  password: string;
  Doctors: IDoctor;
  Patients: IPatient;
}

const adminSchema = new Schema<IAdmin>({
  name: { type: String, required: true },
  password: { type: String, required: true },
  Doctors: { type: Schema.Types.ObjectId, ref: "Doctor" },
  Patients: { type: Schema.Types.ObjectId, ref: "Patient" },
});

export const Admin: Model<IAdmin> = mongoose.model("Admin", adminSchema);
