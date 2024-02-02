import mongoose, { Schema, Model } from "mongoose";

export interface IDoctor {
  username: string;
  password: string;
}

const doctorSchema = new Schema<IDoctor>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export const Doctor: Model<IDoctor> = mongoose.model("Doctor", doctorSchema);
