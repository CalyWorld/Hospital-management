import mongoose, { Schema, Model, Types } from "mongoose";

export interface IMessage {
  sender: Types.ObjectId; // Reference to Doctor or Patient
  recipient: Types.ObjectId; // Reference to Doctor or Patient
  onModel: "Doctor" | "Patient";
  content: string;
  dateSent: Date;
}

const messageSchema = new Schema<IMessage>({
  sender: { type: Schema.Types.ObjectId, refPath: "onModel", required: true }, // Reference to Doctor or Patient
  recipient: {
    type: Schema.Types.ObjectId,
    refPath: "onModel",
    required: true,
  }, // Reference to Doctor or Patient
  onModel: { type: String, enum: ["Doctor", "Patient"], required: true },
  content: { type: String, required: true },
  dateSent: { type: Date, default: Date.now },
});

export const Message: Model<IMessage> = mongoose.model(
  "Message",
  messageSchema,
);
