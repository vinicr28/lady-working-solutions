import { Router } from 'express';
import { jobs, companies, applications, sessions, type Application } from '../mock-data.js';

export const jobsRoutes = Router();

// GET /api/jobs — list with filters
jobsRoutes.get('/', (req, res) => {
  const { search, type, remote, motherFriendly } = req.query;

  let filtered = jobs.filter((j) => j.isActive);

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.description.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q)
    );
  }

  if (type && typeof type === 'string' && type !== 'all') {
    filtered = filtered.filter((j) => j.type === type);
  }

  if (remote === 'true') {
    filtered = filtered.filter((j) => j.remote);
  }

  if (motherFriendly === 'true') {
    const motherFriendlyCompanyIds = companies
      .filter((c) => c.isMotherFriendly)
      .map((c) => c.id);
    filtered = filtered.filter((j) => motherFriendlyCompanyIds.includes(j.companyId));
  }

  // Attach company info
  const result = filtered.map((j) => {
    const company = companies.find((c) => c.id === j.companyId);
    return {
      ...j,
      company: company
        ? { id: company.id, name: company.name, isMotherFriendly: company.isMotherFriendly }
        : null,
    };
  });

  return res.json({ success: true, data: result });
});

// GET /api/jobs/:id — single job
jobsRoutes.get('/:id', (req, res) => {
  const job = jobs.find((j) => j.id === req.params.id);
  if (!job) {
    return res.status(404).json({ success: false, error: 'Vaga não encontrada.' });
  }

  const company = companies.find((c) => c.id === job.companyId);
  return res.json({
    success: true,
    data: {
      ...job,
      company: company
        ? {
            id: company.id,
            name: company.name,
            description: company.description,
            isMotherFriendly: company.isMotherFriendly,
          }
        : null,
    },
  });
});

// POST /api/jobs/:id/apply — mock application
jobsRoutes.post('/:id/apply', (req, res) => {
  const sessionId = req.cookies?.session;
  if (!sessionId) {
    return res.status(401).json({ success: false, error: 'Faça login para se candidatar.' });
  }
  const session = sessions.get(sessionId);
  if (!session || session.type !== 'person') {
    return res.status(403).json({ success: false, error: 'Apenas candidatas podem se candidatar.' });
  }

  const job = jobs.find((j) => j.id === req.params.id);
  if (!job) {
    return res.status(404).json({ success: false, error: 'Vaga não encontrada.' });
  }

  const existing = applications.find(
    (a) => a.personId === session.userId && a.jobId === job.id
  );
  if (existing) {
    return res.status(409).json({ success: false, error: 'Você já se candidatou a esta vaga.' });
  }

  const application: Application = {
    id: `app-${Date.now()}`,
    personId: session.userId,
    jobId: job.id,
    message: req.body.message || '',
    status: 'PENDING',
    createdAt: new Date().toISOString(),
  };
  applications.push(application);

  return res.status(201).json({
    success: true,
    data: application,
    message: 'Candidatura enviada com sucesso!',
  });
});
