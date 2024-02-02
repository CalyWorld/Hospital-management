import mongoose, { Schema, Model } from "mongoose";
import { ITreatment } from "./treatment";

export interface IRecord {
  patient: mongoose.Schema.Types.ObjectId;
  treatments: ITreatment[];
}

const recordSchema = new Schema<IRecord>({
  patient: { type: Schema.Types.ObjectId, ref: "Patient" },
  treatments: [{ type: Schema.Types.ObjectId, ref: "Treatment" }],
});

export const HealthRecords: Model<IRecord> = mongoose.model(
  "Records",
  recordSchema,
);
