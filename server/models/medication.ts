import mongoose, { Schema, Model } from "mongoose";

export interface IMedication {
  name: string;
  quantity: number;
  fee: number;
  createdAt: Date;
}

const medicationSchema = new Schema<IMedication>({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  fee: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Medication: Model<IMedication> = mongoose.model(
  "Medication",
  medicationSchema,
);
