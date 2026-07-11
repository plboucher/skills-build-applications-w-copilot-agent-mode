import mongoose, { Schema, type Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  sport: string;
  members: string[];
  captain: string;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  sport: { type: String, required: true },
  members: [{ type: String, required: true }],
  captain: { type: String, required: true },
});

export const TeamModel = mongoose.model<ITeam>('Team', teamSchema);
