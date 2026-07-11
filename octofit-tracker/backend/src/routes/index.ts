import { Router } from 'express';
import { ActivityModel } from '../models/activity';
import { LeaderboardModel } from '../models/leaderboard';
import { TeamModel } from '../models/team';
import { UserModel } from '../models/user';
import { WorkoutModel } from '../models/workout';
import { getApiBaseUrl } from '../utils/apiUrl';

const router = Router();

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
    baseUrl: getApiBaseUrl(),
    endpoints: resources.map((resource) => ({
      name: resource.name,
      path: resource.path,
    })),
  });
});

router.get('/api/users/', async (_req, res) => {
  const users = await UserModel.find().lean();
  res.json(users);
});

router.get('/api/teams/', async (_req, res) => {
  const teams = await TeamModel.find().lean();
  res.json(teams);
});

router.get('/api/activities/', async (_req, res) => {
  const activities = await ActivityModel.find().lean();
  res.json(activities);
});

router.get('/api/leaderboard/', async (_req, res) => {
  const leaderboard = await LeaderboardModel.find().sort({ rank: 1 }).lean();
  res.json(leaderboard);
});

router.get('/api/workouts/', async (_req, res) => {
  const workouts = await WorkoutModel.find().lean();
  res.json(workouts);
});

export default router;
