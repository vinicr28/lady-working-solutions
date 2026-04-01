import { api } from '../api.js';
import { getUser } from '../router.js';

let jobId = '';

export async function renderJobDetail(params: Record<string, string>): Promise<string> {
  jobId = params.id;
  return `
  <div class="page">
    <div class="container">
      <div id="job-detail-content">
        <p>Carregando vaga...</p>
      </div>
    </div>
  </div>
  `;
}

export async function initJobDetail(): Promise<void> {
  const container = document.getElementById('job-detail-content');
  if (!container) return;

  // Get jobId from hash
  const hash = window.location.hash.slice(1);
  const match = hash.match(/^\/jobs\/(.+)$/);
  if (match) jobId = match[1];

  const res = await api.getJob(jobId);
  if (!res.success || !res.data) {
    container.innerHTML = '<h2>Vaga não encontrada</h2><a href="#/jobs" class="btn btn-outline mt-md">Voltar às vagas</a>';
    return;
  }

  const job = res.data as Record<string, unknown>;
  const company = job.company as Record<string, unknown> | null;
  const isMotherFriendly = company?.isMotherFriendly;

  const typeLabels: Record<string, string> = {
    FULL_TIME: 'Tempo Integral',
    PART_TIME: 'Meio Período',
    FREELANCE: 'Freelance',
    INTERNSHIP: 'Estágio',
  };

  container.innerHTML = `
    <a href="#/jobs" class="back-link">&larr; Voltar às vagas</a>
    <div class="job-detail-layout">
      <div class="job-detail-main">
        <h1>${job.title}</h1>
        <div class="job-detail-badges mt-md mb-lg">
          <span class="badge badge-primary">${typeLabels[job.type as string] || job.type}</span>
          ${job.remote ? '<span class="badge badge-remote">Remoto</span>' : ''}
          ${isMotherFriendly ? '<span class="badge badge-mother-friendly">Empresa Amiga das Mães</span>' : ''}
        </div>

        <div class="job-detail-meta mb-lg">
          <p><strong>Localização:</strong> ${job.location}</p>
          ${job.salary ? `<p><strong>Remuneração:</strong> ${job.salary}</p>` : ''}
        </div>

        <div class="job-detail-section">
          <h2>Descrição da Vaga</h2>
          <div class="job-description">${formatText(job.description as string)}</div>
        </div>

        ${job.requirements ? `
        <div class="job-detail-section">
          <h2>Requisitos</h2>
          <p>${job.requirements}</p>
        </div>
        ` : ''}

        ${job.benefits ? `
        <div class="job-detail-section">
          <h2>Benefícios</h2>
          <p>${job.benefits}</p>
        </div>
        ` : ''}

        <div class="mt-xl">
          <a href="#/apply/${job.id}" class="btn btn-primary btn-lg" id="apply-cta">Candidatar-se</a>
        </div>
      </div>

      <aside class="job-detail-sidebar">
        <div class="card company-card">
          <img src="/assets/images/companies/company-tech-${getCompanyImageIndex(job.companyId as string)}.jpg" alt="${company?.name || 'Empresa'}" class="company-card-img" />
          <h3>${company?.name || 'Empresa'}</h3>
          ${isMotherFriendly ? '<span class="badge badge-mother-friendly mb-md">Empresa Amiga das Mães</span>' : ''}
          <p class="text-muted">${company?.description || ''}</p>
        </div>
      </aside>
    </div>
  `;
}

function getCompanyImageIndex(companyId: string): string {
  if (companyId === 'comp-1') return '1';
  if (companyId === 'comp-2') return '2';
  return '3';
}

function formatText(text: string): string {
  return text.split('\n').map((line) => {
    if (line.startsWith('- ')) {
      return `<li>${line.slice(2)}</li>`;
    }
    return line ? `<p>${line}</p>` : '';
  }).join('');
}
