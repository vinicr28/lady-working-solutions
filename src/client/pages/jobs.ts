import { api } from '../api.js';

const MOCK_JOBS: Array<Record<string, unknown>> = [
  { id: '1', title: 'Assistente Virtual', company: { name: 'TechNova', isMotherFriendly: true }, type: 'PART_TIME', remote: true, location: 'Remoto · Brasil', salary: 'R$ 2.000 – 2.800' },
  { id: '2', title: 'Social Media Júnior', company: { name: 'Marca Viva', isMotherFriendly: true }, type: 'FREELANCE', remote: true, location: 'Remoto', salary: 'R$ 1.500 / projeto' },
  { id: '3', title: 'Atendimento ao Cliente', company: { name: 'Loja Boa', isMotherFriendly: false }, type: 'FULL_TIME', remote: true, location: 'Remoto · SP', salary: 'R$ 2.400' },
  { id: '4', title: 'Designer Gráfico', company: { name: 'Estúdio Aurora', isMotherFriendly: true }, type: 'FREELANCE', remote: true, location: 'Remoto', salary: 'A combinar' },
  { id: '5', title: 'Editora de Vídeo', company: { name: 'Conteúdo+', isMotherFriendly: false }, type: 'PART_TIME', remote: true, location: 'Remoto', salary: 'R$ 2.200' },
  { id: '6', title: 'Executiva de Vendas', company: { name: 'VendeMais', isMotherFriendly: true }, type: 'FULL_TIME', remote: true, location: 'Remoto · Brasil', salary: 'R$ 3.000 + comissão' },
  { id: '7', title: 'Analista de Suporte', company: { name: 'HelpDesk Co', isMotherFriendly: true }, type: 'FULL_TIME', remote: true, location: 'Remoto', salary: 'R$ 2.600' },
  { id: '8', title: 'Estágio em Marketing', company: { name: 'Start Hub', isMotherFriendly: false }, type: 'INTERNSHIP', remote: true, location: 'Remoto', salary: 'R$ 1.200' },
];

function filterMockJobs(params: Record<string, string>): Array<Record<string, unknown>> {
  return MOCK_JOBS.filter((j) => {
    if (params.search && !(j.title as string).toLowerCase().includes(params.search.toLowerCase())) return false;
    if (params.type && j.type !== params.type) return false;
    if (params.remote === 'true' && !j.remote) return false;
    if (params.motherFriendly === 'true' && !(j.company as Record<string, unknown>)?.isMotherFriendly) return false;
    return true;
  });
}

export async function renderJobs(): Promise<string> {
  return `
  <div class="page">
    <div class="container">
      <h1 class="section-title">Oportunidades</h1>
      <p class="section-subtitle">Vagas remotas e flexíveis para profissionais talentosas</p>

      <div class="filters-bar">
        <input type="text" id="job-search" class="form-input search-input" placeholder="Buscar vagas..." aria-label="Buscar vagas" />
        <select id="job-type-filter" class="filter-select" aria-label="Filtrar por tipo">
          <option value="all">Todos os tipos</option>
          <option value="FULL_TIME">Tempo integral</option>
          <option value="PART_TIME">Meio período</option>
          <option value="FREELANCE">Freelance</option>
          <option value="INTERNSHIP">Estágio</option>
        </select>
        <label class="form-checkbox" style="margin-bottom:0;white-space:nowrap">
          <input type="checkbox" id="job-remote-filter" />
          <span>Apenas remoto</span>
        </label>
        <label class="form-checkbox" style="margin-bottom:0;white-space:nowrap">
          <input type="checkbox" id="job-mother-filter" />
          <span class="badge badge-mother-friendly">Empresa Amiga das Mães</span>
        </label>
      </div>

      <div class="grid grid-3" id="jobs-grid">
        <div class="text-center" style="grid-column:1/-1"><p>Carregando vagas...</p></div>
      </div>

      <div class="pagination" id="jobs-pagination"></div>
    </div>
  </div>
  `;
}

const JOBS_PER_PAGE = 6;
let currentPage = 1;
let allJobs: Array<Record<string, unknown>> = [];

