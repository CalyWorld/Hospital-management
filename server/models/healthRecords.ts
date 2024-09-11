import mongoose, { Schema, Model, Types } from "mongoose";

export interface IHealthRecord {
  patient: Types.ObjectId; // Reference to Patient
  treatments: Types.ObjectId[]; // References to Treatments
  createdAt: Date;
}

const healthRecordSchema = new Schema<IHealthRecord>({
  patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true }, // Reference to Patient
  treatments: [{ type: Schema.Types.ObjectId, ref: "Treatment" }], // References to Treatments
  createdAt: { type: Date, default: Date.now },
});

export const HealthRecord: Model<IHealthRecord> = mongoose.model(
  "HealthRecord",
  healthRecordSchema,
);
