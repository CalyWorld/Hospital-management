import mongoose, { Schema, Model } from "mongoose";

export interface IMedications {
  name: string;
  quantity: number;
  fee: number;
}

const medicationSchema = new Schema<IMedications>({
  name: { type: String, required: true },
  fee: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export const Medication: Model<IMedications> = mongoose.model(
  "Medication",
  medicationSchema,
);
