import { Router } from 'express';
import {
  mockUsers,
  sessions,
  registeredPersons,
  companies,
} from '../mock-data.js';
import type { Person } from '../mock-data.js';

export const authRoutes = Router();

function generateSessionId(): string {
  return crypto.randomUUID();
}

// POST /api/auth/login
authRoutes.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check person
  const person = registeredPersons.find(
    (p) => p.email === email && p.password === password
  );
  if (person) {
    const sessionId = generateSessionId();
    sessions.set(sessionId, { userId: person.id, type: 'person' });
    res.cookie('session', sessionId, { httpOnly: true, maxAge: 86400000 });
    return res.json({
      success: true,
      data: { id: person.id, name: person.name, email: person.email, type: 'person' },
    });
  }

  // Check company
  const company = companies.find(
    (c) => c.email === email && c.password === password
  );
  if (company) {
    const sessionId = generateSessionId();
    sessions.set(sessionId, { userId: company.id, type: 'company' });
    res.cookie('session', sessionId, { httpOnly: true, maxAge: 86400000 });
    return res.json({
      success: true,
      data: { id: company.id, name: company.name, email: company.email, type: 'company' },
    });
  }

  return res.status(401).json({ success: false, error: 'E-mail ou senha inválidos.' });
});

// POST /api/auth/register/person
authRoutes.post('/register/person', (req, res) => {
  const { name, email, phone, password } = req.body;

  if (registeredPersons.some((p) => p.email === email)) {
    return res.status(409).json({ success: false, error: 'E-mail já cadastrado.' });
  }

  const newPerson: Person = {
    id: `user-person-${Date.now()}`,
    name,
    email,
    phone: phone || '',
    password,
    createdAt: new Date().toISOString(),
  };
  registeredPersons.push(newPerson);

  const sessionId = generateSessionId();
  sessions.set(sessionId, { userId: newPerson.id, type: 'person' });
  res.cookie('session', sessionId, { httpOnly: true, maxAge: 86400000 });

  return res.status(201).json({
    success: true,
    data: { id: newPerson.id, name: newPerson.name, email: newPerson.email, type: 'person' },
  });
});

// POST /api/auth/register/company
authRoutes.post('/register/company', (req, res) => {
  const { name, email, cnpj, password, description, isMotherFriendly } = req.body;

  if (companies.some((c) => c.email === email)) {
    return res.status(409).json({ success: false, error: 'E-mail já cadastrado.' });
  }

  const newCompany = {
    id: `comp-${Date.now()}`,
    name,
    email,
    cnpj: cnpj || '',
    password,
    description: description || '',
    logo: '',
    isMotherFriendly: isMotherFriendly || false,
    createdAt: new Date().toISOString(),
  };
  companies.push(newCompany);

  const sessionId = generateSessionId();
  sessions.set(sessionId, { userId: newCompany.id, type: 'company' });
  res.cookie('session', sessionId, { httpOnly: true, maxAge: 86400000 });

  return res.status(201).json({
    success: true,
    data: { id: newCompany.id, name: newCompany.name, email: newCompany.email, type: 'company' },
  });
});

// POST /api/auth/logout
authRoutes.post('/logout', (_req, res) => {
  const sessionId = _req.cookies?.session;
  if (sessionId) {
    sessions.delete(sessionId);
  }
  res.clearCookie('session');
  return res.json({ success: true, data: null });
});

// GET /api/auth/me
authRoutes.get('/me', (req, res) => {
  const sessionId = req.cookies?.session;
  if (!sessionId) {
    return res.status(401).json({ success: false, error: 'Não autenticado.' });
  }

  const session = sessions.get(sessionId);
  if (!session) {
    return res.status(401).json({ success: false, error: 'Sessão inválida.' });
  }

  if (session.type === 'person') {
    const person = registeredPersons.find((p) => p.id === session.userId);
    if (!person) {
      return res.status(404).json({ success: false, error: 'Usuário não encontrado.' });
    }
    return res.json({
      success: true,
      data: { id: person.id, name: person.name, email: person.email, type: 'person' },
    });
  }

  const company = companies.find((c) => c.id === session.userId);
  if (!company) {
    return res.status(404).json({ success: false, error: 'Empresa não encontrada.' });
  }
  return res.json({
    success: true,
    data: { id: company.id, name: company.name, email: company.email, type: 'company' },
  });
});
