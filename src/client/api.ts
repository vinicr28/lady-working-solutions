// API client for Lady Working Solutions

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

const BASE = '/api';

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const res = await fetch(`${BASE}${endpoint}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const json: ApiResponse<T> = await res.json();
  return json;
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  registerPerson: (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) =>
    request('/auth/register/person', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  registerCompany: (data: {
    name: string;
    email: string;
    cnpj: string;
    password: string;
    description: string;
    isMotherFriendly: boolean;
  }) =>
    request('/auth/register/company', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  logout: () => request('/auth/logout', { method: 'POST' }),

  me: () => request<{ id: string; name: string; email: string; type: string }>('/auth/me'),

  // Jobs
  getJobs: (params?: Record<string, string>) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return request(`/jobs${qs}`);
  },

  getJob: (id: string) => request(`/jobs/${id}`),

  applyToJob: (id: string, message: string) =>
    request(`/jobs/${id}/apply`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    }),

  // Courses
  getCourses: (params?: Record<string, string>) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return request(`/courses${qs}`);
  },

  getCourse: (id: string) => request(`/courses/${id}`),

  // Impact
  getMetrics: () => request('/impact/metrics'),
  getPartnerships: () => request('/partnerships'),
};
