import mongoose, { Schema, Model, Types } from "mongoose";
import { IMedications } from "./medication";
export interface ITreatment {
  name: string;
  date: Date;
  totalFee: number;
  doctor: Types.ObjectId;
  medication: IMedications[];
}

const treatmentSchema = new Schema<ITreatment>({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  totalFee: { type: Number, required: true },
  doctor: { type: Schema.Types.ObjectId, ref: "Doctor" },
  medication: [{ type: Schema.Types.ObjectId, ref: "Medication" }],
});

export const Treatment: Model<ITreatment> = mongoose.model(
  "Treatment",
  treatmentSchema,
);
