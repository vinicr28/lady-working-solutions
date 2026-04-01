import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

import { authRoutes } from './routes/auth.routes.js';
import { jobsRoutes } from './routes/jobs.routes.js';
import { coursesRoutes } from './routes/courses.routes.js';
import { impactRoutes } from './routes/impact.routes.js';
import { errorMiddleware } from './middleware/error.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDist = path.resolve(__dirname, '../../dist/client');

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api', impactRoutes);

// Serve static files from Vite build and public folder
app.use(express.static(clientDist));
app.use(express.static(path.resolve(__dirname, '../../public')));

// SPA catch-all — serve index.html for all non-API routes
app.get('*', (_req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});

// Error middleware (must be last)
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Lady Working Solutions server running at http://localhost:${PORT}`);
});

export default app;
