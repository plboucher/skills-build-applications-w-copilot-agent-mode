import mongoose from 'mongoose';
import { ActivityModel } from '../models/activity';
import { LeaderboardModel } from '../models/leaderboard';
import { TeamModel } from '../models/team';
import { UserModel } from '../models/user';
import { WorkoutModel } from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data.
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      UserModel.deleteMany({}),
      TeamModel.deleteMany({}),
      ActivityModel.deleteMany({}),
      LeaderboardModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
    ]);

    const users = await UserModel.insertMany([
      {
        name: 'Avery Brooks',
        email: 'avery@example.com',
        role: 'member',
        fitnessGoal: 'Build endurance',
      },
      {
        name: 'Mina Patel',
        email: 'mina@example.com',
        role: 'captain',
        fitnessGoal: 'Improve strength',
      },
    ]);

    await TeamModel.insertMany([
      {
        name: 'Blue Crew',
        sport: 'Running',
        members: users.map((user) => user._id.toString()),
        captain: users[1]._id.toString(),
      },
    ]);

    await ActivityModel.insertMany([
      {
        userId: users[0]._id.toString(),
        type: 'Run',
        duration: '30m',
        date: new Date('2026-07-10T06:30:00Z'),
      },
      {
        userId: users[1]._id.toString(),
        type: 'Strength',
        duration: '45m',
        date: new Date('2026-07-11T18:00:00Z'),
      },
    ]);

    await LeaderboardModel.insertMany([
      { userId: users[0]._id.toString(), name: 'Avery Brooks', score: 1250, rank: 1 },
      { userId: users[1]._id.toString(), name: 'Mina Patel', score: 1180, rank: 2 },
    ]);

    await WorkoutModel.insertMany([
      {
        name: 'HIIT Burst',
        difficulty: 'Intermediate',
        duration: '25m',
        focus: 'Cardio',
      },
      {
        name: 'Core Strength',
        difficulty: 'Beginner',
        duration: '20m',
        focus: 'Abs',
      },
    ]);

    console.log('Seed the octofit_db database with test data');
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
