import mongoose, { Schema, Model } from "mongoose";

export interface IAdmin {
  username: string;
  password: string;
}

const adminSchema = new Schema<IAdmin>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export const Admin: Model<IAdmin> = mongoose.model("Admin", adminSchema);
