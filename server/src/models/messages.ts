import mongoose, { Schema, Model } from "mongoose";

export interface IMessage {
  sender: Schema.Types.ObjectId;
  recipient: Schema.Types.ObjectId;
  onModel: "Doctor" | "Patient";
  content: string;
  dateSent: Date;
}

const messageSchema = new Schema<IMessage>({
  sender: { type: Schema.Types.ObjectId, refPath: "onModel" },
  recipient: { type: Schema.Types.ObjectId, refPath: "onModel" },
  onModel: {
    type: String,
    enum: ["Doctor", "Patient"],
    required: true,
  },
  content: { type: String },
  dateSent: { type: Date },
});

export const Message: Model<IMessage> = mongoose.model(
  "Messages",
  messageSchema,
);
