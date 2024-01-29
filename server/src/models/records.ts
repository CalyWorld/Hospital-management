import mongoose, { Schema, Model } from "mongoose";
import { ITreatment } from "./treatment";
import { IDoctor } from "./doctor";

export interface IRecord {
  treatments: ITreatment;
  doctor: IDoctor;
}

const recordSchema = new Schema<IRecord>({
  treatments: { type: Schema.Types.ObjectId, ref: "Treatment" },
  doctor: { type: Schema.Types.ObjectId, ref: "Doctor" },
});

export const HealthRecords: Model<IRecord> = mongoose.model(
  "Records",
  recordSchema,
);
