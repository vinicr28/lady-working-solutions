import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { authRoutes } from '../src/server/routes/auth.routes.js';
import { jobsRoutes } from '../src/server/routes/jobs.routes.js';
import { coursesRoutes } from '../src/server/routes/courses.routes.js';
import { impactRoutes } from '../src/server/routes/impact.routes.js';
import { errorMiddleware } from '../src/server/middleware/error.middleware.js';

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api', impactRoutes);

app.use(errorMiddleware);

export default app;
