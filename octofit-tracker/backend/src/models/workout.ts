import mongoose, { Schema, type Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  difficulty: string;
  duration: string;
  focus: string;
}

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  difficulty: { type: String, required: true },
  duration: { type: String, required: true },
  focus: { type: String, required: true },
});

export const WorkoutModel = mongoose.model<IWorkout>('Workout', workoutSchema);
