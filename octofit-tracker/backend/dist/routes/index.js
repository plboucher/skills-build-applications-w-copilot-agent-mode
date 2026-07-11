"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const team_1 = require("../models/team");
const user_1 = require("../models/user");
const workout_1 = require("../models/workout");
const apiUrl_1 = require("../utils/apiUrl");
const router = (0, express_1.Router)();
const resources = [
    { name: 'users', path: '/api/users/' },
    { name: 'teams', path: '/api/teams/' },
    { name: 'activities', path: '/api/activities/' },
    { name: 'leaderboard', path: '/api/leaderboard/' },
    { name: 'workouts', path: '/api/workouts/' },
];
router.get('/api', (_req, res) => {
    res.json({
        message: 'OctoFit Tracker API',
        baseUrl: (0, apiUrl_1.getApiBaseUrl)(),
        endpoints: resources.map((resource) => ({
            name: resource.name,
            path: resource.path,
        })),
    });
});
router.get('/api/users/', async (_req, res) => {
    const users = await user_1.UserModel.find().lean();
    res.json(users);
});
router.get('/api/teams/', async (_req, res) => {
    const teams = await team_1.TeamModel.find().lean();
    res.json(teams);
});
router.get('/api/activities/', async (_req, res) => {
    const activities = await activity_1.ActivityModel.find().lean();
    res.json(activities);
});
router.get('/api/leaderboard/', async (_req, res) => {
    const leaderboard = await leaderboard_1.LeaderboardModel.find().sort({ rank: 1 }).lean();
    res.json(leaderboard);
});
router.get('/api/workouts/', async (_req, res) => {
    const workouts = await workout_1.WorkoutModel.find().lean();
    res.json(workouts);
});
exports.default = router;
