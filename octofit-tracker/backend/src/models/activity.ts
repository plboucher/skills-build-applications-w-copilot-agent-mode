import mongoose, { Schema, type Document } from 'mongoose';

export interface IActivity extends Document {
  userId: string;
  type: string;
  duration: string;
  date: Date;
}

const activitySchema = new Schema<IActivity>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  duration: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
});

export const ActivityModel = mongoose.model<IActivity>('Activity', activitySchema);
