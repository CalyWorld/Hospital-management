import mongoose, { Schema, Model } from "mongoose";
import { IMessage } from "./messages";
import { IAppointment } from "./appointments";
import { IPatient } from "./patient";

export interface IDoctor {
  username: string;
  password: string;
  patients: IPatient[];
  messages: IMessage[];
  appointments: IAppointment[];
}

const doctorSchema = new Schema<IDoctor>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  patients: [{ type: Schema.Types.ObjectId, ref: "Patient" }],
  messages: [{ type: Schema.Types.ObjectId, ref: "Messages" }],
  appointments: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
});

export const Doctor: Model<IDoctor> = mongoose.model("Doctor", doctorSchema);
