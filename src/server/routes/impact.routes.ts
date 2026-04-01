import { Router } from 'express';
import { impactMetrics, partnerships } from '../mock-data.js';

export const impactRoutes = Router();

// GET /api/impact/metrics
impactRoutes.get('/impact/metrics', (_req, res) => {
  return res.json({ success: true, data: impactMetrics });
});

// GET /api/partnerships
impactRoutes.get('/partnerships', (_req, res) => {
  return res.json({ success: true, data: partnerships });
});
