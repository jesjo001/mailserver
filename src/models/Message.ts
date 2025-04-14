import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  sender: string;
  senderUserName: string;
  recipient: string;
  subject: string;
  content: string;
  isRead: boolean;
  flagged: boolean;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  sender: { type: String, required: true },
  senderUserName: { type: String, required: true },
  recipient: { type: String, required: true },
  subject: { type: String, required: true },
  content: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  flagged: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export const Message = mongoose.model<IMessage>('Message', MessageSchema);