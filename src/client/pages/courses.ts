import { api } from '../api.js';

const MOCK_COURSES: Array<Record<string, unknown>> = [
  { id: '1', title: 'Atendimento ao Cliente', track: 'customer-service', instructor: 'Equipe LWS', level: 'Iniciante', duration: '8h', isFree: true, price: 0, moduleCount: 4, lessonCount: 24 },
  { id: '2', title: 'Social Media na Prática', track: 'social-media', instructor: 'Equipe LWS', level: 'Intermediário', duration: '12h', isFree: true, price: 0, moduleCount: 5, lessonCount: 32 },
  { id: '3', title: 'Assistência Virtual', track: 'virtual-assistance', instructor: 'Equipe LWS', level: 'Iniciante', duration: '10h', isFree: true, price: 0, moduleCount: 4, lessonCount: 28 },
  { id: '4', title: 'Vendas Online', track: 'online-sales', instructor: 'Equipe LWS', level: 'Intermediário', duration: '9h', isFree: false, price: 97, moduleCount: 5, lessonCount: 30 },
  { id: '5', title: 'Design Básico', track: 'basic-design', instructor: 'Equipe LWS', level: 'Iniciante', duration: '14h', isFree: true, price: 0, moduleCount: 6, lessonCount: 36 },
  { id: '6', title: 'Edição de Vídeo', track: 'video-editing', instructor: 'Equipe LWS', level: 'Avançado', duration: '16h', isFree: false, price: 147, moduleCount: 6, lessonCount: 40 },
];

function filterMockCourses(params: Record<string, string>): Array<Record<string, unknown>> {
  return MOCK_COURSES.filter((c) => {
    if (params.track && c.track !== params.track) return false;
    if (params.level && c.level !== params.level) return false;
    if (params.free === 'true' && !c.isFree) return false;
    if (params.free === 'false' && c.isFree) return false;
    return true;
  });
}

export async function renderCourses(): Promise<string> {
  return `
  <div class="page">
    <div class="container">
      <h1 class="section-title">Trilhas de Capacitação</h1>
      <p class="section-subtitle">Formações práticas para sua inserção no mercado de trabalho remoto</p>

      <div class="filters-bar">
        <select id="course-track-filter" class="filter-select" aria-label="Filtrar por trilha">
          <option value="all">Todas as trilhas</option>
          <option value="customer-service">Atendimento ao Cliente</option>
          <option value="social-media">Social Media</option>
          <option value="virtual-assistance">Assistência Virtual</option>
          <option value="online-sales">Vendas Online</option>
          <option value="basic-design">Design Básico</option>
          <option value="video-editing">Edição de Vídeo</option>
        </select>
        <select id="course-level-filter" class="filter-select" aria-label="Filtrar por nível">
          <option value="all">Todos os níveis</option>
          <option value="Iniciante">Iniciante</option>
          <option value="Intermediário">Intermediário</option>
          <option value="Avançado">Avançado</option>
        </select>
        <select id="course-price-filter" class="filter-select" aria-label="Filtrar por preço">
          <option value="all">Gratuitos e Pagos</option>
          <option value="true">Apenas Gratuitos</option>
          <option value="false">Apenas Pagos</option>
        </select>
      </div>

      <div class="grid grid-3" id="courses-grid">
        <div class="text-center" style="grid-column:1/-1"><p>Carregando trilhas...</p></div>
      </div>
    </div>
  </div>
  `;
}

export function initCourses(): void {
  const trackFilter = document.getElementById('course-track-filter') as HTMLSelectElement;
  const levelFilter = document.getElementById('course-level-filter') as HTMLSelectElement;
  const priceFilter = document.getElementById('course-price-filter') as HTMLSelectElement;

  const loadCourses = async () => {
    const params: Record<string, string> = {};
    if (trackFilter?.value && trackFilter.value !== 'all') params.track = trackFilter.value;
    if (levelFilter?.value && levelFilter.value !== 'all') params.level = levelFilter.value;
    if (priceFilter?.value && priceFilter.value !== 'all') params.free = priceFilter.value;

    // Try the API; fall back to mock data when the server is offline.
    let courses: Array<Record<string, unknown>>;
    try {
      const res = await api.getCourses(params);
      courses =
        res.success && Array.isArray(res.data) && (res.data as unknown[]).length
          ? (res.data as Array<Record<string, unknown>>)
          : filterMockCourses(params);
    } catch {
      courses = filterMockCourses(params);
    }

    const grid = document.getElementById('courses-grid');
    if (!grid) return;

    if (courses.length === 0) {
      grid.innerHTML = '<div class="text-center" style="grid-column:1/-1"><p>Nenhuma trilha encontrada com os filtros selecionados.</p></div>';
      return;
    }

    grid.innerHTML = courses
      .map(
        (c) => `
      <div class="card course-card">
        <div class="course-card-thumb">
          <img src="${getTrackImage(c.track as string)}" alt="${c.title}" class="course-thumb-img" />
        </div>
        <div class="course-card-body">
          <h3><a href="#/courses/${c.id}">${c.title}</a></h3>
          <p class="text-muted">${c.instructor}</p>
          <div class="course-card-meta">
            <span class="badge badge-primary">${c.level}</span>
            <span class="text-muted">${c.duration}</span>
            ${c.isFree ? '<span class="badge badge-free">Gratuito</span>' : `<span class="badge badge-primary">R$ ${(c.price as number).toFixed(2)}</span>`}
          </div>
          <p class="text-muted mt-sm">${c.moduleCount} módulos · ${c.lessonCount} aulas</p>
          <a href="#/courses/${c.id}" class="btn btn-outline btn-sm mt-md">Ver Trilha</a>
        </div>
      </div>
    `
      )
      .join('');
  };

  trackFilter?.addEventListener('change', loadCourses);
  levelFilter?.addEventListener('change', loadCourses);
  priceFilter?.addEventListener('change', loadCourses);

  loadCourses();
}

function getTrackImage(track: string): string {
  const images: Record<string, string> = {
    'customer-service': '/assets/images/course-thumbs/customer-service.jpg',
    'social-media': '/assets/images/course-thumbs/social-media.jpg',
    'virtual-assistance': '/assets/images/course-thumbs/virtual-assistant.jpg',
    'online-sales': '/assets/images/course-thumbs/online-sales.jpg',
    'basic-design': '/assets/images/course-thumbs/design.jpg',
    'video-editing': '/assets/images/course-thumbs/video-editing.jpg',
  };
  return images[track] || '/assets/images/courses/courses-online-learning.jpg';
}
