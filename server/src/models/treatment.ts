import mongoose, { Schema, Model } from "mongoose";
import { IMedications } from "./medication";

export interface ITreatment {
  name: string;
  date: Date;
  totalFee: number;
  medication: IMedications;
}

const treatmentSchema = new Schema<ITreatment>({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  totalFee: { type: Number, required: true },
  medication: { type: Schema.Types.ObjectId, ref: "Medication" },
});

export const Treatment: Model<ITreatment> = mongoose.model(
  "Treatment",
  treatmentSchema,
);