export function initJobs(): void {
  const search = document.getElementById('job-search') as HTMLInputElement;
  const typeFilter = document.getElementById('job-type-filter') as HTMLSelectElement;
  const remoteFilter = document.getElementById('job-remote-filter') as HTMLInputElement;
  const motherFilter = document.getElementById('job-mother-filter') as HTMLInputElement;

  const loadJobs = async () => {
    const params: Record<string, string> = {};
    if (search?.value) params.search = search.value;
    if (typeFilter?.value && typeFilter.value !== 'all') params.type = typeFilter.value;
    if (remoteFilter?.checked) params.remote = 'true';
    if (motherFilter?.checked) params.motherFriendly = 'true';

    // Try the API; fall back to mock data when the server is offline.
    try {
      const res = await api.getJobs(params);
      allJobs =
        res.success && Array.isArray(res.data) && (res.data as unknown[]).length
          ? (res.data as Array<Record<string, unknown>>)
          : filterMockJobs(params);
    } catch {
      allJobs = filterMockJobs(params);
    }

    currentPage = 1;
    renderJobsList();
  };

  search?.addEventListener('input', debounce(loadJobs, 300));
  typeFilter?.addEventListener('change', loadJobs);
  remoteFilter?.addEventListener('change', loadJobs);
  motherFilter?.addEventListener('change', loadJobs);

  loadJobs();
}

function renderJobsList(): void {
  const grid = document.getElementById('jobs-grid');
  const pagination = document.getElementById('jobs-pagination');
  if (!grid) return;

  const totalPages = Math.ceil(allJobs.length / JOBS_PER_PAGE);
  const start = (currentPage - 1) * JOBS_PER_PAGE;
  const pageJobs = allJobs.slice(start, start + JOBS_PER_PAGE);

  if (pageJobs.length === 0) {
    grid.innerHTML = '<div class="text-center" style="grid-column:1/-1"><p>Nenhuma vaga encontrada com os filtros selecionados.</p></div>';
    if (pagination) pagination.innerHTML = '';
    return;
  }

  const typeLabels: Record<string, string> = {
    FULL_TIME: 'Integral',
    PART_TIME: 'Meio Período',
    FREELANCE: 'Freelance',
    INTERNSHIP: 'Estágio',
  };

  grid.innerHTML = pageJobs
    .map((job) => {
      const company = job.company as Record<string, unknown> | null;
      const isMotherFriendly = company?.isMotherFriendly;
      return `
      <div class="card job-card">
        <div class="job-card-header">
          <h3><a href="#/jobs/${job.id}">${job.title}</a></h3>
          <p class="text-muted">${company?.name || 'Empresa'}</p>
        </div>
        <div class="job-card-badges">
          <span class="badge badge-primary">${typeLabels[job.type as string] || job.type}</span>
          ${job.remote ? '<span class="badge badge-remote">Remoto</span>' : ''}
          ${isMotherFriendly ? '<span class="badge badge-mother-friendly">Amiga das Mães</span>' : ''}
        </div>
        <p class="job-card-location text-muted">${job.location}</p>
        ${job.salary ? `<p class="job-card-salary"><strong>${job.salary}</strong></p>` : ''}
        <a href="#/jobs/${job.id}" class="btn btn-outline btn-sm mt-md">Ver Vaga</a>
      </div>
    `;
    })
    .join('');

  // Pagination
  if (pagination && totalPages > 1) {
    let paginationHTML = `<button ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}">&laquo;</button>`;
    for (let i = 1; i <= totalPages; i++) {
      paginationHTML += `<button class="${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }
    paginationHTML += `<button ${currentPage === totalPages ? 'disabled' : ''} data-page="${currentPage + 1}">&raquo;</button>`;
    pagination.innerHTML = paginationHTML;

    pagination.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => {
        const page = parseInt(btn.getAttribute('data-page') || '1');
        if (page >= 1 && page <= totalPages) {
          currentPage = page;
          renderJobsList();
          window.scrollTo(0, 0);
        }
      });
    });
  } else if (pagination) {
    pagination.innerHTML = '';
  }
}

function debounce(fn: () => void, ms: number): () => void {
  let timer: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, ms);
  };
}
