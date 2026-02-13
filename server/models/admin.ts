import mongoose, { Schema, Model, Types } from "mongoose";

export interface IAdmin {
  username: string;
  password: string;
  role: "super-admin" | "hospital-admin";
  hospital?: Types.ObjectId; // Reference to Hospital
  createdAt?: Date;
  __v?: number;
  _id?: string;
}

const adminSchema = new Schema<IAdmin>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["super-admin", "hospital-admin"],
    required: true,
  },
  hospital: { type: Schema.Types.ObjectId, ref: "Hospital" }, // Reference to Hospital
  createdAt: { type: Date, default: Date.now },
});

export const Admin: Model<IAdmin> = mongoose.model("Admin", adminSchema);
