import mongoose, { Schema, Model, Types } from "mongoose";

export interface ITreatment {
  name: string;
  date: Date;
  totalFee: number;
  doctor: Types.ObjectId; // Reference to Doctor
  medications: Types.ObjectId[]; // References to Medications
  createdAt: Date;
}

const treatmentSchema = new Schema<ITreatment>({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  totalFee: { type: Number, required: true },
  doctor: { type: Schema.Types.ObjectId, ref: "Doctor", required: true }, // Reference to Doctor
  medications: [{ type: Schema.Types.ObjectId, ref: "Medication" }], // References to Medications
  createdAt: { type: Date, default: Date.now },
});

export const Treatment: Model<ITreatment> = mongoose.model(
  "Treatment",
  treatmentSchema,
);
