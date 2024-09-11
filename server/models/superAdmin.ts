import mongoose, { Schema, Model, Types } from "mongoose";

export interface IImage {
  data: Buffer;
  contentType: string;
}

export interface ISuperAdmin {
  username: string;
  password: string;
  image?: IImage; // Optional image field for SuperAdmin
  createdAt?: Date;
  admins?: Types.ObjectId[]; // References to Admin
  __v?: number;
  _id?: string;
}

const superAdminSchema = new Schema<ISuperAdmin>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  image: {
    data: { type: Buffer, required: false }, // Optional
    contentType: { type: String, required: false }, // Optional
  },
  createdAt: { type: Date, default: Date.now },
  admins: [{ type: Schema.Types.ObjectId, ref: "Admin" }], // References to Admin
});

export const SuperAdmin: Model<ISuperAdmin> = mongoose.model(
  "SuperAdmin",
  superAdminSchema,
);
