"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const team_1 = require("../models/team");
const user_1 = require("../models/user");
const workout_1 = require("../models/workout");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data.
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            user_1.UserModel.deleteMany({}),
            team_1.TeamModel.deleteMany({}),
            activity_1.ActivityModel.deleteMany({}),
            leaderboard_1.LeaderboardModel.deleteMany({}),
            workout_1.WorkoutModel.deleteMany({}),
        ]);
        const users = await user_1.UserModel.insertMany([
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
        await team_1.TeamModel.insertMany([
            {
                name: 'Blue Crew',
                sport: 'Running',
                members: users.map((user) => user._id.toString()),
                captain: users[1]._id.toString(),
            },
        ]);
        await activity_1.ActivityModel.insertMany([
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
        await leaderboard_1.LeaderboardModel.insertMany([
            { userId: users[0]._id.toString(), name: 'Avery Brooks', score: 1250, rank: 1 },
            { userId: users[1]._id.toString(), name: 'Mina Patel', score: 1180, rank: 2 },
        ]);
        await workout_1.WorkoutModel.insertMany([
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
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
