import { Router } from 'express';
import { courses } from '../mock-data.js';

export const coursesRoutes = Router();

// GET /api/courses — list with filters
coursesRoutes.get('/', (req, res) => {
  const { track, level, free } = req.query;

  let filtered = [...courses];

  if (track && typeof track === 'string' && track !== 'all') {
    filtered = filtered.filter((c) => c.track === track);
  }

  if (level && typeof level === 'string' && level !== 'all') {
    filtered = filtered.filter((c) => c.level === level);
  }

  if (free === 'true') {
    filtered = filtered.filter((c) => c.isFree);
  } else if (free === 'false') {
    filtered = filtered.filter((c) => !c.isFree);
  }

  // Return without full modules for listing
  const result = filtered.map(({ modules, ...rest }) => ({
    ...rest,
    moduleCount: modules.length,
    lessonCount: modules.reduce((acc, m) => acc + m.lessons.length, 0),
  }));

  return res.json({ success: true, data: result });
});

// GET /api/courses/:id — single course with modules
coursesRoutes.get('/:id', (req, res) => {
  const course = courses.find((c) => c.id === req.params.id);
  if (!course) {
    return res.status(404).json({ success: false, error: 'Curso não encontrado.' });
  }

  return res.json({ success: true, data: course });
});
