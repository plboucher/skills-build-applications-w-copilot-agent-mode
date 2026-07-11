import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';

const app = express();
const port = process.env.PORT || 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

// Codespaces-aware API base URL
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());
app.use(routes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'OctoFit Tracker backend is running', baseUrl: apiBaseUrl });
});

async function startServer() {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
    console.log(`API Base URL: ${apiBaseUrl}`);

    app.listen(port, () => {
      console.log(`Backend listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
