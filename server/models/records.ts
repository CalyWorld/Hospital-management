import mongoose, { Schema, Model } from "mongoose";
import { ITreatment } from "./treatment";

export interface IRecord {
  treatments: ITreatment[];
}

const recordSchema = new Schema<IRecord>({
  treatments: [{ type: Schema.Types.ObjectId, ref: "Treatment" }],
});

export const HealthRecords: Model<IRecord> = mongoose.model(
  "Records",
  recordSchema,
);
